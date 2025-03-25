import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AuthContext from '../context/auth';
import { useNavigate } from 'react-router';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .matches(/^[a-zA-Z0-9@]+$/, 'Username can only contain letters, numbers, and @')
        .required('Username is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      login(values)
      navigate("/");
      resetForm();
    },
  });

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#2148C0] bg-[url('/images/BG.png')] bg-cover bg-center">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
       
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-gray-700 font-medium">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder='Enter Username'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.username && formik.errors.username ? (
              <p className="text-red-600 text-sm mt-1">{formik.errors.username}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                placeholder='Enter password'
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center"
              >
                {!showPassword ? <FaEyeSlash className='text-gray-600' /> : <FaEye className='text-gray-600' />}
              </button>
            </div>
            {formik.touched.password && formik.errors.password ? (
              <p className="text-red-600 text-sm mt-1">{formik.errors.password}</p>
            ) : null}
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
