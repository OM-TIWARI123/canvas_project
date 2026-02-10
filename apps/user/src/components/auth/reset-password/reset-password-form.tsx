// Node Modules
import { Link } from '@tanstack/react-router';
import { memo, useState } from 'react';
import { zodResolver, useForm } from '@repo/ui/lib/form';
import {
  Eye,
  EyeOff,
  Key,
  ArrowRight,
  Loader2,
  Shield,
  ArrowLeft,
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
import { resetPasswordSchema, ResetPasswordSchema } from './schema';

interface ResetPasswordFormProps {
  token?: string | undefined;
}

function ResetPasswordForm(params: ResetPasswordFormProps) {
  const { token } = params;

  const { resetPasswordMutation } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: token,
      password: '',
      confirmPassword: '',
    },
  });

  function onSubmit(data: ResetPasswordSchema) {
    resetPasswordMutation.mutate(data);
  }

  return (
    <div className="relative flex w-full items-center justify-center p-4">
      <div className="relative z-10 w-full max-w-md">
        <div className="border-border shadow-dark/5 rounded-2xl border bg-white p-8 shadow-xl backdrop-blur-sm">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mb-6 flex justify-center md:hidden">
              <img src="/logo.png" alt="DSPLN" className="h-12 w-auto" />
            </div>
            <div className="mb-6 hidden justify-center md:flex">
              <div className="bg-secondary/10 flex size-12 items-center justify-center rounded-xl">
                <Shield className="text-secondary size-6" />
              </div>
            </div>
            <h1 className="text-foreground mb-2 text-2xl font-bold">
              Reset Password
            </h1>
            <p className="text-muted-foreground text-sm">
              Enter your new password below
            </p>
          </div>

          {/* Invalid token warning */}
          {!token && (
            <div className="mb-6 rounded-xl bg-red-50 p-4 text-center">
              <p className="text-sm text-red-600">
                Invalid or missing reset token. Please request a new password
                reset link.
              </p>
              <Link
                to="/forgot-password"
                className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-red-700 hover:text-red-800"
              >
                Request new link
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <Input type="hidden" {...form.register('token')} value={token} />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground mb-2 block text-xs font-semibold">
                      New Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Key className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                        <Input
                          {...field}
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter new password"
                          className="focus:border-primary focus:ring-primary/20 h-11 w-full rounded-xl border border-gray-200 bg-gray-50/50 pr-10 pl-10 text-sm text-gray-900 transition-all duration-300 placeholder:text-gray-400 focus:bg-white focus:ring-2"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transition-colors duration-200"
                        >
                          {showPassword ? (
                            <EyeOff className="size-4" />
                          ) : (
                            <Eye className="size-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="mt-1 text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground mb-2 block text-xs font-semibold">
                      Confirm New Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Key className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                        <Input
                          {...field}
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="Confirm new password"
                          className="focus:border-primary focus:ring-primary/20 h-11 w-full rounded-xl border border-gray-200 bg-gray-50/50 pr-10 pl-10 text-sm text-gray-900 transition-all duration-300 placeholder:text-gray-400 focus:bg-white focus:ring-2"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transition-colors duration-200"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="size-4" />
                          ) : (
                            <Eye className="size-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="mt-1 text-xs" />
                  </FormItem>
                )}
              />

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={
                    resetPasswordMutation.isPending ||
                    !form.formState.isValid ||
                    !token
                  }
                  className="bg-primary hover:bg-primary-dark group shadow-primary/25 h-11 w-full rounded-xl font-semibold shadow-lg transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <div className="flex items-center justify-center gap-2">
                    {resetPasswordMutation.isPending ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        <span className="text-sm">Resetting...</span>
                      </>
                    ) : (
                      <>
                        <span className="text-sm">Reset Password</span>
                        <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </>
                    )}
                  </div>
                </Button>
              </div>
            </form>
          </Form>

          {/* Back to login link */}
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

export default memo(ResetPasswordForm);
