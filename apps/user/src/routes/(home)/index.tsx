import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/(home)/')({
  beforeLoad: async function () {
    throw redirect({ to: '/login' });
  },
  component: function () {
    return null;
  },
});
