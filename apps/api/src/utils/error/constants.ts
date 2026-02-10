export const ErrorName = {
  NOT_FOUND: 'Resource Not Found',
  FORBIDDEN: 'Access Denied',
  UNAUTHORIZED: 'Authentication Required',
  BAD_REQUEST: 'Invalid Request',
  VALIDATION: 'Invalid Input',
  CONFLICT: 'Resource Already Exists',
  INTERNAL_SERVER: 'Something Went Wrong',

  INSUFFICIENT_STOCK: 'Insufficient Stock',
  INVALID_ITEM_LOCATION: 'Invalid Item Location',
  INVALID_ITEM_STATUS: 'Invalid Item Status',
} as const;

export type ErrorName = keyof typeof ErrorName;
