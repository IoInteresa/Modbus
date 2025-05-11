import DateRangePickerView from "@wojtekmaj/react-daterange-picker";
import PropTypes from "prop-types";

import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";

import "./DateRangePicker.scss";

const DateRangePicker = ({ startDate, endDate, setDateRange }) => {
  const handleChange = (newValue) => {
    setDateRange({
      startDate: newValue[0],
      endDate: newValue[1],
    });
  };

  return (
    <div className="dateRangePicker">
      <DateRangePickerView
        onChange={handleChange}
        value={[startDate, endDate]}
        dayPlaceholder={"дд"}
        monthPlaceholder={"мм"}
        yearPlaceholder={"гггг"}
        format="dd.MM.yyyy"
        locale="ru"
        clearIcon={null}
        calendarIcon={<span className="calendar-icon">📅</span>}
      />
    </div>
  );
};

DateRangePicker.propTypes = {
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date).isRequired,
  setDateRange: PropTypes.func.isRequired,
};

export default DateRangePicker;
