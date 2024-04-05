import React from "react";
import Calculator from "../components/Calculator";
import MortgageCalculator from "../components/MortgageCalculator";

const CalculatorPage = () => {
  return (
    <div className="text-bold bg-slate-100 mb-3 shadow-lg p-3">
        <div className=" text-center font-bold text-3xl py-2 mb-2 text-gray-600">
          Calculator Page
        </div>
        <hr className="mb-6"/>
        <MortgageCalculator pageContext="calculator"/>
      </div>
  );
};

export default CalculatorPage;
