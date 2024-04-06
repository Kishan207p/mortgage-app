// MortgageCalculator.tsx
import React, { ChangeEvent, useEffect, useState } from "react";
import MortgageForm from "./MortgageForm";
import MortgageResults from "./MortgageResults";
import ProvinceTaxCalculator from "./ProvinceTaxCalculator";
import axios from "axios";
import CityTaxCalculator from "./CityTaxCalculator";

interface MortgageCalculatorProps {
  pageContext: "calculator" | "comparison"; // Define possible contexts
}
interface Province {
  province_id: number;
  code: string;
  description: string;
}

interface ProvinceCity {
  province_id: number;
  cities: City[];
}

interface City {
  city_id: number;
  description: string;
}

const MortgageCalculator: React.FC<MortgageCalculatorProps> = ({
  pageContext,
}) => {
  const [principal, setPrincipal] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(0);
  const [loanTerm, setLoanTerm] = useState<number>(0);
  const [downPayment, setDownPayment] = useState<string>("");
  const [downPaymentUnit, setDownPaymentUnit] = useState<string>("%");
  const [extraPayment1, setExtraPayment1] = useState<string>("");
  const [extraPayment2, setExtraPayment2] = useState<string>("");
  const [extraPayment3, setExtraPayment3] = useState<string>("");
  const [extraPayment4, setExtraPayment4] = useState<string>("");
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [biWeeklyPayment, setBiWeeklyPayment] = useState<number | null>(null);
  const [semiMonthlyPayment, setSemiMonthlyPayment] = useState<number | null>(
    null
  );
  const [totalDownPayment, setTotalDownPayment] = useState<number | null>(null);
  const [loanAmount, setLoanAmount] = useState<number | null>(null);
  const [totalPaidMortgage, setTotalPaidMortgage] = useState<number | null>(
    null
  );
  const [totalInterestPaid, setTotalInterestPaid] = useState<number | null>(
    null
  );
  const [perMonthyearlyPayments, setperMonthYearlyPayments] = useState<Array<
    Array<{
      month: number;
      date: string;
      interest: number;
      principal: number;
      endingBalance: number;
      accumulatedInterest: number;
      accumulatedPrincipal: number;
    }>
  > | null>(null);

  const [perSemiMonthyearlyPayments, setperSemiMonthYearlyPayments] =
    useState<Array<
      Array<{
        month: number;
        date: string;
        interest: number;
        principal: number;
        endingBalance: number;
        accumulatedInterest: number;
        accumulatedPrincipal: number;
      }>
    > | null>(null);

  const [perBiWeekyearlyPayments, setperBiWeekYearlyPayments] = useState<Array<
    Array<{
      month: number;
      date: string;
      interest: number;
      principal: number;
      endingBalance: number;
      accumulatedInterest: number;
      accumulatedPrincipal: number;
    }>
  > | null>(null);

  const [isCalculated, setIsCalculated] = useState<boolean>(false);
  const [inputsDisabled, setInputsDisabled] = useState<boolean>(false);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<number | null>(null);
  const [provinceTax, setProvinceTax] = useState<number | null>(null);
  const [selectedCity, setSelectedCity] = useState<number | null>(null);
  const [cityTax, setCityTax] = useState<number | null>(null);

  const handleCalculate = () => {
    setIsCalculated(true);
    setInputsDisabled(true);

    const monthlyInterestRate = interestRate / 100 / 12;
    const semiMonthlyInterestRate = interestRate / 100 / 24; // Divide by 24 for semi-monthly
    const biWeeklyInterestRate = interestRate / 100 / 26;
    const monthlyNumberOfPayments = loanTerm * 12;
    const semiMonthlyNumberOfPayments = loanTerm * 24;
    const biWeeklyNumberOfPayments = loanTerm * 26;
    let principalAmount = principal;

    // Convert down payment if in percentage
    if (downPaymentUnit === "%") {
      const downPaymentPercentage = parseFloat(downPayment);
      principalAmount -= (principal * downPaymentPercentage) / 100;
      setTotalDownPayment(
        isFinite((principal * downPaymentPercentage) / 100)
          ? (principal * downPaymentPercentage) / 100
          : null
      );
    } else {
      const downPaymentInDollars = parseFloat(downPayment);
      principalAmount -= downPaymentInDollars;
      setTotalDownPayment(
        isFinite(downPaymentInDollars) ? downPaymentInDollars : null
      );
    }

    const numerator =
      principalAmount *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, monthlyNumberOfPayments);
    const denominator =
      Math.pow(1 + monthlyInterestRate, monthlyNumberOfPayments) - 1;

    const calculatedMonthlyPayment = numerator / denominator;
    const calculatedBiWeeklyPayment = (calculatedMonthlyPayment * 12) / 26;
    const calculatedSemiMonthlyPayment = calculatedMonthlyPayment / 2;
    const calculatedLoanAmount = principalAmount;
    const calculatedTotalPaidMortgage =
      calculatedMonthlyPayment * monthlyNumberOfPayments;
    const calculatedTotalInterestPaid =
      calculatedTotalPaidMortgage - calculatedLoanAmount;

    let remainingBalance = principalAmount;
    let accumulatedInterest = 0;
    let accumulatedPrincipal = 0;

    const monthlypayments: Array<{
      month: number;
      date: string;
      interest: number;
      principal: number;
      endingBalance: number;
      accumulatedInterest: number;
      accumulatedPrincipal: number;
    }> = [];

    const biWeeklyPayments: Array<{
      month: number;
      date: string;
      interest: number;
      principal: number;
      endingBalance: number;
      accumulatedInterest: number;
      accumulatedPrincipal: number;
    }> = [];

    const semiMonthlyPayments: Array<{
      month: number;
      date: string;
      interest: number;
      principal: number;
      endingBalance: number;
      accumulatedInterest: number;
      accumulatedPrincipal: number;
    }> = [];

    const perMonthyearlyPayments: Array<
      Array<{
        month: number;
        date: string;
        interest: number;
        principal: number;
        endingBalance: number;
        accumulatedInterest: number;
        accumulatedPrincipal: number;
      }>
    > = [];

    const perSemiMonthyearlyPayments: Array<
      Array<{
        month: number;
        date: string;
        interest: number;
        principal: number;
        endingBalance: number;
        accumulatedInterest: number;
        accumulatedPrincipal: number;
      }>
    > = [];

    const perBiWeekyearlyPayments: Array<
      Array<{
        month: number;
        date: string;
        interest: number;
        principal: number;
        endingBalance: number;
        accumulatedInterest: number;
        accumulatedPrincipal: number;
      }>
    > = [];

    // Monthly Payments
    remainingBalance = principalAmount;
    for (let i = 1; i <= monthlyNumberOfPayments; i++) {
      const interest = remainingBalance * monthlyInterestRate;
      let principalPayment = calculatedMonthlyPayment - interest;
      if (remainingBalance < calculatedMonthlyPayment) {
        principalPayment = remainingBalance;
      }
      remainingBalance -= principalPayment;
      accumulatedInterest += interest;
      accumulatedPrincipal += principalPayment;

      const currentDate = new Date();
      currentDate.setMonth(currentDate.getMonth() + i);
      const formattedDate = currentDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

      monthlypayments.push({
        month: i,
        date: formattedDate,
        interest,
        principal: principalPayment,
        endingBalance: remainingBalance,
        accumulatedInterest,
        accumulatedPrincipal,
      });

      if (i % 12 === 0 || i === monthlyNumberOfPayments) {
        perMonthyearlyPayments.push([...monthlypayments]);
        monthlypayments.length = 0;
        accumulatedInterest = 0;
        accumulatedPrincipal = 0;
      }
    }

    // Bi-Weekly Payments
    remainingBalance = principalAmount;
    for (let i = 1; i <= biWeeklyNumberOfPayments; i++) {
      const interest = remainingBalance * biWeeklyInterestRate;
      let principalPayment = calculatedBiWeeklyPayment - interest;
      if (remainingBalance < calculatedBiWeeklyPayment) {
        principalPayment = remainingBalance;
      }
      remainingBalance -= principalPayment;

      accumulatedInterest += interest;
      accumulatedPrincipal += principalPayment;

      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 14 * i);
      const formattedDate = currentDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

      biWeeklyPayments.push({
        month: i,
        date: formattedDate,
        interest,
        principal: principalPayment,
        endingBalance: remainingBalance,
        accumulatedInterest,
        accumulatedPrincipal,
      });

      if (i % 26 === 0 || i === biWeeklyNumberOfPayments) {
        perBiWeekyearlyPayments.push([...biWeeklyPayments]);
        biWeeklyPayments.length = 0;
        accumulatedInterest = 0;
        accumulatedPrincipal = 0;
      }
    }

    // Semi-Monthly Payments
    remainingBalance = principalAmount;
    for (let i = 1; i <= semiMonthlyNumberOfPayments; i++) {
      const interest = remainingBalance * semiMonthlyInterestRate;
      let principalPayment = calculatedSemiMonthlyPayment - interest;
      if (remainingBalance < calculatedSemiMonthlyPayment) {
        principalPayment = remainingBalance;
      }
      remainingBalance -= principalPayment;

      accumulatedInterest += interest;
      accumulatedPrincipal += principalPayment;

      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 15 * i);
      const formattedDate = currentDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

      semiMonthlyPayments.push({
        month: i,
        date: formattedDate,
        interest,
        principal: principalPayment,
        endingBalance: remainingBalance,
        accumulatedInterest,
        accumulatedPrincipal,
      });

      if (i % 24 === 0 || i === semiMonthlyNumberOfPayments) {
        perSemiMonthyearlyPayments.push([...semiMonthlyPayments]);
        semiMonthlyPayments.length = 0;
        accumulatedInterest = 0;
        accumulatedPrincipal = 0;
      }
    }

    setMonthlyPayment(
      isFinite(calculatedMonthlyPayment) ? calculatedMonthlyPayment : null
    );
    setBiWeeklyPayment(
      isFinite(calculatedBiWeeklyPayment) ? calculatedBiWeeklyPayment : null
    );
    setSemiMonthlyPayment(
      isFinite(calculatedSemiMonthlyPayment)
        ? calculatedSemiMonthlyPayment
        : null
    );
    setLoanAmount(isFinite(calculatedLoanAmount) ? calculatedLoanAmount : null);
    setTotalPaidMortgage(
      isFinite(calculatedTotalPaidMortgage) ? calculatedTotalPaidMortgage : null
    );
    setTotalInterestPaid(
      isFinite(calculatedTotalInterestPaid) ? calculatedTotalInterestPaid : null
    );

    setperMonthYearlyPayments(perMonthyearlyPayments);
    setperBiWeekYearlyPayments(perBiWeekyearlyPayments);
    setperSemiMonthYearlyPayments(perSemiMonthyearlyPayments);

    setSelectedProvince(selectedProvince);
  };

  const updateProvinceTaxAmount = (amount: number) => {
    setProvinceTax(amount);
  };

  const updateCityTaxAmount = (amount: number) => {
    setCityTax(amount);
  };

  const handleDownPaymentChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = (e.target as unknown as HTMLSelectElement).value;
    setDownPayment(value);

    if (downPaymentUnit === "%") {
      // Convert down payment if in percentage
      const downPaymentPercentage = parseFloat(value);
      const downPaymentInDollars = (principal * downPaymentPercentage) / 100;
      setTotalDownPayment(
        isFinite(downPaymentInDollars) ? downPaymentInDollars : null
      );
    } else {
      // Convert down payment to percentage
      const downPaymentInDollars = parseFloat(value);
      const downPaymentPercentage = (downPaymentInDollars / principal) * 100;
      setDownPayment(
        isFinite(downPaymentPercentage) ? downPaymentPercentage.toString() : ""
      );
      setTotalDownPayment(
        isFinite(downPaymentInDollars) ? downPaymentInDollars : null
      );
    }
  };

  // const handleDownPaymentUnitChange = (e: ChangeEvent<HTMLSelectElement>) => {
  //   const value = (e.target as HTMLSelectElement).value;
  //   setDownPaymentUnit(value);

  //   if (value === "%") {
  //     // Convert down payment to percentage
  //     const downPaymentPercentage = (parseFloat(downPayment) / principal) * 100;
  //     setDownPayment(
  //       isFinite(downPaymentPercentage) ? downPaymentPercentage.toString() : ""
  //     );
  //   } else {
  //     // Convert down payment to dollars
  //     const downPaymentInDollars = (parseFloat(downPayment) * principal) / 100;
  //     setDownPayment(
  //       isFinite(downPaymentInDollars) ? downPaymentInDollars.toString() : ""
  //     );
  //   }
  // };

  useEffect(() => {
    // Fetch provinces from backend API
    axios
      .get<Province[]>("http://localhost:5000/api/provinces")
      .then((response) => {
        setProvinces(response.data);
      })
      .catch((error) => {
        console.error("Error fetching provinces:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedProvince !== null) {
      axios
        .get<ProvinceCity[]>(
          `http://localhost:5000/api/cities/${selectedProvince}`
        )
        .then((response) => {
          console.log("Cities response:", response.data);
          const citiesArray = response.data[0].cities;
          setCities(citiesArray);
        })
        .catch((error) => {
          console.error("Error fetching cities:", error);
        });
    }
  }, [selectedProvince]);

  const handleProvinceChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const provinceId = parseInt(event.target.value);
    setSelectedProvince(provinceId);
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const cityId = parseInt(event.target.value);
    setSelectedCity(cityId);
  };

  const handleReset = () => {
    setPrincipal(0);
    setInterestRate(0);
    setLoanTerm(0);
    setDownPayment("");
    setDownPaymentUnit("%");
    setExtraPayment1("");
    setExtraPayment2("");
    setExtraPayment3("");
    setExtraPayment4("");
    setMonthlyPayment(null);
    setBiWeeklyPayment(null);
    setSemiMonthlyPayment(null);
    setTotalDownPayment(null);
    setLoanAmount(null);
    setTotalPaidMortgage(null);
    setTotalInterestPaid(null);
    setperMonthYearlyPayments(null);
    setperSemiMonthYearlyPayments(null);
    setperBiWeekYearlyPayments(null);
    setIsCalculated(false);
    setInputsDisabled(false);
    setSelectedProvince(null);
    setProvinceTax(null);
    setCityTax(null);
  };

  return (
    <div
      className={
        pageContext === "calculator" ? "flex flex-col lg:flex-row" : "flex-col"
      }
    >
      <div
        className={`border border-t-slate-500 border-t-4 border-gray-300 px-5 py-5 bg-slate-100 shadow-md ml-4 rounded-lg mb-10 ${
          pageContext === "calculator" ? "lg:w-1/3 lg:mb-0" : "w-full"
        }`}
      >
        <div className="font-medium text-center text-lg mb-4">
          Start Calculation
        </div>
        <MortgageForm
          principal={principal}
          interestRate={interestRate}
          loanTerm={loanTerm}
          downPayment={downPayment}
          extrapayment1={extraPayment1}
          extrapayment2={extraPayment2}
          extrapayment3={extraPayment3}
          extrapayment4={extraPayment4}
          onDownPaymentChange={handleDownPaymentChange}
          onInterestRateChange={setInterestRate}
          onLoanTermChange={setLoanTerm}
          onPrincipalChange={setPrincipal}
          onProvinceChange={handleProvinceChange}
          onCityChange={handleCityChange}
          selectedProvince={selectedProvince}
          inputsDisabled={inputsDisabled}
          provinces={provinces}
          cities={cities}
        />
        <div className="flex mt-4">
          <button
            className="cal-button text-center bg-sky-900 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded mr-2 w-1/2"
            onClick={handleCalculate}
            disabled={inputsDisabled}
          >
            Calculate
          </button>
          <button
            className="reset-button text-center bg-sky-800 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded w-1/2"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
      <div
        className={
          pageContext === "calculator"
            ? "flex-grow mx-2 bg-slate-300 p-8"
            : "w-full bg-green-200"
        }
      >
        <div className="mortgage-results-container">
          <MortgageResults
            totalDownPayment={totalDownPayment}
            monthlyPayment={monthlyPayment}
            biWeeklyPayment={biWeeklyPayment}
            semiMonthlyPayment={semiMonthlyPayment}
            loanAmount={loanAmount}
            totalPaidMortgage={totalPaidMortgage}
            totalInterestPaid={totalInterestPaid}
            perMonthyearlyPayments={perMonthyearlyPayments}
            perSemiMonthyearlyPayments={perSemiMonthyearlyPayments}
            perBiWeekyearlyPayments={perBiWeekyearlyPayments}
            isCalculated={isCalculated}
            provinceTax={provinceTax}
            cityTax={cityTax}
          />
          {isCalculated && (
            <>
              <ProvinceTaxCalculator
                selectedProvince={selectedProvince}
                principalAmount={principal}
                updateProvinceTaxAmount={updateProvinceTaxAmount}
              />
              <CityTaxCalculator
                selectedProvince={selectedProvince}
                selectedCity={selectedCity} // Pass selected city ID
                principalAmount={principal}
                updateCityTaxAmount={updateCityTaxAmount}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MortgageCalculator;
