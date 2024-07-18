import { UserRes } from './user';
import { UserRole } from './user_role';

export type StoreOwner = UserRes & {
  role: 'STORE_OWNER';
};

// export type StoreOwnerRole = Exclude<
//   UserRole,
//   'SUPERADMIN' | 'STORE_MANAGER' | 'CUSTOMER'
// >;
