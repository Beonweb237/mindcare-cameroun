export interface Professional {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  languages: string[];
  experience: number;
  rating: number;
  reviews: number;
  image: string;
  availability: string;
  pricePerSession: number;
  bio: string;
  verified: boolean;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'podcast' | 'meditation';
  category: string;
  image: string;
  duration?: string;
  author: string;
  date: string;
  readTime?: string;
}

export interface TestQuestion {
  id: number;
  text: string;
  options: { value: number; label: string }[];
}

export interface TestResult {
  score: number;
  maxScore: number;
  severity: string;
  description: string;
  recommendation: string;
}

export interface CommunityTopic {
  id: string;
  title: string;
  description: string;
  icon: string;
  memberCount: number;
  postCount: number;
  lastActivity: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  mood: number;
  emotions: string[];
  note: string;
  energy: number;
  sleep: number;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
  cta: string;
}
