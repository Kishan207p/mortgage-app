import React from "react";

interface StepProps {
  currentStep: number;
  steps: { name: string; completed: boolean; path: string }[];
  handleNext: () => void;
  handlePrevious: () => void;
}

const Steps: React.FC<StepProps> = ({ currentStep, steps, handleNext, handlePrevious }) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-center">Multi-modal</h2>
      <div className="flex items-center justify-between w-full mb-4">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${index === currentStep ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}`}>
              {step.completed ? "✔" : index + 1}
            </div>
            <span className={`mt-2 ${index === currentStep ? 'text-blue-500' : 'text-gray-500'}`}>{step.name}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between w-full">
      {steps.map((step, index) => (
          <React.Fragment key={index}>
            {index !== 0 && 
              <React.Fragment>
                <div className={`h-1 w-8 ${index <= currentStep ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                <div className="flex items-center justify-center">
                  <div className={`w-6 h-6 flex items-center justify-center rounded-full border-2 ${index <= currentStep ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}`}>
                    <span className={`text-xs ${index <= currentStep ? 'text-white' : 'text-gray-500'}`}>{index}</span>
                  </div>
                </div>
              </React.Fragment>
            }
          </React.Fragment>
        ))}
      </div>
      <div className="flex items-center justify-between w-full">
        {steps.map((step, index) => (
          <span key={index} className={`text-xs ${index === currentStep ? 'text-blue-500' : 'text-gray-500'}`}>{step.name}</span>
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
