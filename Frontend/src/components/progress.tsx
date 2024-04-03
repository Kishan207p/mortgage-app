import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Steps from './step';
import CreateApplication from './phases/CreateApplication';
import CreditCheck from './phases/CreditCheck';
import UploadDocuments from './phases/UploadDocuments';
import LoanProcessing from './phases/LoanProcessing';
import Underwriting from './phases/Underwriting';
import RiskAssessment from './phases/RiskAssessment';
import ConditionallyApproved from './phases/ConditionallyApproved';
import ClearToClose from './phases/ClearToClose';
import Closing from './phases/Closing';
import LoanFunded from './phases/LoanFunded';

interface StepProps {
  currentStep: number;
  steps: { name: string; completed: boolean; path: string }[];
  handleNext: () => void;
  handlePrevious: () => void;
}

const Progress: React.FC<StepProps> = ({ currentStep, steps, handleNext, handlePrevious }) => {
  return (
    <div>
      <Steps 
        currentStep={currentStep} 
        steps={steps}
        handleNext={handleNext} 
        handlePrevious={handlePrevious} 
      />
      <Routes>
        <Route path="/" element={<CreateApplication />} />
        <Route path="/credit-check" element={<CreditCheck />} />
        <Route path="/upload-documents" element={<UploadDocuments />} />
        <Route path="/loan-processing" element={<LoanProcessing />} />
        <Route path="/underwriting" element={<Underwriting />} />
        <Route path="/risk-assessment" element={<RiskAssessment />} />
        <Route path="/conditionally-approved" element={<ConditionallyApproved />} />
        <Route path="/clear-to-close" element={<ClearToClose />} />
        <Route path="/closing" element={<Closing />} />
        <Route path="/loan-funded" element={<LoanFunded />} />
      </Routes>
    </div>
  );
};

export default Progress;
