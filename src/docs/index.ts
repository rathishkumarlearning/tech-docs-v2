export interface Doc {
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  readTime: string;
  source: string;
  category: string;
  tags: string[];
  accent?: string;
  sections: {
    id: number;
    title: string;
    duration: string;
    content: string;
  }[];
}

import { figmaDesignSystem } from './figma-design-system'

export const docs: Doc[] = [figmaDesignSystem]

export function getDoc(slug: string): Doc | undefined {
  return docs.find(d => d.slug === slug)
}
