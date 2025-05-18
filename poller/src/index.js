const { plcDao, signalDao, signalCallsDao } = require("./Dao");
const {
  connectAndGetInputs,
  getDiscreteInputsRange,
  getUTC5Date,
} = require("./Handlers");

const start = async () => {
  try {
    const [plcs, signals] = await Promise.all([
      plcDao.getAll(),
      signalDao.getAll(),
    ]);

    if (!plcs.length || !signals.length) return;

    const signalCalls = [];

    const plcInputJobs = plcs.map((plc) => {
      const address = getDiscreteInputsRange(plc.id, signals);

      return {
        plc,
        address,
        promise: connectAndGetInputs(plc, address),
      };
    });

    const plcInputsArray = await Promise.all(
      plcInputJobs.map((job) => job.promise)
    );

    for (let i = 0; i < plcInputJobs.length; i++) {
      const { plc, address } = plcInputJobs[i];
      const plcInputs = plcInputsArray[i];

      if (!plcInputs.length) continue;

      // Фильтруем сигналы, оставляя только те, которые принадлежат данному plc и к инпут выводу
      // кейс 3088, 3089, 3091, 3092 - 3090 не обрабатывается
      const inputMap = signals.reduce((map, signal) => {
        if (signal.plcId === plc.id) {
          map[signal.plcInput - address.start] = signal;
        }

        return map;
      }, {});

      for (const [index, value] of plcInputs.entries()) {
        // отклоняем неактивные сигналы
        if (!value) continue;

        const signal = inputMap[index];

        // Данный сигнал(вход) не прослушиваем
        if (!signal) continue;

        signalCalls.push({
          signalId: signal.id,
          date: getUTC5Date(),
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
  const delay = Math.max(0, 3000 - elapsed);

  setTimeout(runStrictInterval, delay);
};

runStrictInterval();

process.on("SIGINT", () => {
  process.exit(0);
});
