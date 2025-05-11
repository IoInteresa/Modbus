import {
  startOfDay,
  startOfWeek,
  startOfMonth,
  startOfYear
} from 'date-fns'

const getDateRanges = () => {
  const now = new Date();

  const localeOptions = { weekStartsOn: 1 };

  return {
    day: [
      startOfDay(now),
      now,
    ],
    week: [
      startOfWeek(now, localeOptions),
      now,
    ],
    month: [
      startOfMonth(now),
      now,
    ],
    year: [
      startOfYear(now),
      now,
    ],
  };
}

export default getDateRanges;