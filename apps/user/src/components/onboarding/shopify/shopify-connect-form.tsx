// Node Modules
import { memo, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Store,
  Shield,
  ArrowRight,
  Zap,
  Package,
  RefreshCw,
  BarChart3,
} from '@repo/ui/lib/icons';

// Components
import { Button } from '@repo/ui/components/base/button';

interface ShopifyConnectFormProps {
  isConnecting: boolean;
  onInstall: () => void;
}

function ShopifyConnectForm(props: ShopifyConnectFormProps) {
  const { isConnecting, onInstall } = props;

  const features = [
    {
      icon: Package,
      title: 'Product Sync',
      description: 'Automatically sync your designs as Shopify products',
    },
    {
      icon: RefreshCw,
      title: 'Order Automation',
      description: 'Orders flow directly to fulfillment automatically',
    },
    {
      icon: BarChart3,
      title: 'Real-time Updates',
      description: 'Inventory and order status synced in real-time',
    },
    {
      icon: Shield,
      title: 'Secure Connection',
      description: 'OAuth 2.0 authentication with encrypted tokens',
    },
  ];

  const handleInstall = useCallback(() => {
    onInstall();
  }, [onInstall]);

  return (
    <div className="mx-auto max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="mb-6 flex justify-center">
          <div className="bg-primary/10 flex h-16 w-16 items-center justify-center rounded-2xl">
            <Store className="text-primary h-8 w-8" />
          </div>
        </div>

        <h2 className="font-inter text-foreground mb-3 text-3xl font-bold">
          Connect Your Shopify Store
        </h2>
        <p className="font-albert text-muted-foreground mb-8 text-lg">
          Link your Shopify store to start publishing products and receiving
          orders automatically.
        </p>

        <motion.div
          className="border-border bg-card mb-8 rounded-xl border p-6 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="mb-6 text-center">
            <h3 className="font-inter text-foreground mb-2 text-xl font-semibold">
              Why Connect Shopify?
            </h3>
            <p className="font-albert text-muted-foreground text-sm">
              Seamlessly integrate your print-on-demand products with your
              Shopify store for automated order processing.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              >
                <div className="bg-primary/10 mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg">
                  <feature.icon className="text-primary h-6 w-6" />
                </div>
                <h4 className="font-inter text-foreground mb-1 text-sm font-medium">
                  {feature.title}
                </h4>
                <p className="font-albert text-muted-foreground text-xs leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-6"
        >
          <Button
            onClick={handleInstall}
            disabled={isConnecting}
            size="lg"
            className="h-12 min-w-64 font-semibold shadow-sm"
          >
            {isConnecting ? (
              <>
                <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Connecting...
              </>
            ) : (
              <>
                <Zap className="mr-2 h-5 w-5" />
                Connect Shopify Store
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>

          <div className="text-center">
            <p className="font-albert text-muted-foreground mb-2 text-sm">
              Secure OAuth connection • Read/write products • Manage orders
            </p>
            <p className="font-albert text-muted-foreground text-xs">
              You'll be redirected to Shopify to select your store and authorize
              the connection.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default memo(ShopifyConnectForm);
