// Node Modules
import { memo } from 'react';
import { useLocation, Link } from '@tanstack/react-router';
import {
  Settings,
  Package,
  ShoppingCart,
  LayoutDashboard,
  Palette,
  Store,
  CreditCard,
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

const productsItems: SidebarGroupProps['items'] = [
  {
    title: 'Products',
    url: '/dashboard/products',
    icon: Package,
  },
  {
    title: 'Designer',
    url: '/dashboard/designer',
    icon: Palette,
  },
];

const ordersItems: SidebarGroupProps['items'] = [
  {
    title: 'Orders',
    url: '/dashboard/orders',
    icon: ShoppingCart,
  },
];

const integrationsItems: SidebarGroupProps['items'] = [
  {
    title: 'Shopify',
    url: '/dashboard/shopify',
    icon: Store,
  },
  {
    title: 'Billing',
    url: '/dashboard/billing',
    icon: CreditCard,
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
  ...productsItems,
  ...ordersItems,
  ...integrationsItems,
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
          title="Products"
          items={productsItems}
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
          title="Integrations"
          items={integrationsItems}
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
