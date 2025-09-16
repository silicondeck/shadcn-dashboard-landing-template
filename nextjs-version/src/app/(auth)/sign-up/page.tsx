import { SignupForm1 } from "./components/signup-form-1"
import { Logo } from "@/components/logo"
import Link from "next/link"

export default function SignUpPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-9 items-center justify-center rounded-md">
            <Logo size={24} />
          </div>
          ShadcnStore
        </Link>
        <SignupForm1 />
      </div>
    </div>
  )
}
