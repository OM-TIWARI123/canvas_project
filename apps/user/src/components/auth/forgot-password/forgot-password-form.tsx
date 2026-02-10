// Node Modules
import { memo, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { zodResolver, useForm } from '@repo/ui/lib/form';
import {
  AtSign,
  ArrowRight,
  Loader2,
  KeyRound,
  ArrowLeft,
  Mail,
} from '@repo/ui/lib/icons';

// Components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/base/form';
import { Input } from '@repo/ui/components/base/input';
import { Button } from '@repo/ui/components/base/button';

// Hooks
import { useAuth } from '@/hooks/useAuth';

// Schema
import { forgotPasswordSchema, ForgotPasswordSchema } from './schema';

function ForgotPasswordForm() {
  const { requestResetPasswordMutation } = useAuth();

  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  function onSubmit(data: ForgotPasswordSchema) {
    requestResetPasswordMutation.mutate(data, {
      onSuccess: function () {
        form.reset();
        setIsSubmitted(true);
      },
    });
  }

  // Success state after email is sent
  if (isSubmitted) {
    return (
      <div className="relative flex w-full items-center justify-center p-4">
        <div className="relative z-10 w-full max-w-md">
          <div className="border-border shadow-dark/5 rounded-2xl border bg-white p-8 shadow-xl backdrop-blur-sm">
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-green-100">
                  <Mail className="size-7 text-green-600" />
                </div>
              </div>
              <h1 className="text-foreground mb-2 text-2xl font-bold">
                Check your email
              </h1>
              <p className="text-muted-foreground mb-6 text-sm">
                We've sent a password reset link to your email address. Please
                check your inbox.
              </p>
              <div className="space-y-3">
                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="group h-11 w-full rounded-xl border-gray-200 transition-all duration-300 hover:border-gray-300 hover:bg-gray-50"
                >
                  <div className="flex items-center justify-center gap-2">
                    <ArrowLeft className="size-4" />
                    <span className="text-sm font-medium">Back to form</span>
                  </div>
                </Button>
                <Link to="/login" className="block">
                  <Button
                    variant="ghost"
                    className="text-primary hover:text-primary-dark h-10 w-full text-sm font-medium"
                  >
                    Return to login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex w-full items-center justify-center p-4">
      <div className="relative z-10 w-full max-w-md">
        <div className="border-border shadow-dark/5 rounded-2xl border bg-white p-8 shadow-xl backdrop-blur-sm">
          <div className="mb-8 text-center">
            <div className="mb-6 flex justify-center md:hidden">
              <img src="/logo.png" alt="DSPLN" className="h-12 w-auto" />
            </div>
            <div className="mb-6 hidden justify-center md:flex">
              <div className="bg-secondary/10 flex size-12 items-center justify-center rounded-xl">
                <KeyRound className="text-secondary size-6" />
              </div>
            </div>
            <h1 className="text-foreground mb-2 text-2xl font-bold">
              Forgot Password
            </h1>
            <p className="text-muted-foreground text-sm">
              Enter your email address and we'll send you a link to reset your
              password
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground mb-2 block text-xs font-semibold">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <AtSign className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                        <Input
                          {...field}
                          type="email"
                          placeholder="you@yourstore.com"
                          className="focus:border-primary focus:ring-primary/20 h-11 w-full rounded-xl border border-gray-200 bg-gray-50/50 pr-4 pl-10 text-sm text-gray-900 transition-all duration-300 placeholder:text-gray-400 focus:bg-white focus:ring-2"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="mt-1 text-xs" />
                  </FormItem>
                )}
              />

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={requestResetPasswordMutation.isPending}
                  className="bg-primary hover:bg-primary-dark group shadow-primary/25 h-11 w-full rounded-xl font-semibold shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-center gap-2">
                    {requestResetPasswordMutation.isPending ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        <span className="text-sm">Sending...</span>
                      </>
                    ) : (
                      <>
                        <span className="text-sm">Send Reset Link</span>
                        <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </>
                    )}
                  </div>
                </Button>
              </div>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-primary hover:text-primary-dark inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
            >
              <ArrowLeft className="size-3.5" />
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ForgotPasswordForm);
