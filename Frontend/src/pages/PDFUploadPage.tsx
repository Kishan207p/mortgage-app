import React from 'react';
import PDFUpload from '../components/PDFUpload';
import Header from '../components/Header';


const PDFUploadPage: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen min-w-screen bg-gray-100 p-3">
        <Header />
            <main className="w-full flex-grow">
            <div className="container mx-auto px-2 py-8">
                <PDFUpload />
            </div>
            </main>
        </div>
        
    );
  };
  
  export default PDFUploadPage;