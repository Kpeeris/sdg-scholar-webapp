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
        <ul className="absolute left-1/2 transform -translate-x-1/2 flex">
          <li className="border-r border-gray-300 px-2">
            <NavLink to="/about">About</NavLink>
          </li>
          <li className="border-r border-gray-300 px-4">
            <NavLink to="/faq">FAQ</NavLink>
          </li>
          <Dropdown className="border-r border-gray-300 px-4" />
          <li className="border-r border-gray-300 px-4">
            <NavLink to="/discussion">Discussion</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
