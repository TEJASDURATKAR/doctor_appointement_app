import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/Context';
import { FaUserMd } from 'react-icons/fa';

const Doctors = () => {
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  const [filterDoc, setFilterDoc] = useState(doctors);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    if (speciality) {
      const filtered = doctors.filter(doc => 
        doc.speciality.toLowerCase() === speciality.toLowerCase()
      );
      setFilterDoc(filtered);
    } else {
      setFilterDoc(doctors);
    }
  }, [speciality, doctors]);

  return (
    <div className="flex gap-4 flex-col md:flex-row">
  {/* Filter Button for Mobile */}
  <button 
    className="py-2 px-4 border rounded text-sm bg-blue-500 text-white md:hidden"
    onClick={() => setShowFilter((prev) => !prev)}
  >
    {showFilter ? "Hide Filters" : "Show Filters"}
  </button>

  {/* Speciality List - Always visible on desktop, toggled on mobile */}
  <div 
    className={`bg-gray-50 p-4 rounded-lg mt-5 md:w-1/4 md:block ${
      showFilter ? "block" : "hidden"
    }`}
  > 
    {[
      "General Physician", 
      "Gynocologist", 
      "Dermatologist", 
      "Pediatrician", 
      "Neurologist", 
      "Gastroenterologist"
    ].map((speciality, index) => (
      <p 
        key={index}
        className="cursor-pointer hover:text-blue-500 transition border-2 text-center mt-2 pt-2 pb-2 duration-200 mb-2"
        onClick={() => navigate(`/doctors/${speciality.toLowerCase()}`)}
      >
        {speciality}
      </p>
    ))}
  </div>

  {/* Doctors List */}
  <div className="grid grid-cols-1 md:grid-cols-2 mt-10 lg:grid-cols-3 gap-6 w-full md:w-3/4">
    {filterDoc.map((item, index) => (
      <div 
        key={index}
        onClick={() => navigate(`/appointment/${item._id}`)}
        className="bg-white shadow-xl rounded-lg p-4 border hover:scale-105 transition duration-300 cursor-pointer"
      >
        <img src={item.image} alt={item.name} className="w-36 h-36 object-cover rounded-full mx-auto mb-3" />
        <div className="flex justify-center items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <p className="text-sm text-gray-500">Available</p>
        </div>
        <p className="text-center text-lg font-medium mt-2">{item.name}</p>
        <p className="text-center text-gray-500 text-sm">{item.speciality}</p>
      </div>
    ))}
  </div>
</div>

  );
};

export default Doctors;
