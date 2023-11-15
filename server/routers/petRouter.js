const PetController = require("../controllers/petController")

const petRouter = require("express").Router()

petRouter.get("/", PetController.pets)
petRouter.get("/petFinder", PetController.petFinder)
petRouter.get("/petFinder/:id", PetController.petFinderById)

module.exports = petRouter