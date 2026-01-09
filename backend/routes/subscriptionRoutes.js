import express from "express";
import Subscription from "../models/Subscription.js";
import Course from "../models/Course.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Subscribe to course
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { courseId, promoCode } = req.body;
    
    const existing = await Subscription.findOne({
      userId: req.user.id,
      courseId
    });

    if (existing) {
      return res.status(400).json({ message: "Already subscribed to this course" });
    }
    const course = await Course.findById(courseId);

    if (!course) return res.status(404).json({ message: "Course not found" });

    let finalPrice = course.price;

    if (course.price > 0) {
      if (!promoCode) {
        return res.status(400).json({ message: "Promo code required" });
      }

      if (promoCode !== "BFSALE25") {
        return res.status(400).json({ message: "Invalid promo code" });
      }

      finalPrice = course.price / 2;
    }

    const subscription = await Subscription.create({
      userId: req.user.id,
      courseId,
      pricePaid: finalPrice
    });

    res.json({ message: "Subscribed successfully", subscription });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// My Courses
router.get("/my-courses", authMiddleware, async (req, res) => {
  const subscriptions = await Subscription.find({ userId: req.user.id })
    .populate("courseId");

  res.json(subscriptions);
});

export default router;
