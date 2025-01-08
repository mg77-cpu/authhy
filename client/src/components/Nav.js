import { useState } from 'react';
import React from 'react';
import gif1 from "../components/images/gif1.gif";
import { BiAperture } from "react-icons/bi";

const NavbarItem = ({ title, classProps, link }) => {
    return (
        <li className={`mx-4 cursor-pointer ${classProps}`}>
            <a href={link}>{title}</a>
        </li>
    );
}

const Navb = () => {
    const [toggleMenu, setToggleMenu] = useState(false);

    return (
        <nav className="flex md:justify-center justify-between items-center p-4">
            <div className="relative right-20 md:flex-[0.5] flex justify-start items-center">
                <img  src={gif1} alt="img" 
                  className="w-20 cursor-pointer bg-gray-500 h-65 2x:h-90 rounded-full shadow-lg object-cover"/>
                      <h1 className="font-bold text-white text-gradient relative left-10 text-4xl w-52">Authyy</h1>            
            </div>
            <ul className="text-[#fff] md:flex hidden list-none flex-row justify-between items-center flex-initial text-xl text-gradient">
                {[
                    { title: "Home", link: "/" },
                    { title: "Product Registration", link: "/product" },
                    { title: "Scan Product", link: "/get" },
                    { title: "About", link: "/about" }
                ].map((item, index) => (
                    <NavbarItem key={item.title + index} title={item.title} link={item.link} />
                ))}
            </ul>
            <div className="flex relative">
                {toggleMenu
                    ? <BiAperture fontSize={28} className="text-gray md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
                    : <BiAperture fontSize={28} className="text-gray md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
                }
                {toggleMenu && (
                    <ul 
                       className="z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
                       flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in">
                      <li className="text-xl w-full my-2">
                         <BiAperture onClick={() => setToggleMenu(false)} />
                      </li>
                      {[
                          { title: "Home", link: "/" },
                          { title: "Product Registration", link: "/product" },
                          { title: "Scan Product", link: "/get" },
                          { title: "About", link: "/about" }
                      ].map((item, index) => (
                          <NavbarItem key={item.title + index} title={item.title} link={item.link} classProps="my-2 text-lg" />
                      ))}
                    </ul>
                )}
            </div>   

            <div className="flex items-center">
            </div>
        </nav> 
    );
}

export default Navb;