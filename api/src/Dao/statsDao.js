const db = require("../Database/connection");

const statsDao = {
  getMachinesStats: (startDate, endDate) => {
    try {
      return db("machines as m")
        .select(
          "m.name",
          db.raw(`
          COALESCE(SUM(CASE WHEN s.name = 'running' THEN sc.count ELSE 0 END), 0) AS running
        `),
          db.raw(`  
          COALESCE(SUM(CASE WHEN s.name = 'idle' THEN sc.count ELSE 0 END), 0) AS idle
        `),
          db.raw(`
          COALESCE(SUM(CASE WHEN s.name = 'fault' THEN sc.count ELSE 0 END), 0) AS fault
        `)
        )
        .join("signals as s", "s.machineId", "m.id")
        .leftJoin("signalCalls as sc", (qb) =>
          qb
            .on("sc.signalId", "s.id")
            .andOnBetween("sc.date", [startDate, endDate])
        )
        .groupBy("m.name");
    } catch (error) {
      console.error("Error getting machines stats:", error);
      return [];
    }
  },
};

module.exports = statsDao;
