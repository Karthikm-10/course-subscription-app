import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API } from "../config";
import { toast } from "react-toastify";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/");

    axios
      .get(`${API}/subscribe/my-courses`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCourses(res.data))
      .catch(() => toast.error("Failed to load subscriptions"));
  }, [navigate]);

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">My Courses</h2>

          <button
            onClick={() => navigate("/home")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
          >
            Back to Dashboard
          </button>
        </div>

        {courses.length === 0 ? (
          <div className="bg-white p-6 rounded shadow text-center text-gray-500">
            You have not subscribed to any courses yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {courses.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow p-4 border border-gray-300 hover:border-blue-500 transition"
              >
                <h3 className="text-lg font-semibold">{item.courseId.title}</h3>

                <p className="text-sm text-gray-600 mt-1">
                  Price Paid: ₹{item.pricePaid}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Subscribed on{" "}
                  {new Date(item.subscribedAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
