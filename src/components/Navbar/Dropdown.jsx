import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import ListOfGoals from "@/components/ListOfGoals";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * Dropdown menu in navbar to navigate to different sdg pages
 * 
 * @returns {JSX.Element} The rendered Dropdown component.
 */
function Dropdown() {
  const navigate = useNavigate(); // Hook for navigation

  /**
   * Navigates to a specified path if provided.
   * 
   * @param {string} path - The path to navigate to.
   */
  const handleNavigation = (path) => {
    if (path) {
      navigate(path); // Redirect to the specified path
    }
  };

  return (
    <DropdownMenu>
      {/* dropdown button */}
      <DropdownMenuTrigger asChild className="font-semibold text-base">
        <Button
          variant="ghost"
          className="focus-visible:ring-none focus-visible:outline-none "
        >
          SDGs
        </Button>
      </DropdownMenuTrigger>

      {/* dropdown list */}
      <DropdownMenuContent className="w-56 z-50 relative">
        <DropdownMenuLabel>SDGs</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-72">
          {ListOfGoals.map(({ id, title, path }) => {
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
export default Dropdown;
