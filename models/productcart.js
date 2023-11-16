"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductCart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductCart.belongsTo(models.Product, { foreignKey: "ProductId" });
      ProductCart.belongsTo(models.Cart, { foreignKey: "CartId" });
    }
  }
  ProductCart.init(
    {
      ProductId: DataTypes.INTEGER,
      CartId: DataTypes.INTEGER,
      productQuantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ProductCart",
    }
  );
  return ProductCart;
};
