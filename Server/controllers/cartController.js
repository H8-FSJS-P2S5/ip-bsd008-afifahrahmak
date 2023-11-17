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

      const checkCartId = await Cart.findOne({
        where: {
          UserId: userId,
        },
        attributes: ["id"],
      });

      let checkIfItIsExistingInCart;
      if (checkCartId) {
        //ga boleh masuk product yang sama dicart
        checkIfItIsExistingInCart = await ProductCart.findOne({
          where: {
            ProductId: pId,
            CartId: checkCartId.id,
          },
        });
      }

      //if product quantity inputted > stock, throw new error forbidden
      const theStock = await Product.findOne({
        where: {
          id: pId,
        },
        attributes: ["stock"],
      });
      // console.log(theStock);

      let pQ = productQuantity;
      if (pQ > theStock.stock) {
        throw new Error("Forbidden");
      }

      if (!pQ) {
        pQ = 1;
      }
      const newCart = {
        UserId: userId,
        //productQuantity: productQuantity,
      };

      let checkIfUserHasCartOrNot = await Cart.findOne({
        where: { UserId: userId },
      });
      //console.log(checkIfUserHasCartOrNot);
      if (!checkIfUserHasCartOrNot && !checkIfItIsExistingInCart) {
        await Cart.create(newCart);

        let theid = await Cart.findOne({
          where: {
            UserId: userId,
          },
          attributes: ["id"],
        });

        const pnc = {
          ProductId: pId,
          CartId: theid.id,
          productQuantity: pQ,
        };

        await ProductCart.create(pnc);
      } else if (!checkIfItIsExistingInCart && checkIfUserHasCartOrNot) {
        let theid = await Cart.findOne({
          where: {
            UserId: userId,
          },
          attributes: ["id"],
        });

        const pnc = {
          ProductId: pId,
          CartId: theid.id,
          productQuantity: pQ,
        };

        await ProductCart.create(pnc);
      }

      if (checkIfItIsExistingInCart) {
        await ProductCart.update(
          { productQuantity: pQ },
          { where: { ProductId: pId, CartId: checkCartId.id } }
        );
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

      const checkCartId = await Cart.findOne({
        where: {
          UserId: userId,
        },
        attributes: ["id"],
      });

      ProductCart.destroy({
        where: {
          ProductId: pId,
          CartId: checkCartId.id,
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

      await Transaction.update({ isPaid: true }, { where: { UserId: userId } });

      const checkCartId = await Cart.findOne({
        where: {
          UserId: userId,
        },
        attributes: ["id"],
      });

      let findCart = await ProductCart.findOne({
        where: {
          CartId: checkCartId.id,
        },
      });

      if (!findCart) {
        throw new Error("Forbidden");
      }

      //DECREMENT THE STOCK OF THE PRODUCT THAT IS REMOVED FROM THE CART, AS IT IS PAID ALREADY
      let allProductInCartToDecrement = await ProductCart.findAll({
        where: {
          CartId: checkCartId.id,
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
          CartId: checkCartId.id,
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
