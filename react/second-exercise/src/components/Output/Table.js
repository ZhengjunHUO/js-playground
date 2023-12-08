import styles from "./Table.module.css";

export const Table = ({ rslt }) => {
  return (
    <table className={styles["result"]}>
      <thead>
        <tr>
          <th>Year</th>
          <th>Total Savings</th>
          <th>Interest (Year)</th>
          <th>Total Interest</th>
          <th>Invested Capital</th>
        </tr>
      </thead>
      <tbody>
        {rslt.map((record) => (
          <tr>
            <td>{record.year}</td>
            <td>{record.savingsEndOfYear}</td>
            <td>{record.yearlyInterest}</td>
            <td>{record.totalInterest}</td>
            <td>{record.capital}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
