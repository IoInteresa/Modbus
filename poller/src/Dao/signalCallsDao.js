const db = require("../Database/connection");

const signalCallsDao = {
  add: (calls) => {
    try {
      return db("signalCalls")
        .insert(calls)
        .onConflict(["signalId", "date"])
        .merge({
          count: db.raw('"signalCalls"."count" + 1'),
        });
    } catch (error) {
      console.error("Error adding signal calls:", error);
      return false;
    }
  },
};

module.exports = signalCallsDao;
