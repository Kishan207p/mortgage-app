import React from "react";

interface StepProps {
  currentStep: number;
  steps: { name: any; completed: boolean; path: string }[];
  handleNext: () => void;
  handlePrevious: () => void;
}

const Steps: React.FC<StepProps> = ({ currentStep, steps, handleNext, handlePrevious }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-between w-full">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className={`w-12 h-12 flex items-center justify-center rounded-full border-2 ${index <= currentStep ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}`}>
              <span className={`text-lg ${index <= currentStep ? 'text-white' : 'text-gray-500'}`}>{index + 1}</span>
            </div>
            {index !== steps.length - 1 && (
              <div className="h-1 w-full bg-gray-300"></div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="flex items-center justify-between w-full">
        {steps.map((step, index) => (
          <span key={index} className={`text-xs ${index === currentStep ? 'text-blue-500' : 'text-gray-500'}`}>
            {index === currentStep ? step.name : ''}
          </span>
        ))}
      </div>
      <div className="mt-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handlePrevious} disabled={currentStep === 0}>
          Previous
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleNext} disabled={currentStep === steps.length - 1}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Steps;
