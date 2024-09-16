import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import Dropdown from "./buttons/Dropdown";
import logo_horizontal from "../assets/icons/logo_horizontal.svg";

const Navbar = () => {
  return (
    <div>
      {/* navbar container */}
      <nav className="flex items-center justify-between w-full h-16">
        {/* logo */}
        <Link to="/" className="ml-12">
          <img src={logo_horizontal} alt="SDG logo" className="w-40 h-10" />
        </Link>

        {/* Navigation links */}
        <ul className="absolute left-1/2 transform -translate-x-1/2 flex m-0">
          <li className="border-r border-gray-300 px-4 font-semibold">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="border-r border-gray-300 px-4 font-semibold">
            <NavLink to="/about">About</NavLink>
          </li>
          <Dropdown />
        </ul>

        <div className="w-10 h-10 bg-gray-300 rounded-full mr-12"></div>
      </nav>
    </div>
  );
};

export default Navbar;
