const db = require("../Database/connection");

const signalCallsDao = {
  add: (calls) => {
    try {
      return db("signalCalls")
        .insert(calls)
        .onConflict(["signalId", "date"])
        .merge({
          count: db.raw('"signalCalls"."count" + 3'),
        });
    } catch (error) {
      console.error("Error adding signal calls:", error);
      return null;
    }
  },
};

module.exports = signalCallsDao;
