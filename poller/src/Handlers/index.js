const { connectAndGetInputs, getDiscreteInputsRange } = require("./modbus");
const { getUTC5Date } = require("./time");

module.exports = {
  connectAndGetInputs,
  getDiscreteInputsRange,
  getUTC5Date,
};
