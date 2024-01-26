/* eslint-disable no-unused-vars */
import React from 'react'
import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContextProvider.jsx'
import {FaMoon, FaSun} from 'react-icons/fa'

function Header() {
    const {theme,themeToggler} = useContext(ThemeContext)

return (
    <div className='shadow-md py-4 px-5 md:py-4 md:px-11 lg:py-6 lg:px-8  mb-10  bg-white dark:bg-darkBlue'>
        <div className='flex container mx-auto dark:text-white'> 
            <h1 className='font-bold text-xs md:text-md lg:text-xl'>Where in the world?</h1>
            <div className= ' flex space-x gap-2 ml-auto font-medium' >
                <h4 className='text-[11px] md:text-[12px] lg:text-[18px]'> {theme === 'light' ? 'Dark Mode': 'Light Mode'}</h4>
                <span className='mt-0 lg:mt-1' onClick={themeToggler}> 
                {theme === 'light' ? <FaMoon alt='moon icon' className='w-[10px] lg:w-[16px]'/> : <FaSun alt='sun icon'className='w-[10px] lg:w-[16px]'/>
                }
            </span>
            </div>
        </div>

    </div>
)
}

export default Header