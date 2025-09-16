import { ForgotPasswordForm2 } from "./components/forgot-password-form-2"
import { Logo } from "@/components/logo"

export default function ForgotPassword2Page() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
              <Logo size={24} />
            </div>
            ShadcnStore
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            <ForgotPasswordForm2 />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="https://ui.shadcn.com/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.95] dark:invert"
        />
      </div>
    </div>
  )
}
