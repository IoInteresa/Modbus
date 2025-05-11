const PERIODS = {
  day: {
    label: "Сегодня",
    value: "day",
    disabled: false,
  },
  week: {
    label: "Текущая неделя",
    value: "week",
    disabled: false,
  },
  month: {
    label: "Текущий месяц",
    value: "month",
    disabled: false,
  },
  year: {
    label: "Текущий год",
    value: "year",
    disabled: false,
  },
  custom: {
    label: "Произвольная дата",
    value: "custom",
    disabled: true,
  },
};

const TIME_UNITS = {
  Секунды: 1,
  Минуты: 60,
  Часы: 3600,
  Дни: 86400
};

export { PERIODS, TIME_UNITS };
