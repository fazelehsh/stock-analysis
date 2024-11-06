'use client'


// app/components/Navbar.tsx
import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-lg font-bold">Stock Analysis</h1>
        <div className="space-x-4">
          <Link href="/">Home</Link>
          <Link href="/dashboard">Dashboard</Link>
        
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
