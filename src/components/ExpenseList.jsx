import ExpenseItem from "./ExpenseItem";

function ExpenseList({ expenses, deleteExpense, setEditingExpense }) {
  if (expenses.length === 0) {
    return (
      <div className="empty-state">
        <p>📭 No expenses found</p>
        <p className="empty-subtext">Add your first expense above!</p>
      </div>
    );
  }

  return (
    <div className="expense-list">
      <h3>Your Expenses ({expenses.length})</h3>
      <div className="expense-grid">
        {expenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            deleteExpense={deleteExpense}
            setEditingExpense={setEditingExpense}
          />
        ))}
      </div>
    </div>
  );
}

export default ExpenseList;