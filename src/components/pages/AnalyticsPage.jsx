import { useExpenses } from '../../context/ExpenseContext'
import CategoryPieChart from '../charts/CategoryPieChart'
import MonthlyBarChart from '../charts/MonthlyBarChart'
import TrendLineChart from '../charts/TrendLineChart'

function AnalyticsPage() {
  const { expenses } = useExpenses()

  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0)
  const avgPerDay = expenses.length > 0 
    ? (total / 30).toFixed(2) 
    : 0

  const categoryData = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount
    return acc
  }, {})

  return (
    <div className="analytics-page">
      <h1>Analytics</h1>

      <div className="analytics-summary">
        <div className="summary-card">
          <h3>Total Spent</h3>
          <p className="summary-value">₹{total.toFixed(2)}</p>
        </div>
        <div className="summary-card">
          <h3>Average per Day</h3>
          <p className="summary-value">₹{avgPerDay}</p>
        </div>
        <div className="summary-card">
          <h3>Categories Used</h3>
          <p className="summary-value">{Object.keys(categoryData).length}</p>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="chart-wrapper">
          <h2>Category Distribution</h2>
          <CategoryPieChart expenses={expenses} />
        </div>

        <div className="chart-wrapper">
          <h2>Monthly Overview</h2>
          <MonthlyBarChart expenses={expenses} />
        </div>

        <div className="chart-wrapper full-width">
          <h2>Spending Trend</h2>
          <TrendLineChart expenses={expenses} />
        </div>
      </div>
    </div>
  )
}

export default AnalyticsPage