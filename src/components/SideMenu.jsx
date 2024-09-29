import { useNavigate } from "react-router-dom";
import "./SideMenu.css";
import { Button } from "./ui/button";

function SideMenu({ moduleId }) {
  const navigate = useNavigate();
  const contentPath = `/module/${moduleId}/content`;
  const quizPath = `/module/${moduleId}/quiz`;

  const isActive = (path) => location.pathname === path;

  return (
    <div className="side-menu">
      <h2 className="pt-6">SDG 11</h2>
      <h4 className="pb-6">Target {moduleId}</h4>
      <Button
        className={isActive(contentPath) ? "active" : ""}
        onClick={() => navigate(`/module/${moduleId}/content`)}
      >
        Content
      </Button>
      <Button
        className={isActive(quizPath) ? "active" : ""}
        onClick={() => navigate(`/module/${moduleId}/quiz`)}
      >
        Quiz
      </Button>
    </div>
  );
}

export default SideMenu;
