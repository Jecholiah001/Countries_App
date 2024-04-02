/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

export default function Detailspage() {
  const [country, setCountry] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);
  const { name } = useParams();

  useEffect(() => {
    const getCountry = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
        const data = await response.json();
        setCountry(data);
        
        // Fetch details of border countries
        const borderCodes = data[0]?.borders || [];
        const borderDetails = await Promise.all(
          borderCodes.map(async (borderCode) => {
            try {
              const borderResponse = await fetch(`https://restcountries.com/v3.1/alpha/${borderCode}`);
              const borderData = await borderResponse.json();
              return borderData[0]?.name?.common || borderCode;
            } catch (error) {
              console.error(`Error fetching border country details for ${borderCode}`, error);
              return borderCode;
            }
          })
        );
        setBorderCountries(borderDetails);
      } catch (error) {
        console.error(error);
      }
    };

    getCountry();
  }, [name,setCountry, setBorderCountries]);

  useEffect(() => {
    document.title = `Countries | ${name}`;
  }, [name]);

  return (
    <>
      <section className="h-[900px]">
        <Link
          to="/"
          className="flex lg:w-36 w-20 lg:gap-5 gap-2 md:mt-14 md:mb-20 mb-10 xl:ml-20 md:ml-10 ml-5 bg-white lg:py-2 lg:px-6 py-1 px-2 rounded shadow text-gray-700 hover:bg-gray-200 transition-all duration-200 dark:bg-gray-600 dark:hover:bg-gray-700 dark:text-white lg:text-[16px] text-[12px]"
        >
          <FaArrowLeft className="mt-1" />Back
        </Link>
        {country === null && <div>Loading...</div>}
        { Array.isArray(country) && country.map((item, index) => (
          <div key={index} className="md:flex w-full">
            <img
              className="xl:w-[50%] lg:w-[45%] md:w-[50%] w-[87%] xl:mx-20 lg:mx-10 md:mx-10 mx-5"
              src={item.flags.png}
              alt={item.name.common}
            />
            <div className="mx-5 py-10 md:py-9 md:mx-0">
              <h2 className="font-bold text-gray-900 dark:text-white md:text-[15px] lg:text-[23px] xl:text-[30px]">
                {item.name.official}
              </h2>
              <div className="w-full md:flex md:flex-row lg:gap-14 md:gap-4 gap-32 xl:my-10 md:my-5 lg:text-[16px] text-[10px] sm:mb-5">
                <ul className="md:w-[45%] my-4 mt-5 mb-10 md:mt-0 md:mb-0 flex flex-col items-start justify-start gap-3 text-slate-700 dark:text-gray-400">
                  <li className="font-bold">Native Name: <span className="font-normal">{item.name.common}</span> </li>
                  <li className="font-bold">Population:<span className="font-normal">{item.population.toLocaleString()}</span></li>
                  <li className="font-bold">Region: <span className="font-normal">{item.region}</span></li>
                  <li className="font-bold">Subregion: <span className="font-normal">{item.subregion}</span></li>
                  <li className="font-bold">Capital: <span className="font-normal">{item.capital[0]}</span></li>
                </ul>

                <ul className="md:w-[50%]  my-4 mb-10 md:mt-0 md:mb-0 flex flex-col items-start justify-start gap-3 text-slate-700 dark:text-gray-400">
                  <li className="font-bold">Top Level Domain: <span className="font-normal">{item.tld}</span></li>
                  <li className="font-bold">Currencies: <span className="font-normal">{Object.keys(item.currencies)}</span></li>
                  <li className="font-bold">Languages: <span className="font-normal">{Object.values(item.languages).join(", ")}</span></li>
                </ul>
              </div>

              <div className=" w-full flex gap-2 l g:text-[16px] text-[10px]">
                <h2 className="w-40 text-gray-900 dark:text-white font-bold mt-2">Border Countries:</h2>
                {borderCountries.map((borderCountry) => (
                  <div className="flex " key={borderCountry}>
                  <Link to={`/${borderCountry}`}>
                    <button className="p-2  rounded shadow-lg text-gray-900 dark:text-white bg-white dark:bg-darkBlue">
                      {borderCountry}
                    </button>
                  </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
        {country !== null && !Array.isArray(country) && (
          <div className="error-message">Error fetching country details</div>
        )}
      </section>
    </>
  );
}
