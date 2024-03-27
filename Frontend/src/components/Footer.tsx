import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray py-8">
      <div className="container mx-auto px-4 justify-center">
        <div className="text-center">
            <h2 className="text-lg font-semibold mb-4">Canadian Mortgage App</h2>
            <p>Powered by Techarc</p>
            <p>Call or Text: <a href="tel:1-999-999-9999" className="text-blue-400 ">1-999-999-9999</a></p>
            <hr className='my-4'/>
            <p className=''>&copy; Copyright {new Date().getFullYear()}. All Right Reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
