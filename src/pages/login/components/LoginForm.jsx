// LOGIN FORM
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const LoginForm = ({ emailRef, passwordRef }) => {
  return (
    <div className="space-y-6 mt-4 mb-2">
      <div className="w-full flex flex-col items-left gap-2">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" placeholder="Email" ref={emailRef} />
      </div>
      <div className="w-full flex flex-col items-left gap-2">
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" placeholder="Password" ref={passwordRef} />
      </div>
    </div>
  );
};

