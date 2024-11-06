// app/page.tsx
import React from 'react';
import "./globals.css";
const Home: React.FC = () => {
  return (
    <section className="text-center py-10">
      <h1 className="text-4xl font-bold mb-4">Welcome to Stock Analysis</h1>
      <p className="text-lg">Track and analyze stock data .</p>
    </section>
  );
};

export default Home;
