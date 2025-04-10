import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/auth';
import { Link, useNavigate } from 'react-router';
import Header from './header';
import ExpenseContext from '../context/add';
import { MdDeleteOutline } from 'react-icons/md';
import { FaChartLine, FaEdit, FaFileExport } from 'react-icons/fa';
import SalaryContext from '../context/salary';
import { toWords } from 'number-to-words';
import { HiSortDescending } from 'react-icons/hi';
import xlsx from "json-as-xlsx"

export default function Home() {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const { expenses, deleteExpense, searchData } = useContext(ExpenseContext);
  const { salaries, deleteSalary, searchDataSal } = useContext(SalaryContext);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState([]);
  const [searchSa, setSearchSa] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [value, setValue] = useState(false);
  const [valueSa, setValueSa] = useState(false);
  const [titleSal, setTitleSal] = useState("");
  console.log(expenses);

  let data = [
    {
      sheet: "Expense",
      columns: [
        { label: "Title", value: "title" },
        { label: "Amount", value: "amount" },
        { label: "Description", value: "description" },
        { label: "Date", value: "date" },
      ],
      content: expenses.map((item) => ({
        title: item.title,
        amount: item.amount,
        description: item.description,
        date: new Date(item.id).toLocaleString(),
      })),
    },
    {
      sheet: "salary",
      columns: [
        { label: "Title", value: "title" },
        { label: "Amount", value: "amount" },
        { label: "Date", value: "date" },
      ],
      content: salaries.map((item) => ({
        title: item.title,
        amount: item.amount,
        date: new Date(item.id).toLocaleString(),
      })),


    },
  ];


  useEffect(() => {
    if (!isAuthenticated) navigate('/login');
    setSearch([]);
  }, [isAuthenticated, navigate]);

  const handleEdit = (id) => navigate(`/expense?id=${id}`);
  const handleSalaryEdit = (id) => navigate(`/addSalary?id=${id}`);

  const handleAddTitle = () => {
    if (title.trim()) {
      const data = searchData(title);
      setSearch(data);
      setValue(true)
      console.log("data:", data);
    }
  };
  const handleAddTitleSa = () => {
    if (titleSal.trim()) {
      const data = searchDataSal(titleSal);
      setSearchSa(data);
      setValueSa(true)
      console.log("data:", data);
    }
  };
  const handleAddTitleCancel = () => {
    setSearch([]);
    setValue(false)
    setTitle("");
  }
  const handleAddTitleCancelSa = () => {
    setSearchSa([]);
    setValueSa(false)
    setTitleSal("");
  }
  const handleDesc = () => {
    const data = search.length > 0 ? [...search] : [...expenses];
    data.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.description.localeCompare(b.description);
      } else {
        return b.description.localeCompare(a.description);
      }
    });
    setSearch(data);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
  const handleDescSa = () => {
    const data = searchSa.length > 0 ? [...searchSa] : [...salaries];
    data.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
    setSearchSa(data);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleInput = (e) => {
    const inputValue = e.target.value;
    setTitle(inputValue);

    const data = searchData(inputValue);
    setSearch(data);

    console.log(inputValue);
  };
  const handleInputSa = (e) => {
    const inputValue = e.target.value;
    setTitleSal(inputValue);

    const data = searchDataSal(inputValue);
    setSearchSa(data);

    console.log(inputValue);
  };


  const calculateTotal = (data) => data.reduce((acc, val) => acc + parseInt(val.amount), 0);

  const handleExport = () => {
    let setting = {
      filename: "ExpenseData",
      extraLength: 4,
      writeMode: "download",
      writeOptions: {},
      RTL: false,
    };
    xlsx(data, setting);
  };


  return (
    <div className="min-h-screen w-full bg-[#2148C0]">
      <Header />
      <article className='text-white flex flex-row justify-center gap-3 mt-5'>
        <Link to='/expense' className='p-2 bg-amber-700 border-2 border-amber-700 rounded-md hover:text-amber-700 hover:bg-white duration-300 ease-in-out cursor-pointer'>Expense</Link>
        <Link to='/addSalary' className='p-2 bg-amber-700 border-2 border-amber-700 rounded-md hover:text-amber-700 hover:bg-white duration-300 ease-in-out cursor-pointer'>Add Salary</Link>
      </article>

      <article className='text-white mt-5 flex flex-col lg:flex-row gap-3'>
        {/* Expense Table */}
        <aside className='rounded-md bg-black/10 p-4 w-full'>
          <h2 className='text-2xl text-center mb-4'>Expense</h2>
          <div className='my-3'>
            <input
              type='search'
              placeholder='Add Description'
              className='bg-white p-1 rounded-md text-black'
              name='title'
              value={title}
              onChange={(e) => handleInput(e)}
            />&nbsp;
            {value ? <button className='p-1 rounded-md text-green-600 bg-amber-800 cursor-pointer hover:scale-110' onClick={handleAddTitleCancel}>Cancel
            </button> : <button className='p-1 rounded-md text-green-600 bg-amber-800 cursor-pointer hover:scale-110' onClick={handleAddTitle}>Search
            </button>
            }
          </div>

          <table className="w-full border-collapse border border-gray-500">
            <thead>
              <tr className="bg-gray-700">
                <th className="border border-gray-500 p-2">Title</th>
                <th className="border border-gray-500 p-2">Amount (Rs.)</th>
                <th className="border border-gray-500 p-2">Description
                  <HiSortDescending className={`cursor-pointer ${sortOrder === 'asc' ? 'rotate-180' : ''}`} onClick={handleDesc} />

                </th>
                <th className="border border-gray-500 p-2">Date&Time</th>
                <th className="border border-gray-500 p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {(search.length > 0 ? search : expenses).map((expense) => (
                <tr key={expense.id} className="hover:bg-gray-600 cursor-pointer text-center capitalize">
                  <td className="border border-gray-500 p-2">{expense.title}</td>
                  <td className="border border-gray-500 p-2">Rs. {expense.amount}</td>
                  <td className="border border-gray-500 p-2">{expense.description}</td>
                  <td className="border border-gray-500 p-2">{new Date(expense.id).toLocaleString()}</td>
                  <td className="border border-gray-500 p-2 flex justify-center gap-4">
                    <button onClick={() => handleEdit(expense.id)}><FaEdit className='w-8 h-8 text-green-600 cursor-pointer hover:scale-110' /></button>
                    <button onClick={() => deleteExpense(expense.id)}><MdDeleteOutline className='w-8 h-8 text-red-900 cursor-pointer hover:scale-110' /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='text-center'>Total expense: Rs.{calculateTotal(expenses)}</div>
        </aside>

        {/* Salary Table */}
        <aside className='rounded-md bg-black/10 p-4 w-full'>
          <h2 className='text-2xl text-center mb-4'>Salary</h2>
          <div className='my-3'>
            <input
              type='text'
              placeholder='Add Title'
              className='bg-white p-1 rounded-md text-black'
              name='title'
              value={titleSal}
              onChange={(e) => handleInputSa(e)}
            />&nbsp;
            {valueSa ? <button className='p-1 rounded-md text-green-600 bg-amber-800 cursor-pointer hover:scale-110' onClick={handleAddTitleCancelSa}>Cancel
            </button> : <button className='p-1 rounded-md text-green-600 bg-amber-800 cursor-pointer hover:scale-110' onClick={handleAddTitleSa}>Search
            </button>
            }
          </div>
          <table className="w-full border-collapse border border-gray-500">
            <thead>
              <tr className="bg-gray-700">
                <th className="border border-gray-500 p-2">Title
                  <HiSortDescending className={`cursor-pointer ${sortOrder === 'asc' ? 'rotate-180' : ''}`} onClick={handleDescSa} />

                </th>
                <th className="border border-gray-500 p-2">Amount (Rs.)</th>
                <th className="border border-gray-500 p-2">Date&Time</th>
                <th className="border border-gray-500 p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {(searchSa.length > 0 ? searchSa : salaries).map((salary) => (
                <tr key={salary.id} className="hover:bg-gray-600 cursor-pointer text-center capitalize">
                  <td className="border border-gray-500 p-2">{salary.title}</td>
                  <td className="border border-gray-500 p-2">Rs. {salary.amount}</td>
                  <td className="border border-gray-500 p-2">{new Date(salary.id).toLocaleString()}</td>
                  <td className="border border-gray-500 p-2 flex justify-center gap-4">
                    <button onClick={() => handleSalaryEdit(salary.id)}><FaEdit className='w-8 h-8 text-green-600 cursor-pointer hover:scale-110' /></button>
                    <button onClick={() => deleteSalary(salary.id)}><MdDeleteOutline className='w-8 h-8 text-red-900 cursor-pointer hover:scale-110' /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='text-center'>Total salary: Rs.{calculateTotal(salaries)}</div>
        </aside>
      </article>

      <div className='flex flex-row justify-center gap-3 mt-5'>
        <Link to="/chart" title="View Chart">
          <FaChartLine className='w-10 h-10 ml-5 mt-5 text-white hover:text-blue-600' />
        </Link>

        <button title="Export File" onClick={() => handleExport()}>
          <FaFileExport className='w-10 h-10 ml-5 mt-5 text-white hover:text-blue-600' />
        </button>
      </div>

      <p className={`text-2xl text-center mt-5 ${calculateTotal(salaries) - calculateTotal(expenses) < 0 ? 'text-red-900 animate-bounce ' : 'text-white'}`}
      >
        Saving Amount: Rs. {calculateTotal(salaries) - calculateTotal(expenses)}
      </p>
      <p
        className={`text-2xl text-center mt-5 capitalize ${calculateTotal(salaries) - calculateTotal(expenses) < 0 ? 'text-red-900 animate-bounce' : 'text-white'}`}
      >
        Word: {toWords(calculateTotal(salaries) - calculateTotal(expenses))}
      </p>

    </div>
  );
}
