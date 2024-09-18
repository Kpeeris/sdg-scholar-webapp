import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export function OTPForm() {
  return (
    <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
      <InputOTPGroup className="w-full space-x-8">
        <InputOTPSlot index={0} className="flex-1 border-gray-300"/>
        <InputOTPSlot index={1} className="flex-1 border-gray-300"/>
        <InputOTPSlot index={2} className="flex-1 border-gray-300"/>
        <InputOTPSlot index={3} className="flex-1 border-gray-300"/>
        <InputOTPSlot index={4} className="flex-1 border-gray-300"/>
        <InputOTPSlot index={5} className="flex-1 border-gray-300"/>
      </InputOTPGroup>
    </InputOTP>
  )
}
