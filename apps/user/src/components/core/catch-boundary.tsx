// Node Modules
import { memo } from 'react';
import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home, Bug } from '@repo/ui/lib/icons';

// Components
import { Button } from '@repo/ui/components/base/button';

// Types
import type { ErrorComponentProps } from '@tanstack/react-router';

/**
 * Root level error boundary to catch errors in the component tree.
 */
function CatchBoundary(props: ErrorComponentProps) {
  const { error } = props;

  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mb-6 flex justify-center"
        >
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-10 w-10 text-red-500" />
            </div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-red-100/50"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="mb-3 text-2xl font-bold text-gray-900">
            Something Went Wrong
          </h1>
          <p className="text-muted-foreground mb-6 text-base">
            We encountered an unexpected error. Don't worry, our team has been
            notified and is working on it.
          </p>

          {isDevelopment && error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-6 overflow-hidden rounded-xl border border-red-200 bg-red-50 p-4 text-left"
            >
              <div className="mb-2 flex items-center gap-2">
                <Bug className="h-4 w-4 text-red-600" />
                <span className="text-sm font-semibold text-red-700">
                  Error Details
                </span>
              </div>
              <pre className="overflow-x-auto text-xs text-red-600">
                {error.message || 'Unknown error'}
              </pre>
              {error.stack && (
                <details className="mt-2">
                  <summary className="cursor-pointer text-xs text-red-500 hover:text-red-700">
                    Stack trace
                  </summary>
                  <pre className="mt-2 max-h-40 overflow-auto text-xs text-red-400">
                    {error.stack}
                  </pre>
                </details>
              )}
            </motion.div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="h-11 rounded-xl border-gray-300 px-6"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
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

export default memo(CatchBoundary);
