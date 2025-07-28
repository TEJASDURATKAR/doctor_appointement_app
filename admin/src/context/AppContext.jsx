// AppContext.js or context/AppContext.js
import React, { createContext, useState } from "react";


export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    return age;
  };

  // ✅ Add months array
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // ✅ Improved date formatting function
  const slotDateFormate = (slotDate) => {
    const dateArray = slotDate.split("_"); // expects "24_07_2025"
    if (dateArray.length !== 3) return slotDate; // fallback

    const day = dateArray[0];
    const monthIndex = parseInt(dateArray[1], 10) - 1; // JS months are 0-indexed
    const year = dateArray[2];

    const monthName = months[monthIndex] || "Unknown";

    return `${day} ${monthName} ${year}`;
  };

 

  return (
    <AppContext.Provider value={{ userData, setUserData, calculateAge, slotDateFormate }}>
      {children}
    </AppContext.Provider>
  );
};
