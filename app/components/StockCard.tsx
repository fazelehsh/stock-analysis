'use client'


// app/components/StockCard.tsx
import React from 'react';

interface StockCardProps {
  symbol: string;
  price: number;
  change: number;
}

const StockCard: React.FC<StockCardProps> = ({ symbol, price, change }) => {
  const changeColor = change > 0 ? 'text-green-500' : 'text-red-500';

  return (
    <div className="border p-4 rounded shadow">
      <h3 className="text-2xl font-semibold">{symbol}</h3>
      <p className="text-lg">Price: ${price.toFixed(2)}</p>
      <p className={`text-lg ${changeColor}`}>
        Change: {change > 0 ? '+' : ''}{change.toFixed(2)}%
      </p>
    </div>
  );
};

export default StockCard;
