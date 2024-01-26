/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Card from "./Card";
import { FaSearch } from 'react-icons/fa'

export default function Homepage() {
  const [countries, setCountries] = useState([]);
  const [searchText, setSearchText] = useState("");
  const regions = [
            {
              name: "Filter by region",
              desc: "All"
            },
            {
              name: "Africa",
              desc: "Africa"
            },
            {
              name: "Americas",
              desc: "Americas"
            },
            {
              name: "Antarctic",
              desc: "Antarctic"
            },
            {
              name: "Asia",
              desc: "Asia"
            },
            {
              name: "Europe",
              desc: "Europe"
            },
            {
              name: "Oceania",
              desc: "Oceania"
            },
          ]

  useEffect(() => {
    document.title = `Showing All Countries`;
  }, []);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error(error);
      }
    };

    getCountries();
  }, []);

  async function searchCountry() {
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${searchText}`
      );
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error(error);
    }
  }


  async function filterByRegion(region) {
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/region/${region}`
      );
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleSearchCountry(e) {
    e.preventDefault();
    searchCountry();
  }

  function handleFilterByRegion(e) {
    e.preventDefault();
    filterByRegion();
  }

  return (
    <>
          <div className="flex flex-col md:flex-row md:my-10 " >
            <form onSubmit={handleSearchCountry} autoComplete="off" className='flex items-center'>
              <FaSearch className='my-auto absolute ml-8 xl:ml-24  md:ml-14 lg:w-[14px] md:w-[11px] w-[8px] fill-black dark:fill-white'/>
              <input type="text" placeholder="Search for a country..." value={searchText}  onChange={(e) => setSearchText(e.target.value)} className="lg:pl-10 pl-8 p-2  shadow-md rounded-md md:w-[100%] w-[89%] mx-4 md:ml-11 lg:ml-10 xl:ml-20 text-[10px] md:text-[12px] lg:text-[16px]  dark:bg-darkBlue dark:text-white"/>
            </form>  
      
            <form onSubmit={handleFilterByRegion}>   
              <select name='filter-by-region' id='filter-by-region' value={regions.name} onChange={(e) => filterByRegion(e.target.value)} className="ml-4 md:ml-auto my-5 md:my-2   p-2 shadow-md rounded-md text-[10px] md:text-[12px] lg:text-[16px]  font-medium  dark:bg-darkBlue dark:text-white">
                {regions.map((region, index) => (
                        <option key={index} value={region.name}>
                          {region.name}
                        </option>
                      ))}
              </select>
            </form>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 xl:gap-16 mx-10 lg:mx-10 xl:mx-20'>
            {countries.map((country) => (
            <Card key={country.name.common} {...country} />
            ))}
          </div>
  </>
)
}