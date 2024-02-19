import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const UserGraph = () => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const ctx = chartContainer.current.getContext('2d');

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [{
            label: 'Website Traffic',
            data: [100, 150, 200, 180, 220, 250, 210], // Replace with your actual traffic data
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            tension: 0.4 // Adjust tension for smoothness of the line
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div style={{ backgroundColor: 'rgba(200, 200, 200, 0.4)', padding: '20px', borderRadius: '8px' }}>
      <canvas ref={chartContainer}></canvas>
    </div>
  );
};

export default UserGraph;
