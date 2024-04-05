import React, { useState } from "react";
import { IoCreateOutline, IoDocumentsOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { MdCreditScore } from "react-icons/md";
import { BsUpload, BsPen } from "react-icons/bs";
import { BiFolder } from "react-icons/bi";
import { GiHouseKeys } from "react-icons/gi";
import { GoIssueClosed } from "react-icons/go";
import { BiHome } from "react-icons/bi";

interface StepProps {
  currentStep: number;
  steps: { name: any; completed: boolean; path: string }[];
  handleNext: () => void;
  handlePrevious: () => void;
}

const ioCreateArray: JSX.Element[] = [
  <IoCreateOutline />,
  <MdCreditScore />,
  <BsUpload />,
  <BiFolder />,
  <BsPen />,
  <IoDocumentsOutline />,
  <GiHouseKeys />,
  <GoIssueClosed />,
  <BiHome />,
  <IoCreateOutline />,
];

const Steps: React.FC<StepProps> = ({
  currentStep,
  steps,
  handleNext,
  handlePrevious,
}) => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const toggleCompletion = (index: number) => {
    if (completedSteps.includes(index)) {
      setCompletedSteps(completedSteps.filter((step) => step !== index));
    } else {
      setCompletedSteps([...completedSteps, index]);
    }
  };

  const handlePreviousStep = () => {
    // If the current step was marked as completed, unmark it
    if (completedSteps.includes(currentStep)) {
      setCompletedSteps(completedSteps.filter((step) => step !== currentStep));
    }
    handlePrevious();
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-between w-4/5">
        {steps.map((_step, index) => (
          <React.Fragment key={index}>
            <div
              className={`w-7/12 h-12 flex items-center justify-center rounded-full border-2 ${
                index <= currentStep
                  ? "bg-blue-500 border-blue-500"
                  : "border-gray-300"
              }`}
              onClick={() => toggleCompletion(index)}
            >
              <span
                className={`text-lg ${
                  index <= currentStep ? "text-white" : "text-gray-500"
                }`}
              >
                {completedSteps.includes(index) ? (
                  <FaCheck />
                ) : (
                  ioCreateArray[index]
                )}
              </span>
            </div>
            {index !== steps.length - 1 && (
              <div
                className={`h-1 w-full ${
                  index + 1 <= currentStep ? "bg-blue-500" : "bg-gray-300"
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="flex items-center justify-between w-4/5">
        {steps.map((step, index) => (
          <span
            key={index}
            className={`text-center ${
              index === currentStep ? "text-blue-500" : "text-gray-500"
            }`}
          >
            {index === currentStep ? step.name : ""}
          </span>
        ))}
      </div>
      <div className="mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handlePreviousStep}
          disabled={currentStep === 0}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => {
            toggleCompletion(currentStep);
            handleNext();
          }}
          disabled={currentStep === steps.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Steps;
