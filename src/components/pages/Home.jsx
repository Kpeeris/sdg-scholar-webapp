import React from "react";
import Module from './buttons/Module'
import {Link, NavLink} from "react-router-dom"

export const Home = () => {
    const name = "TestUser"
    return <div>
        <h1>Hi {name}</h1>
        <h2>Your Modules</h2>
        <Module />
        <br />
        <Link to='/awards'>
            <button>
                Awards
            </button>
        </Link>
    </div>
}