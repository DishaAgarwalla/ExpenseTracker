function ExpenseSummary({ expenses }) {
  const total = expenses.reduce((sum, item) => sum + item.amount, 0);
  
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const highestExpense = expenses.length > 0 
    ? Math.max(...expenses.map(e => e.amount)) 
    : 0;

  const averageExpense = expenses.length > 0 
    ? (total / expenses.length).toFixed(2) 
    : 0;

  return (
    <div className="summary-container">
      <div className="summary-card total">
        <span className="summary-label">Total Expenses</span>
        <span className="summary-value">₹{total.toFixed(2)}</span>
      </div>
      
      <div className="summary-card count">
        <span className="summary-label">Number of Expenses</span>
        <span className="summary-value">{expenses.length}</span>
      </div>
      
      <div className="summary-card highest">
        <span className="summary-label">Highest Expense</span>
        <span className="summary-value">₹{highestExpense.toFixed(2)}</span>
      </div>
      
      <div className="summary-card average">
        <span className="summary-label">Average Expense</span>
        <span className="summary-value">₹{averageExpense}</span>
      </div>

      {Object.keys(categoryTotals).length > 0 && (
        <div className="category-breakdown">
          <h4>Category Breakdown</h4>
          {Object.entries(categoryTotals).map(([category, amount]) => (
            <div key={category} className="category-item">
              <span>{category}</span>
              <span>₹{amount.toFixed(2)}</span>
              <div 
                className="progress-bar" 
                style={{width: `${(amount / total) * 100}%`}}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ExpenseSummary;