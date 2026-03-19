function ExpenseStats({ stats }) {
  const statCards = [
    { label: 'Total Expenses', value: `₹${stats.total.toFixed(2)}`, icon: '💰' },
    { label: 'Number of Expenses', value: stats.count, icon: '📊' },
    { label: 'Average Expense', value: `₹${stats.average}`, icon: '📈' },
    { label: 'This Month', value: `₹${stats.thisMonth.toFixed(2)}`, icon: '📅' }
  ]

  return (
    <div className="stats-grid">
      {statCards.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className="stat-icon">{stat.icon}</div>
          <div className="stat-content">
            <span className="stat-label">{stat.label}</span>
            <span className="stat-value">{stat.value}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ExpenseStats