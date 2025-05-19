import React, { useContext } from "react";
import { observer } from "mobx-react-lite";

import PeriodPicker from "../PeriodPicker";
import DateRangePicker from "../DateRangePicker";
import WorkingType from "../WorkingType";
import { StoreContext } from "../../Stores";

const DateFilter = observer(() => {
  const { filterStore } = useContext(StoreContext);

  const {
    selectedPeriod,
    setSelectedPeriod,
    selectedWorkingType,
    dateRange,
    handleDateChange,
    setSelectedWorkingType,
  } = filterStore;

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
      <WorkingType
        selectedWorkingType={selectedWorkingType}
        onWorkingTypeChange={setSelectedWorkingType}
      />
    </>
  );
});

export default DateFilter;
