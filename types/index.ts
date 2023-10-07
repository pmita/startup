export type SVGPropType = {
  width?: string;
  height?: string;
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