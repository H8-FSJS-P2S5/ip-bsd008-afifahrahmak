const { Op, Sequelize } = require("sequelize");
const {
  Product,
  Category,
  Cart,
  Transaction,
  User,
  ProductCart,
} = require("../models");

class CartController {
  static async addCart(req, res, next) {
    try {
      const { pId } = req.params;
      const { userId } = req.loginInfo;
      const { productQuantity } = req.body;

      // console.log(req.params);
      // console.log(req.loginInfo);

      //ga boleh masuk product yang sama dicart
      const checkIfItIsExistingInCart = await ProductCart.findOne({
        where: {
          ProductId: pId,
          CartId: userId,
        },
      });

      if (checkIfItIsExistingInCart) {
        await ProductCart.update(
          { productQuantity: productQuantity },
          { where: { ProductId: pId, CartId: userId } }
        );
      }

      //if product quantity inputted > stock, throw new error forbidden
      const theStock = await Product.findOne({
        where: {
          id: pId,
        },
        attributes: ["stock"],
      });
      // console.log(theStock);

      if (productQuantity > theStock.stock) {
        throw new Error("Forbidden");
      }

      const newCart = {
        UserId: userId,
        //productQuantity: productQuantity,
      };

      const pnc = {
        ProductId: pId,
        CartId: userId,
        productQuantity: productQuantity,
      };

      let checkIfUserHasCartOrNot = await Cart.findOne({
        where: { UserId: userId },
      });
      //console.log(checkIfUserHasCartOrNot);
      if (!checkIfUserHasCartOrNot && !checkIfItIsExistingInCart) {
        await Cart.create(newCart);
        await ProductCart.create(pnc);
      } else if (!checkIfItIsExistingInCart && checkIfUserHasCartOrNot) {
        await ProductCart.create(pnc);
      }

      const product = await Product.findOne({
        where: {
          id: pId,
        },
      });

      res.status(201).json({
        msg: `product named ${product.name} successfully added to cart!`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async readCartByUserId(req, res, next) {
    try {
      const { userId } = req.loginInfo;
      const cart = await Cart.findOne({
        include: [{ model: Product }],
        where: {
          UserId: userId,
        },
      });

      if (!cart) {
        throw new Error("NotFound");
      }

      res.status(200).json(cart);
    } catch (error) {
      next(error);
    }
  }

  static async deleteProductInCartByProductId(req, res, next) {
    try {
      const { pId } = req.params;
      const { userId } = req.loginInfo;

      ProductCart.destroy({
        where: {
          ProductId: pId,
          CartId: userId,
        },
      });

      const product = await Product.findOne({
        where: {
          id: pId,
        },
      });

      res.status(200).json({
        message: `${product.name} success to delete from cart`,
      });
    } catch (error) {
      next(error);
    }
  }

  //ini untuk when transaction status udah paid
  static async deleteCartByUserId(req, res, next) {
    try {
      const { userId } = req.loginInfo;
      //const { pId } = req.params;

      let findCart = await ProductCart.findOne({
        where: {
          CartId: userId,
        },
      });

      if (!findCart) {
        throw new Error("Forbidden");
      }

      //DECREMENT THE STOCK OF THE PRODUCT THAT IS REMOVED FROM THE CART, AS IT IS PAID ALREADY
      let allProductInCartToDecrement = await ProductCart.findAll({
        where: {
          CartId: userId,
        },
        include: Product,
      });

      let updatedProduct = allProductInCartToDecrement.map((eachProduct) => {
        eachProduct.Product.stock = eachProduct.Product.stock - 1;
        return eachProduct.Product;
      });

      //update into Product table
      updatedProduct.forEach(async (eachProduct) => {
        let { id, stock } = eachProduct;
        await Product.update({ stock: stock }, { where: { id: id } });
      });

      await ProductCart.destroy({
        where: {
          CartId: userId,
        },
      });

      await Cart.destroy({
        where: {
          UserId: userId,
        },
      });

      res.status(200).json({
        message: `Cart for User with id ${userId} is deleted`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CartController;
