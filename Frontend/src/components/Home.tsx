import React from 'react';
import { motion } from 'framer-motion';
// import { useHistory } from 'react-router-dom';

const Home: React.FC = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-20 mx-32">
      <motion.div
        className="p-6 bg-white rounded-lg shadow-md h-15"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-4">Calculate Mortgage Payments</h2>
        <p className="text-gray-700 mb-4">
          Use our mortgage calculator to estimate your monthly mortgage payments based on loan amount, interest rate, and loan term.
        </p>
        <button className="bg-sky-900 text-white px-4 py-2 rounded-lg hover:bg-sky-950 focus:outline-none focus:bg-sky-950"
                onClick={() => window.location.assign('/calculator')}>
          Calculate Now
        </button>
      </motion.div>
      <motion.div
        className="p-6 bg-white rounded-lg shadow-md"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold mb-4">Compare Mortgage Rates</h2>
        <p className="text-gray-700 mb-4">
          Compare mortgage rates from different lenders to find the best rates for your home loan.
        </p>
        <button className="bg-sky-900 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
          Compare Rates
        </button>
      </motion.div>
    </div>
  );
};

export default Home;
