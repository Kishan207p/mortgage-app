// CreateApplication.tsx
import React from "react";
import PDFUpload from "../../components/PDFUpload";

interface UploadDocumentsProps {
  // Define props here if any
}

const UploadDocuments: React.FC<UploadDocumentsProps> = () => {
  return (
    <div>
      <PDFUpload />
    </div>
  );
};

export default UploadDocuments;
