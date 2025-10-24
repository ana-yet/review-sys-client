import React from "react";

const ourPartners = [
  {
    name: "TechNova",
    logo: "https://i.ibb.co/NdNYvwb5/technova.png",
    description: "Provides cutting-edge IT infrastructure and cloud solutions.",
  },
  {
    name: "HealthPro",
    logo: "https://i.ibb.co/2YLdhKh6/helthpro.png",
    description:
      "Partners in delivering secure and scalable healthcare services.",
  },
  {
    name: "EduPlus",
    logo: "https://i.ibb.co/mFt8Zp2D/eduplus.png",
    description: "Empowers online education with reliable platforms and tools.",
  },
  {
    name: "LogiTrack",
    logo: "https://i.ibb.co/SDr3ZTGM/Logi-Track.png",
    description: "Streamlines logistics and real-time tracking services.",
  },
  {
    name: "Designly",
    logo: "https://i.ibb.co/PsNc50Gw/Designly.jpg",
    description: "Creates user-centric design systems for digital products.",
  },
  {
    name: "MarketHero",
    logo: "https://i.ibb.co/JWVhVJn6/Market-Hero.jpg",
    description: "Supports our platform with marketing and analytics tools.",
  },
  {
    name: "SecureX",
    logo: "https://i.ibb.co/cSsd6nFh/SecureX.png",
    description:
      "Ensures cybersecurity compliance for service providers on our platform.",
  },
  {
    name: "GreenLoop",
    logo: "https://i.ibb.co/n4TzyCs/Green-Loop.png",
    description:
      "Advises on sustainable tech practices and eco-friendly hosting.",
  },
];

const Partners = () => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Meet Our <span className="text-indigo-600">Partners</span>
        </h2>
        <div className="w-20 h-1 bg-indigo-600 rounded-full mx-auto mt-4"></div>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Powering progress through meaningful collaboration
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-6">
        {ourPartners.map((partner, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300"
          >
            <img
              src={partner.logo}
              alt={partner.name}
              className="h-12 mb-3 object-contain"
              loading="lazy"
            />
            <h3 className="text-sm font-semibold text-gray-900">
              {partner.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partners;
