const statsDao = require("../Dao/statsDao");

const getMachinesStats = async (req, res) => {
  try {
    if (!req.body || !req.body.startDate || !req.body.endDate) {
      console.error("Missing start or end date");

      res.status(400).json({ message: "Missing start or end date" });
      return;
    }

    const { startDate, endDate } = req.body;

    const stats = await statsDao.getMachinesStats(startDate, endDate);

    res.json(stats);
  } catch (error) {
    console.error("Error getting machines stats:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = getMachinesStats;
