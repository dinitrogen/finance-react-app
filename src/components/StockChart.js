import { Line } from 'react-chartjs-2';
import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';




const StockChart = ({chartData}) => {
  
  return (
        <div>

          <Line
            options = { {responsive: true, maintainAspectRatio: false} }
            data = {chartData}
            width={100}
            height={200}
          />

        </div>
    )
}

export default StockChart;