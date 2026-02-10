// Node Modules
import { memo } from 'react';
import { motion } from 'framer-motion';
import { Store, CheckCircle } from '@repo/ui/lib/icons';

function ShopifyConnectHeader() {
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
              Plan Selected
            </span>
          </div>
          <div className="text-primary flex items-center gap-2 text-sm font-medium">
            <Store className="h-4 w-4" />
            Connect Store
          </div>
        </div>
        <div className="bg-muted mx-auto h-2 w-full rounded-full">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '66%' }}
            transition={{ duration: 1, delay: 0.3 }}
            className="bg-primary h-full rounded-full"
          />
        </div>
      </motion.div>
    </div>
  );
}

export default memo(ShopifyConnectHeader);
