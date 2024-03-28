import React, { useEffect, useState } from "react";
import axios from "axios";

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
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<number | null>(null);

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
      // Fetch cities for the selected province from backend API
      axios
        .get<City[]>(`http://localhost:5000/api/cities/${selectedProvince}`)
        .then((response) => {
          setCities(response.data);
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

      <label>Province:</label>
      <select
        value={selectedProvince ?? ""}
        onChange={handleProvinceChange}
        disabled={inputsDisabled}
      >
        <option value="">Select Province</option>
        {provinces.map((province) => (
          <option key={province.province_id} value={province.province_id}>
            {province.description}
          </option>
        ))}
      </select>

      <label>City:</label>
      <select disabled={!selectedProvince || inputsDisabled}>
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.city_id} value={city.city_id}>
            {city.description}
          </option>
        ))}
      </select>

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
