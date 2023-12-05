import "./ChartBar.css";

export const ChartBar = (props) => {
  let height = "0%";

  if (props.max > 0) {
    height = Math.round((props.value / props.max) * 100) + "%";
  }

  return (
    <div className="chart-bar">
      <div className="chart-bar__inner">
        <div className="chart-bar__fill" style={{ height: height }}></div>
      </div>
      <div className="chart-bar__label">{props.label}</div>
    </div>
  );
};
