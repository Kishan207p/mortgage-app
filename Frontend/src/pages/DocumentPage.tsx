import React, { useState } from "react";
import Steps from "../components/step";
import CreateApplication from "../components/phases/CreateApplication";
import CreditCheck from "../components/phases/CreditCheck";
import UploadDocuments from "../components/phases/UploadDocuments";
import LoanProcessing from "../components/phases/LoanProcessing";
import Underwriting from "../components/phases/Underwriting";
import RiskAssessment from "../components/phases/RiskAssessment";
import ConditionallyApproved from "../components/phases/ConditionallyApproved";
import ClearToClose from "../components/phases/ClearToClose";
import Closing from "../components/phases/Closing";
import LoanFunded from "../components/phases/LoanFunded";
import { IoCreateOutline } from "react-icons/io5";
import Header from "../components/Header";

const DocumentPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { path: "/", name: "Create Application", completed: false },
    { path: "/creditcheck", name: "Credit Check", completed: false },
    { path: "/upload-documents", name: "Upload Documents", completed: false },
    { path: "/loan-processing", name: "Loan Processing", completed: false },
    { path: "/underwriting", name: "Underwriting", completed: false },
    { path: "/risk-assessment", name: "Risk Assessment", completed: false },
    {
      path: "/conditionally-approved",
      name: "Conditionally Approved",
      completed: false,
    },
    { path: "/clear-to-close", name: "Clear To Close", completed: false },
    { path: "/closing", name: "Closing", completed: false },
    { path: "/loan-funded", name: "Loan Funded", completed: false },
  ];

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <CreateApplication />;
      case 1:
        return <CreditCheck />;
      case 2:
        return <UploadDocuments />;
      case 3:
        return <LoanProcessing />;
      case 4:
        return <Underwriting />;
      case 5:
        return <RiskAssessment />;
      case 6:
        return <ConditionallyApproved />;
      case 7:
        return <ClearToClose />;
      case 8:
        return <Closing />;
      case 9:
        return <LoanFunded />;
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-2 py-8">
        <Steps
          currentStep={currentStep}
          steps={steps}
          handleNext={handleNextStep}
          handlePrevious={handlePreviousStep}
        />
        
        {renderCurrentStep()}
        
        <div className="fixed bottom-4 right-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded mr-4"
            onClick={handlePreviousStep}
            disabled={currentStep === 0}
          >
            Previous
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleNextStep}
            disabled={currentStep === steps.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default DocumentPage;
