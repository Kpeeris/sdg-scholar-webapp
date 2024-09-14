import React from "react";
import Module from '../components/buttons/Module'
import { Link, NavLink } from "react-router-dom"
import { Button } from "@/components/ui/button"


export const Home = () => {
    const name = "TestUser"

    return (
        <div>
            <h1>Hi {name}</h1>
            <Button>primary button</Button>
            <Button variant="secondary">secondary button</Button>
            <Module />
            <br />

            <Link to='/awards'>
                <button>
                    Awards
                </button>
            </Link>
            

        </div>
    )
}