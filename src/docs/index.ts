export interface Doc {
  slug: string
  title: string
  description: string
  author: string
  date: string
  readTime: string
  source: string
  category: string
  tags: string[]
  accent?: string
  sections: {
    id: number
    title: string
    duration: string
    content: string
  }[]
}

import { figmaDesignSystem } from './figma-design-system'
import { reactPerformance } from './react-performance'
import { iamFundamentals } from './iam-fundamentals'
import { cssArchitecture } from './css-architecture'

export const docs: Doc[] = [figmaDesignSystem, reactPerformance, iamFundamentals, cssArchitecture]

export function getDoc(slug: string): Doc | undefined {
  return docs.find(d => d.slug === slug)
}
