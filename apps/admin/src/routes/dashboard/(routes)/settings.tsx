import { Suspense } from 'react';
import { createFileRoute, useLoaderData } from '@tanstack/react-router';

// Components
import {
  UserProfile,
  ChangePassword,
  SessionsList,
  SessionsSkeleton,
} from '@/components/dashboard/settings';

// Utils
import { getMetadata } from '@/utils/metadata.util';
import { Settings } from '@repo/ui/lib/icons';

export const Route = createFileRoute('/dashboard/(routes)/settings')({
  component: SettingsPage,
  head: () => getMetadata('/dashboard/settings'),
});

function SettingsPage() {
  const { user, session } = useLoaderData({ from: '/dashboard' });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-xl">
            <Settings className="text-primary h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Account</h1>
            <p className="text-muted-foreground text-sm">
              Manage your account settings and preferences
            </p>
          </div>
        </div>
      </div>

      <UserProfile user={user} />

      <ChangePassword />

      <Suspense fallback={<SessionsSkeleton />}>
        <SessionsList currentSessionToken={session.token} />
      </Suspense>
    </div>
  );
}
