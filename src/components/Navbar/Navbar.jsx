import { Link, NavLink } from "react-router-dom";
import { useAuthContext } from "@/AuthProvider";
import "./Navbar.css";
import Dropdown from "./Dropdown";
import AccountPopover from "./AccountPopover";
import { Button } from "../ui/button";

import { Icon } from "@iconify/react";

/**
 * Navbar component that displays the site's navigation bar. 
 * If user is not logged in, login and sign-up buttons are displayed.
 * 
 * @returns {JSX.Element | null} The rendered Navbar component, or null if loading or no AuthContext is provided.
 */
const Navbar = () => {

  // get information about authorisation but only if it exists
  const authContext = useAuthContext();
  if (!authContext) {
    console.error("AuthContext is not provided!");
    return null;
  }
  const { user, loading } = authContext;

  // don't show navbar when loading
  if (loading) return null;

  return (
    <div>
      {/* navbar container */}
      <nav className="flex items-center justify-between w-full h-20">

        {/* logo and site name */}
        <Link to="/" className="ml-12">
          <div className="flex items-center flex-wrap">
            <h3 className="font-bold">SDG Scholar</h3>
            <Icon
              icon="streamline:global-learning"
              width="23"
              height="23"
              className="ml-2 text-orange-500"
            />
          </div>
        </Link>

        {/* Only show navigation links if user is logged in */}
        {user && (
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
            // Show login and sign up if not logged in
            <div className="flex space-x-4 mr-12">
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? "" : "")}
              >
                <Button variant="outline">Log In</Button>
              </NavLink>
              <NavLink
                to="/signupuser"
                className={({ isActive }) => (isActive ? "" : "")}
              >
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
