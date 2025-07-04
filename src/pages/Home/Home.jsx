import React, { useEffect, useState } from "react";
import Partners from "./Partners";
import PlatformStats from "./PlatformStats";
import Banner from "./Banner";
import Featured from "./Featured";
import WhyUs from "./WhyUs";
import HowItWorks from "./HowItWork";
import { Helmet } from "react-helmet-async";

const Home = () => {
  const [statsData, setStatsData] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_API}/counts`)
      .then((res) => res.json())
      .then((data) => setStatsData(data));
  }, []);
  return (
    <div>
      <Helmet>
        <title>Home | Review System</title>
        <meta
          name="description"
          content="Welcome to the homepage of Review System"
        />
      </Helmet>

      <Banner />

      <HowItWorks />

      <Featured />

      <Partners />

      <WhyUs />

      <PlatformStats statsData={statsData} />
    </div>
  );
};

export default Home;
