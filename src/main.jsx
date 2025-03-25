import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/auth.jsx'
import { ExpenseProvider } from './context/add.jsx'
import { SalaryProvider } from './context/salary.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ExpenseProvider>
        <SalaryProvider>
          <App />
        </SalaryProvider>
      </ExpenseProvider>
    </AuthProvider>
  </StrictMode>,
)
