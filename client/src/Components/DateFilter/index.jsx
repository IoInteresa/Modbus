import React, { useContext } from "react";
import { observer } from "mobx-react-lite";

import PeriodPicker from "../PeriodPicker";
import DateRangePicker from "../DateRangePicker";
import { StoreContext } from "../../Stores";

const DateFilter = observer(() => {
  const { filterStore } = useContext(StoreContext);

  const { selectedPeriod, setSelectedPeriod, dateRange, handleDateChange } =
    filterStore;

  return (
    <>
      <PeriodPicker
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
      />
      <DateRangePicker
        startDate={dateRange.startDate}
        endDate={dateRange.endDate}
        setDateRange={handleDateChange}
      />
    </>
  );
});

export default DateFilter;
