const dark_buildings = import.meta.glob("/src/assets/images/dark/*_dark.png", {
  eager: true,
});
const full_buildings = import.meta.glob("/src/assets/images/full/*.png", {
  eager: true,
});

const ListOfdark_buildings = [
  {
    id: 1,
    buildingName: "Houses",
    target: "1",
    dark_image:
      dark_buildings["/src/assets/images/dark/Houses_dark.png"].default,
    full_image: full_buildings["/src/assets/images/full/Houses.png"].default,
    left: "53%",
    top: "85%",
  },
  {
    id: 2,
    buildingName: "Train Station",
    target: "2",
    dark_image:
      dark_buildings["/src/assets/images/dark/Train_station_dark.png"].default,
    full_image:
      full_buildings["/src/assets/images/full/Train_station.png"].default,
    left: "15%",
    top: "15%",
  },
  {
    id: 3,
    buildingName: "Town Hall",
    target: "3",
    dark_image:
      dark_buildings["/src/assets/images/dark/Town_hall_dark.png"].default,
    full_image: full_buildings["/src/assets/images/full/Town_Hall.png"].default,
    left: "30%",
    top: "25%",
  },

  {
    id: 5,
    buildingName: "Hospital",
    target: "5",
    dark_image:
      dark_buildings["/src/assets/images/dark/Hospital_dark.png"].default,
    full_image: full_buildings["/src/assets/images/full/Hospital.png"].default,
    left: "46%",
    top: "15%",
  },
  {
    id: 6,
    buildingName: "Recycle Plant",
    target: "6",
    dark_image:
      dark_buildings["/src/assets/images/dark/Recycle_dark.png"].default,
    full_image:
      full_buildings["/src/assets/images/full/Recycle_Plant.png"].default,
    left: "10%",
    top: "85%",
  },
  {
    id: 7,
    buildingName: "Park",
    target: "7",
    dark_image: dark_buildings["/src/assets/images/dark/Park_dark.png"].default,
    full_image: full_buildings["/src/assets/images/full/Park.png"].default,
    left: "80%",
    top: "10%",
  },
  {
    id: 4,
    buildingName: "Museum",
    target: "4",
    dark_image:
      dark_buildings["/src/assets/images/dark/Museum_dark.png"].default,
    full_image: full_buildings["/src/assets/images/full/Museum.png"].default,
    left: "70%",
    top: "36%",
  },
  {
    id: 8,
    buildingName: "Bridge",
    target: "a",
    dark_image:
      dark_buildings["/src/assets/images/dark/Bridge_dark.png"].default,
    full_image: full_buildings["/src/assets/images/full/Bridge.png"].default,
    left: "70%",
    top: "65%",
  },
  {
    id: 9,
    buildingName: "Fire Station",
    target: "b",
    dark_image:
      dark_buildings["/src/assets/images/dark/Fire_station_dark.png"].default,
    full_image:
      full_buildings["/src/assets/images/full/Fire_station.png"].default,
    left: "28%",
    top: "68%",
  },
  {
    id: 10,
    buildingName: "Bank",
    target: "c",
    dark_image: dark_buildings["/src/assets/images/dark/Bank_dark.png"].default,
    full_image: full_buildings["/src/assets/images/full/Bank.png"].default,
    left: "10%",
    top: "50%",
  },
];
export default ListOfdark_buildings;
