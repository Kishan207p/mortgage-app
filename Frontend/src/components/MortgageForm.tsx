import React, { useState } from "react";

interface Province {
  province_id: number;
  code: string;
  description: string;
}

interface City {
  city_id: number;
  description: string;
}

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
  provinces: Province[];
  cities: City[];
  selectedProvince: number | null;
  onProvinceChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onCityChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
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
  provinces,
  cities,
  selectedProvince,
  onProvinceChange,
  onCityChange,
}) => {
  const [showExtraFields, setShowExtraFields] = useState(false);

  return (
    <div className="font-medium font-sans">
      <div className="w-full">
        <label className="font-medium font-sans">Principal:</label>
        <input
          type="number"
          value={principal === 0 ? "" : principal}
          onChange={(e) => {
            if (e.target instanceof HTMLInputElement) {
              onPrincipalChange(Number(e.target.value));
            }
          }}
          disabled={inputsDisabled}
          className="w-full mb-2 border border-gray-500 rounded-md px-1"
        />
      </div>

      <div className="w-full">
        <label>Interest Rate:</label>
        <input
          type="number"
          value={interestRate === 0 ? "" : interestRate}
          onChange={(e) => {
            if (e.target instanceof HTMLInputElement) {
              onInterestRateChange(Number(e.target.value));
            }
          }}
          disabled={inputsDisabled}
          className="w-full mb-2 border border-gray-500 rounded-md px-1"
        />
      </div>

      <div className="w-full">
        <label>Loan Term:</label>
        <input
          type="number"
          value={loanTerm === 0 ? "" : loanTerm}
          onChange={(e) => {
            if (e.target instanceof HTMLInputElement) {
              onLoanTermChange(Number(e.target.value));
            }
          }}
          disabled={inputsDisabled}
          className="w-full mb-2 border border-gray-500 rounded-md px-1"
        />
      </div>

      <div className="w-4/5 mb-3">
        <label>Down Payment:</label>
        <div className="flex">
          <input
            type="text"
            value={downPayment}
            onChange={(e) => {
              if (!inputsDisabled) {
                onDownPaymentChange(e);
              }
            }}
            disabled={inputsDisabled}
            className="w-4/5 mb-2 mr-2 border border-gray-500 rounded-md px-1"
          />
          <select
            value={downPaymentUnit}
            onChange={(e) => {
              if (!inputsDisabled) {
                onDownPaymentUnitChange(e);
              }
            }}
            disabled={inputsDisabled}
            className="w-1/5 rounded-md mt-[-4] border border-gray-500 "
          >
            <option value="%">%</option>
            <option value="$">$</option>
          </select>
        </div>
      </div>

      <div className="w-full flex flex-col mb-3">
        <div className="flex">
          <div className="w-1/2 mr-2">
            <label>Province:</label>
            <select
              value={selectedProvince ?? ""}
              onChange={onProvinceChange}
              disabled={inputsDisabled}
              className="w-full border rounded-md font-normal"
            >
              <option value="">Select Province</option>
              {provinces.map((province) => (
                <option key={province.province_id} value={province.province_id}>
                  {province.description}
                </option>
              ))}
            </select>
          </div>
          <div className="w-1/2 ml-2">
            <label>City:</label>
            <select
              disabled={!selectedProvince || inputsDisabled}
              onChange={onCityChange}
              className="w-full border rounded-md font-normal"
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city.city_id} value={city.city_id}>
                  {city.description}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {showExtraFields && (
        <>
          <label>Extra1:</label>
          <input
            type="number"
            value={Number(extrapayment1).toString()}
            disabled={inputsDisabled}
            className="w-full mb-2 border border-gray-500 rounded-md"
          />

          <label>Extra2:</label>
          <input
            type="number"
            value={Number(extrapayment2).toString()}
            disabled={inputsDisabled}
            className="w-full mb-2 border border-gray-500 rounded-md"
          />

          <label>Extra3:</label>
          <input
            type="number"
            value={Number(extrapayment3).toString()}
            disabled={inputsDisabled}
            className="w-full mb-2 border border-gray-500 rounded-md"
          />

          <label>Extra4:</label>
          <input
            type="number"
            value={Number(extrapayment4).toString()}
            disabled={inputsDisabled}
            className="w-full mb-2 border border-gray-500 rounded-md"
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
