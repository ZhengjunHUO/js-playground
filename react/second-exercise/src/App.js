import { useState } from "react";
import { Header } from "./components/Header";
import { Form } from "./components/Input/Form.js";
import { Table } from "./components/Output/Table.js";

function App() {
  let fmt = Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" });

  const [rsltList, setRsltList] = useState([]);

  const calculateHandler = (userInput) => {
    const yearlyData = []; // per-year results

    let currentSavings = +userInput["current-savings"];
    let capital = +userInput["current-savings"];
    const yearlyContribution = +userInput["yearly-contribution"];
    const expectedReturn = +userInput["expected-return"] / 100;
    const duration = +userInput["duration"];

    // The below code calculates yearly results (total savings, interest etc)
    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      capital += yearlyContribution;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        year: i + 1,
        savingsEndOfYear: fmt.format(currentSavings),
        yearlyInterest: fmt.format(yearlyInterest),
        totalInterest: fmt.format(currentSavings - capital),
        capital: fmt.format(capital),
      });
    }

    setRsltList(yearlyData);
  };

  const resetHandler = () => {
    setRsltList([]);
  };

  return (
    <div>
      <Header />
      <Form onSubmitData={calculateHandler} onRest={resetHandler} />
      {rsltList.length > 0 ? (
        <Table rslt={rsltList} />
      ) : (
        <h1> Data not available yet. </h1>
      )}
    </div>
  );
}

export default App;
