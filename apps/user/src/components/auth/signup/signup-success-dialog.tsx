// Node Modules
import { memo, useCallback } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Mail, ArrowLeft } from '@repo/ui/lib/icons';

// Components
import { Button } from '@repo/ui/components/base/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@repo/ui/components/base/dialog';

interface SignupSuccessDialogProps {
  email?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function SignupSuccessDialog(props: SignupSuccessDialogProps) {
  const { open, onOpenChange, email } = props;
  const navigate = useNavigate();

  const handleBackToLogin = useCallback(() => {
    onOpenChange(false);
    navigate({ to: '/login' });
  }, [navigate, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        aria-describedby="signup-success-dialog-description"
        className="max-w-md border-none bg-white p-0 shadow-2xl"
      >
        <DialogTitle></DialogTitle>
        <div className="relative overflow-hidden rounded-lg">
          <div className="px-8 py-6">
            <div className="mb-6 text-center">
              <div className="mb-4 flex justify-center">
                <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-xl">
                  <Mail className="text-primary h-6 w-6" />
                </div>
              </div>

              <h3 className="font-inter mb-2 text-lg font-semibold text-gray-900">
                Verify Your Email
              </h3>

              <div className="space-y-3">
                <p className="font-albert text-sm text-gray-600">
                  We've sent a verification link to:
                </p>

                {email && (
                  <div className="bg-primary/5 border-primary/20 rounded-lg border px-4 py-3">
                    <p className="font-inter text-sm font-medium text-gray-900">
                      {email}
                    </p>
                  </div>
                )}

                <p className="font-albert text-sm text-gray-600">
                  Please check your inbox and click the verification link to
                  activate your account.
                </p>
              </div>
            </div>

            <div className="mb-6 rounded-xl border border-gray-100 bg-gray-50 p-4">
              <h4 className="font-inter mb-3 text-sm font-semibold text-gray-900">
                Next Steps:
              </h4>
              <ol className="space-y-2.5">
                <li className="font-albert flex items-center gap-3 text-xs text-gray-700">
                  <span className="bg-primary text-primary-foreground mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                    1
                  </span>
                  <span>Check your email inbox (and spam folder)</span>
                </li>
                <li className="font-albert flex items-center gap-3 text-xs text-gray-700">
                  <span className="bg-primary text-primary-foreground mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                    2
                  </span>
                  <span>Click the verification link in the email</span>
                </li>
                <li className="font-albert flex items-center gap-3 text-xs text-gray-700">
                  <span className="bg-primary text-primary-foreground mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                    3
                  </span>
                  <span>
                    You'll be redirected to start exploring after verifying your
                    email
                  </span>
                </li>
              </ol>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleBackToLogin}
                className="bg-primary hover:bg-primary/90 w-full rounded-xl font-semibold transition-all duration-300"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Sign In
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default memo(SignupSuccessDialog);
