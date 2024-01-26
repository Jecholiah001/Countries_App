/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'



function Card({flags , name, population, region, capital}){
return(
    <>
    <Link to={`/${name.common}`}>
    <div className=' bg-gray-100 dark:bg-darkBlue dark:text-white hover:gray-100 rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-lg w-full h-full shadow overflow-hidden'>
        <div className='lg:h-[50%] h-[45%]' >
            <img src={flags.png} className='rounded-tl-lg rounded-tr-lg w-full h-full' alt={name} />
        </div>
        <div className='p-5  mb-24'>
            <h3 className='font-bold mb-5'>{name.common}</h3>
            <h4 className='text-xs mb-2'>Population: <span>{population.toLocaleString()}</span></h4>
            <h4 className='text-xs mb-2'>Region: <span>{region}</span></h4>
            <h4 className='text-xs mb-2'>Capital: <span>{capital}</span></h4> 
        </div>
    </div>
    </Link>
    </>
)

}

export default Card