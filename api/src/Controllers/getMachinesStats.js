const statsDao = require("../Dao/statsDao");

const getMachinesStats = async (req, res) => {
  try {
    if (!req.body || !req.body.dateRange || !req.body.workingType) {
      console.error("Missing date range or working type");

      res.status(400).json({ message: "Missing date range or working type" });
      return;
    }

    const {
      dateRange: { startDate, endDate },
      workingType,
    } = req.body;

    const stats = await statsDao.getMachinesStats(
      startDate,
      endDate,
      workingType
    );

    res.json(stats);
  } catch (error) {
    console.error("Error getting machines stats:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = getMachinesStats;
