import { createFileRoute } from '@tanstack/react-router';

import ShopifyConnectHeader from '@/components/onboarding/shopify/shopify-connect-header';
import ShopifyConnectStep from '@/components/onboarding/shopify/shopify-connect';

import { getMetadata } from '@/utils/metadata.util';

export const Route = createFileRoute('/onboarding/(routes)/shopify')({
  component: RouteComponent,
  head: () => getMetadata('/onboarding/shopify'),
});

function RouteComponent() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="container mx-auto rounded-xl bg-white p-10 shadow-xl shadow-gray-900/5 backdrop-blur-sm">
        <ShopifyConnectHeader />
        <div className="mt-8">
          <ShopifyConnectStep />
        </div>
      </div>
    </div>
  );
}
