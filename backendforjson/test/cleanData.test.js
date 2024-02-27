const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");

const { createApp, buildCleanData, projections } = require("../cleanData");

// A database whose collections return fixed documents and remember the options they were called with.
function fakeDb(documents) {
  const calls = [];
  return {
    calls,
    collection: (name) => ({
      findOne: async (query, options) => {
        calls.push({ name, query, options });
        return documents[name] || null;
      },
    }),
  };
}

test("projections cover the four collections in order", () => {
  assert.deepEqual(projections.map(([name]) => name), ["daily", "activity", "body", "sleep"]);
});

test("every projection keeps only fields to include", () => {
  for (const [, fields] of projections) {
    assert.ok(Object.values(fields).every((value) => value === 1));
  }
});

test("the _id field is always excluded", async () => {
  const db = fakeDb({});
  await buildCleanData(db);
  assert.ok(db.calls.every((call) => call.options.projection._id === 0));
});

test("one document is read from every collection", async () => {
  const db = fakeDb({});
  await buildCleanData(db);
  assert.deepEqual(db.calls.map((call) => call.name), ["daily", "activity", "body", "sleep"]);
});

test("documents are merged into one object", async () => {
  const merged = await buildCleanData(fakeDb({ daily: { a: 1 }, body: { b: 2 } }));
  assert.deepEqual(merged, { a: 1, b: 2 });
});

test("a later collection wins when keys overlap", async () => {
  const merged = await buildCleanData(fakeDb({ daily: { shared: "daily" }, activity: { shared: "activity" } }));
  assert.equal(merged.shared, "activity");
});

test("missing documents are skipped", async () => {
  assert.deepEqual(await buildCleanData(fakeDb({})), {});
});

test("GET /api/cleanData returns the merged object", async () => {
  const res = await request(createApp(fakeDb({ daily: { a: 1 }, sleep: { s: 3 } }))).get("/api/cleanData");
  assert.equal(res.status, 200);
  assert.deepEqual(res.body, { a: 1, s: 3 });
});
