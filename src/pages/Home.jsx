import React from "react";
import Module from "../components/buttons/Module";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import City from "/src/assets/images/City_scape.png";
import Right_arrow from "/src/assets/icons/arrow_right_circle.svg";
import goal_11 from "/src/assets/goals/Goal_11.svg";
import ListOfGoals from "@/components/ListOfGoals";

export const Home = () => {
  const name = "TestUser";
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    if (path) {
      navigate(path); // Redirect to the specified path
    }
  };

  return (
    <div>
      <h1 className="pb-16">Hi {name}!</h1>
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
            className={`relative aspect-square rounded-xl 
              ${goal.background}`}
            onClick={() => handleNavigation(goal.path)}
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
