import React from "react";

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import LoginSVG from '@/assets/images/Login.svg'
import { Icon } from '@iconify/react'

export const Login = () => {
  return (
    <div className="flex items-center justify-center">
        <div className="w-full p-8 flex items-center justify-between space-x-4">

            {/* Left container */}
            <div className="flex-1 p-8 justify-center items-center">
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
                <div className="w-full flex flex-col items-left gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" placeholder="Email" className="mb-2" />
                </div>
                <div className="w-full flex flex-col items-left gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" id="password" placeholder="Password"/>
                </div>
                <div className="text-right">
                    <Button className="p-0" variant="link">Forgot Password?</Button>
                </div>
                <Button className="w-full mb-2" variant="default">Log In</Button>
                <hr className="w-full mt-4 border-gray-300" />
                <div className="flex justify-center items-center">
                    <p className="text-center text-sm">Don't have an account?</p>
                    <Button className="p-2" variant="link">Sign Up Here</Button>
                </div>
                {/* <Icon icon="streamline:global-learning" /> */}
            </div>
            
        </div>
    </div>
  )
}

export default Login;