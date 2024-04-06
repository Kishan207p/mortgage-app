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
  steps: { name: string; completed: boolean; path: string }[];
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
      <div className="flex items-center">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center">
              <div
                className={`w-100px h-50px flex items-center justify-center rounded-full border-8 ${
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
            </div>
            <span className="text-xs mt-2 text-center whitespace-wrap">
              {step.name}
            </span>
            {index !== steps.length - 1 && (
              <div
                className={`h-1 w-16 ${
                  index + 1 <= currentStep ? "bg-blue-500" : "bg-gray-300"
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Steps;
