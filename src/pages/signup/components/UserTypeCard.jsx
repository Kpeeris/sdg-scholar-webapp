import { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { LockClosedIcon, AcademicCapIcon } from "@heroicons/react/24/outline";

/**
 * UserTypeCard component for selecting between Admin and Learner user types.
 * @param {Function} onSelectType - Callback function to handle selected user type.
 * @returns {JSX.Element} The rendered UserTypeCard component.
 */
export const UserTypeCard = ({ onSelectType }) => {
  const [selectedType, setSelectedType] = useState(null); // Tracks selected type

  /**
   * Handles Admin Selection.
   * Sets selected type to "admin" and calls onSelectType function with "admin".
   */
  const handleSelectAdmin = () => {
    setSelectedType("admin");
    onSelectType("admin"); // Pass the selection to the parent
  };

  /**
   * Handles Learner Selection.
   * Sets selected type to "learner" and calls onSelectType function with "learner".
   */
  const handleSelectLearner = () => {
    setSelectedType("learner");
    onSelectType("learner"); // Pass the selection to the parent
  };

  return (
    <div className="flex items-center justify-center space-x-6 pb-2">
      
      {/* Admin Card */}
      <Card
        className={`flex-1 items-center justify-center p-2 cursor-pointer border-2 ${
          selectedType === "admin" ? "bg-orange-100 border-orange-300" : "border-gray-200"
        }`} // Card Hover Effect
        onClick={handleSelectAdmin}
      >
        <CardHeader className="text-center space-y-1">
          <LockClosedIcon className="h-8 w-8 mx-auto" />
          <CardTitle className="text-xl">Admin</CardTitle>
          <p className="text-base">Manage learning material and quiz content</p>
        </CardHeader>
      </Card>

      {/* Learner Card */}
      <Card
        className={`flex-1 items-center justify-center p-2 cursor-pointer border-2 ${
          selectedType === "learner" ? "bg-orange-100 border-orange-300" : "border-gray-200"
        }`}  // Card Hover Effect
        onClick={handleSelectLearner}
      >
        <CardHeader className="text-center space-y-1">
          <AcademicCapIcon className="h-8 w-8 mx-auto" />
          <CardTitle className="text-xl">Learner</CardTitle>
          <p className="text-base">
            Learn SDG Targets and take interactive quizzes
          </p>
        </CardHeader>
      </Card>
    </div>
  );
};

