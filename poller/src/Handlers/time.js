const HOUR_IN_MILLISECONDS = 60 * 60 * 1000;

const getUTC5DateAndIsWorkTime = () => {
  const nowUtc = new Date();
  const utc5 = new Date(nowUtc.getTime() + 5 * HOUR_IN_MILLISECONDS);

  const hours = utc5.getUTCHours();
  const minutes = utc5.getUTCMinutes();

  const isWorkTime =
    (hours > 8 || (hours === 8 && minutes >= 30)) &&
    (hours < 17 || (hours === 17 && minutes <= 30));

  const date = utc5.toISOString().split("T")[0];

  return { date, isWorkTime };
};

module.exports = {
  getUTC5DateAndIsWorkTime,
};
