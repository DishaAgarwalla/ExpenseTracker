function ExpenseItem({ expense, deleteExpense, setEditingExpense }) {
  const formattedDate = new Date(expense.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const categoryColors = {
    Food: '#FF6B6B',
    Transport: '#4ECDC4',
    Shopping: '#45B7D1',
    Entertainment: '#96CEB4',
    Bills: '#FFEAA7',
    Healthcare: '#DDA0DD',
    Education: '#98D8C8',
    Other: '#F7DC6F'
  };

  return (
    <div className="expense-item">
      <div className="expense-header">
        <span className="expense-title">{expense.title}</span>
        <span 
          className="expense-category"
          style={{backgroundColor: categoryColors[expense.category] || '#ddd'}}
        >
          {expense.category}
        </span>
      </div>
      
      <div className="expense-details">
        <span className="expense-date">{formattedDate}</span>
        <span className="expense-amount">₹{expense.amount.toFixed(2)}</span>
      </div>
      
      {expense.notes && (
        <div className="expense-notes">{expense.notes}</div>
      )}
      
      <div className="expense-actions">
        <button 
          onClick={() => setEditingExpense(expense)}
          className="btn-edit"
        >
          ✏️ Edit
        </button>
        <button 
          onClick={() => deleteExpense(expense.id)}
          className="btn-delete"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}

export default ExpenseItem;