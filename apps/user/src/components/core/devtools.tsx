// Node Modules
import { TanStackDevtools } from '@tanstack/react-devtools';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';

export const tanstackQueryDevtools = {
  name: 'Tanstack Query',
  render: <ReactQueryDevtoolsPanel />,
};

export const tanstackRouterDevtools = {
  name: 'Tanstack Router',
  render: <TanStackRouterDevtoolsPanel />,
};

/**
 * Devtools component to display TanStack Devtools in development mode.
 */
export default function Devtools() {
  if (import.meta.env.PROD) return null;

  return (
    <TanStackDevtools
      config={{
        position: 'bottom-right',
      }}
      plugins={[tanstackQueryDevtools, tanstackRouterDevtools]}
    />
  );
}
