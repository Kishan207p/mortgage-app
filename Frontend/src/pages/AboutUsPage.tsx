import React from 'react';

const AboutUs = () => {
  return (
    <div className="container mx-auto">
      <div className="text-center font-bold text-3xl py-2 mb-4 pt-3 text-gray-600">
        Compare Mortgage
      </div>
      <div className="border mx-5 my-2"></div>
      <div className="py-5 mx-5">
        <div className="flex">
          <img
            className="h-80 w-96 object-cover rounded-lg mb-5 mr-8"
            src="https://www.searchenginejournal.com/wp-content/uploads/2022/01/about-us-page-examples-1-61fd8f9784626-sej.jpg"
            alt="About Us"
          />
          <div className=" flex flex-col ml-6 mt-6">
            <h2 className="text-3xl text-center font-bold text-gray-900 mb-4 bg-gray-100 p-4">Who We Are</h2>
            <div className='pl-5 font-semibold text-lg'>
            <p className="text-gray-700 mb-4">
              At Mortgage App, we're dedicated to helping you find the best mortgage solution for your unique situation.
            </p>
            <p className="text-gray-700">
              Our team of expert brokers provides personalized solutions tailored to your needs, backed by exceptional customer service and expert advice.
            </p>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 bg-gray-100 p-4">Why Choose Us?</h2>
          <div className='pl-5 font-semibold text-lg'>
          <ul className="list-disc list-inside text-gray-700 mb-6">
            <li>Access to a wide range of lenders and mortgage products.</li>
            <li>Expert guidance through the mortgage process.</li>
            <li>Exceptional customer service for a stress-free experience.</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            Everyone deserves a home, and we're committed to helping you achieve your homeownership dreams.
          </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
