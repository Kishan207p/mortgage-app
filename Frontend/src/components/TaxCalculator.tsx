import React, { useEffect, useState } from "react";
import axios from "axios";

interface ProvinceTaxData {
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

interface pro_ProvinceTaxData {
  province_id: number;
  province_tax: ProvinceTaxData;
}

interface TaxBracket {
  from: number;
  to: number | null;
  fixed_amt: number;
  rate: number;
}

interface TaxCalculatorProps {
  selectedProvince: number | null;
  principalAmount: number;
  updateTaxAmount: (taxAmount: number) => void; // Add updateTaxAmount prop
}

const TaxCalculator: React.FC<TaxCalculatorProps> = ({
  selectedProvince,
  principalAmount,
  updateTaxAmount, // Receive updateTaxAmount as prop
}) => {
  const [_taxAmount, setTaxAmount] = useState<number>(0);

  useEffect(() => {
    if (selectedProvince) {
      axios
        .get<pro_ProvinceTaxData[]>(
          `http://localhost:5000/api/provinceTax/${selectedProvince}`
        )
        .then((response) => {
          const provinceTaxData = response.data[0].province_tax;
          console.log(provinceTaxData);

          let tax = 0;

          if (provinceTaxData) {
            const { land_transfer_tax, property_registration_tax } =
              provinceTaxData;

            // Calculate land transfer tax
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

          setTaxAmount(tax);
          updateTaxAmount(tax);
        })
        .catch((error) => {
          console.error("Error fetching tax data:", error);
        });
    }
  }, [selectedProvince, principalAmount, updateTaxAmount]);

  return null;
};

export default TaxCalculator;
