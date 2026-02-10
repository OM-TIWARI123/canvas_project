// Node Modules
import { memo } from 'react';
import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';

// Utils
import { cn } from '@repo/ui/lib/utils';

function AuthMobileHeader() {
  return (
    <motion.nav
      className={cn(
        'border-border sticky top-0 z-50 w-full border-b lg:hidden',
        'bg-dark',
      )}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 18 }}
    >
      <div className="container mx-auto flex h-16 items-center justify-center px-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          <Link to="/" className="group flex items-center gap-3">
            {/* Logo */}
            <img src="/logo.png" alt="DSPLN" className="h-9 w-auto" />

            {/* Brand Text */}
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white">DSPLN</span>
              <span className="text-primary text-[10px] font-medium">
                Admin Portal
              </span>
            </div>
          </Link>
        </motion.div>
      </div>
    </motion.nav>
  );
}

export default memo(AuthMobileHeader);
