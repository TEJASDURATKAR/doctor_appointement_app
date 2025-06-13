import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/Context";
import RelatedDoctors from "../components/RelatedDoctors";

const Appointement = () => {
  const { docId } = useParams();
  const { doctors } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);
  const dayOfWeek = ["SUN", "MON", "TUES", "WED", "THUS", "FRI", "SAT"];

  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  // ✅ Fetch doctor info based on ID
  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSlots = async () => {
    let today = new Date();
    let slots = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0); // Set end time to 9:00 PM

      // Set starting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });

        // Add slot to array
        timeSlots.push({
          dateTime: new Date(currentDate),
          time: formattedTime,
        });

        // Increment current time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      slots.push(timeSlots);
    }

    // ✅ Batch state update to avoid multiple renders
    setDocSlots(slots);
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  if (!docInfo) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="px-6 py-5 mt-10 rounded-lg border-2">
      {/* ✅ Doctor Info */}
      <div className="flex flex-col pl-10 md:flex-row items-center gap-6">
        {/* Doctor Image */}
        <div className=" rounded-full bg-violet-600">
          <img
            src={docInfo.image}
            alt={docInfo.name}
            className="w-full h-full "
          />
        </div>

        {/* Doctor Details */}
        <div className="ml-15 mt-2">
          <h2 className="text-2xl font-bold text-blue-800 mb-2">
            {docInfo.name}
          </h2>
          <p className="text-gray-800 text-xl underline mb-1">
            {docInfo.speciality}
          </p>
          <p className="text-gray-800 text-md mb-1">
            Experience: {docInfo.experience} years
          </p>
          <p className="text-gray-800 text-md mb-1">About: {docInfo.about}</p>
          <p className="text-gray-800 text-md mb-1">
            Availability: {docInfo.available ? "Available" : "Not Available"}
          </p>
          <p className="text-gray-800 text-md mb-1">
            Appointment Fees: ₹{docInfo.fees}
          </p>
        </div>
      </div>
      <hr />

      {/* ✅ Booking Slots */}
      <div className="mt-6 font-medium text-gray-700">
        <p>Booking Slots</p>
        <div className="flex gap-3 items-center w-full overflow-x-auto mt-4">
          {docSlots.length > 0 &&
            docSlots.map((item, index) => (
              <div
                key={index}
                className={`text-center py-4 px-3 min-w-22 rounded-full cursor-pointer border transition ${
                  slotIndex === index
                    ? "bg-violet-600 text-white border-blue-600"
                    : "border-gray-300 text-gray-700"
                }`}
                onClick={() => setSlotIndex(index)}
              >
                <p className="font-medium">
                  {item[0] && dayOfWeek[item[0].dateTime.getDay()]}
                </p>
                <p className="text-sm">
                  {item[0] && item[0].dateTime.getDate()}
                </p>
              </div>
            ))}
        </div>

        {/* ✅ Slot Time Selection */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-6 gap-2">
          {docSlots[slotIndex]?.map((slot, idx) => (
            <button
              key={idx}
              onClick={() => setSlotTime(slot.time)}
              className={`border px-5 py-2 rounded-lg text-sm ${
                slotTime === slot.time
                  ? "bg-violet-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              {slot.time}
            </button>
          ))}
        </div>
        <div className="justify-center">
          <button className="mt-4 bg-violet-600 text-white px-6 py-2 rounded-2xl hover:bg-blue-700 transition duration-300">
            Book Appointment
          </button>
        </div>
      </div>
      {/* Listing relate doctors */}
       <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>
    </div>
  );
};

export default Appointement;
