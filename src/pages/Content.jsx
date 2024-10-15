import SideMenu from "../components/SideMenu";
//import "../components/SideMenu.css";
import { useParams } from "react-router-dom";
import EditableBlock from "../components/EditableBlock";

const Content = () => {
  const { moduleId } = useParams(); // Capture the module ID from the URL

  let dbModuleId = moduleId;
  if (moduleId === "a") {
    dbModuleId = "8";
  } else if (moduleId === "b") {
    dbModuleId = "9";
  } else if (moduleId === "c") {
    dbModuleId = "10";
  }

  // You can replace this with logic to dynamically retrieve module info
  const moduleTitle = `Target 11.${moduleId}`;

  return (
    <div className="flex">
      <SideMenu moduleTitle={moduleTitle} moduleId={moduleId} />
      <div className="ml-[250px] flex-1">
        <h2 style={{ fontSize: "3rem", lineHeight: "1rem" }}>
          {moduleTitle} Content
        </h2>

        <div className="mt-12">
          <EditableBlock moduleId={dbModuleId} />
        </div>
      </div>
    </div>
  );
};

export default Content;
