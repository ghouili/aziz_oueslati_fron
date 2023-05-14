import React, { createContext, useEffect, useState } from 'react'
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";

const GeneralContext = createContext();

const ProviderContext = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [productDeatails, setProductDetails] = useState({open: false});
    const [openCart, setOpenCart] = useState(false);
    const [theme, setTheme] = useState('light');

    const ToggleSidebar = () => {
        var sidebar = document.getElementById("main__sidebar");
        setSidebarOpen(!sidebarOpen);
        if (!sidebarOpen) {
            sidebar.style.width = "255px";
        } else {
            sidebar.style.width = "85px";
        }
    }
    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    const HandleThemeSwitch = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    }



    const values = { sidebarOpen, theme, productDeatails, openCart, setOpenCart, setProductDetails, setSidebarOpen, ToggleSidebar, HandleThemeSwitch };
    return (
        <GeneralContext.Provider value={values} >
            {children}
        </GeneralContext.Provider>
    )
}

export { ProviderContext, GeneralContext }