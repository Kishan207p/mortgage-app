import React from "react";
import MortgageCalculator from "../components/MortgageCalculator";

function ComparisonPage() {
  return (
    <div className="bg-slate-100">
      <div className="text-center font-bold text-3xl py-2 mb-2 pt-3 text-gray-600">
        Compare Mortgage
      </div>
      <div className="border mx-5"></div>
      <div className="flex">
        <div className="w-1/2 p-8 justify-center items-center">
          <h2 className="text-xl font-bold text-center mb-5">Calculator 1</h2>
          <MortgageCalculator pageContext="comparison" />
        </div>
        <div className="border border-gray-500 mt-4"></div>
        <div className="w-1/2 p-8 justify-center items-center">
          <h2 className="text-xl font-bold text-center mb-5">Calculator 2</h2>
          <MortgageCalculator pageContext="comparison" />
        </div>
      </div>
    </div>
  );
}

export default ComparisonPage;
