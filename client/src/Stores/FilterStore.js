import { makeObservable, observable, action, reaction } from "mobx";

import { PERIODS } from "../Consts";
import { getDateRanges } from "../Utils";

class FilterStore {
  selectedPeriod = PERIODS.day.value;
  dateRange = {
    startDate: new Date(),
    endDate: new Date(),
  };

  constructor() {
    makeObservable(this, {
      selectedPeriod: observable,
      dateRange: observable,

      setSelectedPeriod: action,
      setDateRange: action,
      handleDateChange: action,
      findMatchedPeriod: action,
    });

    reaction(
      () => this.selectedPeriod,
      () => {
        if (this.selectedPeriod === PERIODS.custom.value) return;

        const ranges = getDateRanges();
        const periodRanges = ranges[this.selectedPeriod];

        this.setDateRange({
          startDate: periodRanges[0],
          endDate: periodRanges[1],
        });
      }
    );
  }

  setSelectedPeriod = (period) => {
    this.selectedPeriod = period;
  };

  setDateRange = (dateRange) => {
    this.dateRange = dateRange;
  };

  handleDateChange = (newDateRange) => {
    this.setDateRange(newDateRange);

    const ranges = getDateRanges();
    const matchedPeriod = this.findMatchedPeriod(ranges, newDateRange);

    this.setSelectedPeriod(matchedPeriod || PERIODS.custom.value);
  };

  findMatchedPeriod = (ranges, dateRange) => {
    for (const [period, [start, end]] of Object.entries(ranges)) {
      const isSamePeriod =
        start.toDateString() === dateRange.startDate.toDateString() &&
        end.toDateString() === dateRange.endDate.toDateString();

      if (isSamePeriod) return period;
    }

    return null;
  };
}

export default FilterStore;
