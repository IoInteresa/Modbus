const HOUR_IN_MILLISECONDS = 60 * 60 * 1000;

const getUTC5Date = () => {
  const nowUtc = new Date();
  const utc5 = new Date(nowUtc.getTime() + 5 * HOUR_IN_MILLISECONDS);

  return utc5.toISOString().split("T")[0];
};

module.exports = {
  getUTC5Date,
};
