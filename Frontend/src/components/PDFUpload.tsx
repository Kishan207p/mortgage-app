import React, { useState, useEffect } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaFileUpload,
  FaRegTrashAlt,
  FaPlus,
} from "react-icons/fa";
import Swal from "sweetalert2";

interface PDFUploadProps {}

interface DocumentType {
  _id: string;
  "Document Type": string[];
}

interface PDFFileInfo {
  isUploaded: boolean;
  selectedPdfType: string;
  pdfFile: File | null;
  uploadProgress: number;
  isUploading: boolean;
  isLoading: boolean;
  fileName: string;
}

const PDFUpload: React.FC<PDFUploadProps> = () => {
  const [pdfFiles, setPdfFiles] = useState<PDFFileInfo[]>([]);
  const [selectedPdfIndex, setSelectedPdfIndex] = useState<number | null>(null);
  const [showPdf, setShowPdf] = useState<boolean>(false);
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
    const newCard = {
      selectedPdfType: "",
      pdfFile: null,
      uploadProgress: 0,
      isUploading: false,
      isLoading: false,
      fileName: "",
      isUploaded: false,
    };

    setPdfFiles((prevPdfFiles) => [...prevPdfFiles, newCard]);
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileName = files[0].name;

      // Create or get the existing span element
      let fileElement = document.getElementById(`file-name-${index}`);
      if (!fileElement) {
        fileElement = document.createElement("span");
        fileElement.id = `file-name-${index}`;
        const container = document.getElementById(`file-container-${index}`);
        if (container) {
          container.appendChild(fileElement);
        }
      }

      // Update the content of the span element with the file name
      if (fileElement) {
        fileElement.textContent = fileName;
      }

      const updatedFiles = [...pdfFiles];
      updatedFiles[index] = {
        ...updatedFiles[index],
        pdfFile: files[0],
        fileName: fileName,
      };
      setPdfFiles(updatedFiles);
    }
  };

  const handleUpload = (index: number) => {
    const { selectedPdfType, pdfFile } = pdfFiles[index];
    if (!selectedPdfType) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Please select a document type and upload a PDF document!",
      });
      return;
    }

    if (!pdfFile) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Please choose a document to upload!",
        footer:
          "Document file is required to proceed further with your application.",
      });
      return;
    }

    if (pdfFile.type !== "application/pdf") {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Please choose only PDF documents!",
        footer:
          "PDFs can efficiently compress large files without compromising the quality of the content",
      });
      return;
    }

    const updatedFiles = [...pdfFiles];
    updatedFiles[index].isLoading = true;
    setPdfFiles(updatedFiles);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      if (progress >= 100) {
        clearInterval(interval);
        updatedFiles[index].isUploading = false;
        updatedFiles[index].isLoading = false;
        updatedFiles[index].isUploaded = true;
        setShowPdf(true);
      }
      updatedFiles[index].uploadProgress = progress;
      setPdfFiles([...updatedFiles]);
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
    updatedFiles[index].pdfFile = null; // Clear the selected PDF file
    setPdfFiles(updatedFiles);

    // Enable the file input field if a document type is selected
    const fileInput = document.getElementById(
      `file-input-${index}`
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.disabled = false;
    }
  };

  const handleViewToggle = (index: number) => {
    // Enable view only if file is uploaded
    if (pdfFiles[index].isUploaded) {
      if (selectedPdfIndex === index && showPdf) {
        setSelectedPdfIndex(null);
        setShowPdf(false);
      } else {
        setSelectedPdfIndex(index);
        setShowPdf(true);
      }
    }
  };

  return (
    <div className="flex">
      <div className="w-17/24">
        <div className=" h-1/8">
          <div className="flex">
            <div className="relative h-32 w-18">
              <button
                onClick={handleAddCard}
                className="mt-4 mb-4 mr-4 p-4 bg-blue-500 text-white rounded-full focus:outline-none shadow-md focus:ring-2
                     focus:ring-blue-300 rotate-on-hover "
              >
                <FaPlus className="text-lg" />
                
              </button>
              <span className="absolute top-3 right-3 h-5 w-6 bg-white ring-[1.5px] ring-red-600 text-red-600 text-s font-semibold p-0 rounded-full">
                <span className="relative bottom-1 left-1 items-center justify-center ">{pdfFiles.length}</span>
              </span>
            </div>
            <div className="pt-6 font-semibold text-xl font-sans">
              <p>Click here to Uplaod Documents for Application process</p>
            </div>
          </div>
        </div>
        <div className=" h-7/8">
          <div className="max-h-[600px] overflow-y-auto ">
            {pdfFiles.map((pdf, index) => (
              <div key={index} className="flex flex-col mb-4 items-center">
                <div className="w-auto mt-4 mb-4 p-4 border border-gray-300 shadow-md bg-white rounded-lg flex flex-col items-center">
                  <div className="flex items-center justify-between w-full">
                    {documentTypes.length > 0 && (
                      <select
                        value={pdf.selectedPdfType}
                        onChange={(event) => handlePDFSelect(event, index)}
                        className="p-2 mr-2 select-dropdown border font-sans border-gray-300 rounded-lg"
                      >
                        <option value="Default">Select Document Type</option>
                        {documentTypes[0]["Document Type"].map(
                          (type: string) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          )
                        )}
                      </select>
                    )}
                    <input
                      type="file"
                      id={`file-input-${index}`}
                      onChange={(event) => handleFileChange(event, index)}
                      disabled={!pdfFiles[index].selectedPdfType}
                      className="hidden"
                    />
                    <label
                      htmlFor={`file-input-${index}`}
                      className={`bg-blue-200 hover:bg-blue-400 text-blue-700 font-semibold p-2 
              rounded-full shadow-md inline-block cursor-pointer mb-0 ${
                !pdfFiles[index].selectedPdfType
                  ? "opacity-50 cursor-pointer"
                  : ""
              }`}
                      onClick={() => {
                        // Check if the file input is disabled
                        if (!pdfFiles[index].selectedPdfType) {
                          // If disabled, display SweetAlert
                          Swal.fire({
                            icon: "warning",
                            title: "Oops...",
                            text: "Please select a document type first!",
                            footer: '<a href="#">Why do I have this issue?</a>',
                          });
                        }
                      }}
                    >
                      Choose File
                    </label>
                    <button
                      onClick={() => handleUpload(index)}
                      disabled={pdf.isLoading}
                      className={`p-3 mr-2 ml-2 rounded-2xl shadow-md  ${
                        pdf.isLoading ? "button-disabled" : ""
                      }`}
                    >
                      <FaFileUpload className="text-xl" />
                    </button>
                    <button
                      onClick={() => handleViewToggle(index)}
                      disabled={pdf.isLoading || !pdf.pdfFile}
                      className={`p-3 mr-2 rounded-2xl shadow-md ${
                        pdf.isLoading || !pdf.pdfFile || !pdf.isUploaded
                          ? "button-disabled"
                          : ""
                      }`}
                    >
                      {selectedPdfIndex === index && showPdf ? (
                        <FaEyeSlash className="text-xl" />
                      ) : (
                        <FaEye className="text-xl" />
                      )}
                    </button>
                    <button
                      onClick={() => handleRemoveCard(index)}
                      disabled={pdf.isLoading}
                      className={`p-3 mr-2 rounded-2xl shadow-md bg-orange-50 ${
                        pdf.isLoading ? "button-disabled" : ""
                      } hover:bg-red-500 focus:bg-red-500`}
                    >
                      <FaRegTrashAlt className="text-xl" />
                    </button>
                  </div>
                  <div className="flex justify-between w-full mt-2">
                    <div id={`file-container-${index}`}>
                      <span
                        id={`file-name-${index}`}
                        className="w-auto pl-1 text-black font-semibold font-sans"
                      >
                        {pdf.fileName}
                      </span>
                    </div>
                    {pdf.isLoading && (
                      <div className="w-2/3 mt-2 bg-gray-200 rounded-full h-3.2 overflow-hidden">
                        <div
                          className="bg-gray-700 h-3.2 text-xs font-medium text-white text-center p-0.5 leading-none"
                          style={{ width: `${pdf.uploadProgress}%` }}
                        >
                          {pdf.uploadProgress}%
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-2/4 ml-4">
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
              className="w-full border-none"
              style={{
                height: "682px",
              }}
            />
          )}
      </div>
    </div>
  );
};

export default PDFUpload;
