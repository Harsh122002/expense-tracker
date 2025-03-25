import React, { useContext, useEffect } from 'react';
import Header from './header';
import { Link, useLocation, useNavigate} from 'react-router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AuthContext from '../context/auth';
import ExpenseContext from '../context/add';

export default function Expense() {
  const { currentUser } = useContext(AuthContext);
  const { addExpense,retrievalId,updateExpense } = useContext(ExpenseContext);
  const location = useLocation();
  
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  console.log(id);

  useEffect(() => {
    if(id) {
      const expense = retrievalId(id);
      formik.setValues({...expense});
    } else {
      formik.setValues({title: '', description: '', amount: '', username: currentUser?.username || ''});
    }
  }, [])
  const navigate=useNavigate();
  
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      amount: '',
      username: currentUser?.username || '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
      amount: Yup.number().typeError('Amount must be a number').positive('Amount must be positive').required('Amount is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      if (id) {
        updateExpense(id, values);
        alert('Expense Updated Successfully');
        navigate("/")
      }
      else {
        addExpense(values);
        alert('Expense Added Successfully');
      }
         resetForm ();
    },
  });

  return (
    <div className="min-h-screen w-full bg-[#2148C0]">
      <Header />
      <h1 className="text-white text-center mt-5 text-3xl mb-5">Add Expense{id &&(`${id}`)}</h1>
      <form onSubmit={formik.handleSubmit} className="bg-white w-80 p-5 rounded-md m-auto shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Expense Title"
            className="w-full p-2 border rounded-md"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
          />
          {formik.touched.title && formik.errors.title && <div className="text-red-500 text-sm">{formik.errors.title}</div>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            placeholder="Expense Description"
            className="w-full p-2 border rounded-md"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            rows="4"
          ></textarea>
          {formik.touched.description && formik.errors.description && <div className="text-red-500 text-sm">{formik.errors.description}</div>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Amount</label>
          <input
            type="text"
            name="amount"
            placeholder="Amount"
            className="w-full p-2 border rounded-md"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.amount}
          />
          {formik.touched.amount && formik.errors.amount && <div className="text-red-500 text-sm">{formik.errors.amount}</div>}
        </div>
        <button type="submit" className="bg-amber-700 text-white p-2 rounded-md hover:bg-amber-800">{id ?"Update":"Add Expense"} </button>&nbsp;
        <Link to="/" className="mb-5 bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600">Back</Link>
      </form>
    </div>
  );
}