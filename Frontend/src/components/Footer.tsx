import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-100 text-gray py-8">
      <div className="container mx-auto px-4 justify-center">
        <div className="text-center">
            <h2 className="text-lg font-semibold mb-2">Canadian Mortgage App</h2>
            <p>Powered by Techarc</p>
            <hr className='my-3'/>
            <p className='text-right'>&copy; Copyright {new Date().getFullYear()}. All Right Reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
