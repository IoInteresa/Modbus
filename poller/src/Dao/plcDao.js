const db = require("../Database/connection");

const plcDao = {
  getAll: () => {
    try {
      return db("plcs").select("*");
    } catch (error) {
      console.error("Error getting all plcs:", error);
      return [];
    }
  },
};

module.exports = plcDao;
