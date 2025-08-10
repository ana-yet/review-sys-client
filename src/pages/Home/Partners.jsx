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
      <div className="pb-10">
        <h2 className="text-center text-3xl font-bold ">
          Meet Our <span className="text-indigo-400">Partners</span>
        </h2>
        <p className="max-w-20 mx-auto  border-2 border-indigo-400 rounded-full my-2"></p>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl text-center mx-auto">
          Powering Progress Through Meaningful Collaboration
        </p>
      </div>
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
