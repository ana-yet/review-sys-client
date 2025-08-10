import React, { useEffect, useState } from "react";
import FeaturedCard from "../../components/FeaturedCard";
import { nanoid } from "nanoid";

const Featured = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_API}/featured`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="max-w-7xl my-22 mx-auto">
      <div className="">
        <h1 className="text-3xl font-bold  text-center ">
          Customer <span className="text-indigo-400">Favorites</span>
        </h1>
        <p className="max-w-20 mx-auto border-2 border-indigo-400 rounded-full my-2"></p>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl text-center mx-auto">
          Top-Rated Picks Loved by Our Community
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 mt-10">
        {data.map((dat) => (
          <FeaturedCard key={nanoid()} dat={dat} />
        ))}
      </div>
    </div>
  );
};

export default Featured;
