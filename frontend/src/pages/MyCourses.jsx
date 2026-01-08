import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API } from "../config";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/");

    axios.get(`${API}/subscribe/my-courses`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setCourses(res.data))
    .catch(() => alert("Failed to load subscriptions"));
  }, [navigate]);

  return (
    <div>
      <h2>My Courses</h2>

      {courses.map(item => (
        <div key={item._id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          <h3>{item.courseId.title}</h3>
          <p>Price Paid: ₹{item.pricePaid}</p>
          <p>Date: {new Date(item.subscribedAt).toLocaleDateString()}</p>
        </div>
      ))}

      <button onClick={() => navigate("/home")}>Back to Home</button>
    </div>
  );
}
