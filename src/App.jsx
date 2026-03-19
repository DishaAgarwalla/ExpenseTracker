import { Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import PrivateRoute from './components/auth/PrivateRoute'
import Dashboard from './components/dashboard/Dashboard'
import ExpensesPage from './components/pages/ExpensesPage'
import AnalyticsPage from './components/pages/AnalyticsPage'
import BudgetPage from './components/pages/BudgetPage'
import LandingPage from './components/pages/LandingPage';
import SettingsPage from './components/pages/SettingsPage'
import Navbar from './components/common/Navbar'
import Sidebar from './components/common/Sidebar'
import { useAuth } from './context/AuthContext'
import { useTheme } from './context/ThemeContext'
import './App.css'
import './styles/LandingPage.css'; // Fixed: removed 'services/' from path

function App() {
  const { user } = useAuth()
  const { theme } = useTheme()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className={`app ${theme}`}>
      <Routes>
        {/* Public routes - always accessible */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected routes - only when logged in */}
        <Route path="/dashboard" element={
          <PrivateRoute>
            <div className="authenticated-app">
              <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
              <div className="app-container">
                <Sidebar sidebarOpen={sidebarOpen} />
                <main className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
                  <Dashboard />
                </main>
              </div>
            </div>
          </PrivateRoute>
        } />
        
        <Route path="/expenses" element={
          <PrivateRoute>
            <div className="authenticated-app">
              <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
              <div className="app-container">
                <Sidebar sidebarOpen={sidebarOpen} />
                <main className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
                  <ExpensesPage />
                </main>
              </div>
            </div>
          </PrivateRoute>
        } />
        
        <Route path="/analytics" element={
          <PrivateRoute>
            <div className="authenticated-app">
              <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
              <div className="app-container">
                <Sidebar sidebarOpen={sidebarOpen} />
                <main className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
                  <AnalyticsPage />
                </main>
              </div>
            </div>
          </PrivateRoute>
        } />
        
        <Route path="/budget" element={
          <PrivateRoute>
            <div className="authenticated-app">
              <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
              <div className="app-container">
                <Sidebar sidebarOpen={sidebarOpen} />
                <main className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
                  <BudgetPage />
                </main>
              </div>
            </div>
          </PrivateRoute>
        } />
        
        <Route path="/settings" element={
          <PrivateRoute>
            <div className="authenticated-app">
              <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
              <div className="app-container">
                <Sidebar sidebarOpen={sidebarOpen} />
                <main className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
                  <SettingsPage />
                </main>
              </div>
            </div>
          </PrivateRoute>
        } />
        
        {/* Catch all route - redirect to landing page */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default App