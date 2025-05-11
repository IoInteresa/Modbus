const dayjs = require("dayjs");

const { plcDao, signalDao, signalCallsDao } = require("./Dao");
const { connectToPLC, readPLCInputs } = require("./Handlers");

const start = async () => {
  try {
    const plcs = await plcDao.getAll();
    const signals = await signalDao.getAll();

    const today = dayjs().format("YYYY-MM-DD");
    const signalCalls = [];

    for (const plc of plcs) {
      const socket = await connectToPLC(plc.ip);
      if (!socket) {
        console.error(`PLC ${plc.ip} is not available`);
        continue;
      }

      try {
        const plcInputs = await readPLCInputs(socket);
        if (!plcInputs) {
          console.error(`PLC ${plc.ip} is not available`);
          continue;
        }

        for (const [index, value] of plcInputs.entries()) {
          if (!value) continue; // отклоняем неактивные сигналы

          const signal = signals.find(
            (s) => s.plcId === plc.id && s.plcInput === index + 1
          );

          if (!signal) continue; // Данный сигнал не прослушиваем

          signalCalls.push({
            signalId: signal.id,
            date: today,
          });
        }
      } catch (error) {
        console.error("Error reading PLC inputs:", error);
      } finally {
        socket.close();
      }
    }

    if (signalCalls.length) {
      await signalCallsDao.add(signalCalls);
    }
  } catch (error) {
    console.error("Error in start function:", error);
  }
};

const runWithRetry = async () => {
  try {
    await start();
  } catch (error) {
    setTimeout(runWithRetry, 5000);
    console.error("Error in runWithRetry function:", error);
  }
};

const interval = setInterval(runWithRetry, 1000);

process.on("SIGINT", () => {
  clearInterval(interval);
  process.exit(0);
});
