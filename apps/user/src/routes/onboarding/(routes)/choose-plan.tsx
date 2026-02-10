// Node Modules
import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { createFileRoute } from '@tanstack/react-router';
import { Loader2 } from '@repo/ui/lib/icons';

// Components
import { Button } from '@repo/ui/components/base/button';
import PaymentHeader from '@/components/onboarding/choose-plan/payment-header';
import PlanCard from '@/components/onboarding/choose-plan/plan-card';

// Hooks
import { usePayment } from '@/hooks/usePayment';

// Types/Utils
import { getMetadata } from '@/utils/metadata.util';
import { plans, PlanId } from '@/components/onboarding/choose-plan/plans';

export const Route = createFileRoute('/onboarding/(routes)/choose-plan')({
  component: RouteComponent,
  head: () => getMetadata('/onboarding/choose-plan'),
});

function RouteComponent() {
  const { upgradeMutation } = usePayment();

  const [selectedPlanId, setSelectedPlanId] = useState<PlanId>(PlanId.STARTER);

  const handlePlanSelect = useCallback((planId: PlanId) => {
    setSelectedPlanId(planId);
  }, []);

  const handlePayment = useCallback(() => {
    upgradeMutation.mutate({
      plan: selectedPlanId,
    });
  }, [upgradeMutation, selectedPlanId]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.1,
        delay: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 200,
        damping: 20,
      },
    },
  };

  return (
    <div className="bg-background min-h-screen px-4 py-8">
      <div className="bg-card border-border container mx-auto rounded-xl border p-10 shadow-xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div variants={itemVariants}>
            <PaymentHeader />
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="mx-auto max-w-5xl">
              <div className="grid gap-6 md:grid-cols-3">
                {plans.map((plan, index) => (
                  <motion.div
                    key={plan.id}
                    variants={itemVariants}
                    transition={{ delay: 0.1 * index }}
                  >
                    <PlanCard
                      plan={plan}
                      isSelected={selectedPlanId === plan.id}
                      onSelect={() => handlePlanSelect(plan.id)}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="flex justify-center">
              <Button
                className="bg-primary hover:bg-primary-dark text-primary-foreground px-10 py-3 font-semibold shadow-lg transition-all duration-300 hover:shadow-xl"
                size="lg"
                onClick={handlePayment}
                disabled={upgradeMutation.isPending}
              >
                {upgradeMutation.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {selectedPlanId === PlanId.FREE
                  ? 'Continue with Free'
                  : 'Proceed to Payment'}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
