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
