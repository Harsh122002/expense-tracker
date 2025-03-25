import React, { createContext, useState } from 'react';

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState(() => {
    const storedExpenses = localStorage.getItem('expenses');
    return storedExpenses ? JSON.parse(storedExpenses) : [];
  });

  const saveToLocalStorage = (updatedExpenses) => {
    setExpenses(updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  };

  const addExpense = (expense) => {
    const newExpense = { ...expense, id: Date.now() };
    const updatedExpenses = [...expenses, newExpense];
    saveToLocalStorage(updatedExpenses);
  };

  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter(expense => expense.id != id);
    saveToLocalStorage(updatedExpenses);
  };

  const retrievalId = (id) => {
    const data = expenses.find(expense => expense.id == id)
    return data;
  }

  const searchData = (description) => {
    return expenses.filter(expense => 
      expense.description.toLowerCase().split(' ').some(word => word.includes(description.toLowerCase()))
    );
  };
  

  const updateExpense = (id, updatedExpense) => {
    const updatedExpenses = expenses.map(expense =>
      expense.id == id ? { ...expense, ...updatedExpense } : expense
    );
    
    saveToLocalStorage(updatedExpenses);
  };

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, deleteExpense,searchData, retrievalId, updateExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseContext;
