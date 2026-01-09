import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../config";

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [promo, setPromo] = useState("");
  const [promoValid, setPromoValid] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API}/courses/${id}`)
      .then(res => setCourse(res.data))
      .catch(() => alert("Failed to load course"));
  }, [id]);

  const applyPromo = () => {
  if (promo === "BFSALE25") {
    alert("Promo applied! 50% discount activated.");
    setPromoValid(true);
  } else {
    alert("Invalid promo code");
    setPromoValid(false);
  }
};


  const subscribe = async () => {
    try {
      const token = localStorage.getItem("token");

      const body = { courseId: id };
      if (course.price > 0) body.promoCode = promo;

      await axios.post(`${API}/subscribe`, body, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Subscribed successfully");
      navigate("/my-courses");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  if (!course) return <p>Loading...</p>;

  return (
    <div>
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <p>{course.price === 0 ? "Free" : `₹${course.price}`}</p>

      {course.price > 0 && (
  <>
    <input
      placeholder="Promo code"
      value={promo}
      onChange={(e) => setPromo(e.target.value)}
    />

    <button onClick={applyPromo}>Apply Promo Code</button>
  </>
)}

<button 
  onClick={subscribe} 
  disabled={course.price > 0 && !promoValid}
>
  Subscribe
</button>

    </div>
  );
}

