// Node Modules
import { memo, useCallback } from 'react';

// Components
import ShopifyConnectForm from './shopify-connect-form';

// Hooks
import { useShopify } from '@/hooks/useShopify';

function ShopifyConnectStep() {
  const { initiateInstall, isInstalling } = useShopify();

  const handleInstall = useCallback(() => {
    initiateInstall();
  }, [initiateInstall]);

  return (
    <ShopifyConnectForm isConnecting={isInstalling} onInstall={handleInstall} />
  );
}

export default memo(ShopifyConnectStep);
