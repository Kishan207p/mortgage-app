import React from "react";
import Calculator from "../components/Calculator";
import MortgageCalculator from "../components/MortgageCalculator";

const CalculatorPage = () => {
  return (
    <div className="calculator-page">
      <Calculator />
      <MortgageCalculator />
    </div>
  );
};

export default CalculatorPage;
