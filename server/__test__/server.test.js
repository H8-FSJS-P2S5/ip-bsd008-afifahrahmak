const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const JWTHelper = require("../helpers/jwt");
const BcryptHelper = require("../helpers/bcrypt");
const { getBMI, calcIdealRecipeFromBMI } = require("../helpers/dataAnalysis");

beforeAll(async () => {
    // up seeding
    let data = require("../data/users.json");
    data = data.map((d) => {
        d.password = BcryptHelper.hashPassword(d.password);
        d.createdAt = new Date();
        d.updatedAt = new Date();
        return d;
    });
    await sequelize.queryInterface.bulkInsert("Users", data);

    data = require("../data/recipes.json");
    data = data.map((d) => {
        d.createdAt = new Date();
        d.updatedAt = new Date();
        return d;
    });
    await sequelize.queryInterface.bulkInsert("Recipes", data);

    data = require("../data/nutrients.json");
    data = data.map((d) => {
        d.createdAt = new Date();
        d.updatedAt = new Date();
        return d;
    });
    await sequelize.queryInterface.bulkInsert("Nutrients", data);
});

afterAll(async () => {
    // down seeding
    await sequelize.queryInterface.bulkDelete("Users", null, {
        truncate: true,
        cascade: true,
        restartIdentity: true,
    });
    await sequelize.queryInterface.bulkDelete("Recipes", null, {
        truncate: true,
        cascade: true,
        restartIdentity: true,
    });
    await sequelize.queryInterface.bulkDelete("Nutrients", null, {
        truncate: true,
        cascade: true,
        restartIdentity: true,
    });
});

const token = JWTHelper.encode({ id: 1 });
const token2 = JWTHelper.encode({ id: 2 });

describe("CRUD Testing", () => {
    it("add recipe - success", async () => {
        const body = {
            name: "69",
            summary: "69",
            instructions: "69",
            imageUrl: "69",
            ingredients: "69",
            calories: 69,
            carbs: 69,
            protein: 69,
            fat: 69,
            sugar: 69,
            fiber: 69,
            sodium: 69,
            cholesterol: 69,
        };
        const response = await request(app)
            .post("/recipes")
            .set("authorization", `Bearer ${token}`)
            .send(body);

        expect(response.status).toBe(201);
        expect(response.body).toBeInstanceOf(Object);
    });

    it("should read all recipes correctly", async () => {
        const response = await request(app).get("/recipes").set("authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it("error read all recipes not logged in", async () => {
        const response = await request(app).get("/recipes");

        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
    });

    it("error read all recipes not logged in", async () => {
        const response = await request(app).get("/recipes").set("authorization", `Bearer re2wfewd`);

        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
    });

    it("should read recipe by id correctly", async () => {
        const response = await request(app)
            .get("/recipes/1")
            .set("authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    });

    it("error read recipe by id not found", async () => {
        const response = await request(app)
            .get("/recipes/100")
            .set("authorization", `Bearer ${token}`);

        expect(response.status).toBe(404);
        expect(response.body).toBeInstanceOf(Object);
    });

    it("error read recipe by id not logged in", async () => {
        const response = await request(app).get("/recipes/100");

        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
    });

    it("complete profile success", async () => {
        const body = { name: "andrew", gender: "Male", age: 34, height: 132, weight: 43 };
        const response = await request(app)
            .put("/complete-profile")
            .set("authorization", `Bearer ${token}`)
            .send(body);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    });

    it("complete profile invalid input", async () => {
        const body = { name: "andrew", gender: "Male", age: "string", height: 132, weight: 43 };
        const response = await request(app)
            .put("/complete-profile")
            .set("authorization", `Bearer ${token}`)
            .send(body);

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
    });

    it("complete profile invalid input 2", async () => {
        const body = { name: "andrew", gender: "Male", age: 20, height: 9999, weight: 43 };
        const response = await request(app)
            .put("/complete-profile")
            .set("authorization", `Bearer ${token}`)
            .send(body);

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
    });

    it("should delete a recipe based on id", async () => {
        const response = await request(app)
            .del("/recipes/1")
            .set("authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    });

    it("should delete a recipe based on id - 403 error", async () => {
        const response = await request(app)
            .del("/recipes/2")
            .set("authorization", `Bearer ${token2}`);

        expect(response.status).toBe(403);
        expect(response.body).toBeInstanceOf(Object);
    });

    it("error delete - not logged in", async () => {
        const response = await request(app).get("/recipes");

        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
    });

    it("get user info", async () => {
        const response = await request(app)
            .get("/user-info")
            .set("authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    });

    it("recommend recipe - success", async () => {
        const response = await request(app)
            .get("/recipes/recommend")
            .set("authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    });

    it("recommend recipe - error empty user data", async () => {
        const response = await request(app)
            .get("/recipes/recommend")
            .set("authorization", `Bearer ${token2}`);

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
    });

    // WARNING: turn this test off if possible. It eats up my API quota.
    // YOU HAVE BEEN WARNED.
    it("search query", async () => {
        const response = await request(app)
            .get("/recipes/api-search?search=egg")
            .set("authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    });
});

describe("helpers testing", () => {
    it("data analysis", async () => {
        const result = await getBMI({ id: 1, height: 150, weight: 50, age: 20 });
        expect(result).toBeInstanceOf(Object);
    });

    it("bmi", () => {
        const result = calcIdealRecipeFromBMI({ id: 1, height: 150, weight: 50, age: 20 }, [
            {
                calories: 543.36,
                fat: 16.2,
                carbs: 83.7,
                sugar: 5.32,
                cholesterol: 20.47,
                sodium: 413.23,
                protein: 16.84,
                fiber: 6.73,
                recipeId: 1,
            },
            {
                calories: 591.44,
                fat: 13.42,
                carbs: 69.02,
                sugar: 2.54,
                cholesterol: 97.97,
                sodium: 231.04,
                protein: 44.9,
                fiber: 2.94,
                recipeId: 2,
            },
            {
                calories: 190.68,
                fat: 5.25,
                carbs: 16.89,
                sugar: 3.01,
                cholesterol: 31.18,
                sodium: 477.75,
                protein: 18.46,
                fiber: 5.85,
                recipeId: 3,
            },
        ]);

        expect(result).toBeInstanceOf(Object);
    });
});
