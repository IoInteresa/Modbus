const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");

dayjs.extend(utc);
dayjs.extend(timezone);

const dayInUTC5 = dayjs().tz("Asia/Yekaterinburg").format("YYYY-MM-DD");

module.exports = {
  dayInUTC5,
};
