import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { apiKey } from "../constants";
import { useData } from "./context/Provider";
import { ClimbingBoxLoader } from "react-spinners";

const categories = [
  "Health",
  "Science",
  "Opinion",
  "Lifestyle",
  "Travel",
  "Environment",
];

const mainCategories = ["Home", "World", "Politics", "Business", "Technology"];

function Navbar() {
  const [optionValue, setOptionVlaue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const { data, setData, loading, setLoading,error,setError } = useData();

  async function fetchData() {
    setLoading(true);
    try {
      const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&country=in&language=en&category=top`;
      const res = await fetch(url);
      const data = await res.json();
      setData(data.results);
    } catch (error) {
      setError(
        "It's not an error but the api rate limit exceeded for a minute. You can try later again within a minute"
      );
    } finally {
      setLoading(false);
    }
  }
  async function handleSearch(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const finalValue = searchValue.split(" ").join("%20");
      if (finalValue.trim()) {
        const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&country=in&language=en&q=${finalValue}`;
        const res = await fetch(url);
        const data = await res.json();
        setData(data.results);
      }
    } catch (error) {
      setError(
        "It's not an error but the api rate limit exceeded for a minute. You can try later again within a minute"
      );
    } finally {
      setLoading(false);
      setSearchValue("");
    }

    setLoading(false);
  }

  async function handleTopCategorySearch(e) {
    setLoading(true);

    try {
      const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&country=in&language=en&q=${e.target.textContent}`;
      const res = await fetch(url);
      const data = await res.json();
      setData(data.results);
    } catch (error) {
      setError(
        "It's not an error but the api rate limit exceeded for a minute. You can try later again within a minute"
      );
    } finally {
      setLoading(false);
    }
  }
  async function handleCategorySearch(searchParam) {
    setLoading(true);

    const finalValue = searchParam !== "" ? searchParam : "top%20news";

    try {
      const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&country=in&language=en&q=${finalValue}`;
      const res = await fetch(url);
      const data = await res.json();
      setData(data.results);
    } catch (error) {
      setError(
        "It's not an error but the api rate limit exceeded for a minute. You can try later again within a minute"
      );
    } finally {
      setLoading(false);
    }
  }

  if (!data)
    return (
      <div className="w-full h-screen flex justify-center items-center bg-[#ceeeee]">
        <ClimbingBoxLoader />
      </div>
    );

    if(error)
      return (
        <div className="w-full h-screen flex justify-center items-center bg-[#ceeeee]">
          <h1 className="text-2xl">{error}</h1>
        </div>
      );
  
  return (
    <nav className="w-full bg-[#0f3170] text-white flex justify-between items-center lg:py-6 py-3 px-10 xl:flex-row flex-col">
      <div className="logo text-2xl cursor-pointer ">Daily Digest</div>
      <ul className="flex items-center lg:gap-5 gap-3 lg:text-xl text-[1rem] xl:mt-0 mt-5 pl-3 ">
        {mainCategories.map((category, index) => (
          <li className="cursor-pointer" key={index}>
            {index === 0 ? (
              <button onClick={fetchData} className="hover:underline">{category}</button>
            ) : (
              <button onClick={handleTopCategorySearch} className="hover:underline">{category}</button>
            )}
          </li>
        ))}
      </ul>
      <div className="flex gap-4 lg:my-none my-5">
        <form className="bg-white rounded-xl flex" onSubmit={handleSearch}>
          <input
            type="text"
            className="h-full p-1 pl-3 rounded-l-xl outline-none text-black"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
          <button className="h-full px-2 text-black">
            <IoSearch />
          </button>
        </form>
        <select
          value={optionValue}
          onChange={(e) => {
            setOptionVlaue(e.target.value);
            handleCategorySearch(e.target.value);
          }}
          className="outline-none rounded-xl p-2 lg:block hidden text-black"
        >
          <option value="">Other Categories</option>
          {categories &&
            categories.map((category, index) => (
              <option value={category} key={index}>
                {category}
              </option>
            ))}
        </select>
      </div>
    </nav>
  );
}

export default Navbar;
