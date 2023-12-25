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
  CUSTOMER_SUBSCRIPTION_CREATED = 'customer.subscription.created',
  CUSTOMER_SUBSCRIPTION_UPDATED = 'customer.subscription.updated',
  CUSTOMER_SUBSCRIPTION_DELETED = 'customer.subscription.deleted',
  INVOICE_PAID = 'invoice.paid',
  INVOICE_PAYMENT_SUCCEEDED = 'invoice.payment_succeeded',
  INVOICE_PAYMENT_FAILED = 'invoice.payment_failed',
  // INVOICE_PAYMENT_ACTION_REQUIRED = 'invoice.payment_action_required', when 3DS authentication is required
  // CHECKOUT_SESSION_ASYNC_PAYMENT_SUCCESS = 'checkout.session.async_payment_succeeded', use this for single purchases
  // CHECKOUT_SESSION_COMPLETED = 'checkout.session.completed', same
}

export enum StripeWebhookSubscirptionEvents {
  CUSTOMER_SUBSCRIPTION_CREATED = 'customer.subscription.created',
  CUSTOMER_SUBSCRIPTION_UPDATED = 'customer.subscription.updated',
  CUSTOMER_SUBSCRIPTION_DELETED = 'customer.subscription.deleted',
}

// FIREBASE
/*
  The following are the main subscrition status types that we track from Stripe
*/
export enum PRO_STATUS {
  LIFE_TIME = 'lifetime',
  ACTIVE = 'active',
  PAST_DUE = 'past_due',
  CANCELED = 'canceled',
  UNPAID = 'unpaid',
}

export interface UserData {
  email?: string;
  uid?: string;
  displayName?: string;
  photoURL?: string;
  joined?: number;
  stripeCustomerId?: string;
  isPro?: boolean;
  expires?: number;
  proStatus?: PRO_STATUS;
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