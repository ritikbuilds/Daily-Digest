import React, { useEffect } from "react";
import Card from "./Card";
import { apiKey } from "../constants";
import { useData } from "./context/Provider";
import { ClimbingBoxLoader } from "react-spinners";

function CardList() {
  const { data, setData, loading, setLoading,error,setError } = useData();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      try {
        const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&country=in&language=en&category=top`;
        const res = await fetch(url);
        const data = await res.json();
        setData(data.results);
      } catch (error) {
          setError("It's not an error but the api rate limit exceeded for a minute. You can try later again within a minute")
       
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="w-full h-screen flex justify-center items-center bg-[#ceeeee]">
        <ClimbingBoxLoader />
      </div>
    );
  // #edc7b7

  if(error)
    return (
      <div className="w-full h-screen flex justify-center items-center bg-[#ceeeee]">
        <h1 className="text-2xl">{error}</h1>
      </div>
    );

  return (
    <section className="bg-[#ceeeee] py-10 flex-1 w-full flex flex-wrap items-center justify-center">
      {data &&
        data.map((item, index) => (
          <Card {...item} index={index} key={item.article_id} />
        ))}
    </section>
  );
}

export default CardList;
