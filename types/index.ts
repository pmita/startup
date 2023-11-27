// SVG
export type SVGPropType = {
  width?: string | number;
  height?: string | number;
  fill?: string;
  onClick?: () => void;
}

// Nav
export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
  icon?: React.ReactNode;
}

// STRIPE
export enum ProductPurchaseType {
  RECURRING = 'recurring',
  ONE_TIME = 'one-time'
}

export enum StripeWebhookEvents {
  PRODUCT_CREATED = 'product.created',
  PRODUCT_UPDATED = 'product.updated',
  PRICE_CREATED = 'price.created',
  PRICE_UPDATED = 'price.updated',
  CUSTOMER_SUBSCRIPTION_CREATED = 'customer.subscription.created',
  CUSTOMER_SUBSCRIPTION_UPDATED = 'customer.subscription.updated',
  CUSTOMER_SUBSCRIPTION_DELETED = 'customer.subscription.deleted',
  INVOICE_PAID = 'invoice.paid',
  INVOICE_PAYMENT_SUCCEEDED = 'invoice.payment_succeeded',
  INVOICE_PAYMENT_FAILED = 'invoice.payment_failed',
  INVOICE_UPCOMING = 'invoice.upcoming',
  INVOICE_MARKED_UNCOLLECTIBLE = 'invoice.marked_uncollectible',
  INVOICE_PAYMENT_ACTION_REQUIRED = 'invoice.payment_action_required',
}

export enum StripeWebhookSubscirptionEvents {
  CUSTOMER_SUBSCRIPTION_CREATED = 'customer.subscription.created',
  CUSTOMER_SUBSCRIPTION_UPDATED = 'customer.subscription.updated',
  CUSTOMER_SUBSCRIPTION_DELETED = 'customer.subscription.deleted',
}

// FIREBASE
export enum PRO_STATUS {
  BASIC = 'BASIC',
  PRO = 'PRO',
  LIFE_TIME = 'LIFE_TIME',
  EXPIRING='EXPIRING',
  CANCELLED = 'CANCELLED',
  PAST_DUE = 'PAST_DUE',
}

export interface UserData {
  email?: string;
  uid?: string;
  displayName?: string;
  photoURL?: string;
  joined?: number;
  stripeCustomerId?: string;
  is_pro?: boolean;
  expires?: number;
  pro_status?: PRO_STATUS;
  subscriptions?: {
    [key: string]: string;
  },
  courses?: {
    [key: string]: string;
  }
}

// API
export interface FetchFromApiOptions {
  method?: string;
  body?: any;
}