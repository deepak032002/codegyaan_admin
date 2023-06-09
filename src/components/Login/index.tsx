import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginProps } from "./interface";
import loginImage from "../../assets/login.png";
import { AxiosResponse } from "axios";
import { useCallOnEvent } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setToken } from "../../redux/features/AuthSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { IoWarningOutline } from 'react-icons/io5'

const Login: React.FC<loginProps> = () => {

  const [{ data, error, isLoading }, fetch] = useCallOnEvent<AxiosResponse>('/user/login/', 'POST')
  const token = useSelector((state: RootState) => state.auth.token)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogin = async (data: any) => {
    fetch(data)
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(40, "Password must not exceed 40 characters"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (data) => {
      handleLogin(data);
    },
  });

  useEffect(() => {
    if (!token && data) {
      toast.success('Successfully LoggedIn!')
      dispatch(setToken({ token: data?.data.token }))
    }
  }, [data])

  useEffect(() => {
    if (token) navigate('/')
  }, [token])

  return (
    <div className="relative grid grid-cols-2 flex-col justify-center overflow-hidden border w-full min-h-screen bg-slate-50 font-['Poppins']">
      <div className="col-span-1 mt-10">
        <div className="w-full py-14 px-6 m-auto rounded-lg lg:max-w-xl">
          <div className="flex justify-center">
            <img alt="" className="h-14" src={""} />
          </div>
          <h1 className="text-center text-2xl font-extrabold text-gray-900 m-9">
            Log In To Your Acount
          </h1>
          <form className="mt-6" onSubmit={formik.handleSubmit}>
            <div className="mb-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-800"
              >
                Email
              </label>
              <input
                type="email"
                className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-[#01b399]  focus:ring-[#01b399]  focus:outline-none focus:ring focus:ring-opacity-40"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              <span className="text-red-500 text-xs">
                {formik.errors.email && formik.touched.email
                  ? "Email is invalid !"
                  : ""}
              </span>
            </div>
            <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-[#01b399] focus:ring-[#01b399] focus:outline-none focus:ring focus:ring-opacity-40"
              />
              <span className="text-red-500 text-xs">
                {formik.errors.password && formik.touched.password
                  ? "Password is Invalid !"
                  : ""}
              </span>
            </div>
            <div className="mt-6">
              {
                isLoading ?
                  <button
                    type="submit"
                    disabled
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#01b399] rounded-md hover:bg-[#01b399]  focus:outline-none focus:bg-[#01b399] "
                  >
                    Loading...
                  </button>
                  :

                  <button
                    type="submit"
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#01b399] rounded-md hover:bg-[#01b399]  focus:outline-none focus:bg-[#01b399] "
                  >
                    Login
                  </button>
              }
            </div>
          </form>
        </div>
      </div>
      <div className="col-span-1 flex justify-center mt-10">
        <img src={loginImage} alt="icon" className="" />
      </div>
    </div>
  );
};

export default Login;
