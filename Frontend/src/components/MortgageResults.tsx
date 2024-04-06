import React, { useState } from "react";
import MortgageGraph from "./MortgageGraph";

interface MortgageResultsProps {
  totalDownPayment: number | null;
  monthlyPayment: number | null;
  biWeeklyPayment: number | null;
  semiMonthlyPayment: number | null;
  loanAmount: number | null;
  totalPaidMortgage: number | null;
  totalInterestPaid: number | null;
  perMonthyearlyPayments: Array<
    Array<{
      month: number;
      date: string;
      interest: number;
      principal: number;
      endingBalance: number;
      accumulatedInterest: number;
      accumulatedPrincipal: number;
    }>
  > | null;
  perSemiMonthyearlyPayments: Array<
    Array<{
      month: number;
      date: string;
      interest: number;
      principal: number;
      endingBalance: number;
      accumulatedInterest: number;
      accumulatedPrincipal: number;
    }>
  > | null;
  perBiWeekyearlyPayments: Array<
    Array<{
      month: number;
      date: string;
      interest: number;
      principal: number;
      endingBalance: number;
      accumulatedInterest: number;
      accumulatedPrincipal: number;
    }>
  > | null;
  isCalculated: boolean;
  provinceTax: number | null;
  cityTax: number | null;
}

interface PaymentPlan {
  monthly: number;
  semiMonthly: number;
  biWeekly: number;
}

const MortgageResults: React.FC<MortgageResultsProps> = ({
  totalDownPayment,
  monthlyPayment,
  biWeeklyPayment,
  semiMonthlyPayment,
  loanAmount,
  totalPaidMortgage,
  totalInterestPaid,
  perMonthyearlyPayments,
  perSemiMonthyearlyPayments,
  perBiWeekyearlyPayments,
  isCalculated,
  provinceTax,
  cityTax,
}) => {
  const [selectedPaymentPlan, setSelectedPaymentPlan] =
    useState<keyof PaymentPlan>("monthly");
  const [currentYear, setCurrentYear] = useState(0);

  const calculatePayments = (frequency: keyof PaymentPlan) => {
    let selectedYearlyPayments;

    switch (frequency) {
      case "monthly":
        selectedYearlyPayments = perMonthyearlyPayments;
        break;
      case "semiMonthly":
        selectedYearlyPayments = perSemiMonthyearlyPayments;
        break;
      case "biWeekly":
        selectedYearlyPayments = perBiWeekyearlyPayments;
        break;
      default:
        break;
    }
    // setSelectedPaymentPlan(frequency);
    if (selectedPaymentPlan !== frequency) {
      setSelectedPaymentPlan(frequency);
    }
    return selectedYearlyPayments || [];
  };

  const renderPaymentPlan = () => {
    let selectedYearlyPayments = calculatePayments(selectedPaymentPlan);
    return selectedYearlyPayments && selectedYearlyPayments[currentYear]
      ? selectedYearlyPayments[currentYear].map((payment, index) => (
          <tr key={index} className="hover:bg-[#f2f2f2]">
            <td className="text-center border border-solid border-[#ddd] p-2">
              {payment.month}
            </td>
            <td className="text-center border border-solid border-[#ddd] p-2">
              {payment.date.toString()}
            </td>
            <td className="text-center border border-solid border-[#ddd] p-2">
              ${payment.interest.toFixed(2)}
            </td>
            <td className="text-center border border-solid border-[#ddd] p-2">
              ${payment.principal.toFixed(2)}
            </td>
            <td className="text-center border border-solid border-[#ddd] p-2">
              ${payment.endingBalance.toFixed(2)}
            </td>
            <td className="text-center border border-solid border-[#ddd] p-2">
              ${payment.accumulatedInterest.toFixed(2)}
            </td>
            <td className="text-center border border-solid border-[#ddd] p-2">
              ${payment.accumulatedPrincipal.toFixed(2)}
            </td>
          </tr>
        ))
      : null;
  };

  const renderYearlyTotals = () => {
    const selectedYearlyPayments = calculatePayments(selectedPaymentPlan);
    return selectedYearlyPayments
      ? selectedYearlyPayments[currentYear].length > 0 && (
          <tr className="total font-bold bg-[#ffc107]">
            <td className="text-center border border-solid border-[#ddd] p-2"></td>
            <td className="text-center border border-solid border-[#ddd] p-2">
              Total
            </td>
            <td className="text-center border border-solid border-[#ddd] p-2">
              $
              {selectedYearlyPayments[currentYear]
                .reduce((acc, payment) => acc + payment.interest, 0)
                .toFixed(2)}
            </td>
            <td className="text-center border border-solid border-[#ddd] p-2">
              $
              {selectedYearlyPayments[currentYear]
                .reduce((acc, payment) => acc + payment.principal, 0)
                .toFixed(2)}
            </td>
            <td className="text-center border border-solid border-[#ddd] p-2">
              $
              {selectedYearlyPayments[currentYear][
                selectedYearlyPayments[currentYear].length - 1
              ].endingBalance.toFixed(2)}
            </td>
            <td className="text-center border border-solid border-[#ddd] p-2">
              $
              {selectedYearlyPayments[currentYear][
                selectedYearlyPayments[currentYear].length - 1
              ].accumulatedInterest.toFixed(2)}
            </td>
            <td className="text-center border border-solid border-[#ddd] p-2">
              $
              {selectedYearlyPayments[currentYear][
                selectedYearlyPayments[currentYear].length - 1
              ].accumulatedPrincipal.toFixed(2)}
            </td>
          </tr>
        )
      : null;
  };

  const generateGraphData = () => {
    let yearlyTotals: {
      year: number;
      principalPaid: number;
      interestPaid: number;
      loanAmountRemaining: number;
    }[] = [];

    let loanAmountRemaining = loanAmount!;
    let totalInterestRemaining = totalInterestPaid!;
    let accumulatedPrincipal = 0;
    let accumulatedInterest = 0;

    // Calculate yearly totals based on payment plan data
    if (perMonthyearlyPayments) {
      perMonthyearlyPayments.forEach((payments, year) => {
        const lastPayment = payments[payments.length - 1];

        // Calculate principal and interest paid for this year
        const principalPaid = lastPayment.accumulatedPrincipal;
        const interestPaid = lastPayment.accumulatedInterest;

        // Update accumulated principal and accumulated interest
        accumulatedPrincipal += principalPaid;
        accumulatedInterest += interestPaid;

        // Update loan amount remaining and total interest remaining
        loanAmountRemaining -= principalPaid;
        totalInterestRemaining -= interestPaid;

        yearlyTotals.push({
          year: year + 1,
          principalPaid: parseFloat(accumulatedPrincipal.toFixed(2)),
          interestPaid: parseFloat(accumulatedInterest.toFixed(2)),
          loanAmountRemaining: parseFloat(loanAmountRemaining.toFixed(2)),
        });
      });
    }

    return yearlyTotals;
  };

  // Data for the chart
  const graphData = generateGraphData();

  // const [selectedPaymentPlan,setSelectedPaymentPlan] = useState<keyof PaymentPlan>("monthly");
  // setSelectedPaymentPlan(frequency);

  return (
    <div className="mortgage-results flex flex-col flex-1">
      <div className="flex">
        <div className="results-container w-1/5">
          {isCalculated && totalDownPayment !== null && (
            <div className="mt-4 ">
              <h3 className="text-md font-semibold">Total Down Payment:</h3>
              <p className="text-md">${totalDownPayment.toFixed(2)}</p>
            </div>
          )}
          {monthlyPayment !== null && (
            <div className="mt-4">
              <h3 className="text-md font-semibold">Monthly Payment:</h3>
              <p className="text-md">${monthlyPayment.toFixed(2)}</p>
            </div>
          )}
          {biWeeklyPayment !== null && (
            <div className="mt-4">
              <h3 className="text-md font-semibold">Bi-Weekly Payment:</h3>
              <p className="text-md">${biWeeklyPayment.toFixed(2)}</p>
            </div>
          )}
          {semiMonthlyPayment !== null && (
            <div className="mt-4">
              <h3 className="text-md font-semibold">Semi-Monthly Payment:</h3>
              <p className="text-md">${semiMonthlyPayment.toFixed(2)}</p>
            </div>
          )}
          {loanAmount !== null && (
            <div className="mt-4">
              <h3 className="text-md font-semibold">Loan Amount:</h3>
              <p className="text-md">${loanAmount.toFixed(2)}</p>
            </div>
          )}
          {totalPaidMortgage !== null && (
            <div className="mt-4">
              <h3 className="text-md font-semibold">Total Paid Mortgage:</h3>
              <p className="text-md">${totalPaidMortgage.toFixed(2)}</p>
            </div>
          )}
          {totalInterestPaid !== null && (
            <div className="mt-4">
              <h3 className="text-md font-semibold">Total Interest Paid:</h3>
              <p className="text-md">${totalInterestPaid.toFixed(2)}</p>
            </div>
          )}
          {provinceTax !== null && (
            <div className="mt-4">
              <h3 className="text-md font-semibold">Total Provincial Tax:</h3>
              <p className="text-md">${provinceTax.toFixed(2)}</p>
            </div>
          )}
          {cityTax !== null && (
            <div className="mt-4">
              <h3 className="text-md font-semibold">Total Municipal Tax:</h3>
              <p className="text-md">${cityTax.toFixed(2)}</p>
            </div>
          )}
        </div>
        <div className="payment-plan-container w-4/5">
          {" "}
          <div className="border border-solid justify-content-center text-center p-2">
            <h3 className="text-lg font-bold mb-3">Payment Plan Options:</h3>
            <button
              onClick={() => calculatePayments("monthly")}
              className="border border-solid p-2 mr-3 font-semibold hover:bg-blue-300  focus:bg-blue-400"
            >
              Monthly
            </button>
            <button
              onClick={() => calculatePayments("semiMonthly")}
              className="border border-solid p-2 mr-3 font-semibold hover:bg-blue-300  focus:bg-blue-400"
            >
              Semi-Monthly
            </button>
            <button
              onClick={() => calculatePayments("biWeekly")}
              className="border border-solid p-2 mr-3 font-semibold hover:bg-blue-300  focus:bg-blue-400"
            >
              Bi-Weekly
            </button>
          </div>
          {renderPaymentPlan() !== null && (
            <div>
              <h3 className="text-right mt-2">
                <button
                  onClick={() => setCurrentYear(0)}
                  disabled={currentYear === 0}
                  className="border border-solid hover:bg-blue-300  active:bg-blue-400 mr-2 p-2"
                >
                  First
                </button>
                <button
                  onClick={() => setCurrentYear(currentYear - 1)}
                  disabled={currentYear === 0}
                  className="border border-solid hover:bg-blue-300  active:bg-blue-400 mr-2 p-2"
                >
                  ←
                </button>
                Year {currentYear + 1} Payment Plan
                <button
                  onClick={() => setCurrentYear(currentYear + 1)}
                  disabled={
                    currentYear ===
                    calculatePayments(selectedPaymentPlan).length - 1
                  }
                  className="border border-solid hover:bg-blue-300  active:bg-blue-400 ml-2 p-2"
                >
                  →
                </button>
                <button
                  onClick={() =>
                    setCurrentYear(
                      calculatePayments(selectedPaymentPlan).length - 1
                    )
                  }
                  disabled={
                    currentYear ===
                    calculatePayments(selectedPaymentPlan).length - 1
                  }
                  className="border border-solid hover:bg-blue-300  active:bg-blue-400 ml-2 p-2"
                >
                  Last
                </button>
              </h3>
              <table className="payment-plan-table w-full mt-5 border-collapse">
                <thead>
                  <tr>
                    <th className="border border-solid border-[#ddd] bg-[#f2f2f2] py-2 px-4">
                      Index
                    </th>
                    <th className="border border-solid border-[#ddd] bg-[#f2f2f2] py-2 px-4">
                      Date
                    </th>
                    <th className="border border-solid border-[#ddd] bg-[#f2f2f2] py-2 px-4">
                      Interest
                    </th>
                    <th className="border border-solid border-[#ddd] bg-[#f2f2f2] py-2 px-4">
                      Principal
                    </th>
                    <th className="border border-solid border-[#ddd] bg-[#f2f2f2] py-2 px-4">
                      Ending Balance
                    </th>
                    <th className="border border-solid border-[#ddd] bg-[#f2f2f2] py-2 px-4">
                      Accumulated Paid Interest
                    </th>
                    <th className="border border-solid border-[#ddd] bg-[#f2f2f2] py-2 px-4">
                      Accumulated Paid Principal
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {renderPaymentPlan()}
                  {renderYearlyTotals()}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <div className="graph-container mt-10">
        {graphData.length > 0 && <MortgageGraph GraphData={graphData} />}
      </div>
    </div>
  );
};

export default MortgageResults;
