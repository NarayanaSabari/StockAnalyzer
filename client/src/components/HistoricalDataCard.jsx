import React from 'react';
import { FixedSizeList as List } from 'react-window';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const HistoricalDataCard = ({ analysis }) => {
  const Row = React.memo(({ index, style }) => {
    const item = analysis?.historicalData?.[index];
    return (
      <div style={style} className="px-4 py-2 border-b">
        {item ? `${item.date}: $${item.close.toFixed(2)}` : 'Loading...'}
      </div>
    );
  });

  return (
    analysis && (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Historical Data</CardTitle>
        </CardHeader>
        <CardContent>
          <List
            height={400}
            itemCount={analysis.historicalData?.length || 0}
            itemSize={35}
            width="100%"
            className="border rounded"
          >
            {({ index, style }) => <Row index={index} style={style} />}
          </List>
        </CardContent>
      </Card>
    )
  );
};

export default HistoricalDataCard;
