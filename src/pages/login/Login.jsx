import React from "react";

import { LoginForm } from "./components/LoginForm";
import { SignUpLink } from "./components/SignUpLink";

import { Button } from "@/components/ui/button"
import LoginSVG from '@/assets/images/Login.svg'
import { Icon } from '@iconify/react'
import SDGIcon from '@/assets/icons/sdg_logo.svg'
import { LoginButton } from "./components/LoginButton"

export const Login = () => {
  return (
    <div className="flex items-center justify-center">
        <div className="w-full p-10 flex flex-col lg:flex-row items-center justify-between space-x-4 ">

            {/* Left container with image */}
            <div className="flex-1 p-10 justify-center items-center">
                <img
                    src={LoginSVG}
                    alt="Login SVG"
                    className="w-4/5 h-auto mx-auto"
                 />
            </div>

            {/* Right container */}
            <div className="flex-1 space-y-4 p-10">
                <h1>Welcome to SDG Scholar</h1>
                <p>Redefining SDG Education, One Goal at a Time</p>

                <LoginForm />
                
                <div className="text-right">
                    <Button className="p-0" variant="link">Forgot Password?</Button>
                </div>

                <LoginButton />

                <hr className="w-full mt-4 border-gray-300" />

                <SignUpLink />

                {/* <Icon icon="streamline:global-learning" className="orange-500"/> */}
                {/* <SDGIcon />  */}
            </div>
            
        </div>
    </div>
  )
}

export default Login;