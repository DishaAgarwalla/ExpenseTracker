import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

function MonthlyBarChart({ expenses }) {
  const months = []
  const now = new Date()
  
  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
    months.push({
      month: date.toLocaleString('default', { month: 'short' }),
      year: date.getFullYear(),
      value: 0
    })
  }

  expenses.forEach(expense => {
    const expenseDate = new Date(expense.date)
    const monthIndex = months.findIndex(m => 
      m.month === expenseDate.toLocaleString('default', { month: 'short' }) && 
      m.year === expenseDate.getFullYear()
    )
    
    if (monthIndex !== -1) {
      months[monthIndex].value += expense.amount
    }
  })

  if (expenses.length === 0) {
    return (
      <div className="empty-chart">
        <p>No data to display</p>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={months}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default MonthlyBarChart