// Node Modules
import { memo } from 'react';
import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { Home, Search, ArrowLeft } from '@repo/ui/lib/icons';

// Components
import { Button } from '@repo/ui/components/base/button';

interface NotFoundProps {
  children?: React.ReactNode;
}

/**
 * Root level 404 Not Found component.
 */
function NotFound(props: NotFoundProps) {
  const { children } = props;

  if (children) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        {children}
      </div>
    );
  }

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md text-center"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <span className="text-primary/10 text-[150px] leading-none font-bold select-none">
              404
            </span>
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Search className="text-primary h-16 w-16" />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="mb-3 text-2xl font-bold text-gray-900">
            Page Not Found
          </h1>
          <p className="text-muted-foreground mb-8 text-base">
            The page you're looking for doesn't exist or has been moved. Let's
            get you back on track.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="h-11 rounded-xl border-gray-300 px-6 hover:bg-gray-100"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
            <Link to="/">
              <Button className="bg-primary hover:bg-primary/90 h-11 w-full rounded-xl px-6 font-semibold text-white shadow-md sm:w-auto">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default memo(NotFound);
