import React from "react";

interface StepProps {
  currentStep: number;
  steps: { name: string; completed: boolean; path: string }[];
  handleNext: () => void;
  handlePrevious: () => void;
}

const Steps: React.FC<StepProps> = ({ currentStep, steps, handleNext, handlePrevious }) => {
  return (
    <div>
      <h2>Steps</h2>
      <div className="flex items-center space-x-8">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            {index !== 0 && (
              <div className={`absolute left-${index}/18 top-1/2 transform -translate-y-1/2 h-2 w-${100 / (steps.length - 1)}% bg-gray-300 ${step.completed ? 'bg-blue-500' : ''}`}></div>
            )}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-white text-gray-900 border-2 border-blue-500 ${step.completed ? 'bg-blue-500 text-white' : ''}`}>
              {step.completed ? "✔" : index + 1}
            </div>
            <span className={`mt-1 ${step.completed ? 'text-green' : 'text-black'}`}>{step.name}</span>
          </React.Fragment>
        ))}
      </div>
      <div>
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
