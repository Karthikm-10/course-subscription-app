import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { API } from "../config";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Email and password required");

    try {
      await axios.post(`${API}/auth/signup`, {
        name,
        email,
        password
      });

      alert("Signup successful");
      navigate("/");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <h2>Signup</h2>

      <input placeholder="Name (optional)" value={name}
        onChange={(e) => setName(e.target.value)} />

      <input placeholder="Email" value={email} type="email"
        onChange={(e) => setEmail(e.target.value)} />

      <input placeholder="Password" type="password" value={password}
        onChange={(e) => setPassword(e.target.value)} />

      <button>Signup</button>

      <p>Already have an account? <Link to="/">Login</Link></p>
    </form>
  );
}
