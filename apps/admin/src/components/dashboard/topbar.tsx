// Node Modules
import React, { memo, useMemo } from 'react';
import { Link, useLocation, useLoaderData } from '@tanstack/react-router';
import { LogOut } from '@repo/ui/lib/icons';

// Components
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@repo/ui/components/base/breadcrumb';
import { Separator } from '@repo/ui/components/base/separator';
import { SidebarTrigger } from '@repo/ui/components/base/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/ui/components/base/dropdown-menu';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/base/avatar';
import { Button } from '@repo/ui/components/base/button';

// Hooks
import { useAuth } from '@/hooks/useAuth';

// Constants
import { sidebarItems } from './sidebar';

interface BreadcrumbItemType {
  title: string;
  url?: string;
  isActive?: boolean;
}

function buildBreadcrumbs(pathname: string): BreadcrumbItemType[] {
  let normalizedPathname = pathname;
  if (normalizedPathname.length > 1 && normalizedPathname.endsWith('/')) {
    normalizedPathname = normalizedPathname.slice(0, -1);
  }

  const breadcrumbs: BreadcrumbItemType[] = [
    { title: 'Admin', url: '/dashboard' },
  ];

  if (normalizedPathname === '/dashboard') {
    breadcrumbs.push({ title: 'Dashboard', isActive: true });
    return breadcrumbs;
  }

  for (const item of sidebarItems) {
    if (normalizedPathname === item.url) {
      breadcrumbs.push({ title: item.title, isActive: true });
      return breadcrumbs;
    }
  }

  const segments = normalizedPathname.split('/').filter(Boolean);
  if (segments.length > 1) {
    const lastSegment = segments[segments.length - 1];
    const formattedTitle = lastSegment
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    breadcrumbs.push({ title: formattedTitle, isActive: true });
  }

  return breadcrumbs;
}

function ProfileDropdown() {
  const { logoutMutation } = useAuth();
  const { user } = useLoaderData({ from: '/dashboard' });

  const initials = useMemo(() => {
    if (!user?.name) return 'A';
    const names = user.name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return user.name.slice(0, 2).toUpperCase();
  }, [user?.name]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user?.image ?? undefined} alt={user?.name} />
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <div className="flex items-center gap-2 p-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.image ?? undefined} alt={user?.name} />
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-0.5">
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
        </div>
        <DropdownMenuItem
          onClick={() => logoutMutation.mutate()}
          className="text-red-600 focus:bg-red-50 focus:text-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function TopBar() {
  const { pathname } = useLocation();

  const breadcrumbs = useMemo(() => buildBreadcrumbs(pathname), [pathname]);

  return (
    <header className="border-sidebar-border sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={`${crumb.title}-${index}`}>
              <BreadcrumbItem
                className={index === 0 ? 'hidden md:block' : undefined}
              >
                {crumb.isActive ? (
                  <BreadcrumbPage>{crumb.title}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={crumb.url!}>{crumb.title}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < breadcrumbs.length - 1 && (
                <BreadcrumbSeparator
                  className={index === 0 ? 'hidden md:block' : undefined}
                />
              )}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="ml-auto">
        <ProfileDropdown />
      </div>
    </header>
  );
}

export default memo(TopBar);
