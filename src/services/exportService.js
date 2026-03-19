import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

export const exportToCSV = (data, filename) => {
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
}

export const exportToExcel = (data, filename) => {
  const worksheet = XLSX.utils.json_to_sheet(data)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Expenses')
  XLSX.writeFile(workbook, `${filename}.xlsx`)
}

export const exportToPDF = (data, filename) => {
  const doc = new jsPDF()
  
  doc.setFontSize(18)
  doc.text('Expense Report', 14, 22)
  doc.setFontSize(11)
  doc.setTextColor(100)
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 32)

  const tableColumn = ['Title', 'Amount', 'Category', 'Date']
  const tableRows = data.map(exp => [
    exp.title,
    `₹${exp.amount}`,
    exp.category,
    new Date(exp.date).toLocaleDateString()
  ])

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 40,
    theme: 'striped',
    styles: { fontSize: 10 },
    headStyles: { fillColor: [102, 126, 234] }
  })

  doc.save(`${filename}.pdf`)
}