// import { useState } from "react";
// import { Card, CardHeader, CardTitle } from "@/components/ui/card";
// import { LockClosedIcon, AcademicCapIcon } from "@heroicons/react/24/outline";

// export const UserTypeCard = () => {
//   const [selectedAdmin, setSelectedAdmin] = useState(false);
//   const [selectedLearner, setSelectedLearner] = useState(false);

//   const handleSelectAdmin = () => {
//     setSelectedAdmin(true);
//     setSelectedLearner(false); // Deselect the other card
//   };

//   const handleSelectLearner = () => {
//     setSelectedAdmin(false); // Deselect the other card
//     setSelectedLearner(true);
//   };

//   return (
//     <div className="flex items-center justify-center space-x-6">
//       {/* Admin Card */}
//       <Card
//         className={`flex-1 items-center justify-center p-2 cursor-pointer border-2 ${
//           selectedAdmin ? "bg-orange-200 border-primary" : "border-gray-200"
//         }`}
//         onClick={handleSelectAdmin}
//       >
//         <CardHeader className="text-center space-y-1">
//           <LockClosedIcon className="h-8 w-8 mx-auto" />
//           <CardTitle className="text-xl">Admin</CardTitle>
//           <p className="text-base">Manage learning material and quiz content</p>
//         </CardHeader>
//       </Card>

//       {/* Learner Card */}
//       <Card
//         className={`flex-1 items-center justify-center p-2 cursor-pointer border-2 ${
//           selectedLearner ? "bg-orange-200 border-primary" : "border-gray-200"
//         }`}
//         onClick={handleSelectLearner}
//       >
//         <CardHeader className="text-center space-y-1">
//           <AcademicCapIcon className="h-8 w-8 mx-auto" />
//           <CardTitle className="text-xl">Learner</CardTitle>
//           <p className="text-base">
//             Learn SDG Targets and take interactive quizzes
//           </p>
//         </CardHeader>
//       </Card>
//     </div>
//   );
// };

import { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { LockClosedIcon, AcademicCapIcon } from "@heroicons/react/24/outline";

export const UserTypeCard = ({ onSelectType }) => {
  const [selectedType, setSelectedType] = useState(null); // Tracks selected type

  const handleSelectAdmin = () => {
    setSelectedType("admin");
    onSelectType("admin"); // Pass the selection to the parent
  };

  const handleSelectLearner = () => {
    setSelectedType("learner");
    onSelectType("learner"); // Pass the selection to the parent
  };

  return (
    <div className="flex items-center justify-center space-x-6">
      
      {/* Admin Card */}
      <Card
        className={`flex-1 items-center justify-center p-2 cursor-pointer border-2 ${
          selectedType === "admin" ? "bg-orange-200 border-primary" : "border-gray-200"
        }`}
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
          selectedType === "learner" ? "bg-orange-200 border-primary" : "border-gray-200"
        }`}
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

