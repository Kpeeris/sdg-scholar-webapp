import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Dropdown() {
  const navigate = useNavigate(); // Hook for navigation

  const handleNavigation = (path) => {
    if (path) {
      navigate(path); // Redirect to the specified path
    }
  };
  return (
    <DropdownMenu>
      {/* dropdown button */}
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">Goals</Button>
      </DropdownMenuTrigger>

      {/* dropdown list */}
      <DropdownMenuContent className="w-56 z-50 relative">
        <DropdownMenuLabel>SDG Goals</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-72">
          {goalsDropdown.map(({ id, title, path }) => {
            return (
              <DropdownMenuItem key={id} onClick={() => handleNavigation(path)}>
                {title}
              </DropdownMenuItem>
            );
          })}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
const goalsDropdown = [
  {
    id: 1,
    title: "1 No Poverty",
    path: "",
    cName: "submenu-item",
  },
  {
    id: 2,
    title: "2 Zero Hunger",
    path: "",
    cName: "submenu-item",
  },
  {
    id: 3,
    title: "3 Good Health and Well-being",
    path: "",
    cName: "submenu-item",
  },
  {
    id: 4,
    title: "4 Quality Education",
    path: "",
    cName: "submenu-item",
  },
  {
    id: 5,
    title: "5 Gender Equality",
    path: "",
    cName: "submenu-item",
  },
  {
    id: 6,
    title: "6 Clean Water and ",
    path: "",
    cName: "submenu-item",
  },
  {
    id: 7,
    title: "7 Affordable and Clean Energy",
    path: "",
    cName: "submenu-item",
  },
  {
    id: 8,
    title: "8 Decent Work and Economic Growth",
    path: "",
    cName: "submenu-item",
  },
  {
    id: 9,
    title: "9 Industry, Innovation and Infrastructure",
    path: "",
    cName: "submenu-item",
  },
  {
    id: 10,
    title: "10 Reduce Inequalities",
    path: "",
    cName: "submenu-item",
  },
  {
    id: 11,
    title: "11 Sustainable Cities and Communities",
    path: "/sdg11",
    cName: "submenu-item",
  },
  {
    id: 12,
    title: "12 Responsible Consumption and Production",
    path: "",
    cName: "submenu-item",
  },
  {
    id: 13,
    title: "13 Climate Action",
    path: "",
    cName: "submenu-item",
  },
  {
    id: 14,
    title: "14 Life Below Water",
    path: "",
    cName: "submenu-item",
  },
  {
    id: 15,
    title: "15 Life on Land",
    path: "",
    cName: "submenu-item",
  },
  {
    id: 16,
    title: "16 Peace, Justice and Strong Institutions",
    path: "",
    cName: "submenu-item",
  },
  {
    id: 17,
    title: "17 Partnerships for the Goals",
    path: "",
    cName: "submenu-item",
  },
];

export default Dropdown;
