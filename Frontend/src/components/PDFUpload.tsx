//src/components/PDFUpload_Copy_3.tsx

/*This is a copy of PDFUpload.tsx. This is fetching types from MongoDB.*/

import React, { useState, useEffect } from "react";
interface PDFUploadProps {
  // Add any props if needed
}

interface DocumentType {
  _id: string;
  "Document Type": string[];
}

interface PDFFileInfo {
  selectedPdfType: string;
  pdfFile: File | null;
  uploadProgress: number;
  isUploading: boolean;
  isLoading: boolean;
}

const PDFUpload: React.FC<PDFUploadProps> = () => {
  const [pdfFiles, setPdfFiles] = useState<PDFFileInfo[]>([]);
  const [selectedPdfIndex, setSelectedPdfIndex] = useState<number | null>(null);
  const [showPdf, setShowPdf] = useState<boolean>(false); // To control visibility of iFrame
  const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([]);

  useEffect(() => {
    fetchDocumentTypes();
  }, []);

  const fetchDocumentTypes = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/documents");
      const data = await response.json();
      setDocumentTypes(data.documentTypes);
    } catch (error) {
      console.error("Error fetching document types:", error);
    }
  };

  const handleAddCard = () => {
    setPdfFiles([
      ...pdfFiles,
      {
        selectedPdfType: "",
        pdfFile: null,
        uploadProgress: 0,
        isUploading: false,
        isLoading: false,
      },
    ]);
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const updatedFiles = [...pdfFiles]; // Create a new array
      updatedFiles[index] = { ...updatedFiles[index], pdfFile: files[0] }; // Update the specific element
      setPdfFiles(updatedFiles); // Update the state
    }
  };

  const handleUpload = (index: number) => {
    const { selectedPdfType, pdfFile } = pdfFiles[index];
    if (!selectedPdfType || !pdfFile) {
      alert("Please select a document type and choose a file.");
      return;
    }

    // Check if the file is a PDF
    if (pdfFile.type !== "application/pdf") {
      alert("Only PDF files are allowed to upload. Please choose a PDF file.");
      return;
    }
    if (!selectedPdfType || !pdfFile) return;

    const updatedFiles = [...pdfFiles];
    updatedFiles[index].isLoading = true;
    setPdfFiles(updatedFiles);

    // Simulate progress animation
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      if (progress >= 100) {
        clearInterval(interval);
        updatedFiles[index].isUploading = false;
        updatedFiles[index].isLoading = false;
        setShowPdf(true); // Show iFrame after upload completes
      }
      updatedFiles[index].uploadProgress = progress;
      setPdfFiles([...updatedFiles]); // Update the state outside the interval
    }, 50);
  };

  const handleRemoveCard = (index: number) => {
    const updatedFiles = [...pdfFiles];
    updatedFiles.splice(index, 1);
    setPdfFiles(updatedFiles);
  };

  const handlePDFSelect = (
    event: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const updatedFiles = [...pdfFiles];
    updatedFiles[index].selectedPdfType = event.target.value;
    setPdfFiles(updatedFiles);
  };

  const handleViewToggle = (index: number) => {
    if (selectedPdfIndex === index && showPdf) {
      setSelectedPdfIndex(null);
      setShowPdf(false);
    } else {
      setSelectedPdfIndex(index);
      setShowPdf(true);
    }
  };
  return (
    <div className="flex">
      <div className="w-full">
        <div className="max-h-[600px] overflow-y-auto pr-4">
          {/* Limit height and make it scrollable */}
          {pdfFiles.map((pdf, index) => (
            <div key={index} className="flex mb-4">
              <div
                className=" p-4 border border-gray-300 rounded-lg w-max"
                style={{ paddingRight: "0px" }}
              >
                <h3 className="text-lg font-semibold mb-4">Upload PDF</h3>
                <div className="flex items-center mb-4">
                  {documentTypes.length > 0 && (
                    <select
                      value={pdf.selectedPdfType}
                      onChange={(event) => handlePDFSelect(event, index)}
                      className="mr-2 select-dropdown"
                    >
                      <option value="Default">Select Document Type</option>
                      {documentTypes[0]["Document Type"].map((type: string) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  )}

                  <input
                    type="file"
                    onChange={(event) => handleFileChange(event, index)}
                    className="input-margin"
                  />
                </div>
                <div>
                  <button
                    onClick={() => handleUpload(index)}
                    disabled={pdf.isLoading}
                    className={`mr-2 px-4 py-2 rounded-md ${
                      pdf.isLoading ? "button-disabled" : ""
                    }`}
                  >
                    Upload
                  </button>
                  <button
                    onClick={() => handleViewToggle(index)}
                    disabled={pdf.isLoading || !pdf.pdfFile}
                    className={`mr-2 px-4 py-2 rounded-md ${
                      pdf.isLoading || !pdf.pdfFile ? "button-disabled" : ""
                    }`}
                  >
                    {selectedPdfIndex === index && showPdf ? "Close" : "View"}
                  </button>
                  <button
                    onClick={() => handleRemoveCard(index)}
                    disabled={pdf.isLoading}
                    className={`px-4 py-2 rounded-md ${
                      pdf.isLoading ? "button-disabled" : ""
                    }`}
                  >
                    Remove Card
                  </button>
                </div>
                {pdf.isLoading && (
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-lg overflow-hidden">
                      <div
                        className="bg-blue-500 h-3"
                        style={{ width: `${pdf.uploadProgress}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {pdf.uploadProgress}% uploaded
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div className="button-container">
            <button
              onClick={handleAddCard}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Add Card
            </button>
          </div>
        </div>
      </div>
      <div className="w-max">
        {selectedPdfIndex !== null &&
          showPdf &&
          pdfFiles[selectedPdfIndex]?.pdfFile && (
            <iframe
              src={
                pdfFiles[selectedPdfIndex]?.pdfFile
                  ? URL.createObjectURL(
                      pdfFiles[selectedPdfIndex]?.pdfFile as Blob
                    )
                  : ""
              }
              className="w-[600px] h-[600px] border-none"
               /* Apply specific height and width */
            />
          )}
      </div>
    </div>
  );
};

export default PDFUpload;
