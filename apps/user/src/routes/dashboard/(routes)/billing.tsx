// Node Modules
import { motion } from 'framer-motion';
import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';

// Components
import CurrentPlanCard from '@/components/dashboard/billing/current-plan-card';
import InvoicesTable from '@/components/dashboard/billing/invoices-table';
import BillingSkeleton from '@/components/dashboard/billing/billing-skeleton';

// Hooks
import { useBilling } from '@/hooks/useBilling';

export const Route = createFileRoute('/dashboard/(routes)/billing')({
  component: RouteComponent,
  pendingComponent: BillingSkeleton,
});

function RouteComponent() {
  const { billingDetailsQueryOptions, invoicesQueryOptions } = useBilling();

  const { data: billingData } = useSuspenseQuery(billingDetailsQueryOptions);
  const { data: invoicesData } = useSuspenseQuery(invoicesQueryOptions);

  const currentSubscription = billingData?.data?.[0] || null;
  const manageSubscriptionUrl = billingData?.manageSubscriptionUrl || '';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="mb-2">
        <h1 className="text-2xl font-bold text-gray-900">
          Billing & Subscription
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage your subscription, payment setup, and view invoices
        </p>
      </div>

      <CurrentPlanCard
        subscription={currentSubscription}
        manageSubscriptionUrl={manageSubscriptionUrl}
      />

      <InvoicesTable invoices={invoicesData?.data || []} />
    </motion.div>
  );
}
