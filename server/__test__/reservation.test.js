const request = require("supertest");
const app = require("../app");
const {
  sequelize,
  Reservation,
  Topic,
  Psychologist,
  User,
} = require("../models");
const { hash } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

let acc_token;
let topicId;
let psychologistId;

beforeAll(async () => {
  const userData = {
    username: "testuser",
    password: "test123",
    email: "testuser@example.com",
  };

  const user = await User.create(userData);
  const payload = {
    id: user.id,
    email: user.email,
  };
  acc_token = signToken(payload);

  const topicData = {
    topic_name: "Test Topic",
  };
  const createdTopic = await Topic.create(topicData);
  topicId = createdTopic.id;

  const psychologistData = {
    name: "Test Psychologist",
    specialization: "Test Specialization",
    hourly_rate: 100,
    availability: "Test Availability",
    email: "psychologist@example.com",
    photoImage: "test.jpg",
  };
  const createdPsychologist = await Psychologist.create(psychologistData);
  psychologistId = createdPsychologist.id;
});

afterAll(async () => {
  await Reservation.destroy({
    where: {},
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });

  await sequelize.close();
});

describe("POST /reservations", () => {
  describe("POST /reservations - succeed", () => {
    it("should create a new reservation", async () => {
      const body = {
        date: "2023-12-01",
        time: "09:00:00",
        duration: 2,
        session_count: 1,
        meetingType: "Test Meeting",
        description: "Test Description",
        topicId: topicId,
        psychologistId: psychologistId,
      };
      const response = await request(app)
        .post("/reservations")
        .send(body)
        .set("Authorization", `Bearer ${acc_token}`);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty(
        "message",
        "Reservation created successfully"
      );
      expect(response.body).toHaveProperty("reservation");
      expect(response.body.reservation).toHaveProperty("id");
      expect(response.body.reservation).toHaveProperty("date", "2023-12-01");
      // tambahkan expect lainnya sesuai dengan data yang diharapkan
    });
  });

  describe("POST /reservations - error", () => {
    it("should return an error for missing date", async () => {
      const body = {
        // date is missing
        time: "09:00:00",
        duration: 2,
        session_count: 1,
        meetingType: "Test Meeting",
        description: "Test Description",
        topicId: topicId,
        psychologistId: psychologistId,
      };
      const response = await request(app)
        .post("/reservations")
        .send(body)
        .set("Authorization", `Bearer ${acc_token}`);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        "message",
        "Date and time cannot be null"
      );
    });
  });
});
