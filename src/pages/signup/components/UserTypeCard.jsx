import { Card, CardHeader, CardTitle } from "@/components/ui/card";

import { LockClosedIcon } from "@heroicons/react/24/outline";
import { AcademicCapIcon } from "@heroicons/react/24/outline";

export const UserTypeCard = () => {
  return (
    <div className="flex items-center justify-center space-x-6">
      <Card className="flex-1 items-center justify-center p-2">
        <CardHeader className="text-center space-y-1">
          <LockClosedIcon className="h-8 w-8 mx-auto" />
          <CardTitle className="text-xl">Admin</CardTitle>
          <p className="text-base">Manage learning material and quiz content</p>
        </CardHeader>
      </Card>

      <Card className="flex-1 items-center justify-center p-2">
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
