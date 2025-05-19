const db = require("../Database/connection");

const signalCallsDao = {
  add: (calls, isWorkTime) => {
    const secType = isWorkTime ? "shift_sec" : "day_sec";

    try {
      return db("signalCalls")
        .insert(calls)
        .onConflict(["signalId", "date"])
        .merge({
          [secType]: db.raw(`"signalCalls"."${secType}" + 3`),
        });
    } catch (error) {
      console.error("Error adding signal calls:", error);
      return null;
    }
  },
};

module.exports = signalCallsDao;
