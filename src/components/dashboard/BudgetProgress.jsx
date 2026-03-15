function BudgetProgress({ budgetStatus }) {
  if (!budgetStatus || Object.keys(budgetStatus).length === 0) {
    return (
      <div className="budget-card">
        <h3>Budget Overview</h3>
        <p>No budgets set yet</p>
      </div>
    )
  }

  return (
    <div className="budget-card">
      <h3>Budget Overview</h3>
      {Object.entries(budgetStatus).map(([category, data]) => (
        <div key={category} className="budget-item">
          <div className="budget-header">
            <span>{category}</span>
            <span>₹{data.spent.toFixed(2)} / ₹{data.budget.toFixed(2)}</span>
          </div>
          <div className="progress-container">
            <div 
              className="progress-bar"
              style={{ 
                width: `${Math.min(data.percentage, 100)}%`,
                backgroundColor: data.percentage > 100 ? '#ff4444' : '#4CAF50'
              }}
            />
          </div>
          <div className="budget-footer">
            <span>Remaining: ₹{data.remaining.toFixed(2)}</span>
            <span>{data.percentage.toFixed(1)}%</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default BudgetProgress