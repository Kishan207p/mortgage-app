// DocumentPage.tsx
import React, { useState } from 'react';
import Steps from '../components/step';
import CreateApplication from '../components/phases/CreateApplication';
import CreditCheck from '../components/phases/CreditCheck';
import UploadDocuments from '../components/phases/UploadDocuments';
import LoanProcessing from '../components/phases/LoanProcessing';
import Underwriting from '../components/phases/Underwriting';
import RiskAssessment from '../components/phases/RiskAssessment';
import ConditionallyApproved from '../components/phases/ConditionallyApproved';
import ClearToClose from '../components/phases/ClearToClose';
import Closing from '../components/phases/Closing';
import LoanFunded from '../components/phases/LoanFunded';
import { IoCreateOutline } from "react-icons/io5";

const DocumentPage: React.FC = () => {
  //const navigate = useNavigate();
  const [steps, setSteps] = useState([
    { path: "/", name: <IoCreateOutline />, completed: false },
    { path: "/creditcheck", name: "Credit Check", completed: false },
    { path: "/upload-documents", name: "Upload Documents", completed: false },
    { path: "/loan-processing", name: "Loan Processing", completed: false },
    { path: "/underwriting", name: "Underwriting", completed: false },
    { path: "/risk-assessment", name: "Risk Assessment", completed: false },
    { path: "/conditionally-approved", name: "Conditionally Approved", completed: false },
    { path: "/clear-to-close", name: "Clear To Close", completed: false },
    { path: "/closing", name: "Closing", completed: false },
    { path: "/loan-funded", name: "Loan Funded", completed: false }
  ]);

  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      const updatedSteps = [...steps];
      updatedSteps[currentStep].completed = true;
      setSteps(updatedSteps);
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      const updatedSteps = [...steps];
      updatedSteps[currentStep].completed = false;
      setSteps(updatedSteps);
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <>
      <Steps 
        currentStep={currentStep} 
        steps={steps} 
        handleNext={handleNextStep} 
        handlePrevious={handlePreviousStep} 
      />
      {currentStep === 0 && <CreateApplication />}
      {currentStep === 1 && <CreditCheck />}
      {currentStep === 2 && <UploadDocuments />}
      {currentStep === 3 && <LoanProcessing />}
      {currentStep === 4 && <Underwriting />}
      {currentStep === 5 && <RiskAssessment />}
      {currentStep === 6 && <ConditionallyApproved />}
      {currentStep === 7 && <ClearToClose />}
      {currentStep === 8 && <Closing />}
      {currentStep === 9 && <LoanFunded />}
    </>
  );
};

export default DocumentPage;
