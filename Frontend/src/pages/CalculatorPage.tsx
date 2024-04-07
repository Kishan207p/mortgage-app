import React from "react";
import Calculator from "../components/Calculator";
import MortgageCalculator from "../components/MortgageCalculator";

const CalculatorPage = () => {
  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="text-bold mb-3 shadow-lg p-3">
        <div className=" text-center font-bold text-3xl py-2 mb-2 text-gray-600">
          Calculator Page
        </div>
        <hr className="mb-6"/>
        <MortgageCalculator pageContext="calculator"/>
      </div>
    </div>
  );
};

export default CalculatorPage;
