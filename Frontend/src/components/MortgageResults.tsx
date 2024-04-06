import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
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

  const generateChartData = () => {
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
  const chartData = generateChartData();

  // const [selectedPaymentPlan,setSelectedPaymentPlan] = useState<keyof PaymentPlan>("monthly");
  // setSelectedPaymentPlan(frequency);

  return (
    <div className="mortgage-results">
      <div className="mb-8">
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

      <div className="border justify-content-center text-center p-2">
        <h3 className="text-lg font-bold mb-3">Payment Plan Options:</h3>
        <button
          style={{
            backgroundColor:
              selectedPaymentPlan === "monthly" ? "lightblue" : "initial",
          }}
          onClick={() => calculatePayments("monthly")}
          className="p-2 mr-3 font-semibold bg-slate-500 hover:bg-slate-600"
        >
          Monthly
        </button>
        <button
          style={{
            backgroundColor:
              selectedPaymentPlan === "semiMonthly" ? "lightblue" : "initial",
          }}
          onClick={() => calculatePayments("semiMonthly")}
          className="p-2 mr-3 font-semibold"
        >
          Semi-Monthly
        </button>
        <button
          style={{
            backgroundColor:
              selectedPaymentPlan === "biWeekly" ? "lightblue" : "initial",
          }}
          onClick={() => calculatePayments("biWeekly")}
          className="p-2 mr-3 font-semibold"
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
      {chartData.length > 0 && (
        <LineChart
          width={600}
          height={300}
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="year" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="principalPaid"
            stroke="blue"
            name="Principal Paid"
          />
          <Line
            type="monotone"
            dataKey="interestPaid"
            stroke="green"
            name="Interest Paid"
          />
          <Line
            type="monotone"
            dataKey="loanAmountRemaining"
            stroke="red"
            name="Loan/Mortgage Amount Paid"
          />
        </LineChart>
      )}
    </div>
  );
};

export default MortgageResults;
