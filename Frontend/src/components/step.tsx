import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoCreateOutline, IoDocumentsOutline } from "react-icons/io5";
import { MdCreditScore } from "react-icons/md";
import { BsUpload, BsPen } from "react-icons/bs";
import { BiFolder } from "react-icons/bi";
import { GiHouseKeys } from "react-icons/gi";
import { GoIssueClosed } from "react-icons/go";
import { BiHome } from "react-icons/bi";
import { MdAssessment } from "react-icons/md";

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
  <MdAssessment />,
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

  const handlePreviousStep = () => {
    if (completedSteps.includes(currentStep)) {
      setCompletedSteps(completedSteps.filter((step) => step !== currentStep));
    }
    handlePrevious();
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      const updatedSteps = [...steps];
      updatedSteps[currentStep].completed = true;
      setCompletedSteps([...completedSteps, currentStep]);
      handleNext();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-between w-4/5">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-full border-2 ${
                index <= currentStep
                  ? "bg-blue-500 border-blue-500"
                  : "border-gray-300"
              }`}
            >
              <span
                className={`text-lg ${
                  index <= currentStep ? "text-white" : "text-gray-500"
                }`}
              >
                {completedSteps.includes(index) ? (
                  <FaCheck style={{ color: "white" }} />
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
      <div className="flex items-center justify-between w-4/5 mt-2">
        {steps.map((step, index) => (
          <span
            key={index}
            className={`text-center w-12 ${
              index === currentStep ? "text-blue-500" : "text-gray-500"
            }`}
          >
            {index === currentStep && (
              <div style={{ maxWidth: "100%", textAlign: "center" }}>
                {step.name}
              </div>
            )}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Steps;
