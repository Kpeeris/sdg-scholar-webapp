import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";
import goal_11 from "/src/assets/goals/Goal_11.svg";
import City from "/src/assets/images/City_scape.png";

function SideMenu({ moduleId }) {
  const navigate = useNavigate();
  const contentPath = `/module/${moduleId}/content`;
  const quizPath = `/module/${moduleId}/quiz`;

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-[250px] h-[92.75vh] p-6 flex flex-col fixed bottom-0 left-0 border-r border-gray-300">
      <div className="flex items-center flex-start pt-3 pb-4">
        <div className="relative w-14 h-14 overflow-hidden mr-5">
          <img
            src={City}
            alt="SDG11 City"
            className="absolute w-full h-full object-cover object-[left]"
          />
          <img
            src={goal_11}
            alt="goal 11"
            className="absolute w-1/3 h-1/3 bottom-1 right-1"
          />
        </div>
        <div className="flex flex-col">
          <text className="text-slate-900 font-inter text-[20px] font-bold">
            SDG 11
          </text>
          <text className="text-slate-900 font-inter text-[18px] font-normal">
            Target {moduleId}
          </text>
        </div>
      </div>

      <Button
        className="my-3 p-6"
        variant={isActive(contentPath) ? "active" : "plain"}
        onClick={() => navigate(`/module/${moduleId}/content`)}
      >
        <BookOpenIcon className="h-6 w-6 text-slate-900 stroke-[2.3] mr-3" />
        Content
      </Button>
      <Button
        className="my-3 p-6"
        variant={isActive(quizPath) ? "active" : "plain"}
        onClick={() => navigate(`/module/${moduleId}/quiz`)}
      >
        <ClipboardDocumentCheckIcon className="h-6 w-6 text-slate-900 stroke-[2.3] mr-3" />
        Quiz
      </Button>
    </div>
  );
}

export default SideMenu;
