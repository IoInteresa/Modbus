const dayjs = require("dayjs");
const db = require("../Database/connection");

const plcDao = {
  getAll: () => {
    try {
      const currentDate = dayjs().toISOString();

      return db("plcs")
        .select("*")
        .whereNull("blockUntil")
        .orWhere("blockUntil", "<", currentDate);
    } catch (error) {
      console.error("Error getting all plcs:", error);
      return [];
    }
  },

  blockPlcs: (plcIds) => {
    try {
      const blockUntil = dayjs().add(20, "minute").toISOString();

      return db("plcs")
        .whereIn("id", plcIds)
        .update({ blockUntil });
    } catch (error) {
      console.error(`Error blocking plcs ${plcIds}:`, error);
      return null;
    }
  },
};

module.exports = plcDao;
