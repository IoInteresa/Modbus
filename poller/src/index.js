process.env.TZ = 'Asia/Yekaterinburg';

const dayjs = require("dayjs");

const { plcDao, signalDao, signalCallsDao } = require("./Dao");
const { connectAndGetInputs } = require("./Handlers");

const start = async () => {
  try {
    const [plcs, signals] = await Promise.all([
      plcDao.getAll(),
      signalDao.getAll(),
    ]);

    if (!plcs.length || !signals.length) return;

    const signalCalls = [];
    const plcIdsToBlock = [];
    const today = dayjs().format("YYYY-MM-DD");

    const plcInputsPromises = plcs.map((plc) => connectAndGetInputs(plc));
    const plcInputsArray = await Promise.all(plcInputsPromises);

    for (let i = 0; i < plcs.length; i++) {
      const plcInputs = plcInputsArray[i];

      // не удалось подключиться к plc
      if (!plcInputs) {
        plcIdsToBlock.push(plcs[i].id);
        continue;
      }

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

    const actionsPromises = [];

    if (plcIdsToBlock.length) {
      actionsPromises.push(plcDao.blockPlcs(plcIdsToBlock));
    }

    if (signalCalls.length) {
      actionsPromises.push(signalCallsDao.add(signalCalls));
    }

    await Promise.all(actionsPromises);
  } catch (error) {
    console.error("Error in start function:", error);
  }
};

const runStrictInterval = async () => {
  const startTime = Date.now();

  await start();

  const elapsed = Date.now() - startTime;
  const delay = Math.max(0, 3000 - elapsed);

  setTimeout(runStrictInterval, delay);
};

runStrictInterval();

process.on("SIGINT", () => {
  process.exit(0);
});
