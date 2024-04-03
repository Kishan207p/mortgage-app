import React, { useState } from 'react';
import Progress from '../components/progress';


const DocumentPage: React.FC = () => {
  const [steps, setSteps] = useState([
    { path: "/", name: "Create Application", completed: false },
    { path: "/credit-check", name: "Credit Check", completed: false },
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
    <Progress 
      currentStep={currentStep} 
      steps={steps} 
      handleNext={handleNextStep} 
      handlePrevious={handlePreviousStep} 
    />
  );
};

export default DocumentPage;
