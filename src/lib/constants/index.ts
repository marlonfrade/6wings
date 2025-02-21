export const USER_ROLES = {
  ADMIN: 'AD',
  USER: 'US',
  PARCEIRO: 'PA'
} as const

export const USER_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  PENDING: 'PENDING',
  BLOCKED: 'BLOCKED'
} as const

export const USER_PERMISSIONS = {
  READ: 'READ',
  WRITE: 'WRITE',
  DELETE: 'DELETE',
  MANAGE_USERS: 'MANAGE_USERS',
  MANAGE_PRODUCTS: 'MANAGE_PRODUCTS',
  MANAGE_ORDERS: 'MANAGE_ORDERS'
} as const

// Type definitions using the constants
export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES]
export type UserStatus = (typeof USER_STATUS)[keyof typeof USER_STATUS]
export type UserPermission =
  (typeof USER_PERMISSIONS)[keyof typeof USER_PERMISSIONS]
