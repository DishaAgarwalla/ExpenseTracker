import { useState } from 'react'
import { useExpenses } from '../../context/ExpenseContext'

function BudgetPage() {
  const { budgets, setBudget, getBudgetStatus } = useExpenses()
  const [editingCategory, setEditingCategory] = useState(null)
  const [budgetAmount, setBudgetAmount] = useState('')
  
  const budgetStatus = getBudgetStatus()
  const categories = [...new Set(useExpenses().expenses.map(exp => exp.category))]

  const handleSetBudget = (category) => {
    if (budgetAmount && !isNaN(budgetAmount)) {
      setBudget(category, parseFloat(budgetAmount))
      setEditingCategory(null)
      setBudgetAmount('')
    }
  }

  return (
    <div className="budget-page">
      <h1>Budget Management</h1>

      <div className="budget-grid">
        {categories.map(category => (
          <div key={category} className="budget-card">
            <div className="budget-card-header">
              <h3>{category}</h3>
              {editingCategory === category ? (
                <div className="budget-edit">
                  <input
                    type="number"
                    value={budgetAmount}
                    onChange={(e) => setBudgetAmount(e.target.value)}
                    placeholder="Amount"
                    className="budget-input"
                  />
                  <button 
                    onClick={() => handleSetBudget(category)}
                    className="btn-save"
                  >
                    Save
                  </button>
                  <button 
                    onClick={() => setEditingCategory(null)}
                    className="btn-cancel"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setEditingCategory(category)}
                  className="btn-edit-budget"
                >
                  {budgets[category] ? 'Edit Budget' : 'Set Budget'}
                </button>
              )}
            </div>

            {budgets[category] ? (
              <div className="budget-progress">
                <div className="budget-info">
                  <span>Budget: ₹{budgets[category]}</span>
                  <span>Spent: ₹{budgetStatus[category]?.spent.toFixed(2) || 0}</span>
                </div>
                <div className="progress-bar-container">
                  <div 
                    className="progress-bar-fill"
                    style={{
                      width: `${Math.min((budgetStatus[category]?.spent / budgets[category]) * 100, 100)}%`,
                      backgroundColor: (budgetStatus[category]?.spent / budgets[category]) > 0.8 ? '#ff6b6b' : '#4ecdc4'
                    }}
                  />
                </div>
                <div className="budget-remaining">
                  Remaining: ₹{(budgets[category] - (budgetStatus[category]?.spent || 0)).toFixed(2)}
                </div>
              </div>
            ) : (
              <p className="no-budget">No budget set for {category}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default BudgetPage