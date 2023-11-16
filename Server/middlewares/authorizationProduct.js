//Only for DeleteProductInCartByProductId
const { Product, ProductCart } = require("../models");

const authorizationProduct = async (req, res, next) => {
  try {
    const { userId } = req.loginInfo;
    const { pId } = req.params;

    const product = await Product.findOne({
      where: {
        id: pId,
      },
    });
    if (!product) {
      throw new Error("NotFound");
    }

    //check ada ga productnya di cart
    const productcart = await ProductCart.findOne({
      where: {
        ProductId: pId,
        CartId: userId,
      },
    });

    //kalo ga ada
    if (!productcart) {
      throw new Error("Forbidden");
    }

    next();
  } catch (error) {
    //console.log(error);
    next(error);
  }
};

module.exports = authorizationProduct;
