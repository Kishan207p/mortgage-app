// CreateApplication.tsx
import React from "react";
import PDFUpload from "../../components/PDFUpload";

interface UploadDocumentsProps {
  // Define props here if any
}

const UploadDocuments: React.FC<UploadDocumentsProps> = () => {
  return (
    <div>
      <main className="w-full flex-grow">
        <div className="container mx-auto px-2 py-8">
          <PDFUpload />
        </div>
      </main>{" "}
    </div>
  );
};

export default UploadDocuments;
