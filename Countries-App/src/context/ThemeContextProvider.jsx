/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { createContext , useEffect, useState } from 'react'

export const ThemeContext = createContext()

const ThemeContextProvider = ({children})  => {
    const [theme, setTheme] = useState('light')

    const themeToggler = () => {
        setTheme  ((prevState) => prevState === 'light'? 'dark':'light')
    }

    useEffect(() => {
        document.querySelector('html').classList.remove('dark','light')
        document.querySelector('html').classList.add(theme)
    },[theme])

return (
    <ThemeContext.Provider value={{theme, themeToggler}}>
        {children}
    </ThemeContext.Provider>
)
}

export default ThemeContextProvider