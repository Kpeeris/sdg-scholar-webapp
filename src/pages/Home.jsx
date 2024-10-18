import { Link, useNavigate } from "react-router-dom";
import City from "/src/assets/images/City_scape.png";
import goal_11 from "/src/assets/goals/Goal_11.svg";
import ListOfGoals from "@/components/ListOfGoals";
import { useAuthContext } from "@/AuthProvider";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export const Home = () => {
  // const name = "TestUser";

  const navigate = useNavigate();
  const handleNavigation = (path) => {
    if (path) {
      navigate(path); // Redirect to the specified path
    }
  };

  const { userData } = useAuthContext();

  return (
    <div data-testid="home-page">
      <h1 className="pb-16">
        Hi {`${userData?.firstName} ${userData?.lastName}`}!
      </h1>

      <div className="bg-orange-200 -mx-12 h-96 flex items-center justify-around">
        <div className="flex flex-col justify-around">
          <h1>
            Discover SDG 11: Sustainable
            <br /> Cities and Communities
          </h1>
          <h4 className="text-2xl font-normal mt-6">
            Learn how to make cities and human settlements <br />
            inclusive, safe, resilient and sustainable
          </h4>
          <Link to="/sdg11">
            <Button
              variant="white"
              className="w-2/6 border-white mt-6 font-semibold text-lg"
            >
              Explore SDG 11 <ArrowRightIcon className="h-6 w-6 mx-4" />
            </Button>
          </Link>

          {/* <p className="text-9xl text-white opacity-100 p-4 border-b-4 ml-10">
            Play Now!
          </p>
          <img src={Right_arrow} alt="right arrow" className="w-30 h-30" /> */}
        </div>

        <Link to="/sdg11">
          <div className="relative rounded-xl w-80 h-80 overflow-hidden">
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

      {/* <span className="text-7xl font-bold flex justify-center my-20">
        Your Goals
      </span> */}
      <h1 className="mt-16 mb-8 text-center">Your Goals</h1>

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
