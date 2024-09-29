import FULL_CITY from "/src/assets/images/City_scape.png";
import BuildingComponent from "./BuildingComponent";
import ListOfBuildings from "./ListOfBuildings";
import GoalInfo from "./GoalInfo";
import FullScreenDiv from "./FullScreenDiv";

export const Sdg11 = () => {
  return (
    <FullScreenDiv>
      <img
        src={FULL_CITY}
        alt="full city"
        className="w-full h-full object-cover"
      />

      {ListOfBuildings.map((building) => (
        <BuildingComponent
          key={building.id}
          id={building.id}
          buildingName={building.buildingName}
          dark_image={building.dark_image}
          full_image={building.full_image}
          left={building.left}
          top={building.top}
        />
      ))}

      <GoalInfo />
    </FullScreenDiv>
  );
};
export default Sdg11;
