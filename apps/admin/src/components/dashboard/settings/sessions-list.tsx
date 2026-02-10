// Node Modules
import { useCallback } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Globe, Clock, Trash2, LogOut } from '@repo/ui/lib/icons';

// Components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/base/card';
import { Button } from '@repo/ui/components/base/button';
import { Skeleton } from '@repo/ui/components/base/skeleton';
import { Badge } from '@repo/ui/components/base/badge';

// Hooks
import { useSession } from '@/hooks/useSession';

// Utils
import { formatDate } from '@/utils/date.utils';
import { getDeviceIcon, getDeviceName } from '@/utils/session.utils';

export function SessionsSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-40" />
        <Skeleton className="mt-2 h-4 w-64" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <Skeleton className="h-9 w-20" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

interface SessionsListProps {
  currentSessionToken?: string;
}

export function SessionsList({ currentSessionToken }: SessionsListProps) {
  const {
    getAllSessionsQueryOptions,
    revokeSessionMutation,
    revokeAllSessionsMutation,
  } = useSession();
  const { data: sessions } = useSuspenseQuery(getAllSessionsQueryOptions);

  const handleRevokeSession = useCallback(
    async (token: string) => {
      await revokeSessionMutation.mutateAsync(token);
    },
    [revokeSessionMutation],
  );

  const handleRevokeAllSessions = useCallback(async () => {
    await revokeAllSessionsMutation.mutateAsync();
  }, [revokeAllSessionsMutation]);

  const otherSessions = sessions.filter((s) => s.token !== currentSessionToken);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Active Sessions
            </CardTitle>
            <CardDescription>
              Manage your active sessions across devices
            </CardDescription>
          </div>
          {otherSessions.length > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={handleRevokeAllSessions}
              disabled={revokeAllSessionsMutation.isPending}
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sign out all
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {sessions.length === 0 ? (
            <p className="text-muted-foreground py-8 text-center text-sm">
              No active sessions found
            </p>
          ) : (
            sessions.map((session) => {
              const DeviceIcon = getDeviceIcon(session.userAgent ?? null);
              const isCurrentSession = session.token === currentSessionToken;

              return (
                <div
                  key={session.id}
                  className={`flex items-center justify-between rounded-lg border p-4 transition-colors ${
                    isCurrentSession
                      ? 'border-primary/50 bg-primary/5'
                      : 'hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        isCurrentSession ? 'bg-primary/10' : 'bg-muted'
                      }`}
                    >
                      <DeviceIcon
                        className={`h-5 w-5 ${
                          isCurrentSession
                            ? 'text-primary'
                            : 'text-muted-foreground'
                        }`}
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">
                          {getDeviceName(session.userAgent ?? null)}
                        </p>
                        {isCurrentSession && (
                          <Badge variant="secondary" className="text-xs">
                            Current
                          </Badge>
                        )}
                      </div>
                      <div className="text-muted-foreground flex items-center gap-2 text-sm">
                        <Clock className="h-3 w-3" />
                        {formatDate(session.createdAt)}
                        {session.ipAddress && (
                          <>
                            <span>•</span>
                            <span>{session.ipAddress}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  {!isCurrentSession && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        session.token && handleRevokeSession(session.token)
                      }
                      disabled={revokeSessionMutation.isPending}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10 gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      Revoke
                    </Button>
                  )}
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}
