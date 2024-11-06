// app/dashboard/page.tsx
import React from 'react';
import StockDetail from '../components/StockDetaile'; // Adjust the path as necessary



const Dashboard: React.FC = () => {
  return (
    <section className="py-10">
      <h2 className="text-3xl font-semibold mb-4 ">Stock Dashboard</h2>
      <div className="container mx-auto ">
        <StockDetail /> 
      </div>
    </section>
  );
};

export default Dashboard;
