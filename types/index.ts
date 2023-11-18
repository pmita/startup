export type SVGPropType = {
  width?: string | number;
  height?: string | number;
  fill?: string;
  onClick?: () => void;
}

// FIREBASE
export type CourseDocument = {
  id: string;
  slug: string;
  title: string;
  description: string;
  image?: string;
  hastags?: string[];
  tags?: string[],
  published?: boolean;
}

// Nav
export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
  icon?: React.ReactNode;
}

// Courses
export type CourseChapter = {
  id: string;
  title: string;
  description: string;
  content: string;
  chapter?: number;
}

// STRIPE
export enum ProductPurchaseType {
  RECURRING = 'recurring',
  ONE_TIME = 'one-time'
}