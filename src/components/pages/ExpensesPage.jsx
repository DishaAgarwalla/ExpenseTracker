import { useState } from 'react'
import { useExpenses } from '../../context/ExpenseContext'
import ExpenseForm from '../ExpenseForm'
import ExpenseList from '../ExpenseList'
import ExpenseFilters from '../ExpenseFilters'

function ExpensesPage() {
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses()
  const [filterCategory, setFilterCategory] = useState("All")
  const [sortBy, setSortBy] = useState("date")
  const [searchTerm, setSearchTerm] = useState("")
  const [editingExpense, setEditingExpense] = useState(null)
  const [showForm, setShowForm] = useState(false)

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

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Expenses</h1>
        <button 
          className="btn-primary"
          onClick={() => {
            setEditingExpense(null)
            setShowForm(!showForm)
          }}
        >
          {showForm ? '− Close' : '+ Add Expense'}
        </button>
      </div>

      {showForm && (
        <div className="form-section">
          <ExpenseForm 
            addExpense={addExpense}
            updateExpense={updateExpense}
            editingExpense={editingExpense}
            setEditingExpense={setEditingExpense}
          />
        </div>
      )}

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
          setShowForm(true)
        }}
      />
    </div>
  )
}

export default ExpensesPage