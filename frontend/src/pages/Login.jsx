import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../config";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return toast.error("All fields are required");
    try {
      const res = await axios.post(`${API}/auth/login`, {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/home");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  
  
  return (
  <div className="min-h-screen bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center p-6">

    <div className="max-w-6xl w-full bg-white/10 backdrop-blur-md rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">

      <div className="hidden md:flex flex-col justify-center p-10 text-white">
        <h1 className="text-4xl font-bold mb-4">SkillBridge</h1>
        <p className="text-lg">
          Learn new skills. Build your future.  
          Explore top courses crafted for modern careers.
        </p>
      </div>

      <div className="bg-white p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition cursor-pointer">
            Login
          </button>
        </form>

        <p className="text-center mt-6 text-sm">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>

    </div>

  </div>
);

}
