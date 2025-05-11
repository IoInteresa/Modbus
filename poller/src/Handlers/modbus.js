const ModbusTCP = require("jsmodbus");

const PLC_PORT = 502;

const connectToPLC = async (ip) => {
  try {
    const socket = new ModbusTCP.client.TCP();
    return socket.connect({ host: ip, port: PLC_PORT });
  } catch (error) {
    console.error(`Error connecting to PLC ${ip}: ${error.message}`);
    return null;
  }
};

const readPLCInputs = async (socket, startAddress = 0, count = 16) => {
  try {
    const result = await socket.readCoils(startAddress, count);
    return result.response.body.valuesAsArray;
  } catch (error) {
    console.error(`Error reading PLC inputs: ${error.message}`);
    return null;
  }
};

module.exports = { connectToPLC, readPLCInputs };