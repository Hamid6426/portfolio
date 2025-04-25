// app/verify-email/page.tsx
import VerifyEmail from "@/components/VerifyEmail";
import { Suspense } from "react";

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmail />
    </Suspense>
  );
}
