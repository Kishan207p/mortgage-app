import React, { useState } from "react";

interface MortgageFormProps {
  principal: number;
  interestRate: number;
  loanTerm: number;
  downPayment: string;
  downPaymentUnit: string;
  extrapayment1: string;
  extrapayment2: string;
  extrapayment3: string;
  extrapayment4: string;
  onDownPaymentChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  onDownPaymentUnitChange: (
    value: React.ChangeEvent<HTMLSelectElement>
  ) => void;
  onInterestRateChange: (value: number) => void;
  onLoanTermChange: (value: number) => void;
  onPrincipalChange: (value: number) => void;
  inputsDisabled: boolean;
}

const MortgageForm: React.FC<MortgageFormProps> = ({
  principal,
  interestRate,
  loanTerm,
  downPayment,
  downPaymentUnit,
  extrapayment1,
  extrapayment2,
  extrapayment3,
  extrapayment4,
  onDownPaymentChange,
  onDownPaymentUnitChange,
  onInterestRateChange,
  onLoanTermChange,
  onPrincipalChange,
  inputsDisabled,
}) => {
  const [showExtraFields, setShowExtraFields] = useState(false);

  return (
    <div className="mortgage-form">
      <label>Principal:</label>
      <input
        type="number"
        value={principal}
        onChange={(e) => {
          if (e.target instanceof HTMLInputElement) {
            onPrincipalChange(Number(e.target.value));
          }
        }}
        disabled={inputsDisabled}
      />

      <label>Interest Rate:</label>
      <input
        type="number"
        value={interestRate}
        onChange={(e) => {
          if (e.target instanceof HTMLInputElement) {
            onInterestRateChange(Number(e.target.value));
          }
        }}
        disabled={inputsDisabled}
      />

      <label>Loan Term:</label>
      <input
        type="number"
        value={loanTerm}
        onChange={(e) => {
          if (e.target instanceof HTMLInputElement) {
            onLoanTermChange(Number(e.target.value));
          }
        }}
        disabled={inputsDisabled}
      />

      <label>Down Payment:</label>
      <div className="down-payment-container">
        <input
          type="text"
          value={downPayment}
          onChange={(e) => {
            if (!inputsDisabled) {
              onDownPaymentChange(e);
            }
          }}
          disabled={inputsDisabled}
        />
        <select
          value={downPaymentUnit}
          onChange={(e) => {
            if (!inputsDisabled) {
              onDownPaymentUnitChange(e);
            }
          }}
          disabled={inputsDisabled}
        >
          <option value="%">%</option>
          <option value="$">$</option>
        </select>
      </div>

      {showExtraFields && (
        <>
          <label>Extra1:</label>
          <input
            type="number"
            value={extrapayment1}
            disabled={inputsDisabled}
          />

          <label>Extra2:</label>
          <input
            type="number"
            value={extrapayment2}
            disabled={inputsDisabled}
          />

          <label>Extra3:</label>
          <input
            type="number"
            value={extrapayment3}
            disabled={inputsDisabled}
          />

          <label>Extra4:</label>
          <input
            type="number"
            value={extrapayment4}
            disabled={inputsDisabled}
          />
        </>
      )}

      <div
        className="show-more-text"
        onClick={() => setShowExtraFields(!showExtraFields)}
      >
        {showExtraFields ? "Show Less" : "More"}
      </div>
    </div>
  );
};

export default MortgageForm;
