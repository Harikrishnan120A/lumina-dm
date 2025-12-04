import { AppState } from './types';

export const DEFAULT_THEME: AppState['theme'] = {
  mode: 'light',
  primaryColor: '#3B82F6', // Blue-500
  secondaryColor: '#1E40AF', // Blue-800
  accentColor: '#F59E0B', // Amber-500
  font: 'Inter',
  layout: 'wide',
  cursor: 'default',
  buttonStyle: 'rounded',
  animationsEnabled: true,
};

export const DEFAULT_CONTENT: AppState['content'] = {
  home: {
    heroTitle: "Transform Your Digital Presence",
    heroSubtitle: "We deliver cutting-edge digital marketing solutions that drive growth and engagement for forward-thinking brands.",
    heroImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=2000",
    stats: [
      { label: "Projects Completed", value: "500+" },
      { label: "Happy Clients", value: "120+" },
      { label: "Awards Won", value: "25" },
      { label: "Team Members", value: "15" }
    ]
  },
  about: {
    story: "Founded in 2020, Lumina Digital began with a simple mission: to help businesses navigate the complex digital landscape. We started as a small team of three passionate marketers and have grown into a full-service agency.",
    mission: "To empower brands with innovative digital strategies that create meaningful connections and sustainable growth.",
    values: ["Innovation", "Transparency", "Results-Driven", "Client-Centric"]
  },
  company: {
    name: "Lumina Digital",
    tagline: "Illuminating Your Brand",
    description: "A premier digital marketing agency based in New York.",
    address: "123 Marketing Street, NY 10001",
    phone: "+1 (555) 123-4567",
    email: "hello@luminadigital.com",
    logoText: "Lumina.",
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
  },
  services: [
    {
      id: "1",
      title: "SEO Optimization",
      description: "Boost your organic traffic and rank higher on search engines with our data-driven SEO strategies.",
      icon: "Search",
      price: "$999/mo"
    },
    {
      id: "2",
      title: "Social Media Marketing",
      description: "Engage your audience and build brand loyalty across all major social platforms.",
      icon: "Share2",
      price: "$1,499/mo"
    },
    {
      id: "3",
      title: "Content Strategy",
      description: "Compelling content that tells your story and converts visitors into loyal customers.",
      icon: "FileText",
      price: "$899/mo"
    },
    {
      id: "4",
      title: "PPC Advertising",
      description: "Targeted ad campaigns that deliver immediate results and high ROI.",
      icon: "MousePointer",
      price: "$2,000/mo"
    },
    {
      id: "5",
      title: "Email Marketing",
      description: "Personalized email campaigns that nurture leads and drive retention.",
      icon: "Mail",
      price: "$599/mo"
    },
    {
      id: "6",
      title: "Web Analytics",
      description: "Deep insights into user behavior to optimize your digital performance.",
      icon: "BarChart",
      price: "$799/mo"
    }
  ],
  team: [
    {
      id: "1",
      name: "Sarah Johnson",
      role: "CEO & Founder",
      bio: "10+ years in digital strategy.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: "2",
      name: "Michael Chen",
      role: "Creative Director",
      bio: "Award-winning designer.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: "3",
      name: "Jessica Williams",
      role: "Head of SEO",
      bio: "Search algorithm expert.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: "4",
      name: "David Miller",
      role: "Tech Lead",
      bio: "Full-stack wizard.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400"
    },
     {
      id: "5",
      name: "Emma Wilson",
      role: "Content Strategist",
      bio: "Storyteller at heart.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: "6",
      name: "James Taylor",
      role: "PPC Specialist",
      bio: "ROI focused marketer.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: "7",
      name: "Olivia Brown",
      role: "Social Media Manager",
      bio: "Trend spotter.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: "8",
      name: "Robert Davis",
      role: "Account Manager",
      bio: "Client success champion.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400"
    }
  ],
  testimonials: [
    {
      id: "1",
      name: "John Doe",
      company: "Tech Startups Inc.",
      content: "Lumina transformed our online presence. Our leads tripled in 3 months!",
      rating: 5
    },
    {
      id: "2",
      name: "Jane Smith",
      company: "Fashion Forward",
      content: "The creative team is outstanding. They truly understood our brand vision.",
      rating: 5
    },
    {
      id: "3",
      name: "Bob Wilson",
      company: "Local Eats",
      content: "Professional, responsive, and effective. Highly recommended.",
      rating: 4
    }
  ],
  blog: [
    {
      id: "1",
      title: "The Future of SEO in 2024",
      excerpt: "Discover the latest trends shaping the search landscape this year.",
      content: "Full article content goes here...",
      category: "SEO",
      date: "2023-10-15",
      author: "Jessica Williams",
      image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "2",
      title: "Mastering Social Media Algorithms",
      excerpt: "How to get your content seen by more people without paying for ads.",
      content: "Full article content goes here...",
      category: "Social Media",
      date: "2023-10-12",
      author: "Olivia Brown",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "3",
      title: "Content Marketing 101",
      excerpt: "Building a strategy that drives engagement and loyalty.",
      content: "Full article content goes here...",
      category: "Content",
      date: "2023-10-10",
      author: "Emma Wilson",
      image: "https://images.unsplash.com/photo-1499750310159-52f0f834631e?auto=format&fit=crop&q=80&w=800"
    }
  ]
};

export const INITIAL_STATE: AppState = {
  theme: DEFAULT_THEME,
  content: DEFAULT_CONTENT,
  isAuthenticated: false,
};
