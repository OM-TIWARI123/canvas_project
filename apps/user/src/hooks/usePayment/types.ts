import { ApiData } from '@/utils/types.util';
import { PlanId } from '@/components/onboarding/choose-plan/plans';

export type UpgradeRequest = ApiData<
  {
    plan: PlanId;
  },
  undefined
>;
