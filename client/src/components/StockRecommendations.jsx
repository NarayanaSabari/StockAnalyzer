import React from 'react';
import { Button } from "./ui/button";

const StockRecommendations = ({ recommendations, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {recommendations.map((stock) => (
        <Button
          key={stock.symbol}
          variant="outline"
          size="sm"
          onClick={() => onSelect(stock.symbol)}
        >
          {stock.symbol}
        </Button>
      ))}
    </div>
  );
};

export default StockRecommendations;