// paymentHandler.js
import axios from "axios";
import { toast } from "react-toastify";

export const handleRazorpayPayment = async ({
  amount,
  token,
  backendUrl,
  appointmentId,
  onSuccess,
  navigate, // ✅ Receive navigate as argument
}) => {
  try {
    const { data } = await axios.post(
      `${backendUrl}/api/user/payment/create-order`,
      { amount, receipt: `receipt_order_${appointmentId}` },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const { order, key } = data;

    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "HealthCare",
      description: "Appointment Payment",
      order_id: order.id,

      handler: async function (response) {
        const {
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
        } = response;

        try {
          const verifyRes = await axios.post(
            `${backendUrl}/api/user/payment/verify`,
            {
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature,
              appointmentId,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          toast.success(verifyRes.data.message || "Payment successful!");
          if (onSuccess) onSuccess();
          console.log("payemny is successfull:",verifyRes.data)
          if (navigate) navigate("/my-appointments"); // ✅ Navigate if provided
        } catch (verifyError) {
          console.error("Verification Error:", verifyError.response?.data || verifyError);
          toast.error(
            verifyError.response?.data?.message || "Payment verification failed."
          );
        }
      },

      prefill: {
        name: "Patient",
        email: "demo@example.com",
        contact: "9999999999",
      },

      theme: {
        color: "#1976d2",
      },
    };

    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
  } catch (error) {
    console.error("Razorpay Error:", error.response?.data || error);
    toast.error(error.response?.data?.message || "Payment initiation failed.");
  }
};
