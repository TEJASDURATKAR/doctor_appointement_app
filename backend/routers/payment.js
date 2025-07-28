import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

  const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", async (req, res) => {
  const { amount, doctorId, appointmentId } = req.body;

  console.log("💡 Received payment request:", req.body);

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `Doctor Appointment - ID: ${doctorId}`,
            },
            unit_amount: amount * 100, // Must be integer
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:5173/payment-success?appointmentId=${appointmentId}`,
      cancel_url: `http://localhost:5173/payment-failed`,
    });

    console.log("✅ Stripe session created:", session.id);
    res.status(200).json({ success: true, sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("❌ Stripe error:", error.message);
    res.status(500).json({ success: false, message: "Stripe session failed", error: error.message });
  }
});

export default router;

