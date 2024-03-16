import { Timestamp } from "firebase-admin/firestore";

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
  CHECKOUT_SESSION_COMPLETED = 'checkout.session.completed',
}

export enum StripeWebhookSubscirptionEvents {
  CUSTOMER_SUBSCRIPTION_CREATED = 'customer.subscription.created',
  CUSTOMER_SUBSCRIPTION_UPDATED = 'customer.subscription.updated',
  CUSTOMER_SUBSCRIPTION_DELETED = 'customer.subscription.deleted',
}

// FIREBASE
export type FirestoreOperator = '<' | '<=' | '==' | '>=' | '>' | 'array-contains';
export type FirestoreOrderByDirection = 'asc' | 'desc';
export type FirestoreOrderBy = [string, FirestoreOrderByDirection];
export type FirestoreQuery = [string, FirestoreOperator, any];

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

export interface UserInvoiceDocument {
  id: string;
  amount_paid?: number;
  paid?: boolean;
  status?: string;
  created?: Timestamp;
}

// API
export interface FetchFromApiOptions {
  method?: string;
  body?: any;
  cache?: string;
}

export interface AvatarProps {
  src: string | undefined | null;
  width: number;
  height: number;
  altText?: string;
}

export interface ImageWithFallbackProps {
  src: string | null | undefined;
  fallbackSrc: string;
  width?: number;
  height?: number;
  altText?: string;
  layout?: "fixed" | "intrinsic" | "responsive" | "fill";
  objectFit?: "fill" | "contain" | "cover" | "none" | "scale-down";
  sizes?: string;
  style?: React.CSSProperties;
}