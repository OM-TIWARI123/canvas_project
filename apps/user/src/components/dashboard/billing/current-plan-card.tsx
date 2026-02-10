// Node Modules
import { memo } from 'react';
import { motion } from 'framer-motion';
import {
  Crown,
  Calendar,
  Zap,
  ArrowUpRight,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
} from '@repo/ui/lib/icons';

// Components
import { Button } from '@repo/ui/components/base/button';
import { Badge } from '@repo/ui/components/base/badge';

// Types
import type { Subscription } from '@/hooks/useBilling';

interface CurrentPlanCardProps {
  subscription: Subscription | null;
  manageSubscriptionUrl: string;
}

const statusConfig = {
  active: {
    label: 'Active',
    icon: CheckCircle2,
    className: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  },
  canceled: {
    label: 'Canceled',
    icon: XCircle,
    className: 'bg-red-100 text-red-800 border-red-200',
  },
  past_due: {
    label: 'Past Due',
    icon: AlertCircle,
    className: 'bg-amber-100 text-amber-800 border-amber-200',
  },
  trialing: {
    label: 'Trial',
    icon: Clock,
    className: 'bg-blue-100 text-blue-800 border-blue-200',
  },
};

function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount);
}

function CurrentPlanCard({
  subscription,
  manageSubscriptionUrl,
}: CurrentPlanCardProps) {
  if (!subscription) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="to-primary/5 relative overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-br from-white via-gray-50/50 p-8"
      >
        <div className="bg-primary/5 absolute -top-20 -right-20 h-40 w-40 rounded-full" />
        <div className="bg-primary/5 absolute -bottom-10 -left-10 h-32 w-32 rounded-full" />

        <div className="relative text-center">
          <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl">
            <Crown className="text-primary h-8 w-8" />
          </div>
          <h2 className="mb-2 text-xl font-bold text-gray-900">
            No Active Subscription
          </h2>
          <p className="mb-6 text-sm text-gray-600">
            Choose a plan to unlock all features and grow your practice
          </p>
          <Button
            onClick={() => window.open(manageSubscriptionUrl, '_blank')}
            className="bg-primary gap-2 rounded-xl font-semibold text-white shadow-lg transition-all hover:shadow-xl"
          >
            <Zap className="h-4 w-4" />
            Choose a Plan
          </Button>
        </div>
      </motion.div>
    );
  }

  const { plan, status, cancelAtPeriodEnd } = subscription;
  const statusInfo =
    statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
  const StatusIcon = statusInfo.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="to-primary/5 relative overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-br from-white via-gray-50/30 p-8 shadow-sm"
    >
      {/* Decorative elements */}
      <div className="bg-primary/5 absolute -top-20 -right-20 h-40 w-40 rounded-full" />
      <div className="bg-primary/5 absolute -bottom-10 -left-10 h-32 w-32 rounded-full" />

      <div className="relative">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="from-primary to-primary/80 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg">
              <Crown className="h-7 w-7 text-white" />
            </div>
            <div>
              <div className="mb-1 flex items-center gap-2">
                <h2 className="text-xl font-bold text-gray-900">{plan.name}</h2>
                <Badge className={`gap-1 ${statusInfo.className}`}>
                  <StatusIcon className="h-3 w-3" />
                  {statusInfo.label}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">
                Your current subscription plan
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => window.open(manageSubscriptionUrl, '_blank')}
            className="gap-2 rounded-xl border-gray-300"
          >
            Manage Plan
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Plan Details */}
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-gray-100">
            <p className="mb-1 text-xs font-medium tracking-wider text-gray-500 uppercase">
              Price
            </p>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(plan.price, plan.currency)}
              <span className="text-sm font-normal text-gray-500">
                /{plan.interval}
              </span>
            </p>
          </div>

          <div className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-gray-100">
            <p className="mb-1 text-xs font-medium tracking-wider text-gray-500 uppercase">
              Next Billing Date
            </p>
            <div className="flex items-center gap-2">
              <Calendar className="text-primary h-5 w-5" />
              <p className="font-semibold text-gray-900">
                {plan.nextBillingDate}
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-gray-100">
            <p className="mb-1 text-xs font-medium tracking-wider text-gray-500 uppercase">
              Days Until Renewal
            </p>
            <p className="text-primary text-2xl font-bold">
              {plan.daysUntilNextBill}
              <span className="text-sm font-normal text-gray-500"> days</span>
            </p>
          </div>
        </div>

        {/* Cancellation Warning */}
        {cancelAtPeriodEnd && (
          <div className="rounded-xl bg-amber-50 p-4 ring-1 ring-amber-200">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-600" />
              <p className="text-sm font-medium text-amber-800">
                Your subscription will be canceled at the end of the current
                billing period.
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default memo(CurrentPlanCard);
