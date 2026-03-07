import { useEffect, useRef } from 'react';

function ExpenseChart({ expenses }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (expenses.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Group by category
    const categoryTotals = expenses.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    }, {});

    const categories = Object.keys(categoryTotals);
    const values = Object.values(categoryTotals);
    const total = values.reduce((a, b) => a + b, 0);

    // Colors for different categories
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', 
      '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'
    ];

    // Draw pie chart
    let startAngle = 0;
    values.forEach((value, index) => {
      const sliceAngle = (value / total) * 2 * Math.PI;
      
      ctx.beginPath();
      ctx.moveTo(width / 2, height / 2);
      ctx.arc(width / 2, height / 2, Math.min(width, height) * 0.4, startAngle, startAngle + sliceAngle);
      ctx.closePath();
      
      ctx.fillStyle = colors[index % colors.length];
      ctx.fill();
      
      // Add label
      const labelAngle = startAngle + sliceAngle / 2;
      const labelX = width / 2 + Math.cos(labelAngle) * (Math.min(width, height) * 0.25);
      const labelY = height / 2 + Math.sin(labelAngle) * (Math.min(width, height) * 0.25);
      
      ctx.fillStyle = '#333';
      ctx.font = '12px Arial';
      ctx.fillText(categories[index], labelX - 20, labelY - 10);
      
      startAngle += sliceAngle;
    });

  }, [expenses]);

  if (expenses.length === 0) {
    return null;
  }

  return (
    <div className="chart-container">
      <h4>Expense Distribution</h4>
      <canvas 
        ref={canvasRef} 
        width="300" 
        height="200"
        className="expense-chart"
      />
    </div>
  );
}

export default ExpenseChart;