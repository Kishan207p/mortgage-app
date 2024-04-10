import React from 'react';
import Home from '../components/Home';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen min-w-screen bg-gray-100">
      <Header />
      <main className="w-full flex-grow">
        <div className="container mx-auto px-4 py-8">
          <Home />
        </div>
      </main>
      <hr/>
      <Footer />
    </div>
  );
};

export default HomePage;
