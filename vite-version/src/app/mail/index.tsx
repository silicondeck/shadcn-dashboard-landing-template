import { Mail } from "@/app/mail/components/mail";
import { accounts, mails } from "@/app/mail/data";

export default function MailPage() {
  return <Mail accounts={accounts} mails={mails} navCollapsedSize={4} />;
}
