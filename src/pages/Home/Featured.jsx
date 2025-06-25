import React, { useEffect, useState } from "react";
import FeaturedCard from "../../components/FeaturedCard";
import { nanoid } from "nanoid";
import useAxiosSecure from "../../hook/AxiosSecure";

const Featured = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_API}/featured`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  return (
    <div className="max-w-10/12 my-14 mx-auto">
      <div className="">
        <h1 className="md:text-3xl text-2xl font-bold  text-center ">
          Customer <span className="text-indigo-400">Favorites</span>
        </h1>
        <p className="max-w-20 mx-auto  border-4 border-green-500 rounded-full my-4"></p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-8 mt-10">
        {data.map((dat) => (
          <FeaturedCard key={nanoid()} dat={dat} />
        ))}
      </div>
    </div>
  );
};

export default Featured;
