const db = require("../Database/connection");

const statsDao = {
  getMachinesStats: (startDate, endDate, workingType) => {
    try {
      const timeColumn =
        workingType === "shift" ? "sc.shift_sec" : "sc.shift_sec + sc.day_sec";

      return db("machines as m")
        .select(
          "m.name",
          db.raw(`
          COALESCE(SUM(CASE WHEN s.name = 'running' THEN ${timeColumn} ELSE 0 END), 0) AS running
        `),
          db.raw(`  
          COALESCE(SUM(CASE WHEN s.name = 'idle' THEN ${timeColumn} ELSE 0 END), 0) AS idle
        `),
          db.raw(`
          COALESCE(SUM(CASE WHEN s.name = 'fault' THEN ${timeColumn} ELSE 0 END), 0) AS fault
        `),
          db.raw(`
          COALESCE(SUM(CASE WHEN s.name = 'off' THEN ${timeColumn} ELSE 0 END), 0) AS off
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
