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
