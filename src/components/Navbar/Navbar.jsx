import { Link, NavLink } from "react-router-dom";
import { useAuthContext } from "@/AuthProvider";
import "./Navbar.css";
import Dropdown from "./Dropdown";
import logo_horizontal from "@/assets/icons/logo_horizontal.svg";
import AccountPopover from './AccountPopover'
import { Button } from "../ui/button";

const Navbar = () => {
  const {user} = useAuthContext();

  return (
    <div>
      {/* navbar container */}
      <nav className="flex items-center justify-between w-full h-16">
        {/* logo */}
        <Link to="/" className="ml-12">
          <img src={logo_horizontal} alt="SDG logo" className="w-40 h-10" />
        </Link>

        {/* Only show navigation links if user is logged in */}
        { user && (
          <ul className="absolute left-1/2 transform -translate-x-1/2 flex m-0">
          <li className="border-r border-gray-300 px-4 font-semibold">
            <NavLink data-testid="home-button" to="/">
              Home
            </NavLink>
          </li>
          <li className="border-r border-gray-300 px-4 font-semibold">
            <NavLink data-testid="about-button" to="/about">
              About
            </NavLink>
          </li>
          <li
            data-testid="notice-board-button"
            className="border-r border-gray-300 px-4 font-semibold"
          >
            <NavLink to="/noticeboard">Notice Board</NavLink>
          </li>
          
          <Dropdown />
        </ul>
        )}
      
        <div>
          {user ? (
            <AccountPopover /> // Show AccountPopover if the user is logged in
          ) : (
            <div className="flex space-x-4 mr-12">
              <NavLink to="/login" className={({ isActive }) => (isActive ? "" : "")}>
                <Button variant="outline">Log In</Button>
              </NavLink>
              <NavLink to="/signup" className={({ isActive }) => (isActive ? "" : "")}>
                <Button>Sign Up</Button>
              </NavLink>
            </div>
          )}
        </div>
    

      </nav>
    </div>
  );
};

export default Navbar;
