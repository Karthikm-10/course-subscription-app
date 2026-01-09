import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../config";
import { toast } from "react-toastify";

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [promo, setPromo] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState(null);
  const [promoValid, setPromoValid] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/courses/${id}`)
      .then((res) => setCourse(res.data))
      .catch(() => toast.error("Failed to load course"));
  }, [id]);

  const applyPromo = () => {
    if (promo === "BFSALE25") {
      setDiscountedPrice(course.price / 2);
      setPromoValid(true);
    } else {
      setPromoValid(false);
      setDiscountedPrice(null);
      alert("Invalid promo code");
    }
  };

  const subscribe = async () => {
    try {
      const token = localStorage.getItem("token");

      const body = { courseId: id };
      if (course.price > 0) body.promoCode = promo;

      await axios.post(`${API}/subscribe`, body, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Subscribed successfully");
      navigate("/my-courses");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!course) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Image */}
        <div>
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-64 object-cover rounded"
          />
        </div>

        {/* Right: Details */}
        <div>
          <h2 className="text-2xl font-bold mb-3">{course.title}</h2>
          <p className="text-gray-600 mb-4">{course.description}</p>

          {/* Price */}
          <div className="mb-4">
            {discountedPrice !== null ? (
              <>
                <span className="line-through text-gray-400 mr-2">
                  ₹{course.price}
                </span>
                <span className="text-xl font-bold text-green-600">
                  ₹{discountedPrice}
                </span>
              </>
            ) : (
              <span className="text-xl font-bold">
                {course.price === 0 ? "Free" : `₹${course.price}`}
              </span>
            )}
          </div>

          {/* Promo Section */}
          {course.price > 0 && (
            <div className="mb-4 space-y-2">
              <input
                className="w-full border p-2 rounded"
                placeholder="Enter promo code"
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
              />

              <button
                onClick={applyPromo}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
              >
                Apply Promo Code
              </button>
            </div>
          )}

          {/* Subscribe Button */}
          <button
            onClick={subscribe}
            disabled={course.price > 0 && !promoValid}
            className={`w-full py-3 rounded text-white transition ${
              course.price > 0 && !promoValid
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 cursor-pointer"
            }`}
          >
            Subscribe Now
          </button>
        </div>
      </div>
    </div>
  );
}
