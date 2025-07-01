import { nanoid } from "nanoid";
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
    <section className="py-22 max-w-7xl mx-auto ">
      <h2 className="text-center text-3xl font-bold py-6">
        Meet Our <span className="text-indigo-400">Partners</span>
        <p className="max-w-20 mx-auto  border-4 border-green-500 rounded-full my-4"></p>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-0">
        {ourPartners.map((partner, index) => (
          <div
            key={nanoid()}
            className="p-4 border border-gray-100 flex flex-col items-center text-center"
          >
            <img
              src={partner.logo}
              alt={partner.name}
              className="h-16 mb-3 object-contain"
            />
            <h3 className="text-lg font-semibold">{partner.name}</h3>
            <p className="text-sm text-gray-600">{partner.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Partners;
