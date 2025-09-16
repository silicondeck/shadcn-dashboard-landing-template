import { Mail } from "./components/mail"
import { accounts, mails } from "./data"

export default function MailPage() {
  return (
    <div className="@container/main flex flex-1 flex-col">
      <div className="h-[calc(100vh-4rem)] px-4 md:px-6">
        <Mail
          accounts={accounts}
          mails={mails}
          defaultLayout={[20, 32, 48]}
          defaultCollapsed={false}
          navCollapsedSize={4}
        />
      </div>
    </div>
  )
}
