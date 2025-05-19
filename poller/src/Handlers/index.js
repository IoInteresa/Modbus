const { connectAndGetInputs, getDiscreteInputsRange } = require("./modbus");
const { getUTC5DateAndIsWorkTime } = require("./time");

module.exports = {
  connectAndGetInputs,
  getDiscreteInputsRange,
  getUTC5DateAndIsWorkTime,
};
