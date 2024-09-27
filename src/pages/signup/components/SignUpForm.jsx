import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const SignUpForm = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-center items-center space-x-5">
        <div className="w-full flex flex-col items-left gap-2">
          <Label htmlFor="first-name">First Name</Label>
          <Input type="text" id="first-name" placeholder="First Name" />
        </div>

        <div className="w-full flex flex-col items-left gap-2">
          <Label htmlFor="last-name">Last Name</Label>
          <Input type="text" id="last-name" placeholder="Last Name" />
        </div>
      </div>

      <div className="w-full flex flex-col items-left gap-2">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" placeholder="Email" />
      </div>

      <div className="space-y-3">
        <div className="w-full flex flex-col items-left gap-2">
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" placeholder="Password" />
        </div>
        <ul className="text-sm">
          <li>Minimum length of 6 characters</li>
          <li>Has uppercase and lowercase letters </li>
          <li>At least 1 number or special character</li>
        </ul>
      </div>
    </div>
  );
};
