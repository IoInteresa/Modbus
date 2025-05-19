import PropTypes from "prop-types";

import { WORKING_TYPES } from "../../Consts";

import "./WorkingType.scss";

const WorkingType = ({ selectedWorkingType, onWorkingTypeChange }) => {
  const handleWorkingTypeChange = (e) => {
    onWorkingTypeChange(e.target.value);
  };

  return (
    <select
      className="workingType"
      value={selectedWorkingType}
      onChange={handleWorkingTypeChange}
    >
      {WORKING_TYPES.map((type) => (
        <option key={type.value} value={type.value}>
          {type.label}
        </option>
      ))}
    </select>
  );
};

WorkingType.propTypes = {
  selectedWorkingType: PropTypes.string.isRequired,
  onWorkingTypeChange: PropTypes.func.isRequired,
};

export default WorkingType;