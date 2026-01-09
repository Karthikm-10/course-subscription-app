import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../config";
import { toast } from "react-toastify";

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/");
    axios
      .get(`${API}/courses`)
      .then((res) => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load courses");
        setLoading(false);
      });
  }, [navigate]);

  const handleLogout = () => {
    toast.success("Logged out Successfully..!");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="bg-white shadow p-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-2xl font-bold">Course Explorer</h2>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/my-courses")}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
            >
              My Courses
            </button>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto p-6 ">
        {loading && (
          <div className="text-center py-10 text-gray-500">
            Loading courses...
          </div>
        )}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-lg shadow p-4 border border-gray-300 hover:border-blue-500 transform hover:scale-105 transition duration-300"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-40 object-cover rounded"
                />

                <h3 className="text-lg font-semibold mt-3">{course.title}</h3>
                <p className="text-sm text-gray-600">{course.description}</p>

                <div className="flex justify-between items-center mt-3">
                  <span className="font-bold">
                    {course.price === 0 ? "Free" : `₹${course.price}`}
                  </span>

                  <Link
                    to={`/course/${course._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
