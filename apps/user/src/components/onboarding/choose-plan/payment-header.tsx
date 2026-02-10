// Node Modules
import { memo } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, CheckCircle } from '@repo/ui/lib/icons';

function PaymentHeader() {
  return (
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="mx-auto mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-lg">
              <CheckCircle className="text-primary h-5 w-5" />
            </div>
            <span className="text-muted-foreground text-sm font-medium">
              Account Created
            </span>
          </div>
          <div className="text-primary text-sm font-medium">Choose Plan</div>
        </div>
        <div className="bg-muted mx-auto h-2 w-full rounded-full">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '33%' }}
            transition={{ duration: 1, delay: 0.3 }}
            className="bg-primary h-full rounded-full"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="mb-4 flex justify-center">
          <div className="bg-primary/10 flex h-16 w-16 items-center justify-center rounded-2xl">
            <CreditCard className="text-primary h-8 w-8" />
          </div>
        </div>

        <h1 className="text-foreground mb-3 text-3xl font-bold">
          Choose Your Plan
        </h1>

        <p className="text-muted-foreground mx-auto max-w-2xl">
          Select the plan that best fits your print-on-demand business. You can
          always upgrade or downgrade as your needs change.
        </p>
      </motion.div>
    </div>
  );
}

export default memo(PaymentHeader);
