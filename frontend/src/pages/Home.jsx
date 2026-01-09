import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../config";

export default function Home() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/");
    axios.get(`${API}/courses`)
      .then(res => setCourses(res.data))
      .catch(() => alert("Failed to load courses"));
  },[navigate]);

  const handleLogout=()=>{
    localStorage.removeItem("token")
    navigate('/')
  }

  return (
    <div>
      <h2>Courses</h2>
      
      <button onClick={handleLogout}>Logout</button>

      {courses.map(course => (
        <div key={course._id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          <h3>{course.title}</h3>
          <p>{course.description}</p>
          <p>{course.price === 0 ? "Free" : `₹${course.price}`}</p>
          <Link to={`/course/${course._id}`}>View</Link>
        </div>
      ))}

      <br />
      <button  onClick={() => navigate("/my-courses")}>My Courses</button>
    </div>
  );
}
