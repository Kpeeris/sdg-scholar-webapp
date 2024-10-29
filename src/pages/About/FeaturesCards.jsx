import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GlobeAsiaAustraliaIcon, WrenchScrewdriverIcon, PuzzlePieceIcon, BellAlertIcon } from "@heroicons/react/20/solid"; 

const FeaturesCards = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {/* Interactive SDG Worlds Card */}
        <Card>
          <CardContent className="space-y-2">
            <div className="pt-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <GlobeAsiaAustraliaIcon className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>Interactive SDG Worlds</CardTitle>
            </div>
            <p>
              Explore immersive worlds for each UN Sustainable Development Goal, each filled with engaging content and fun quizzes.
            </p>
          </CardContent>
        </Card>
  
        {/* Quizzes & Unlockable Buildings Card */}
        <Card>
          <CardContent className="space-y-2">
            <div className="pt-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <PuzzlePieceIcon className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>Quizzes & Unlockable Buildings</CardTitle>
            </div>
            <p> Complete quizzes to unlock new places and track your progress through each SDG Target. </p>
          </CardContent>
        </Card>
  
        {/* Admin Control Card */}
        <Card>
          <CardContent className="space-y-2">
            <div className="pt-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <WrenchScrewdriverIcon className="h-5 w-5 text-orange-600" />
              </div>
              <CardTitle>Admin Control</CardTitle>
            </div>
            <p> Admins have the power to customize content and quizzes, keeping the learning experience fresh, relevant, and impactful. </p>
          </CardContent>
        </Card>
  
        {/* Stay Updated Card */}
        <Card>
          <CardContent className="space-y-2">
            <div className="pt-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <BellAlertIcon className="h-6 w-6 text-red-600" />
              </div>
              <CardTitle>Stay Updated</CardTitle>
            </div>
            <p> Check the Notice Board for important updates, events and real world projects from admins. </p>
          </CardContent>
        </Card>

      </div>
    );
  };
  
  export default FeaturesCards;