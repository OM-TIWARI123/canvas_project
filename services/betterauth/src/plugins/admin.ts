import { admin } from 'better-auth/plugins';

export default function adminPlugin() {
  return admin({
    adminRoles: ['admin'],
  });
}
