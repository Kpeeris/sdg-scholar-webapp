import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {logout } from "../../../firebaseFiles/firebaseAuth"; // Adjust the path if needed
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../AuthProvider";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { 
    Dialog, 
    DialogTrigger, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogDescription, 
  } from "@/components/ui/dialog";
import { useState } from "react";


export function AccountPopover() {
    const { user, userData, role } = useAuthContext();
    
    const navigate = useNavigate(); // React Router's navigation hook

    const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control dialog open/close
    const [isPopoverOpen, setIsPopoverOpen] = useState(false); // Track popover open state

    // Logout function
    const handleLogout = async () => {
      try {
        await logout(); // Perform logout
        setIsPopoverOpen(false); // Close the popover
        navigate("/"); // Redirect to home or login page
      } catch (error) {
        console.error("Logout failed:", error); // Handle errors
      }
    };

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        {/* round icon with initials (displayed on the nav bar) */}
        <Button 
            variant="accountInfo" 
            className="w-11 h-11 text-lg text-gray-700 tracking-normal"
            >
            {`${userData?.firstName?.[0]?.toUpperCase() || ""}${userData?.lastName?.[0]?.toUpperCase() || ""}`}
        </Button>
      </PopoverTrigger>
         
         {/* inside the popover */}
        <PopoverContent className="w-80 z-50 p-5" align="end">
            <div className="flex items-center gap-3 mb-4">
                {/* round icon with initials */}
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl text-gray-700">
                    {`${userData?.firstName?.[0]?.toUpperCase() || ""}${userData?.lastName?.[0]?.toUpperCase() || ""}`}
                </div>

                {/* user information */}
                <div className="flex flex-col justify-center space-y-0.5 pl-1">
                    <p className="text-sm font-bold text-gray-900 leading-tight">
                        {`${userData?.firstName} ${userData?.lastName}`}
                    </p>
                    <p className="text-sm text-gray-800 leading-tight">
                        {user?.email || "No Email Available"}
                    </p>
                    <p className="text-sm text-gray-700">
                        {role ? role.charAt(0).toUpperCase() + role.slice(1) : "Role not assigned"}
                    </p>
                </div>
            </div>

            {/* password management buttons */}
            <div className="space-y-2">
                <div className="border-t border-gray-300 my-2"></div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button variant="accManagement" className="px-1 gap-x-2">
                        <LockClosedIcon className="h-6 w-6 text-gray-500" />Change Password</Button>
                </DialogTrigger>
                <DialogTrigger asChild>
                    <Button variant="accManagement" className="px-1 gap-x-2">
                        <TrashIcon className="h-6 w-6 text-gray-500" />Delete Account</Button>
                </DialogTrigger>
                <DialogContent className="space-y-0">
                    <DialogHeader className="space-y-1">
                        <DialogTitle className="text-lg font-semibold">Account Management</DialogTitle>
                        <DialogDescription>Please contact your admin</DialogDescription>
                    </DialogHeader>
                    
                </DialogContent>
                </Dialog>
                <div className="border-t border-gray-300 my-1"></div>


                <Button
                onClick={handleLogout}
                variant="accManagement"
                className="px-1 gap-x-2"> 
                <ArrowRightStartOnRectangleIcon className="h-6 w-6 text-gray-500" />
                Log Out</Button>

            </div>
        </PopoverContent>
    </Popover>
  )
}
export default AccountPopover;
