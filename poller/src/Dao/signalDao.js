const db = require("../Database/connection");

const signalDao = {
  getAll: () => {
    try {
      return db("signals").select("*");
    } catch (error) {
      console.error("Error getting all signals:", error);
      return [];
    }
  },
};

module.exports = signalDao;
