const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");

const { createApp, COLLECTIONS } = require("../app");

// A collection that returns the documents it was given.
const fakeDb = (documents = {}) => (name) => ({
  find: () => ({ toArray: async () => documents[name] || [] }),
});

test("lists the four collections", () => {
  assert.deepEqual(COLLECTIONS, ["activity", "body", "daily", "sleep"]);
});

test("GET /api/activity returns the activity documents", async () => {
  const app = createApp(fakeDb({ activity: [{ steps: 100 }] }));
  const res = await request(app).get("/api/activity");
  assert.equal(res.status, 200);
  assert.deepEqual(res.body, [{ steps: 100 }]);
});

test("GET /api/body returns the body documents", async () => {
  const app = createApp(fakeDb({ body: [{ id: 1 }, { id: 2 }] }));
  const res = await request(app).get("/api/body");
  assert.equal(res.status, 200);
  assert.equal(res.body.length, 2);
});

test("GET /api/daily returns the daily documents", async () => {
  const app = createApp(fakeDb({ daily: [{ id: 1 }, { id: 2 }] }));
  const res = await request(app).get("/api/daily");
  assert.equal(res.status, 200);
  assert.equal(res.body.length, 2);
});

test("GET /api/sleep returns the sleep documents", async () => {
  const app = createApp(fakeDb({ sleep: [{ id: 1 }, { id: 2 }] }));
  const res = await request(app).get("/api/sleep");
  assert.equal(res.status, 200);
  assert.equal(res.body.length, 2);
});

test("an empty collection gives an empty list", async () => {
  const res = await request(createApp(fakeDb())).get("/api/sleep");
  assert.deepEqual(res.body, []);
});

test("each route only returns its own collection", async () => {
  const app = createApp(fakeDb({ activity: [{ a: 1 }], body: [{ b: 1 }] }));
  assert.deepEqual((await request(app).get("/api/body")).body, [{ b: 1 }]);
});

test("database errors give a 500", async () => {
  const broken = () => ({ find: () => ({ toArray: async () => { throw new Error("down"); } }) });
  const originalError = console.error;
  console.error = () => {};
  const res = await request(createApp(broken)).get("/api/daily");
  console.error = originalError;
  assert.equal(res.status, 500);
  assert.equal(res.text, "Internal Server Error");
});

test("unknown routes give a 404", async () => {
  const res = await request(createApp(fakeDb())).get("/api/unknown");
  assert.equal(res.status, 404);
});

test("cross origin requests are allowed", async () => {
  const res = await request(createApp(fakeDb())).get("/api/body").set("Origin", "http://localhost:3000");
  assert.equal(res.headers["access-control-allow-origin"], "*");
});
