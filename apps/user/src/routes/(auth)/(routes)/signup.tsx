import { z } from '@repo/ui/lib/form';
import React, { useState, useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';

import SignupForm from '@/components/auth/signup/signup-form';
import SignupSuccessDialog from '@/components/auth/signup/signup-success-dialog';

export const Route = createFileRoute('/(auth)/(routes)/signup')({
  component: RouteComponent,
  validateSearch: z.object({
    email_sent: z.coerce.boolean().optional(),
    email: z.string().optional(),
  }),
});

function RouteComponent() {
  const { email_sent, email } = Route.useSearch();
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  useEffect(() => {
    if (email_sent) {
      setShowSuccessDialog(true);
    }
  }, [email_sent]);

  return (
    <React.Fragment>
      <div className="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center bg-white lg:w-1/2">
        <SignupForm />
      </div>

      <SignupSuccessDialog
        email={email}
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
      />
    </React.Fragment>
  );
}
