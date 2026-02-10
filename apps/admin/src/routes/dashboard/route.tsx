// Node Modules
import { Outlet, redirect } from '@tanstack/react-router';
import { createFileRoute } from '@tanstack/react-router';

// Functions
import { getUser } from '@/functions/get-user-details';

// Components
import TopBar from '@/components/dashboard/topbar';
import Sidebar from '@/components/dashboard/sidebar';
import {
  useSidebar,
  SidebarInset,
  SidebarProvider,
} from '@repo/ui/components/base/sidebar';

// Utils
import { getMetadata } from '@/utils/metadata.util';

export const Route = createFileRoute('/dashboard')({
  ssr: false,
  component: RouteComponent,
  head: () => getMetadata('/dashboard'),
  loader: async function () {
    const user = await getUser();
    if (!user) {
      throw redirect({ to: '/login' });
    }

    return { session: user.session, user: user.user };
  },
});

function DashboardContent() {
  const { state } = useSidebar();
  const isExpanded = state === 'expanded';

  return (
    <SidebarInset className={isExpanded ? 'lg:ml-[192.5px]' : 'lg:ml-20.25'}>
      <TopBar />
      <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6">
        <Outlet />
      </main>
    </SidebarInset>
  );
}

function RouteComponent() {
  return (
    <SidebarProvider>
      <Sidebar />
      <DashboardContent />
    </SidebarProvider>
  );
}
