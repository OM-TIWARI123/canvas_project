// Node Modules
import { memo } from 'react';
import { motion } from 'framer-motion';
import { Check, Gift, Zap, Rocket } from '@repo/ui/lib/icons';

// Components
import { Badge } from '@repo/ui/components/base/badge';
import { Button } from '@repo/ui/components/base/button';

// Utils
import { cn } from '@repo/ui/lib/utils';

// Types
import { type Plan, PlanId } from './plans';

interface PlanCardProps {
  plan: Plan;
  isSelected: boolean;
  onSelect: () => void;
}

function PlanCard({ plan, isSelected, onSelect }: PlanCardProps) {
  const isFree = plan.id === PlanId.FREE;
  const isStarter = plan.id === PlanId.STARTER;
  const isPro = plan.id === PlanId.PRO;

  const Icon = isFree ? Gift : isStarter ? Zap : Rocket;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={cn(
        'relative h-full rounded-xl border transition-all duration-300',
        isSelected
          ? 'border-primary bg-primary/5 ring-primary/20 shadow-xl ring-2'
          : 'border-border bg-card shadow-md hover:shadow-lg',
      )}
    >
      {plan.popular && (
        <div className={cn('absolute -top-3 left-1/2 -translate-x-1/2')}>
          <Badge className="bg-primary text-primary-foreground px-4 py-1 text-sm font-medium shadow-lg">
            Most Popular
          </Badge>
        </div>
      )}

      <div className="p-6">
        <div className="mb-4 flex justify-center">
          <div
            className={cn(
              'flex h-12 w-12 items-center justify-center rounded-xl',
              isFree && 'bg-muted',
              isStarter && 'bg-secondary',
              isPro && 'bg-primary',
            )}
          >
            <Icon
              className={cn(
                'h-6 w-6',
                isFree && 'text-muted-foreground',
                isStarter && 'text-secondary-foreground',
                isPro && 'text-primary-foreground',
              )}
            />
          </div>
        </div>

        <div className="mb-5 text-center">
          <h3 className="text-foreground mb-1 text-xl font-bold">
            {plan.name}
          </h3>
          <p className="text-muted-foreground mb-3 text-sm">
            {plan.description}
          </p>
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-foreground text-3xl font-bold">
              {plan.price === 0 ? 'Free' : `${plan.currency}${plan.price}`}
            </span>
            {plan.price > 0 && (
              <span className="text-muted-foreground text-sm">/month</span>
            )}
          </div>
        </div>

        <div className="mb-5 space-y-2">
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-start gap-2">
              <div
                className={cn(
                  'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full',
                  isFree && 'bg-muted',
                  isStarter && 'bg-secondary/20',
                  isPro && 'bg-primary/20',
                )}
              >
                <Check
                  className={cn(
                    'h-2.5 w-2.5',
                    isFree && 'text-muted-foreground',
                    isStarter && 'text-secondary',
                    isPro && 'text-primary',
                  )}
                />
              </div>
              <p className="text-foreground text-sm">{feature}</p>
            </div>
          ))}
        </div>

        <Button
          variant={isSelected ? 'default' : 'outline'}
          className={cn(
            'w-full transition-all duration-300',
            isSelected &&
              'bg-primary hover:bg-primary-dark text-primary-foreground',
          )}
          onClick={onSelect}
        >
          {isSelected ? 'Selected' : 'Select Plan'}
        </Button>
      </div>
    </motion.div>
  );
}

export default memo(PlanCard);
