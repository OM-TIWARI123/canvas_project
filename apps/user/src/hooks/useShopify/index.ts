import { useCallback, useState } from 'react';

export function useShopify() {
  const [isInstalling, setIsInstalling] = useState(false);

  const initiateInstall = useCallback(() => {
    setIsInstalling(true);

    const installUrl = import.meta.env.VITE_SHOPIFY_INSTALL_URL;

    window.location.href = installUrl;
  }, []);

  return {
    initiateInstall,
    isInstalling,
  };
}
