import React from "react";
import useSWR from "swr";
import axios from "axios";

const TestUseSWR = () => {
    
  const getData = async (url) => {
    const res = await axios.get(url);
    return res.data;
  };

  const { data, error } = useSWR(
    `https://api.coingecko.com/api/v3/simple/price?ids=milky-token&vs_currencies=usd`,
    getData
  );

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <div>
      <h1>Test useSWR</h1>
      <div>{data["milky-token"].usd}</div>
    </div>
  );
};

export default TestUseSWR;
