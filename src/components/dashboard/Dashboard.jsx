import { useState } from 'react'
import { useExpenses } from '../../context/ExpenseContext'
import ExpenseStats from './ExpenseStats'
import BudgetProgress from './BudgetProgress'
import RecentActivity from './RecentActivity'
import CategoryPieChart from '../charts/CategoryPieChart'
import MonthlyBarChart from '../charts/MonthlyBarChart'
import TrendLineChart from '../charts/TrendLineChart'
import ExpenseForm from '../ExpenseForm'
import ExpenseList from '../ExpenseList'
import ExpenseFilters from '../ExpenseFilters'
import ExportButton from '../common/ExportButton'
import '../../styles/dashboard.css'

function Dashboard() {
  const { expenses, addExpense, updateExpense, deleteExpense, getBudgetStatus } = useExpenses()
  const [showExpenseForm, setShowExpenseForm] = useState(false)
  const [filterCategory, setFilterCategory] = useState("All")
  const [sortBy, setSortBy] = useState("date")
  const [searchTerm, setSearchTerm] = useState("")
  const [editingExpense, setEditingExpense] = useState(null)
  
  const budgetStatus = getBudgetStatus()
  const categories = ["All", ...new Set(expenses.map(exp => exp.category))]

  const filteredExpenses = expenses
    .filter(expense => 
      (filterCategory === "All" || expense.category === filterCategory) &&
      expense.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "date") return new Date(b.date) - new Date(a.date)
      if (sortBy === "amount") return b.amount - a.amount
      if (sortBy === "title") return a.title.localeCompare(b.title)
      return 0
    })

  const stats = {
    total: expenses.reduce((sum, exp) => sum + exp.amount, 0),
    count: expenses.length,
    average: expenses.length > 0 
      ? (expenses.reduce((sum, exp) => sum + exp.amount, 0) / expenses.length).toFixed(2)
      : 0,
    thisMonth: expenses
      .filter(exp => {
        const expDate = new Date(exp.date)
        const now = new Date()
        return expDate.getMonth() === now.getMonth() && 
               expDate.getFullYear() === now.getFullYear()
      })
      .reduce((sum, exp) => sum + exp.amount, 0)
  }

  const handleAddExpense = (expense) => {
    addExpense(expense)
    setShowExpenseForm(false)
  }

  const handleUpdateExpense = (id, expense) => {
    updateExpense(id, expense)
    setEditingExpense(null)
    setShowExpenseForm(false)
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="header-actions">
          <ExportButton data={expenses} filename="expenses" />
          <button 
            className="btn-primary"
            onClick={() => {
              setEditingExpense(null)
              setShowExpenseForm(!showExpenseForm)
            }}
          >
            {showExpenseForm ? '− Close Form' : '+ Add Expense'}
          </button>
        </div>
      </div>

      {showExpenseForm && (
        <div className="form-section">
          <ExpenseForm 
            addExpense={handleAddExpense}
            updateExpense={handleUpdateExpense}
            editingExpense={editingExpense}
            setEditingExpense={setEditingExpense}
          />
        </div>
      )}

      <ExpenseStats stats={stats} />

      <div className="dashboard-grid">
        <div className="grid-item span-2">
          <div className="chart-card">
            <h3>Expense Distribution</h3>
            <CategoryPieChart expenses={expenses} />
          </div>
        </div>

        <div className="grid-item">
          <div className="chart-card">
            <h3>Monthly Overview</h3>
            <MonthlyBarChart expenses={expenses} />
          </div>
        </div>

        <div className="grid-item span-2">
          <div className="chart-card">
            <h3>Spending Trend</h3>
            <TrendLineChart expenses={expenses} />
          </div>
        </div>

        <div className="grid-item">
          <BudgetProgress budgetStatus={budgetStatus} />
        </div>

        <div className="grid-item span-2">
          <RecentActivity expenses={expenses.slice(0, 5)} />
        </div>
      </div>

      <div className="expenses-section">
        <h2>Expense History</h2>
        <ExpenseFilters
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          categories={categories}
        />
        <ExpenseList 
          expenses={filteredExpenses}
          deleteExpense={deleteExpense}
          setEditingExpense={(expense) => {
            setEditingExpense(expense)
            setShowExpenseForm(true)
          }}
        />
      </div>
    </div>
  )
}

export default Dashboard