import React, { useState } from "react";

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
          <tr key={index}>
            <td>{payment.month}</td>
            <td>{payment.date.toString()}</td>
            <td>${payment.interest.toFixed(2)}</td>
            <td>${payment.principal.toFixed(2)}</td>
            <td>${payment.endingBalance.toFixed(2)}</td>
            <td>${payment.accumulatedInterest.toFixed(2)}</td>
            <td>${payment.accumulatedPrincipal.toFixed(2)}</td>
          </tr>
        ))
      : null;
  };

  const renderYearlyTotals = () => {
    const selectedYearlyPayments = calculatePayments(selectedPaymentPlan);
    return selectedYearlyPayments
      ? selectedYearlyPayments[currentYear].length > 0 && (
          <tr className="total">
            <td></td>
            <td>Total</td>
            <td>
              $
              {selectedYearlyPayments[currentYear]
                .reduce((acc, payment) => acc + payment.interest, 0)
                .toFixed(2)}
            </td>
            <td>
              $
              {selectedYearlyPayments[currentYear]
                .reduce((acc, payment) => acc + payment.principal, 0)
                .toFixed(2)}
            </td>
            <td>
              $
              {selectedYearlyPayments[currentYear][
                selectedYearlyPayments[currentYear].length - 1
              ].endingBalance.toFixed(2)}
            </td>
            <td>
              $
              {selectedYearlyPayments[currentYear][
                selectedYearlyPayments[currentYear].length - 1
              ].accumulatedInterest.toFixed(2)}
            </td>
            <td>
              $
              {selectedYearlyPayments[currentYear][
                selectedYearlyPayments[currentYear].length - 1
              ].accumulatedPrincipal.toFixed(2)}
            </td>
          </tr>
        )
      : null;
  };

  // const [selectedPaymentPlan,setSelectedPaymentPlan] = useState<keyof PaymentPlan>("monthly");
  // setSelectedPaymentPlan(frequency);

  return (
    <div className="mortgage-results">
      {isCalculated && totalDownPayment !== null && (
        <div>
          <h3>Total Down Payment:</h3>
          <p>${totalDownPayment.toFixed(2)}</p>
        </div>
      )}
      {monthlyPayment !== null && (
        <div>
          <h3>Monthly Payment:</h3>
          <p>${monthlyPayment.toFixed(2)}</p>
        </div>
      )}
      {biWeeklyPayment !== null && (
        <div>
          <h3>Bi-Weekly Payment:</h3>
          <p>${biWeeklyPayment.toFixed(2)}</p>
        </div>
      )}
      {semiMonthlyPayment !== null && (
        <div>
          <h3>Semi-Monthly Payment:</h3>
          <p>${semiMonthlyPayment.toFixed(2)}</p>
        </div>
      )}
      {loanAmount !== null && (
        <div>
          <h3>Loan Amount:</h3>
          <p>${loanAmount.toFixed(2)}</p>
        </div>
      )}
      {totalPaidMortgage !== null && (
        <div>
          <h3>Total Paid Mortgage:</h3>
          <p>${totalPaidMortgage.toFixed(2)}</p>
        </div>
      )}
      {totalInterestPaid !== null && (
        <div>
          <h3>Total Interest Paid:</h3>
          <p>${totalInterestPaid.toFixed(2)}</p>
        </div>
      )}
      {provinceTax !== null && (
        <div>
          <h3>Total Provincial Tax:</h3>
          <p>${provinceTax.toFixed(2)}</p>
        </div>
      )}
      <div>
        <h3>Payment Plan Options:</h3>
        <button
          style={{
            backgroundColor:
              selectedPaymentPlan === "monthly" ? "lightblue" : "initial",
          }}
          onClick={() => calculatePayments("monthly")}
        >
          Monthly
        </button>
        <button
          style={{
            backgroundColor:
              selectedPaymentPlan === "semiMonthly" ? "lightblue" : "initial",
          }}
          onClick={() => calculatePayments("semiMonthly")}
        >
          Semi-Monthly
        </button>
        <button
          style={{
            backgroundColor:
              selectedPaymentPlan === "biWeekly" ? "lightblue" : "initial",
          }}
          onClick={() => calculatePayments("biWeekly")}
        >
          Bi-Weekly
        </button>
      </div>
      {renderPaymentPlan() !== null && (
        <div>
          <h3 style={{ textAlign: "center" }}>
            <button
              onClick={() => setCurrentYear(0)}
              disabled={currentYear === 0}
            >
              First
            </button>
            <button
              onClick={() => setCurrentYear(currentYear - 1)}
              disabled={currentYear === 0}
            >
              ←
            </button>
            Year {currentYear + 1} Payment Plan
            <button
              onClick={() => setCurrentYear(currentYear + 1)}
              disabled={
                currentYear ===
                calculatePayments(selectedPaymentPlan)!.length - 1
              }
            >
              →
            </button>
            <button
              onClick={() =>
                setCurrentYear(
                  calculatePayments(selectedPaymentPlan)!.length - 1
                )
              }
              disabled={
                currentYear ===
                calculatePayments(selectedPaymentPlan)!.length - 1
              }
            >
              Last
            </button>
          </h3>
          <table className="payment-plan-table">
            <thead>
              <tr>
                <th>Index</th>
                <th>Date</th>
                <th>Interest</th>
                <th>Principal</th>
                <th>Ending Balance</th>
                <th>Accumulated Paid Interest</th>
                <th>Accumulated Paid Principal</th>
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
  );
};

export default MortgageResults;
