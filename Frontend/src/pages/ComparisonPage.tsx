import React from "react";
import Calculator from "../components/Calculator";
import MortgageCalculator from "../components/MortgageCalculator";

function ComparisonPage() {
  return (
    <>
    <div className=" text-center font-bold text-3xl py-2 mb-2 mt-3 text-gray-600">Comparison Page</div>
    <hr />
    <div className="flex">
      <div className="w-1/2 mr-4 p-3">
        <h2 className="text-lg font-bold justify-content-center text-center mb-4">Calculator 1</h2>
        <MortgageCalculator pageContext="comparison" />
      </div>
      <div className="w-1/2 p-3">
        <h2  className="text-lg font-bold justify-content-center text-center mb-4">Calculator 2</h2>
        <MortgageCalculator pageContext="comparison"/>
      </div>
    </div>
    </>
  );
}

export default ComparisonPage;
