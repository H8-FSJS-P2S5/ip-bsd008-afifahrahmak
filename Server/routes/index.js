const express = require("express");
const router = express.Router();
const PubController = require("../controllers/pubController");
const UserController = require("../controllers/userController");
const CartController = require("../controllers/cartController");
const TransactionController = require("../controllers/transactionController");
const authentication = require("../middlewares/authentication");
const authorizationProduct = require("../middlewares/authorizationProduct");
const AuthController = require("../controllers/authController");

//PUBLIC (PRODUCT)
router.get("/productByCategoryId/:cId", PubController.readProductByCategoryId);
router.get("/productByProductId/:pId", PubController.readProductByProductId);
router.get("/product", PubController.readAllProduct);

//PUBLIC (CATEGORY)
router.get("/category", PubController.readAllCategory);

//PUBLIC
router.post("/login", PubController.login);
router.post("/google-login", AuthController.googleLogin);
router.post("/register", PubController.register);

router.use(authentication);
//Register, LogIn, Authentication (USER)
router.get("/user", UserController.readUserByUserId);
router.put("/user", UserController.editUserByUserId);

//Register, LogIn, Authentication (CART)
router.get("/cart", CartController.readCartByUserId);
router.post("/cart/:pId", CartController.addCart);

router.delete(
  "/cart/:pId",
  // authorizationProduct,
  CartController.deleteProductInCartByProductId
);

router.delete("/cart", CartController.deleteCartByUserId);

//Register, LogIn, Authentication (TRANSACTION)
router.post("/transaction", TransactionController.addTransactionByUserId);

router.post(
  "/generate-midtrans-token",
  TransactionController.generateMidtransToken
);

module.exports = router;
