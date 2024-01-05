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
