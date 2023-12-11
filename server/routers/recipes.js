const Controller = require("../controllers/Controller");
const Auth = require("../middlewares/auth");
const router = require("express").Router();

router.get("/", Controller.getRecipes);
router.post("/", Controller.addRecipe);
router.get("/api-search", Controller.searchRecipe);
router.get("/recommend", Controller.recommendRecipe);
router.get("/:id", Controller.getRecipesById);
router.delete("/:id", Auth.authorise, Controller.deleteRecipe);

module.exports = router;
