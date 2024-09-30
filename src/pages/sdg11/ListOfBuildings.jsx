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
    top: "80%",
    clipPath:
      "polygon(60.9% 76.49%, 61.8% 75.43%, 62.52% 75.33%, 63.52% 77.37%, 63.37% 78.7%, 72.62% 88.57%, 65.67% 95.58%, 60.30% 90.30%, 55.35% 95.3%, 44.18% 83.9%, 44.15% 76%, 50.90% 69.28%, 55.10% 70.4%, 57.75% 70.37%, 59.26% 73.61%)",
  },
  {
    id: 2,
    buildingName: "Train Station",
    target: "2",
    dark_image:
      dark_buildings["/src/assets/images/dark/Train_station_dark.png"].default,
    full_image:
      full_buildings["/src/assets/images/full/Train_station.png"].default,
    left: "14%",
    top: "14%",
    clipPath:
      "polygon(0% 28.6%, 4.55% 24.09%, 6.5% 21.62%, 11.5% 16.5%, 11% 16.28%, 16.78% 10.4%, 17.3% 10.65%, 28.27% 0%, 35.93% 0%, 35.93% 2.48%, 0% 39.6%)",
  },
  {
    id: 3,
    buildingName: "Town Hall",
    target: "3",
    dark_image:
      dark_buildings["/src/assets/images/dark/Town_hall_dark.png"].default,
    full_image: full_buildings["/src/assets/images/full/Town_Hall.png"].default,
    left: "31%",
    top: "26%",
    clipPath:
      "polygon(21.59% 31.44%, 26.41% 25.58%, 26.35% 18.59%, 30.93% 14.10%, 40.3% 23.27%, 40.11% 28.96%, 44.15% 33.17%, 44.15% 34.16%, 45.54% 35.4%, 35.24% 45.79%)",
  },

  {
    id: 5,
    buildingName: "Hospital",
    target: "5",
    dark_image:
      dark_buildings["/src/assets/images/dark/Hospital_dark.png"].default,
    full_image: full_buildings["/src/assets/images/full/Hospital.png"].default,
    left: "47%",
    top: "13%",
    clipPath:
      "polygon(33.7% 11.89%, 45.4% 0.25%, 48% 0.33%, 48.61% 1.24%, 49.58% 0.99%, 53.92% 5.03%, 59.44% 9.9%, 59.05% 12.13%, 62.95% 15.59%, 62.81% 25.25%, 54.87% 33.66%, 52.37% 33.42%, 33.7% 14.36%)",
  },
  {
    id: 6,
    buildingName: "Recycle Plant",
    target: "6",
    dark_image:
      dark_buildings["/src/assets/images/dark/Recycle_dark.png"].default,
    full_image:
      full_buildings["/src/assets/images/full/Recycle_Plant.png"].default,
    left: "12%",
    top: "83%",
    clipPath:
      "polygon(2.09% 85.5%, 2.09% 80.94%, 6.53% 76.52%, 6.51% 72.65%, 13.19% 68.56%, 13.20% 65.68%, 13.9% 65.59%, 14% 68.41%, 18.18% 72.92%, 18.18% 77.48%, 27.58% 86.88%, 27.58% 89.6%, 17.27% 100%, 12.67% 100%, 0.28% 87.38%)",
  },
  {
    id: 7,
    buildingName: "Park",
    target: "7",
    dark_image: dark_buildings["/src/assets/images/dark/Park_dark.png"].default,
    full_image: full_buildings["/src/assets/images/full/Park.png"].default,
    left: "80%",
    top: "8%",
    clipPath:
      "polygon(62.95% 14.36%, 62.81% 12.13%, 64.57% 10.48%, 61.84% 7.67%, 61.72% 6.02%, 63.34% 3.96%, 63.09% 1.49%, 64.21% 0%, 100% 0%, 100% 14.11%, 84.12% 30.45%, 78.27% 24.26%, 75.07% 23.02%, 74.12% 24.26%, 73.62% 24.26%, 72.01% 21.29%, 69.92% 21.04%)",
  },
  {
    id: 4,
    buildingName: "Museum",
    target: "4",
    dark_image:
      dark_buildings["/src/assets/images/dark/Museum_dark.png"].default,
    full_image: full_buildings["/src/assets/images/full/Museum.png"].default,
    left: "69%",
    top: "34%",
    clipPath:
      "polygon(61% 38.12%, 64.76% 34.16%, 64.9% 30.80%, 66.16% 29.45%, 66.16% 25.5%, 70.06% 21.29%, 71.69% 20.99%, 72.98% 24.01%, 73.12% 25.34%, 75.19% 23.10%, 76.45% 23.02%, 77.86% 25.99%, 77.72% 27.97%, 83.84% 34.41%, 65.88% 53.71%, 58.5% 45.79%, 61% 43.32%)",
  },
  {
    id: 8,
    buildingName: "Bridge",
    target: "a",
    dark_image:
      dark_buildings["/src/assets/images/dark/Bridge_dark.png"].default,
    full_image: full_buildings["/src/assets/images/full/Bridge.png"].default,
    left: "72%",
    top: "61%",
    clipPath:
      "polygon(62.65% 60.69%, 68.52% 54.46%, 71.31% 57.47%, 73.12% 56.93%, 79.11% 63.12%, 80.86% 67.17%, 86.63% 73.12%, 80.70% 79.46%)",
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
    top: "62%",
    clipPath:
      "polygon(15.90% 67.90%, 28.27% 55.2%, 28.11% 49.9%, 31.28% 46.63%, 37.13% 52.72%, 37.19% 57.18%, 44.17% 64.36%, 38.62% 70.05%, 38.58% 74.5%, 30.2% 82.72%)",
  },
  {
    id: 10,
    buildingName: "Bank",
    target: "c",
    dark_image: dark_buildings["/src/assets/images/dark/Bank_dark.png"].default,
    full_image: full_buildings["/src/assets/images/full/Bank.png"].default,
    left: "10%",
    top: "45%",
    clipPath:
      "polygon(3.69% 43.56%, 12.48% 34.24%, 15.2% 34.24%, 17.52% 38.75%, 17.55% 42.08%, 23.59% 48.47%, 8.98% 63.4%, 0.28% 55.03%, 3.97% 51.34%)",
  },
];
export default ListOfdark_buildings;

// clip-path: polygon(3.69% 44.2%, 13.02% 33.9%, 15.18% 34.15%, 17.49% 38.66%, 17.52% 48.4%, 20.78% 50.82%, 9.53% 61.76%, 2.47% 54.89%, 4.03% 52.35%);
