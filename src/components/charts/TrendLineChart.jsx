import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

function TrendLineChart({ expenses }) {
  const dailyTotals = {}
  
  expenses.forEach(expense => {
    const date = new Date(expense.date).toLocaleDateString()
    if (dailyTotals[date]) {
      dailyTotals[date] += expense.amount
    } else {
      dailyTotals[date] = expense.amount
    }
  })

  const data = Object.keys(dailyTotals)
    .map(date => ({
      date,
      amount: dailyTotals[date]
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(-10)

  if (data.length === 0) {
    return (
      <div className="empty-chart">
        <p>No trend data available</p>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
        <Line type="monotone" dataKey="amount" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default TrendLineChart