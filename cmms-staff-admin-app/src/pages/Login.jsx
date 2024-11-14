import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import backgroundImage from "../assets/background-login.jpg";
import logo from "../assets/logo.json";
import Lottie from "lottie-react";

const schema = yup.object().shape({
  email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
  password: yup
    .string()
    .min(5, "Mật khẩu phải có ít nhất 6 ký tự")
    .required("Mật khẩu là bắt buộc"),
});

const Login = () => {
  const { login } = useAuth();
  const {
    handleSubmit,
    register,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      reset();
      setError("afterSubmit", { ...error, message: error.message });
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
      }}
    >
      <div className="bg-white rounded-lg shadow w-96">
        <div className="flex flex-col items-center justify-center mt-6">
          <div className="flex items-center">
            <Lottie
              animationData={logo}
              className="mx-auto"
              style={{ height: 30, width: 30 }}
            />
            <div className="text-2xl font-sans text-primary">Cmms</div>
          </div>
          <h1 className="text-2xl font-bold">Đăng nhập</h1>
          {!!errors.afterSubmit && (
            <p className="text-sm mt-2 bg-[#FEF4F5] flex justify-center py-2 w-full text-red-500">
              {errors.afterSubmit.message}
            </p>
          )}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex flex-col gap-2 mx-6 my-4">
            <input
              type="email"
              id="email"
              {...register("email")}
              className="w-full py-2 border-b border-gray-300 outline-none hover:border-primary focus:border-primary"
              placeholder="Email đăng nhập"
              autoComplete="Email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
            <input
              type="password"
              id="password"
              {...register("password")}
              className="w-full py-2 border-b border-gray-300 outline-none hover:border-primary focus:border-primary"
              placeholder="Mật khẩu"
              autoComplete="current-password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
            <Link to="/forgot-password" className="text-sm text-blue-600">
              Quên mật khẩu?
            </Link>
          </div>
          <div className="flex">
            <button
              type="submit"
              className="rounded-bl-lg w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Quản lý
            </button>
            <button
              type="submit"
              className="rounded-br-lg w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Bán hàng
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
