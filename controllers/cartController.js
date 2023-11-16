const { Op } = require("sequelize");
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
      const { id } = req.params;
      const { userId } = req.loginInfo;
      const { productQuantity } = req.body;

      const newCart = {
        UserId: userId,
        //productQuantity: productQuantity,
      };

      const pnc = {
        ProductId: id,
        CartId: sequelize.literal(
          `SELECT id FROM Carts WHERE userId = ${userId}`
        ),
        productQuantity: productQuantity,
      };

      let cart;
      let checkIfUserHasCartOrNot = Cart.findByPk(userId);
      if (!checkIfUserHasCartOrNot) {
        await Cart.create(newCart);
        await ProductCart.create(pnc);
      } else {
        await ProductCart.create(pnc);
      }

      const product = await Product.findOne({
        where: {
          id,
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
        include: { Product },
        where: {
          userId,
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
          CartId: sequelize.literal(
            `SELECT id FROM Carts WHERE userId = ${userId}`
          ),
        },
      });

      const product = await Product.findOne({
        where: {
          pId,
        },
      });

      res.status(200).json({
        message: `${product.name} success to delete from cart`,
        product,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCartByUserId(req, res, next) {
    try {
      const { userId } = req.loginInfo;
      const { pId } = req.params;

      let allProductInCartToDecrement = Product.findAll({
        where: {
          id: {
            [Op.in]: sequelize.literal(
              `SELECT id FROM ProductCart WHERE CartId = ${userId}`
            ),
          },
        },
      });

      ProductCart.destroy({
        where: {
          productId: pId,
          cartId: sequelize.literal(
            `SELECT id FROM Carts WHERE userId = ${userId}`
          ),
        },
      });

      allProductInCartToDecrement.forEach(async (decrementEachProduct) => {
        if (!(decrementEachProduct.id <= 0)) {
          await decrementEachProduct.decrement("id", {
            by: 1,
          });
        }
      });

      await Cart.destroy({
        where: {
          userId,
        },
      });

      const product = await Product.findOne({
        where: {
          pId,
        },
      });

      res.status(200).json({
        message: `${product.name} success to delete from cart`,
        product,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CartController;
