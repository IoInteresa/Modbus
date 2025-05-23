import PropTypes from "prop-types";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Legend } from "recharts";

import "./MachineBarChart.scss";

const MachineBarChart = ({ machine }) => {
  const { running, idle, fault, off } = machine;

  const chartData = [
    {
      name: machine.name,
      running: running.raw,
      idle: idle.raw,
      fault: fault.raw,
      off: off.raw,
    },
  ];

  const legendPayload = [
    {
      value: `Работает: ${running.formatted} (${running.percent}%)`,
      type: "rect",
      color: "#4CAF50",
    },
    {
      value: `Ожидание: ${idle.formatted} (${idle.percent}%)`,
      type: "rect",
      color: "#FFC107",
    },
    {
      value: `Авария: ${fault.formatted} (${fault.percent}%)`,
      type: "rect",
      color: "#FF5722",
    },
    {
      value: `Выключен: ${off.formatted} (${off.percent}%)`,
      type: "rect",
      color: "#9E9E9E",
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
            paddingLeft: "70px",
          }}
        />
        <Bar dataKey="running" name="running" fill="#4CAF50" />
        <Bar dataKey="idle" name="idle" fill="#FFC107" />
        <Bar dataKey="fault" name="fault" fill="#FF5722" />
        <Bar dataKey="off" name="off" fill="#9E9E9E" />
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
      percent: PropTypes.number.isRequired,
    }).isRequired,
    idle: PropTypes.shape({
      raw: PropTypes.number.isRequired,
      formatted: PropTypes.string.isRequired,
      percent: PropTypes.number.isRequired,
    }).isRequired,
    fault: PropTypes.shape({
      raw: PropTypes.number.isRequired,
      formatted: PropTypes.string.isRequired,
      percent: PropTypes.number.isRequired,
    }).isRequired,
    off: PropTypes.shape({
      raw: PropTypes.number.isRequired,
      formatted: PropTypes.string.isRequired,
      percent: PropTypes.number.isRequired,
    }).isRequired,
    timeUnitLabel: PropTypes.string.isRequired,
  }).isRequired,
};

export default MachineBarChart;
