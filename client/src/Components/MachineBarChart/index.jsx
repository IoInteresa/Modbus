import PropTypes from "prop-types";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Legend } from "recharts";

import "./MachineBarChart.scss";

const MachineBarChart = ({ machine }) => {
  const chartData = [
    {
      name: machine.name,
      running: machine.running.raw,
      idle: machine.idle.raw,
      fault: machine.fault.raw,
    },
  ];

  const legendPayload = [
    {
      value: `Работа: ${machine.running.formatted}`,
      type: "rect",
      color: "#4CAF50",
    },
    {
      value: `Простой: ${machine.idle.formatted}`,
      type: "rect",
      color: "#FFC107",
    },
    {
      value: `Авария: ${machine.fault.formatted}`,
      type: "rect",
      color: "#FF5722",
    },
  ];

  return (
    <div className="machine">
      <BarChart width={450} height={350} data={chartData}>
        <CartesianGrid stroke="var(--border-color)" strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          tick={{ fill: "var(--text-color)" }}
          axisLine={{ stroke: "var(--border-color)" }}
        />
        <YAxis
          tick={{ fill: "var(--text-color)" }}
          axisLine={{ stroke: "var(--border-color)" }}
          label={{
            value: machine.timeUnitLabel,
            angle: -90,
            position: "insideLeft",
          }}
        />
        <Legend
          payload={legendPayload}
          wrapperStyle={{
            paddingTop: "5px",
            paddingLeft: "70px",
          }}
        />
        <Bar dataKey="running" name="running" fill="#4CAF50" />
        <Bar dataKey="idle" name="idle" fill="#FFC107" />
        <Bar dataKey="fault" name="fault" fill="#FF5722" />
      </BarChart>
    </div>
  );
};

MachineBarChart.propTypes = {
  machine: PropTypes.shape({
    name: PropTypes.string.isRequired,
    running: PropTypes.shape({
      raw: PropTypes.number.isRequired,
      formatted: PropTypes.string.isRequired,
    }).isRequired,
    idle: PropTypes.shape({
      raw: PropTypes.number.isRequired,
      formatted: PropTypes.string.isRequired,
    }).isRequired,
    fault: PropTypes.shape({
      raw: PropTypes.number.isRequired,
      formatted: PropTypes.string.isRequired,
    }).isRequired,
    timeUnitLabel: PropTypes.string.isRequired,
  }).isRequired,
};

export default MachineBarChart;
