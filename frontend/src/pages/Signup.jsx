import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { API } from "../config";
import { toast } from "react-toastify";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Email and password required");

    try {
      await axios.post(`${API}/auth/signup`, {
        name,
        email,
        password,
      });

      toast.success("Signup successful");
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-600 to-teal-600 flex items-center justify-center p-6">
      <div className="max-w-6xl w-full bg-white/10 backdrop-blur-md rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        <div className="hidden md:flex flex-col justify-center p-10 text-white">
          <h1 className="text-4xl font-bold mb-4">SkillBridge</h1>
          <p className="text-lg">
            Start your learning journey today. Build real-world skills with
            industry-ready courses.
          </p>
        </div>

        <div className="bg-white p-8">
          <h2 className="text-2xl font-bold text-center mb-6">
            Create Account
          </h2>

          <form onSubmit={handleSignup} className="space-y-4">
            <input
              className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Name (Optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition cursor-pointer">
              Sign Up
            </button>
          </form>

          <p className="text-center mt-6 text-sm">
            Already have an account?{" "}
            <Link to="/" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
