import humanizeDuration from "humanize-duration";

const formatSecondsToTime = (totalSeconds) => {
  if (!totalSeconds) {
    return "0 секунд";
  }

  return humanizeDuration(totalSeconds * 1000, {
    language: "ru",
    largest: 4,
    round: true,
    delimiter: " ",
    units: ["y", "mo", "d", "h", "m", "s"],
    fallbacks: ["ru"],
  });
};

export default formatSecondsToTime;