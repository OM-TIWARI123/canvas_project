// Node Modules
import { memo } from 'react';
import { motion } from 'framer-motion';
import {
  Receipt,
  Download,
  ExternalLink,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
} from '@repo/ui/lib/icons';

// Components
import { Button } from '@repo/ui/components/base/button';
import { Badge } from '@repo/ui/components/base/badge';

// Types
import type { Invoice } from '@/hooks/useBilling';

interface InvoicesTableProps {
  invoices: Invoice[];
}

const statusConfig = {
  paid: {
    label: 'Paid',
    icon: CheckCircle2,
    className: 'bg-emerald-100 text-emerald-800',
  },
  open: {
    label: 'Open',
    icon: Clock,
    className: 'bg-blue-100 text-blue-800',
  },
  draft: {
    label: 'Draft',
    icon: Clock,
    className: 'bg-gray-100 text-gray-800',
  },
  void: {
    label: 'Void',
    icon: XCircle,
    className: 'bg-gray-100 text-gray-600',
  },
  uncollectible: {
    label: 'Failed',
    icon: AlertCircle,
    className: 'bg-red-100 text-red-800',
  },
};

function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function InvoicesTable({ invoices }: InvoicesTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="rounded-2xl border border-gray-200 bg-white shadow-sm"
    >
      <div className="border-b border-gray-100 p-6">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-xl">
            <Receipt className="text-primary h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Billing History
            </h3>
            <p className="text-sm text-gray-500">
              View and download your past invoices
            </p>
          </div>
        </div>
      </div>

      {invoices.length === 0 ? (
        <div className="p-12 text-center">
          <Receipt className="mx-auto mb-3 h-12 w-12 text-gray-300" />
          <p className="text-sm text-gray-600">No invoices yet</p>
          <p className="text-xs text-gray-400">
            Your billing history will appear here
          </p>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {invoices.map((invoice, index) => {
            const statusInfo =
              statusConfig[invoice.status as keyof typeof statusConfig] ||
              statusConfig.open;
            const StatusIcon = statusInfo.icon;

            return (
              <motion.div
                key={invoice.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 + index * 0.03 }}
                className="flex items-center justify-between p-4 transition-colors hover:bg-gray-50"
              >
                <div className="flex items-center gap-4">
                  <div className="hidden h-10 w-10 items-center justify-center rounded-lg bg-gray-100 sm:flex">
                    <Receipt className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {invoice.number || `Invoice #${invoice.id.slice(-8)}`}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatDate(invoice.created)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Badge className={`gap-1 ${statusInfo.className}`}>
                    <StatusIcon className="h-3 w-3" />
                    {statusInfo.label}
                  </Badge>

                  <p className="min-w-20 text-right font-semibold text-gray-900">
                    {formatCurrency(invoice.amount, invoice.currency)}
                  </p>

                  <div className="flex gap-1">
                    {invoice.pdf && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(invoice.pdf!, '_blank')}
                        className="h-8 w-8 p-0 text-gray-500 hover:text-gray-900"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                    {invoice.url && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(invoice.url!, '_blank')}
                        className="h-8 w-8 p-0 text-gray-500 hover:text-gray-900"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}

export default memo(InvoicesTable);
