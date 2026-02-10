// Node Modules
import { memo } from 'react';
import { useLocation, Link } from '@tanstack/react-router';
import {
  Settings,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  LayoutDashboard,
  Truck,
  CreditCard,
  Shirt,
} from '@repo/ui/lib/icons';

// Components
import SidebarHeader from './header';
import SidebarGroup, {
  SidebarGroupProps,
} from '@repo/ui/components/base/sidebar-group';
import { Sidebar, SidebarContent } from '@repo/ui/components/base/sidebar';

const overviewItems: SidebarGroupProps['items'] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
  },
];

const merchantsItems: SidebarGroupProps['items'] = [
  {
    title: 'Merchants',
    url: '/dashboard/merchants',
    icon: Users,
  },
];

const ordersItems: SidebarGroupProps['items'] = [
  {
    title: 'Orders',
    url: '/dashboard/orders',
    icon: ShoppingCart,
  },
  {
    title: 'Fulfillment',
    url: '/dashboard/fulfillment',
    icon: Truck,
  },
];

const catalogItems: SidebarGroupProps['items'] = [
  {
    title: 'Base Products',
    url: '/dashboard/base-products',
    icon: Shirt,
  },
  {
    title: 'Inventory',
    url: '/dashboard/inventory',
    icon: Package,
  },
];

const settingsItems: SidebarGroupProps['items'] = [
  {
    title: 'Settings',
    url: '/dashboard/settings',
    icon: Settings,
  },
];

export const sidebarItems = [
  ...overviewItems,
  ...merchantsItems,
  ...ordersItems,
  ...catalogItems,
  ...settingsItems,
];

function AppSidebar() {
  const { pathname } = useLocation();

  const linkComponent: SidebarGroupProps['LinkComponent'] = ({
    to,
    children,
    className,
  }) => (
    <Link to={to} className={className}>
      {children}
    </Link>
  );

  return (
    <Sidebar collapsible="icon" className="border-sidebar-border border-r">
      <SidebarHeader className="bg-white" />

      <SidebarContent className="bg-white">
        <SidebarGroup
          title="Overview"
          items={overviewItems}
          currentPath={pathname}
          LinkComponent={linkComponent}
        />
        <SidebarGroup
          title="Merchants"
          items={merchantsItems}
          currentPath={pathname}
          LinkComponent={linkComponent}
        />
        <SidebarGroup
          title="Orders"
          items={ordersItems}
          currentPath={pathname}
          LinkComponent={linkComponent}
        />
        <SidebarGroup
          title="Catalog"
          items={catalogItems}
          currentPath={pathname}
          LinkComponent={linkComponent}
        />
        <SidebarGroup
          title="Settings"
          items={settingsItems}
          currentPath={pathname}
          LinkComponent={linkComponent}
        />
      </SidebarContent>
    </Sidebar>
  );
}

export default memo(AppSidebar);
