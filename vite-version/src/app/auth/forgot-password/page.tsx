import { ForgotPasswordForm1 } from "./components/forgot-password-form-1"
import { Logo } from "@/components/logo"

export default function ForgotPasswordPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="/" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-9 items-center justify-center rounded-md">
            <Logo size={24} />
          </div>
          ShadcnStore
        </a>
        <ForgotPasswordForm1 />
      </div>
    </div>
  )
}
