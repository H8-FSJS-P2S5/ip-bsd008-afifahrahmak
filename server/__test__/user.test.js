const request = require("supertest");
const app = require("../app");
const { hash } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;

let acc_token;

beforeAll(async () => {
  const data = require("../data/users.json");

  let userData = data.map((el) => {
    delete el.id;
    el.password = hash(el.password);
    el.createdAt = el.updatedAt = new Date();
    return el;
  });

  await queryInterface.bulkInsert("Profiles", userData, {});

  const payload = {
    id: 1,
    email: "test123@gmail.com",
  };

  acc_token = signToken(payload);
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("POST /login", () => {
  describe("POST /login -succeed", () => {
    it("shuold be return an access token", async () => {
      const body = {
        email: "test123@gmail.com",
        password: "test123",
      };
      const response = await request(app).post("/login").send(body);
      console.log(response.body);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("access_token", expect.any(String));
      console.log(response.body);
    });
  });
  describe("POST /login -error", () => {
    it("shuold be return an message", async () => {
      const body = {
        email: "",
        password: "123456",
      };
      const response = await request(app).post("/login").send(body);
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", expect.any(String));
      console.log(response.body);
    });

    it("shuold be return an message", async () => {
      const body = {
        email: "test123",
        password: "123456789",
      };
      const response = await request(app).post("/login").send(body);
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", expect.any(String));
      console.log(response.body);
    });

    it("shuold be return an message", async () => {
      const body = {
        email: "test123@mail.com",
        password: "",
      };
      const response = await request(app).post("/login").send(body);
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", expect.any(String));
      console.log(response.body);
    });

    it("shuold be return an message", async () => {
      const body = {
        email: "dapid@mail.com",
        password: "bdas",
      };
      const response = await request(app).post("/login").send(body);
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", expect.any(String));
      console.log(response.body);
    });
  });
});

// register
describe("POST /register", () => {
  describe("POST /register - succeed", () => {
    it("should be return a success message", async () => {
      const body = {
        username: "untuktesting",
        password: "test12345",
        email: "testing@mail.com",
      };
      const response = await request(app)
        .post("/register")
        .send(body)
        .set("Authorization", `Bearer ${acc_token}`);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });
  describe("POST /register - error", () => {
    it("should be return a error message for username", async () => {
      const body = {
        username: "",
        password: "123456",
        email: "testing1@mail.com",
      };

      const response = await request(app)
        .post("/register")
        .send(body)
        .set("Authorization", `Bearer ${acc_token}`);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", expect.any(String));
      console.log(response.body);
    });

    it("should be return a error message for password", async () => {
      const body = {
        username: "untuktesting1",
        password: "",
        email: "testing2@mail.com",
      };

      const response = await request(app)
        .post("/register")
        .send(body)
        .set("Authorization", `Bearer ${acc_token}`);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", expect.any(String));
      console.log(response.body);
    });

    it("should be return a error message for password", async () => {
      const body = {
        username: "untuktesting3",
        password: null,
        email: "testing3@mail.com",
      };

      const response = await request(app)
        .post("/register")
        .send(body)
        .set("Authorization", `Bearer ${acc_token}`);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", expect.any(String));
      console.log(response.body);
    });

    it("should be return a error message for email", async () => {
      const body = {
        username: "untuktesting4",
        password: 123456,
        email: "",
      };

      const response = await request(app)
        .post("/register")
        .send(body)
        .set("Authorization", `Bearer ${acc_token}`);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", expect.any(String));
      console.log(response.body);
    });

    it("should be return a error message for email", async () => {
      const body = {
        username: "testing",
        email: "testing@mail.com",
        password: "123456",
      };

      const response = await request(app)
        .post("/register")
        .send(body)
        .set("Authorization", `Bearer ${acc_token}`);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message", expect.any(String));
      console.log(response.body);
    });

    it("should be return a error message for email", async () => {
      const body = {
        username: "testing1",
        email: "testing",
        password: "123456",
      };

      const response = await request(app)
        .post("/register")
        .send(body)
        .set("Authorization", `Bearer ${acc_token}`);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", expect.any(String));
      console.log(response.body);
    });

    it("should be return a error message unauthorized", async () => {
      const body = {
        username: "testing",
        email: "testing",
        password: "123456",
      };

      const response = await request(app).post("/register").send(body);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message", expect.any(String));
      console.log(response.body);
    });

    it("should be return a error message for vrified", async () => {
      const body = {
        username: "testing",
        email: "testing",
        password: "123456",
      };

      const response = await request(app)
        .post("/register")
        .send(body)
        .set(
          "Authorization",
          `Bearer ndkjaslnffmloioj;q,frqfc.xqfmcwpqjfpo,oqc.`
        );

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message", expect.any(String));
      console.log(response.body);
    });
  });
});
