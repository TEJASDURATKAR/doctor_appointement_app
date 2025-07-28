import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { dToken, profileData, getProfileData, setProfileData } = useContext(DoctorContext);
  const backendUrl = import.meta.env.VITE_BACKENDURL;

  const [isEdit, setIsEdit] = useState(false);

 const updateProfile = async () => {
  try {
    const updateData = {
      docId: profileData._id, // ✅ Important: backend expects docId
      address: profileData.address,
      fees: profileData.fees,
      available: profileData.available,
    };

    const { data } = await axios.post(`${backendUrl}/api/doctor/doctor-profile`, updateData, {
      headers: {
        Authorization: `Bearer ${dToken}`,
      },
    });

    if (data.success) {
      toast.success(data.message);
      setIsEdit(false);
      getProfileData();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.error("error in update profile data:", error);
    toast.error(error.response?.data?.message || error.message);
  }
};

  useEffect(() => {
    if (dToken) getProfileData();
  }, [dToken]);

  if (!profileData) {
    return <div>Loading profile...</div>;
  }

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      {/* Top Section */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "20px" }}>
        <div>
          <img
            src={profileData.image}
            alt="Doctor"
            style={{
              backgroundColor: "#a855f7",
              width: "100%",
              maxWidth: "256px",
              borderRadius: "12px",
            }}
          />
        </div>

        <div style={{ flex: 1, borderRadius: "12px", backgroundColor: "#fff" }}>
          <p style={{ fontSize: "18px", fontWeight: "600" }}>{profileData.name}</p>
          <div style={{ marginTop: "8px" }}>
            <p style={{ fontSize: "16px" }}>
              {profileData.degree} - {profileData.speciality}
            </p>
            <button
              style={{
                padding: "6px 12px",
                backgroundColor: "#e0e7ff",
                border: "none",
                borderRadius: "6px",
                marginTop: "4px",
              }}
            >
              {profileData.experience} years experience
            </button>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div style={{ marginBottom: "20px" }}>
        <p style={{ fontWeight: "bold" }}>About:</p>
        <p>{profileData.about}</p>
      </div>

      {/* Fees Section */}
      <p style={{ marginBottom: "20px" }}>
        Appointment fee: ₹{" "}
        {isEdit ? (
          <input
            type="number"
            value={profileData.fees}
            onChange={(e) =>
              setProfileData({ ...profileData, fees: Number(e.target.value) })
            }
            style={{
              padding: "4px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              width: "100px",
            }}
          />
        ) : (
          profileData.fees
        )}
      </p>

      {/* Address Section */}
      <div style={{ marginBottom: "20px" }}>
        <p style={{ fontWeight: "bold" }}>Address:</p>
        {isEdit ? (
          <>
            <input
              type="text"
              value={profileData.address?.line1 || ""}
              onChange={(e) =>
                setProfileData({
                  ...profileData,
                  address: { ...profileData.address, line1: e.target.value },
                })
              }
              placeholder="Line 1"
              style={{ marginBottom: "6px", padding: "4px", width: "100%" }}
            />
            <input
              type="text"
              value={profileData.address?.line2 || ""}
              onChange={(e) =>
                setProfileData({
                  ...profileData,
                  address: { ...profileData.address, line2: e.target.value },
                })
              }
              placeholder="Line 2"
              style={{ padding: "4px", width: "100%" }}
            />
          </>
        ) : (
          <>
            <p>{profileData.address?.line1}</p>
            <p>{profileData.address?.line2}</p>
          </>
        )}
      </div>

      {/* Availability Section */}
      <div style={{ marginBottom: "20px" }}>
        {isEdit ? (
          <>
            <input
              type="checkbox"
              id="available"
              checked={profileData.available}
              onChange={(e) =>
                setProfileData({ ...profileData, available: e.target.checked })
              }
            />
            <label htmlFor="available" style={{ marginLeft: "8px" }}>
              Available
            </label>
          </>
        ) : (
          <>
            <input
              type="checkbox"
              id="available"
              checked={profileData.available}
              disabled
            />
            <label htmlFor="available" style={{ marginLeft: "8px" }}>
              Available
            </label>
          </>
        )}
      </div>

      {/* Action Button */}
      {isEdit ? (
        <button
          style={{
            backgroundColor: "#10b981",
            color: "#fff",
            padding: "10px 16px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
          onClick={updateProfile}
        >
          Save
        </button>
      ) : (
        <button
          style={{
            backgroundColor: "#4f46e5",
            color: "#fff",
            padding: "10px 16px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
          onClick={() => setIsEdit(true)}
        >
          Edit
        </button>
      )}
    </div>
  );
};

export default DoctorProfile;
