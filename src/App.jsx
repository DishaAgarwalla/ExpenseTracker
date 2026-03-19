import { Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import PrivateRoute from './components/auth/PrivateRoute'
import Dashboard from './components/dashboard/Dashboard'
import ExpensesPage from './components/pages/ExpensesPage'
import AnalyticsPage from './components/pages/AnalyticsPage'
import BudgetPage from './components/pages/BudgetPage'
import SettingsPage from './components/pages/SettingsPage'
import Navbar from './components/common/Navbar'
import Sidebar from './components/common/Sidebar'
import { useAuth } from './context/AuthContext'
import { useTheme } from './context/ThemeContext'
import './App.css'

function App() {
  const { user } = useAuth()
  const { theme } = useTheme()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className={`app ${theme}`}>
      {user ? (
        <>
          <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="app-container">
            <Sidebar sidebarOpen={sidebarOpen} />
            <main className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                } />
                <Route path="/expenses" element={
                  <PrivateRoute>
                    <ExpensesPage />
                  </PrivateRoute>
                } />
                <Route path="/analytics" element={
                  <PrivateRoute>
                    <AnalyticsPage />
                  </PrivateRoute>
                } />
                <Route path="/budget" element={
                  <PrivateRoute>
                    <BudgetPage />
                  </PrivateRoute>
                } />
                <Route path="/settings" element={
                  <PrivateRoute>
                    <SettingsPage />
                  </PrivateRoute>
                } />
              </Routes>
            </main>
          </div>
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </div>
  )
}

export default App