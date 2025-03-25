// SalaryContext.js
import React, { createContext, useState, useEffect } from 'react';

const SalaryContext = createContext();

export const SalaryProvider = ({ children }) => {
  const [salaries, setSalaries] = useState(() => {
    // Load initial data from localStorage
    const storedSalaries = localStorage.getItem('salaries');
    return storedSalaries ? JSON.parse(storedSalaries) : [];
  });

  // Sync salaries to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('salaries', JSON.stringify(salaries));
  }, [salaries]);

  // Add Salary
  const addSalary = (formdata) => {
    const newSalary = { ...formdata, id: Date.now() };
    setSalaries((prevSalaries) => [...prevSalaries, newSalary]);
  };

  // Retrieve Salary by ID
  const retrievalId = (id) => {
    return salaries.find((salary) => salary.id == id);
  };

  const searchDataSal = (title) => {
    return salaries.filter(salary =>
      salary.title
        .toLowerCase()
        .split(' ')
        .some(word => word.includes(title.toLowerCase()))
    );
  };
  

  // Update Salary
  const updateSalary = (id, updatedSalary) => {
    setSalaries((prevSalaries) =>
      prevSalaries.map((salary) =>
        salary.id == id ? { ...salary, ...updatedSalary } : salary
      )
    );
  };

  // Delete Salary
  const deleteSalary = (id) => {
    setSalaries((prevSalaries) =>
      prevSalaries.filter((salary) => salary.id != id)
    );
  };

  return (
    <SalaryContext.Provider
      value={{ salaries, addSalary, updateSalary, retrievalId,searchDataSal, deleteSalary }}
    >
      {children}
    </SalaryContext.Provider>
  );
};

export default SalaryContext;
