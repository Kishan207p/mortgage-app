import React, { useEffect, useState } from "react";
import axios from "axios";

interface CityTaxData {
  land_transfer_tax?: {
    tax_brackets: TaxBracket[];
  };
  property_registration_tax?: {
    property_tax?: {
      tax_brackets: TaxBracket[];
    };
    mortgage_tax?: {
      tax_brackets: TaxBracket[];
    };
  };
}

interface TaxBracket {
  from: number;
  to: number | null;
  fixed_amt: number;
  rate: number;
}

interface CityTaxBracket {
  city_id: number;
  city_tax: CityTaxData;
}

interface CityTaxCalculatorProps {
  selectedProvince: number | null;
  selectedCity: number | null;
  principalAmount: number;
  updateCityTaxAmount: (taxAmount: number) => void;
}

const CityTaxCalculator: React.FC<CityTaxCalculatorProps> = ({
  selectedProvince,
  selectedCity,
  principalAmount,
  updateCityTaxAmount,
}) => {
  const [_cityTaxAmount, setCityTaxAmount] = useState<number>(0);

  useEffect(() => {
    const fetchCityTaxData = async () => {
      if (selectedProvince && selectedCity) {
        try {
          const response = await axios.get<CityTaxBracket>(
            `http://localhost:5000/api/cityTax/${selectedProvince}/${selectedCity}`
          );
          const cityTaxData = response.data.city_tax;
          console.log(response.data);

          let tax = 0;

          if (cityTaxData) {
            const { land_transfer_tax, property_registration_tax } =
              cityTaxData;

            if (land_transfer_tax) {
              const landTransferTaxBracket =
                land_transfer_tax.tax_brackets.find((bracket: TaxBracket) => {
                  return (
                    principalAmount >= bracket.from &&
                    (bracket.to === null || principalAmount <= bracket.to)
                  );
                });

              if (landTransferTaxBracket) {
                tax +=
                  landTransferTaxBracket.fixed_amt +
                  (principalAmount - landTransferTaxBracket.from) *
                    landTransferTaxBracket.rate;
              }
            }

            // Calculate property registration tax
            if (property_registration_tax) {
              const propertyTax = property_registration_tax.property_tax;
              if (propertyTax) {
                const propertyTaxBracket = propertyTax.tax_brackets.find(
                  (bracket: TaxBracket) => {
                    return (
                      principalAmount >= bracket.from &&
                      (bracket.to === null || principalAmount <= bracket.to)
                    );
                  }
                );

                if (propertyTaxBracket) {
                  tax +=
                    propertyTaxBracket.fixed_amt +
                    (principalAmount - propertyTaxBracket.from) *
                      propertyTaxBracket.rate;
                }
              }

              const mortgageTax = property_registration_tax.mortgage_tax;
              if (mortgageTax) {
                const mortgageTaxBracket = mortgageTax.tax_brackets.find(
                  (bracket: TaxBracket) => {
                    return (
                      principalAmount >= bracket.from &&
                      (bracket.to === null || principalAmount <= bracket.to)
                    );
                  }
                );

                if (mortgageTaxBracket) {
                  tax +=
                    mortgageTaxBracket.fixed_amt +
                    (principalAmount - mortgageTaxBracket.from) *
                      mortgageTaxBracket.rate;
                }
              }
            }
          }

          console.log(tax);

          setCityTaxAmount(tax);
          updateCityTaxAmount(tax);
        } catch (error) {
          console.error("Error fetching city tax data:", error);
        }
      }
    };

    fetchCityTaxData();
  }, [selectedProvince, selectedCity, principalAmount, updateCityTaxAmount]);

  return null;
};

export default CityTaxCalculator;
