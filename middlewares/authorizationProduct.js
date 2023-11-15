//Only for DeleteCartByProductId
const { Product } = require("../models");

const authorizationProduct = async (req, res, next) => {
  try {
    const { userId } = req.loginInfo;
    const { id } = req.params;

    const product = await Product.findByPk(id);
    if (!product) {
      throw new Error("NotFound");
    }

    if (userId !== product.authorId) {
      throw new Error("Forbidden");
    }
    next();
  } catch (error) {
    //console.log(error);
    next(error);
  }
};

module.exports = authorizationProduct;
