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
router.get("/user/:id", UserController.readUserByUserId);
router.put("/user/:id", UserController.editUserByUserId);

//Register, LogIn, Authentication (CART)
router.post("/cart", CartController.addCart);
router.get("/cart/:id", CartController.readCartByUserId);

router.delete(
  "/cart:pId",
  authorizationUser,
  CartController.deleteCartByProductId
);

router.delete("/cart/:id", CartController.deleteCartByUserId);

//Register, LogIn, Authentication (TRANSACTION)
router.post("/transaction/:id", TransactionController.addTransactionByUserId);

module.exports = router;
