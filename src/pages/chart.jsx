import React, { useContext, useEffect, useState } from 'react';
import SalaryContext from '../context/salary';
import {
     Bar,
     BarChart,
     CartesianGrid,
     Legend,
     ResponsiveContainer,
     Tooltip,
     XAxis,
     YAxis
} from 'recharts';
import Header from './header';
import { Link } from 'react-router-dom'; // ✅ Updated for React Router v6
import { IoMdArrowBack } from 'react-icons/io';
import ExpenseContext from '../context/add';

export default function Chart() {
     const { salaries } = useContext(SalaryContext);
     const { expenses } = useContext(ExpenseContext);
     const [expensesData, setExpensesData] = useState([]);

     const [salariesData, setSalariesData] = useState([]);

     useEffect(() => {
          setSalariesData(salaries);
          setExpensesData(expenses);
     }, [salaries, expenses]);

     return (
          <>
               <Header />

               <div className="min-w-[90%] m-auto pt-2 bg-[#2148C0] min-h-screen">
                    <Link to="/" className="inline-block ml-5 mb-5 text-white text-3xl">
                         <IoMdArrowBack className="h-10 w-10 hover:text-blue-400" />
                    </Link>
                    <section className='flex flex-wrap'>
                         {expensesData.length > 0 && (

                              <article className="w-full max-w-[700px] h-[600px] m-auto bg-white p-5 rounded-md shadow-md">
                                   <h1 className="text-2xl font-bold text-center mb-4 text-[#2148C0]">Expenses</h1>
                                   <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                             data={expensesData}
                                             margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                        >
                                             <CartesianGrid strokeDasharray="3 3" />
                                             <XAxis dataKey="title" />
                                             <YAxis domain={[0, 10000]} tickCount={6} />
                                             <Tooltip />
                                             <Legend />
                                             <Bar dataKey="amount" fill="#FEBA17" barSize={150} />
                                        </BarChart>
                                   </ResponsiveContainer>
                              </article>
                         )}
                         {salariesData.length > 0 && (

                              <article className="w-full max-w-[700px] h-[600px] m-auto bg-white p-5 rounded-md shadow-md">
                                   <h1 className="text-2xl font-bold text-center mb-4 text-[#2148C0]">Salaries</h1>
                                   <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                             data={salariesData}
                                             margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                        >
                                             <CartesianGrid strokeDasharray="3 3" />
                                             <XAxis dataKey="title" />
                                             <YAxis domain={[0, 10000]} tickCount={6} />
                                             <Tooltip />
                                             <Legend />
                                             <Bar dataKey="amount" fill="#FEBA17" barSize={150} />
                                        </BarChart>
                                   </ResponsiveContainer>
                              </article>
                         )}
                    </section>
               </div>
          </>
     );
}
