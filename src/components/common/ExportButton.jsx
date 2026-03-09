import { useState } from 'react'

function ExportButton({ data, filename }) {
  const [showOptions, setShowOptions] = useState(false)

  const exportToCSV = () => {
    const headers = ['Title', 'Amount', 'Category', 'Date', 'Notes']
    const csvData = data.map(exp => [
      exp.title,
      exp.amount,
      exp.category,
      new Date(exp.date).toLocaleDateString(),
      exp.notes || ''
    ])

    let csvContent = headers.join(',') + '\n'
    csvContent += csvData.map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${filename}.csv`
    link.click()
    window.URL.revokeObjectURL(url)
    setShowOptions(false)
  }

  return (
    <div className="export-container">
      <button 
        className="export-btn"
        onClick={() => setShowOptions(!showOptions)}
      >
        📥 Export
      </button>
      
      {showOptions && (
        <div className="export-options">
          <button onClick={exportToCSV}>CSV</button>
          <button onClick={() => alert('Excel export coming soon!')}>Excel</button>
          <button onClick={() => alert('PDF export coming soon!')}>PDF</button>
        </div>
      )}
    </div>
  )
}

export default ExportButton