import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img
                className="h-64 w-full object-cover md:w-64"
                src="https://source.unsplash.com/collection/152041/800x800"
                alt="About Us"
              />
            </div>
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Who We Are</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                At Mortgage App, we're dedicated to helping you find the best mortgage solution for your unique situation.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our team of expert brokers provides personalized solutions tailored to your needs, backed by exceptional customer service and expert advice.
              </p>
            </div>
          </div>
          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
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
