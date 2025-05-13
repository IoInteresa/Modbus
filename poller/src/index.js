const dayjs = require("dayjs");

const { plcDao, signalDao, signalCallsDao } = require("./Dao");
const { connectAndGetInputs } = require("./Handlers");

const start = async () => {
  try {
    const [plcs, signals] = await Promise.all([
      plcDao.getAll(),
      signalDao.getAll(),
    ]);

    const today = dayjs().format("YYYY-MM-DD");
    const signalCalls = [];

    const plcInputsPromises = plcs.map((plc) => connectAndGetInputs(plc));
    const plcInputsArray = await Promise.all(plcInputsPromises);

    for (let i = 0; i < plcs.length; i++) {
      const plcInputs = plcInputsArray[i];

      for (const [index, value] of plcInputs.entries()) {
        // отклоняем неактивные сигналы
        if (!value) continue;

        const signal = signals.find(
          (s) => s.plcId === plcs[i].id && s.plcInput === index + 1
        );

        // Данный сигнал не прослушиваем
        if (!signal) continue;

        signalCalls.push({
          signalId: signal.id,
          date: today,
        });
      }
    }

    if (!signalCalls.length) return;

    await signalCallsDao.add(signalCalls);
  } catch (error) {
    console.error("Error in start function:", error);
  }
};

const runStrictInterval = async () => {
  const startTime = Date.now();

  await start();

  const elapsed = Date.now() - startTime;
  const delay = Math.max(0, 1000 - elapsed);

  setTimeout(runStrictInterval, delay);
};

runStrictInterval();

process.on("SIGINT", () => {
  process.exit(0);
});
