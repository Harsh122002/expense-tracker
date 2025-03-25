import React, { useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from './header';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AuthContext from '../context/auth';
import SalaryContext from '../context/salary';

export default function AddSalary() {
  const { currentUser } = useContext(AuthContext);
  const { addSalary, retrievalId, updateSalary } = useContext(SalaryContext);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  console.log(id);
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      const salary = retrievalId(id);
      formik.setValues({ ...salary });
    } else {
      formik.setValues({ title: '', amount: '', username: currentUser?.username || '' });
    }
  }, []);
  const formik = useFormik({
    initialValues: {
      title: '',
      amount: '',
      username: currentUser?.username || '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      amount: Yup.number().positive('Amount must be positive').required('Amount is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      if (id) {
        updateSalary(id, values);
        alert('Salary Updated Successfully');
        navigate("/")
      }
      else {
        addSalary(values);
        alert('Salary Added Successfully');
      }

      resetForm();
    },
  });

  return (
    <div className="min-h-screen w-full bg-[#2148C0]">
      <Header />
      <h1 className="text-white text-3xl text-center mb-5 mt-5">Add Salary {id && (`${id}`)}</h1>
      <form className="bg-white p-5 w-80 m-auto rounded-md shadow-md" onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Salary Title"
            className="w-full p-2 border rounded-md"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
          />
          {formik.touched.title && formik.errors.title ? (
            <div className="text-red-500 text-sm">{formik.errors.title}</div>
          ) : null}
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
          {formik.touched.amount && formik.errors.amount ? (
            <div className="text-red-500 text-sm">{formik.errors.amount}</div>
          ) : null}
        </div>
        <button type="submit" className="bg-amber-700 text-white p-2 rounded-md hover:bg-amber-800">{id ? "Update" : "Add Salary"} </button>&nbsp;
        <Link to="/" className="mb-5 bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600">Back</Link>
      </form>
    </div>
  );
}
