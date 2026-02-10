// Node Modules
import { memo } from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Package, TrendingUp } from '@repo/ui/lib/icons';

// Utils
import { Link } from '@tanstack/react-router';

const features = [
  {
    icon: Package,
    title: 'Order Management',
    description: 'View and manage all incoming orders from merchant stores',
  },
  {
    icon: Users,
    title: 'Merchant Accounts',
    description: 'Manage merchant accounts, permissions, and store connections',
  },
  {
    icon: Shield,
    title: 'Fulfillment Queue',
    description:
      'Process orders and push tracking information to Shopify stores',
  },
  {
    icon: TrendingUp,
    title: 'Billing Overview',
    description: 'Monitor merchant billing, charges, and platform revenue',
  },
];

function AuthSidebar() {
  return (
    <div className="bg-dark relative hidden overflow-hidden lg:block lg:w-1/2">
      {/* Animated background circles */}
      <motion.div
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 120,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="pointer-events-none absolute -top-32 -right-32 size-96 rounded-full border border-white/10"
      />
      <motion.div
        animate={{
          rotate: [360, 0],
        }}
        transition={{
          duration: 100,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="pointer-events-none absolute -bottom-48 -left-48 size-125 rounded-full border border-white/10"
      />

      {/* Primary glow effect */}
      <div className="bg-primary/20 pointer-events-none absolute top-1/4 left-1/2 size-64 -translate-x-1/2 rounded-full blur-3xl" />

      <div className="relative z-10 flex h-full flex-col justify-between px-12 py-16">
        <div className="flex flex-1 flex-col justify-center">
          <div className="mx-auto w-full max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12 text-center"
            >
              <Link to="/" className="group inline-block">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                  className="mb-6"
                >
                  <img
                    src="/logo.png"
                    alt="DSPLN"
                    className="mx-auto h-16 w-auto"
                  />
                </motion.div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index + 0.3, duration: 0.5 }}
                    className="group flex items-start gap-4"
                  >
                    <div className="group-hover:ring-primary/40 flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/20 transition-all duration-300 group-hover:bg-white/15">
                      <Icon className="group-hover:text-primary size-5 text-white/70 transition-colors" />
                    </div>

                    <div className="flex-1">
                      <h3 className="mb-1 text-sm font-semibold text-white">
                        {feature.title}
                      </h3>
                      <p className="text-xs leading-relaxed text-white/60">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-10 text-center"
        >
          <div className="mx-auto mb-3 h-px w-20 bg-linear-to-r from-transparent via-white/20 to-transparent" />
          <p className="text-[10px] font-medium tracking-widest text-white/60 uppercase">
            Platform Administration
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default memo(AuthSidebar);
