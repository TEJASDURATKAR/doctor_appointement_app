import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/Context";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, loadUserProfileData, setUserData, backendUrl } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);
  const [tempData, setTempData] = useState(null);

  useEffect(() => {
    loadUserProfileData();
  }, []);

  useEffect(() => {
    setTempData(userData);
  }, [userData]);

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

  const updateUserProfileData = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      formData.append("name", tempData.name);
      formData.append("phone", tempData.phone);
      formData.append("address", JSON.stringify(tempData.address)); // Ensure it's a string
      formData.append("gender", tempData.gender);
      formData.append("dob", tempData.dob);

      if (image) {
        formData.append("image", image);
      }

      const { data } = await axios.put(`${backendUrl}/api/user/profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        toast.success("Profile updated successfully!");
        loadUserProfileData(); // Refresh the latest profile
        setIsEdit(false);
      } else {
        toast.error(data.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Something went wrong while updating your profile.");
    }
  };

  const handleCancel = () => {
    setTempData(userData);
    setIsEdit(false);
  };

  if (!userData) {
    return <div className="text-center py-10 text-gray-500">Loading profile...</div>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-xl border m-2 p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-violet-700">My Profile</h2>

      <div className="flex flex-col items-center mb-6">
        {isEdit ? (
          <label htmlFor="image" className="cursor-pointer relative">
            <img
              src={
                image
                  ? URL.createObjectURL(image)
                  : tempData?.image || "/default-profile.png"
              }
              alt="Profile"
              className="w-32 h-32 rounded-full border-2 border-violet-500 object-cover"
            />
            <input
              type="file"
              id="image"
              hidden
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
        ) : (
          <img
            src={userData.image || "/default-profile.png"}
            alt="Profile"
            className="w-32 h-32 rounded-full border-2 border-violet-500 object-cover"
          />
        )}
      </div>
<hr />
      <div className="grid mt-2 grid-cols-1 gap-4">
        {/* NAME */}
        <div>
          <label className="text-sm text-gray-600">Full Name</label>
          {isEdit ? (
            <input
              name="name"
              value={tempData?.name || ""}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
            />
          ) : (
            <p className="text-lg font-medium">{userData.name}</p>
          )}
        </div>

        {/* PHONE */}
        <div>
          <label className="text-sm text-gray-600">Phone</label>
          {isEdit ? (
            <input
              name="phone"
              value={tempData?.phone || ""}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
            />
          ) : (
            <p>{userData.phone}</p>
          )}
        </div>

        {/* EMAIL */}
        <div>
          <label className="text-sm text-gray-600">Email</label>
          {isEdit ? (
            <input
              type="email"
              name="email"
              value={tempData?.email || ""}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
              disabled
            />
          ) : (
            <p>{userData.email}</p>
          )}
        </div>

        {/* ADDRESS LINE 1 */}
        <div>
          <label className="text-sm text-gray-600">Address Line 1</label>
          {isEdit ? (
            <input
              name="address.line1"
              value={tempData?.address?.line1 || ""}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
            />
          ) : (
            <p>{userData.address?.line1}</p>
          )}
        </div>

        {/* ADDRESS LINE 2 */}
        <div>
          <label className="text-sm text-gray-600">Address Line 2</label>
          {isEdit ? (
            <input
              name="address.line2"
              value={tempData?.address?.line2 || ""}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
            />
          ) : (
            <p>{userData.address?.line2}</p>
          )}
        </div>

        {/* GENDER */}
        <div>
          <label className="text-sm text-gray-600">Gender</label>
          {isEdit ? (
            <select
              name="gender"
              value={tempData?.gender || ""}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <p>{userData.gender}</p>
          )}
        </div>

        {/* DOB */}
        <div>
          <label className="text-sm text-gray-600">Date of Birth</label>
          {isEdit ? (
            <input
              type="date"
              name="dob"
              value={tempData?.dob || ""}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
            />
          ) : (
            <p>{userData.dob}</p>
          )}
        </div>

        {/* ACTIONS */}
        <div className="flex gap-4 mt-4">
          {isEdit ? (
            <>
              <button
                onClick={updateUserProfileData}
                className="w-full bg-violet-600 text-white py-2 rounded-md hover:bg-violet-700"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="w-full bg-gray-400 text-white py-2 rounded-md hover:bg-gray-500"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="w-full bg-violet-600 text-white py-2 rounded-md hover:bg-violet-700"
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
