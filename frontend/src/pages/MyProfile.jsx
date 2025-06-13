import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/Context";

const MyProfile = () => {
  const { userData, loadUserProfileData } = useContext(AppContext);
  console.log('userDATA',userData)
  const [isEdit, setIsEdit] = useState(false);
  const [tempData, setTempData] = useState(null);

  // Sync tempData whenever userData changes
  useEffect(() => {
    setTempData(userData);
  }, [userData]);

  // Show loading if userData not loaded yet
  if (!userData) {
    return <div className="text-center p-6">Loading profile data...</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const field = name.split(".")[1];
      setTempData((prev) => ({
        ...prev,
        address: { ...prev.address, [field]: value },
      }));
    } else {
      setTempData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = () => {
    // You might want to add an API call here to save updated profile to backend!
    setUserData(tempData); // Update context state
    setIsEdit(false);
  };

  const handleCancel = () => {
    setTempData(userData);
    setIsEdit(false);
  };

  return (
    <div className="max-w-md mx-auto border-2 mt-5 bg-white rounded-lg shadow-lg p-6">
      <h1 className="text-2xl font-semibold mb-4 underline text-center">
        My Profile
      </h1>
      <div className="flex flex-col items-center">
        <img
          src={userData.image || "/default-profile.png"}
          alt="Profile"
          className="w-34 h-34 rounded-full border-2 border-gray-300 mb-4"
        />
        {/* Editable Fields */}
        <div className="w-full">
          <div className="flex flex-col items-center mb-4">
            {isEdit ? (
              <input
                type="text"
                name="name"
                value={tempData?.name || ""}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 text-center"
              />
            ) : (
              <p className="text-2xl font-semibold text-center">{userData.name}</p>
            )}
          </div>

          <h1 className="text-1xl font-semibold mb-4 underline text-center">
            Contact Information
          </h1>
          <div className="flex flex-col mb-4">
            <label className="text-gray-500 mb-1">Phone</label>
            {isEdit ? (
              <input
                type="text"
                name="phone"
                value={tempData?.phone || ""}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="font-medium">{userData.phone}</p>
            )}
          </div>

          <div className="flex flex-col mb-4">
            <label className="text-gray-500 mb-1">Address Line 1</label>
            {isEdit ? (
              <input
                type="text"
                name="address.line1"
                value={tempData?.address?.line1 || ""}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="font-medium">{userData.address?.line1}</p>
            )}
          </div>

          <div className="flex flex-col mb-4">
            <label className="text-gray-500 mb-1">Address Line 2</label>
            {isEdit ? (
              <input
                type="text"
                name="address.line2"
                value={tempData?.address?.line2 || ""}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="font-medium">{userData.address?.line2}</p>
            )}
          </div>

          <div className="flex flex-col mb-4">
            <label className="text-gray-500 mb-1">Email</label>
            {isEdit ? (
              <input
                type="email"
                name="email"
                value={tempData?.email || ""}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="font-medium">{userData.email}</p>
            )}
          </div>

          <h1 className="text-1xl font-semibold mb-4 underline text-center">
            Basic Information
          </h1>
          <div className="flex flex-col mb-4">
            <label className="text-gray-500 mb-1">Gender</label>
            {isEdit ? (
              <select
                name="gender"
                value={tempData?.gender || ""}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <p className="font-medium">{userData.gender}</p>
            )}
          </div>

          <div className="flex flex-col mb-4">
            <label className="text-gray-500 mb-1">Date of Birth</label>
            {isEdit ? (
              <input
                type="date"
                name="dob"
                value={tempData?.dob || ""}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="font-medium">{userData.dob}</p>
            )}
          </div>

          {isEdit ? (
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="bg-violet-600 text-white px-4 py-2 rounded-3xl hover:bg-violet-900 w-full transition duration-200"
              >
                Save Information
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-400 text-white px-4 py-2 rounded-3xl hover:bg-gray-500 w-full transition duration-200"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="bg-violet-600 text-white px-4 py-2 rounded-3xl hover:bg-violet-900 w-full transition duration-200"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
