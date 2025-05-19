const net = require("net");
const ModbusTCP = require("jsmodbus");

const connectAndGetInputs = (plc, address) => {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    const client = new ModbusTCP.client.TCP(socket);

    socket.on("connect", () => {
      client
      .readDiscreteInputs(address.start, address.count)
      .then((resp) => {
        resolve(resp.response._body.valuesAsArray);
      })
      .catch((err) => {
        console.error("Error reading PLC inputs:", err.message);
        resolve([]);
      })
      .finally(() => {
          socket.end();
        });
    });

    socket.on("error", (err) => {
      resolve([]);
      socket.destroy();
    });

    socket.on("timeout", () => {
      resolve([]);
      socket.destroy();
    });

    socket.connect({ host: plc.ip, port: plc.port });

    socket.setNoDelay(true);
    socket.setKeepAlive(false);

    socket.setTimeout(2200);
  });
};


const getDiscreteInputsRange = (plcId, signals) => {
  const inputs = signals
    .filter((signal) => signal.plcId === plcId)
    .map((signal) => signal.plcInput);

  const min = Math.min(...inputs);
  const max = Math.max(...inputs);

  return {
    start: min,
    count: max - min + 1,
  };
};

module.exports = { connectAndGetInputs, getDiscreteInputsRange };
