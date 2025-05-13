const net = require("net");
const ModbusTCP = require("jsmodbus");

const connectAndGetInputs = (plc) => {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    const client = new ModbusTCP.client.TCP(socket);

    socket.on("connect", () => {
      client
        .readDiscreteInputs(0, 6)
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
      // Не логирую — нет смысла вне рабочего времени.
      resolve([]);
    });

    socket.connect({
      host: plc.ip,
      port: plc.port
    });
  });
};

module.exports = { connectAndGetInputs };
