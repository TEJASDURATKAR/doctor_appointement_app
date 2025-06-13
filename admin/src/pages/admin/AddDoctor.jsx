import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets"; // ✅ Should contain a fallback upload image

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [degree, setDegree] = useState("");
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDocImg(file); // ✅ actual file object
      setPreviewImg(URL.createObjectURL(file)); // for UI display only
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!docImg) return toast.error("Please select an image");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", fees);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append("about", about);
      formData.append("role", "admin"); // 🔥 Set doctor as admin
      formData.append(
        "address",
        JSON.stringify({ line1: address, line2: address2 })
      );
      formData.append("image", docImg); // ✅ match multer field name

      const { data } = await axios.post(
        `${backendUrl}/api/admin/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${aToken}`,
          },
        }
      );

      toast.success("Doctor added successfully!");

      // Optional: Reset form
      setDocImg(null);
      setPreviewImg(null);
      setEmail("");
      setName("");
      setPassword("");
      setExperience("1");
      setFees("");
      setAbout("");
      setSpeciality("");
      setDegree("");
      setAddress("");
      setAddress2("");

    } catch (err) {
      console.error("Add doctor error", err);
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="p-6 rounded-lg shadow-md max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Add Doctor</h2>

      <form className="flex gap-8 flex-wrap" onSubmit={handleSubmit}>
        {/* Image Upload */}
        <div className="flex flex-col items-center gap-2">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              src={previewImg || assets.upload_area}
              alt="Upload"
              className="w-32 h-32 object-cover border rounded-md"
            />
          </label>
          <input
            type="file"
            id="doc-img"
            hidden
            onChange={handleImageChange}
            accept="image/*"
          />
          <p className="text-center text-sm text-gray-600">
            Upload Doctor <br /> Picture
          </p>
        </div>

        {/* Doctor Form Fields */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField label="Doctor Name" value={name} onChange={setName} />
          <InputField label="Doctor Email" type="email" value={email} onChange={setEmail} />
          <InputField label="Password" type="password" value={password} onChange={setPassword} />

          <SelectField
            label="Experience"
            value={experience}
            onChange={setExperience}
            options={["1", "2", "3", "4", "5+"]}
          />

          <InputField label="Fees" type="number" value={fees} onChange={setFees} />

          <SelectField
            label="Speciality"
            value={speciality}
            onChange={setSpeciality}
            options={[
              "General Physician",
              "Gynocologist",
              "Dermatologist",
              "Pediatrician",
              "Neurologist",
              "Gastroenterologist",
            ]}
          />

          <InputField label="Education (Degree)" value={degree} onChange={setDegree} />

          <div>
            <label className="block mb-1 font-medium">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address Line 1"
              required
              className="w-full p-2 border rounded-md mb-2"
            />
            <input
              type="text"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              placeholder="Address Line 2"
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>

        <div className="w-full">
          <label className="block mb-1 font-medium">About Doctor</label>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Write about the doctor"
            required
            rows={5}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="w-full">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md mt-4"
          >
            Add Doctor
          </button>
        </div>
      </form>
    </div>
  );
};

// Reusable input component
const InputField = ({ label, value, onChange, type = "text" }) => (
  <div>
    <label className="block mb-1 font-medium">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={label}
      required
      className="w-full p-2 border rounded-md"
    />
  </div>
);

// Reusable select component
const SelectField = ({ label, value, onChange, options }) => (
  <div>
    <label className="block mb-1 font-medium">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-2 border rounded-md"
      required
    >
      <option value="">Select {label}</option>
      {options.map((opt, idx) => (
        <option key={idx} value={opt}>
          {opt} {label === "Experience" ? "Year(s)" : ""}
        </option>
      ))}
    </select>
  </div>
);

export default AddDoctor;
