import { Chart } from "../Chart/Chart";

export const ItemChart = ({ items }) => {
  const periods = [
    { label: "一月", value: 0 },
    { label: "二月", value: 0 },
    { label: "三月", value: 0 },
    { label: "四月", value: 0 },
    { label: "五月", value: 0 },
    { label: "六月", value: 0 },
    { label: "七月", value: 0 },
    { label: "八月", value: 0 },
    { label: "九月", value: 0 },
    { label: "十月", value: 0 },
    { label: "十一月", value: 0 },
    { label: "十二月", value: 0 },
  ];

  for (const item of items) {
    const month = item.date.getMonth();
    periods[month].value += item.sum;
  }

  return <Chart periods={periods} />;
};
