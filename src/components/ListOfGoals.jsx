import City from "/src/assets/images/City_scape.png";
const images = import.meta.glob("/src/assets/goals/*.svg", { eager: true });

/**
 * List of Sustainable Development Goals (SDGs)
 * @type {Array<Object>}
 * Each object contains the following properties:
 * @property {number} id - The goal number
 * @property {string} title - The goal title
 * @property {string} link - The link to the UN website
 * @property {string} image - The image path
 * @property {string} path - The path to a specific page
 * @property {string} background - The background image
 * @property {boolean} isImage - The boolean value to check if the image is used in the home page
 */
const ListOfGoals = [
  {
    id: 1,
    title: "1 No Poverty",
    link: "https://sdgs.un.org/goals/goal1",
    image: images["/src/assets/goals/Goal_1.svg"].default,
    path: "",
    background: "",
  },
  {
    id: 2,
    title: "2 Zero Hunger",
    link: "https://sdgs.un.org/goals/goal2",
    image: images["/src/assets/goals/Goal_2.svg"].default,
    path: "",
    background: "",
  },
  {
    id: 3,
    title: "3 Good Health and Well-being",
    link: "https://sdgs.un.org/goals/goal3",
    image: images["/src/assets/goals/Goal_3.svg"].default,
    path: "",
    background: "",
  },
  {
    id: 4,
    title: "4 Quality Education",
    link: "https://sdgs.un.org/goals/goal4",
    image: images["/src/assets/goals/Goal_4.svg"].default,
    path: "",
    background: "",
  },
  {
    id: 5,
    title: "5 Gender Equality",
    link: "https://sdgs.un.org/goals/goal5",
    image: images["/src/assets/goals/Goal_5.svg"].default,
    path: "",
    background: "",
  },
  {
    id: 6,
    title: "6 Clean Water and ",
    link: "https://sdgs.un.org/goals/goal6",
    image: images["/src/assets/goals/Goal_6.svg"].default,
    path: "",
    background: "",
  },
  {
    id: 7,
    title: "7 Affordable and Clean Energy",
    link: "https://sdgs.un.org/goals/goal7",
    image: images["/src/assets/goals/Goal_7.svg"].default,
    path: "",
    background: "",
  },
  {
    id: 8,
    title: "8 Decent Work and Economic Growth",
    link: "https://sdgs.un.org/goals/goal8",
    image: images["/src/assets/goals/Goal_8.svg"].default,
    path: "",
    background: "",
  },
  {
    id: 9,
    title: "9 Industry, Innovation and Infrastructure",
    link: "https://sdgs.un.org/goals/goal9",
    image: images["/src/assets/goals/Goal_9.svg"].default,
    path: "",
    background: "",
  },
  {
    id: 10,
    title: "10 Reduce Inequalities",
    link: "https://sdgs.un.org/goals/goal10",
    image: images["/src/assets/goals/Goal_10.svg"].default,
    path: "",
    background: "",
  },
  {
    id: 11,
    title: "11 Sustainable Cities and Communities",
    link: "https://sdgs.un.org/goals/goal11",
    image: images["/src/assets/goals/Goal_11.svg"].default,
    path: "/sdg11",
    // the image used in the sdg11 button in the home page
    background: City,
    isImage: true,
  },
  {
    id: 12,
    title: "12 Responsible Consumption and Production",
    link: "https://sdgs.un.org/goals/goal12",
    image: images["/src/assets/goals/Goal_12.svg"].default,
    path: "",
    background: "",
  },
  {
    id: 13,
    title: "13 Climate Action",
    link: "https://sdgs.un.org/goals/goal13",
    image: images["/src/assets/goals/Goal_13.svg"].default,
    path: "",
    background: "",
  },
  {
    id: 14,
    title: "14 Life Below Water",
    link: "https://sdgs.un.org/goals/goal14",
    image: images["/src/assets/goals/Goal_14.svg"].default,
    path: "",
    background: "",
  },
  {
    id: 15,
    title: "15 Life on Land",
    link: "https://sdgs.un.org/goals/goal15",
    image: images["/src/assets/goals/Goal_15.svg"].default,
    path: "",
    background: "",
  },
  {
    id: 16,
    title: "16 Peace, Justice and Strong Institutions",
    link: "https://sdgs.un.org/goals/goal16",
    image: images["/src/assets/goals/Goal_16.svg"].default,
    path: "",
    background: "",
  },
  {
    id: 17,
    title: "17 Partnerships for the Goals",
    link: "https://sdgs.un.org/goals/goal17",
    image: images["/src/assets/goals/Goal_17.svg"].default,
    path: "",
    background: "",
  },
];

export default ListOfGoals;
