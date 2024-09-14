import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import './Navbar.css';
import DropdownMenu from "./buttons/Dropdown";

const Navbar = () => {
    return (
        <div>
            <nav>
                <Link to='/' className="title">SDG Scholar</Link>
                <ul>
                    <li><NavLink to='/about'>About</NavLink></li>
                    <li><NavLink to='/faq'>FAQ</NavLink></li>
                    <DropdownMenu />
                    <li><NavLink to='/discussion'>Discussion</NavLink></li>
                </ul>

            </nav>

        </div>
    )
}

export default Navbar
