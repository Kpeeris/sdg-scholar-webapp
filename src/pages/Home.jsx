import { Link, useNavigate } from "react-router-dom";
import City from "/src/assets/images/City_scape.png";
import Right_arrow from "/src/assets/icons/arrow_right_circle.svg";
import goal_11 from "/src/assets/goals/Goal_11.svg";
import ListOfGoals from "@/components/ListOfGoals";

import { Button } from "@/components/ui/button.jsx";

import { useAuthContext } from "@/AuthProvider";

import { logout } from "../../firebaseFiles/firebaseAuth.js";

export const Home = () => {
  // const name = "TestUser";

  const navigate = useNavigate();
  const handleNavigation = (path) => {
    if (path) {
      navigate(path); // Redirect to the specified path
    }
  };

  const { user, userData, role } = useAuthContext();

  // Log out function
  const handleLogout = async () => {
    try {
      await logout(); 
      alert("Logout successful!");
      navigate("/login"); 
    } catch (error) {
      alert("Error during logout: " + error.message);
    }
  };

  return (
    <div data-testid="home-page">
      {/* <h1 className="pb-16">Hi {userData.firstName} {userData.lastName}!</h1> */}

      {/* Will remove this once i figure it out - kay */}
      <p>Current user: {user ? user.email : "No user logged in"}</p>
      <p>User Data: {userData ? JSON.stringify(userData) : "No user data available"}</p>
      <p>Role: {role || "No role available"}</p>
      <Button onClick={handleLogout}> Log Out </Button>

      <div className="bg-orange-400 bg-opacity-70 -mx-12 h-96 flex items-center justify-around">
        <div className="flex items-center justify-around">
          <p className="text-9xl text-white opacity-100 p-4 border-b-4 ml-10">
            Play Now!
          </p>
          <img src={Right_arrow} alt="right arrow" className="w-30 h-30" />
        </div>

        <Link to="/sdg11">
          <div className="relative rounded-xl w-80 h-80 overflow-hidden mr-20">
            <img
              src={City}
              alt="SDG11 City"
              className="absolute w-full h-full object-cover object-[left]"
            />
            <img
              src={goal_11}
              alt="goal 11"
              className="absolute w-28 h-28 bottom-2 right-2"
            />
          </div>
        </Link>
      </div>

      <span className="text-7xl font-bold flex justify-center my-20">
        Your Goals
      </span>

      {/* grid of modules */}
      <div className=" grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {ListOfGoals.map((goal) => (
          <div
            key={goal.id}
            className={`relative aspect-square rounded-xl `}
            onClick={() => handleNavigation(goal.path)}
            style={
              goal.background
                ? {
                    backgroundImage: `url(${goal.background})`,
                    backgroundSize: "cover",
                  }
                : { backgroundColor: "#e2e8f0" }
            }
          >
            <img
              src={goal.image}
              alt={goal.title}
              className="w-28 h-28 absolute bottom-2 right-2"
            />
          </div>
        ))}
      </div>
      {/* <Module /> */}
    </div>
  );
};
