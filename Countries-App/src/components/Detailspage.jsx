/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

export default function Detailspage() {
  const [country, setCountry] = useState([])
  const { name } = useParams()

  useEffect(() => {
    const getCountry = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
        const data = await response.json();
        setCountry(data);
      } catch (error) {
        console.error(error);
      }
    };

    getCountry();
  }, [name]);

  useEffect(() => {
    document.title = `Countries | ${name}`;
  }, [name]);

  return (
    <>
    <section className="h-screen">
      <Link
        to="/"
        className=" flex lg:w-36 w-20 lg:gap-5 gap-2 md:mt-14 md:mb-20 mb-10 xl:ml-20 md:ml-10 ml-5 bg-white lg:py-2 lg:px-6  py-1 px-2 rounded shadow text-gray-700 hover:bg-gray-200 transition-all duration-200 dark:bg-gray-600 dark:hover:bg-gray-700 dark:text-white lg:text-[16px] text-[12px] "
      >
        <FaArrowLeft className="mt-1"/>Back
      </Link>
        {country.map((item) => (
          <div
            key={item.ccn3}
            className="md:flex "
          >
          <img className="xl:w-[42%] lg:w-[40%] md:w-[36%] w-[87%] xl:mx-20 lg:mx-10 md:mx-10 mx-5" src={item.flags.png} alt={item.name.common} />
          <div className="mx-5 py-10 md:py-9 md:mx-0">
            <h2 className="font-bold text-gray-900 dark:text-white md:text-[15px] lg:text-[23px] xl:text-[30px]">
            {item.name.official}
            </h2>
            <div className="md:flex md:flex-row lg:gap-24 md:gap-16 gap-32 xl:my-10 md:my-5 lg:text-[16px] text-[10px] sm:mb-5">
              <ul className= "my-4 mt-5 mb-10  md:mt-0 md:mb-0 flex flex-col items-start justify-start gap-3 text-slate-700 dark:text-gray-400">
                <li>Native Name: {item.nativeName}</li>
                <li >Population: {item.population.toLocaleString()}</li>
                <li>Region: {item.region}</li>
                <li>Subregion: {item.subregion}</li>
                <li>Capital: {item.capital[0]}</li>
              </ul>

              <ul className="my-4  mb-10 md:mb-0 flex flex-col items-start justify-start gap-3 text-slate-700 dark:text-gray-400">
                <li>Top Level Domain:</li>
                <li>Currencies: </li>
                <li>Languages: </li>
              </ul>
            </div> 

            <div className="flex gap-2 lg:text-[16px] text-[10px]">
              <h2 className=" text-gray-900 dark:text-white font-bold">Border Countries:</h2>
              <ul className=" flex gap-4 text-gray-900 dark:text-white">
                {/* <li>ghana</li>
                <li>ghana</li>
                <li>ghana</li>
                <li>ghana</li> */}
                {/* {item.borders.map((border, index) => (
                      <li
                        key={index}
                        className="bg-white p-2 rounded text-xs tracking-wide shadow dark:bg-gray-800 dark:text-gray-400 text-gray-700"
                      >
                        {border}
                      </li>
                ))} */}
              </ul>
            </div>  
                {/* {item.border.map((border,index)=> {
                  
                    <ul>
                      <li key={index}>{border}</li>
                    </ul>
                  
                })} */}
              
              
              
            
            </div>
          </div>
        ))}
      </section>
    </>
  )
}