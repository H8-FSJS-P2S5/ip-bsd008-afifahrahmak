const express = require("express");
const router = express.Router();
const PubController = require("../controllers/pubController");
const UserController = require("../controllers/userController");
const CartController = require("../controllers/cartController");
const TransactionController = require("../controllers/transactionController");
const authentication = require("../middlewares/authentication");

//PUBLIC (PRODUCT)
router.get("/product/:cId", PubController.readProductByCategoryId);
router.get("/product/:pId", PubController.readProductByProductId);
router.get("/product", PubController.readAllProduct);

//PUBLIC (CATEGORY)
router.get("/category", PubController.readAllCategory);

//PUBLIC
router.post("/login", PubController.login);
router.post("/register", PubController.register);

router.use(authentication);
//Register, LogIn, Authentication (USER)
router.get("/user", UserController.readUserByUserId);
router.put("/user", UserController.editUserByUserId);

//Register, LogIn, Authentication (CART)
router.post("/cart/:pId", CartController.addCart);
router.get("/cart", CartController.readCartByUserId);

router.delete(
  "/cart:pId",
  authorizationUser,
  CartController.deleteProductInCartByProductId
);

router.delete("/cart", CartController.deleteCartByUserId);

//Register, LogIn, Authentication (TRANSACTION)
router.post("/transaction", TransactionController.addTransactionByUserId);

module.exports = router;
