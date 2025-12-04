export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  price?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  date: string;
  author: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  content: string;
  rating: number;
}

export interface ThemeSettings {
  mode: 'light' | 'dark';
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  font: string;
  layout: 'boxed' | 'wide' | 'full';
  cursor: 'default' | 'circle' | 'dot';
  buttonStyle: 'rounded' | 'sharp' | 'pill';
  animationsEnabled: boolean;
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  logoText: string;
  facebook: string;
  twitter: string;
  linkedin: string;
  instagram: string;
}

export interface SiteContent {
  home: {
    heroTitle: string;
    heroSubtitle: string;
    heroImage: string;
    stats: { label: string; value: string }[];
  };
  about: {
    story: string;
    mission: string;
    values: string[];
  };
  services: Service[];
  team: TeamMember[];
  blog: BlogPost[];
  testimonials: Testimonial[];
  company: CompanyInfo;
}

export interface AppState {
  theme: ThemeSettings;
  content: SiteContent;
  isAuthenticated: boolean;
}

export type Action =
  | { type: 'SET_THEME'; payload: Partial<ThemeSettings> }
  | { type: 'UPDATE_CONTENT'; payload: Partial<SiteContent> }
  | { type: 'LOGIN' }
  | { type: 'LOGOUT' }
  | { type: 'RESET_DEFAULTS' };
