import PropTypes from "prop-types";

import { PERIODS } from "../../Consts";

import "./PeriodPicker.scss";

const PeriodPicker = ({ selectedPeriod, onPeriodChange }) => {
  const handlePeriodChange = (e) => {
    onPeriodChange(e.target.value);
  };

  return (
    <select
      className="periodPicker"
      value={selectedPeriod}
      onChange={handlePeriodChange}
    >
      {Object.values(PERIODS).map((period) => (
        <option key={period.value} value={period.value} disabled={period.disabled}>
          {period.label}
        </option>
      ))}
    </select>
  );
};

PeriodPicker.propTypes = {
  selectedPeriod: PropTypes.oneOf(Object.keys(PERIODS)).isRequired,
  onPeriodChange: PropTypes.func.isRequired,
};

export default PeriodPicker;
