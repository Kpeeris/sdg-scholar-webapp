import FULL_CITY from "/src/assets/images/City_scape.png";
import BuildingComponent from "./sdg11/BuildingComponent";
import ListOfBuildings from "./sdg11/ListOfBuildings";

export const Sdg11 = () => {
  return (
    <div className="pt-16">
      <div className="relative min-h-screen overflow-y-auto">
        <div className="absolute top-0 left-0 w-full h-full">
          <img src={FULL_CITY} alt="full city" className="w-full h-auto" />
        </div>

        {ListOfBuildings.map((building) => (
          <BuildingComponent
            buildingName={building.buildingName}
            image={building.image}
            target={building.target}
            left={building.left}
            top={building.top}
          />
        ))}
      </div>

      {/* <StackedImages /> */}
    </div>
  );
};
export default Sdg11;
