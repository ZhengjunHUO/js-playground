import { ChartBar } from "./ChartBar";
import "./Chart.css";

export const Chart = ({ periods }) => {
  const vals = periods.map((period) => period.value);
  const max = Math.max(...vals);

  return (
    <div className="chart">
      {periods.map((period) => (
        <ChartBar
          key={period.label}
          value={period.value}
          max={max}
          label={period.label}
        />
      ))}
    </div>
  );
};
