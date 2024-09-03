import React from "react";
import { Link, NavLink } from "react-router-dom"
import './Navbar.css'

const Navbar = () => {
    return <nav>
        <Link to='/' className="title">SDG Scholar</Link>
        <ul>
            <li><NavLink to='/about'>About</NavLink></li>
            <li><NavLink to='/faq'>FAQ</NavLink></li>
            <li><NavLink to='/modules'>Goals</NavLink></li>
            <li><NavLink to='/discussion'>Discussion</NavLink></li>
        </ul>
    </nav>
}

export default Navbar
