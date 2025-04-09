
import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Expense from './pages/expense';
import AddSalary from './pages/addsalary';
import Chart from './pages/chart';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/expense" element={<Expense />} />
        <Route path="/addSalary" element={<AddSalary />} />
        <Route path="/chart" element={<Chart />} />
      </Routes>
    </Router>
  )
}

export default App
