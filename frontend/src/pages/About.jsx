import React from 'react';
import about_image from '../assets/assets_frontend/about_image.png';

const About = () => {
  return (
    <div className="py-10 px-6">
      {/* Title */}
      <div className="text-center mb-6">
        <p className="text-3xl font-bold text-gray-800">
          ABOUT <span className="text-blue-600">US</span>
        </p>
      </div>

     {/* Content Section */}
     <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Image */}
        <div className="flex-1 h-[400px]">
          <img 
            src={about_image} 
            alt="About Us" 
            className="w-full h-full object-cover rounded-3xl border  shadow-lg"
          />
        </div>

        {/* Text Content */}
        <div className="flex-1 h-[400px] border-2 border-gray-200 rounded-3xl p-6 shadow-md overflow-y-auto">
          <p className="text-gray-700 mb-4">
            Welcome to our platform! We are committed to providing the best services and ensuring customer satisfaction. 
            Our team consists of experienced professionals dedicated to delivering high-quality solutions.
          </p>
          <hr className="my-2" />
          <p className="text-gray-700 mb-4">
            Our mission is to create a seamless experience for our users, empowering them with innovative tools 
            and reliable support. We believe in transparency, trust, and excellence.
          </p>
          <hr className="my-2" />
          <p className="text-gray-700">
            Join us on this journey as we strive to make a positive impact in the industry and beyond.
          </p>
        </div>
      </div>
      <div className="text-center mt-10">
  {/* Title */}
  <p className="text-3xl font-bold text-gray-800 mb-6">
    WHY <span className="text-blue-600">CHOOSE US</span>
  </p>

  {/* Points Section */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {/* Efficiency */}
    <div className="border-2 border-gray-300 rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300">
      <b className="text-lg text-gray-800 block mb-2">Efficiency:</b>
      <p className="text-gray-600">
        We provide quick and reliable solutions to meet your needs without compromising on quality.
      </p>
    </div>

    {/* Convenience */}
    <div className="border-2 border-gray-300 rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300">
      <b className="text-lg text-gray-800 block mb-2">Convenience:</b>
      <p className="text-gray-600">
        Our platform is easy to use and accessible anytime, anywhere.
      </p>
    </div>

    {/* Personalization */}
    <div className="border-2 border-gray-300 rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300">
      <b className="text-lg text-gray-800 block mb-2">Personalization:</b>
      <p className="text-gray-600">
        Tailored recommendations and services based on your preferences and needs.
      </p>
    </div>
  </div>
</div>

    </div>
  );
};

export default About;
