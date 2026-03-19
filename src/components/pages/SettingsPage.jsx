import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { useExpenses } from '../../context/ExpenseContext'

function SettingsPage() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const { expenses } = useExpenses()
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleDeleteAllData = () => {
    if (window.confirm('Are you sure you want to delete all expenses? This cannot be undone!')) {
      localStorage.removeItem('expenses')
      window.location.reload()
    }
  }

  return (
    <div className="settings-page">
      <h1>Settings</h1>

      <div className="settings-grid">
        <div className="settings-card">
          <h2>Profile Settings</h2>
          <div className="settings-item">
            <label>Name</label>
            <p>{user?.name || 'User'}</p>
          </div>
          <div className="settings-item">
            <label>Email</label>
            <p>{user?.email || 'user@example.com'}</p>
          </div>
          <div className="settings-item">
            <label>Member Since</label>
            <p>{new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <div className="settings-card">
          <h2>Appearance</h2>
          <div className="settings-item">
            <label>Theme</label>
            <div className="theme-toggle">
              <span className="theme-icon">{theme === 'light' ? '☀️ Light' : '🌙 Dark'}</span>
              <button onClick={toggleTheme} className="btn-toggle">
                Switch to {theme === 'light' ? 'Dark' : 'Light'}
              </button>
            </div>
          </div>
        </div>

        <div className="settings-card">
          <h2>Statistics</h2>
          <div className="settings-item">
            <label>Total Expenses</label>
            <p>{expenses.length}</p>
          </div>
          <div className="settings-item">
            <label>Storage Used</label>
            <p>{Math.round(JSON.stringify(localStorage).length / 1024)} KB</p>
          </div>
        </div>

        <div className="settings-card danger">
          <h2>Danger Zone</h2>
          <div className="settings-item">
            <label>Delete All Data</label>
            <button onClick={handleDeleteAllData} className="btn-danger">
              Delete All Expenses
            </button>
          </div>
          <div className="settings-item">
            <label>Logout</label>
            <button onClick={logout} className="btn-logout">
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage