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
          resolve(false);
        })
        .finally(() => {
          socket.end();
        });
    });

    socket.on("error", (err) => {
      resolve(false);
      socket.destroy();
    });

    socket.on("timeout", () => {
      resolve(false);
      socket.destroy();
    });

    socket.connect({ host: plc.ip, port: plc.port });

    socket.setNoDelay(true);
    socket.setKeepAlive(false);

    socket.setTimeout(2500);
  });
};

module.exports = { connectAndGetInputs };
