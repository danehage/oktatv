export interface Video {
  id: string;
  title: string;
  description: string;
  vimeoId: string;
  thumbnail: string;
  duration: string;
  category: VideoCategory;
  tags: string[];
  publishedAt: string;
  views: number;
  presenter?: string;
  department?: string;
}

export interface VideoCategory {
  id: string;
  name: string;
  description: string;
  color: string;
}

export interface FeaturedVideo extends Video {
  isFeatured: true;
  heroImage: string;
  shortDescription: string;
}

export const categories: VideoCategory[] = [
  {
    id: "trainings",
    name: "Training Sessions",
    description: "Professional development and skills training",
    color: "okta-blue",
  },
  {
    id: "townhalls",
    name: "Town Halls",
    description: "Company updates and announcements",
    color: "okta-green",
  },
  {
    id: "onboarding",
    name: "Onboarding",
    description: "New employee orientation and welcome sessions",
    color: "primary",
  },
  {
    id: "leadership",
    name: "Leadership Talks",
    description: "Insights from company leadership",
    color: "destructive",
  },
  {
    id: "product",
    name: "Product Updates",
    description: "Latest product features and roadmap",
    color: "secondary",
  },
];

export const mockVideos: Video[] = [
  {
    id: "1",
    title: "Q4 2024 All Hands Meeting",
    description:
      "Join CEO Todd McKinnon for our quarterly company update covering key achievements, future strategy, and Q&A session.",
    vimeoId: "1096708225",
    thumbnail:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=450&fit=crop",
    duration: "45:30",
    category: categories[1],
    tags: ["quarterly", "ceo", "strategy"],
    publishedAt: "2024-01-15",
    views: 1247,
    presenter: "Todd McKinnon",
    department: "Executive",
  },
  {
    id: "2",
    title: "Identity Security Best Practices",
    description:
      "Learn the latest in identity security practices and how to implement zero trust architecture in your organization.",
    vimeoId: "1096259913",
    thumbnail:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=450&fit=crop",
    duration: "32:15",
    category: categories[0],
    tags: ["security", "identity", "best practices"],
    publishedAt: "2024-01-12",
    views: 856,
    presenter: "Sarah Johnson",
    department: "Security",
  },
  {
    id: "3",
    title: "Welcome to Okta: New Employee Orientation",
    description:
      "A comprehensive introduction to Okta culture, values, and what makes our company special.",
    vimeoId: "1096259876",
    thumbnail:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=450&fit=crop",
    duration: "28:45",
    category: categories[2],
    tags: ["onboarding", "culture", "welcome"],
    publishedAt: "2024-01-10",
    views: 432,
    presenter: "HR Team",
    department: "Human Resources",
  },
  {
    id: "4",
    title: "Customer Identity Platform Deep Dive",
    description:
      "Technical deep dive into Okta's Customer Identity platform features and implementation strategies.",
    vimeoId: "1096265123",
    thumbnail:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=450&fit=crop",
    duration: "52:20",
    category: categories[4],
    tags: ["product", "technical", "customer identity"],
    publishedAt: "2024-01-08",
    views: 673,
    presenter: "Mike Chen",
    department: "Product",
  },
  {
    id: "5",
    title: "Building Resilient Teams",
    description:
      "Leadership insights on building and maintaining high-performing, resilient teams in today's work environment.",
    vimeoId: "1023285402",
    thumbnail:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=450&fit=crop",
    duration: "41:10",
    category: categories[3],
    tags: ["leadership", "teams", "management"],
    publishedAt: "2024-01-05",
    views: 891,
    presenter: "Jessica Williams",
    department: "Leadership",
  },
  {
    id: "6",
    title: "API Security Workshop",
    description:
      "Hands-on workshop covering API security fundamentals and Okta's API Access Management solutions.",
    vimeoId: "1096259851",
    thumbnail:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=450&fit=crop",
    duration: "38:25",
    category: categories[0],
    tags: ["api", "security", "workshop"],
    publishedAt: "2024-01-03",
    views: 524,
    presenter: "David Rodriguez",
    department: "Engineering",
  },
  {
    id: "7",
    title: "Zero Trust Architecture Implementation",
    description:
      "Comprehensive guide to implementing zero trust security architecture across your organization with Okta solutions.",
    vimeoId: "1103160254",
    thumbnail:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=450&fit=crop",
    duration: "44:15",
    category: categories[0],
    tags: ["zero trust", "architecture", "security"],
    publishedAt: "2024-01-18",
    views: 692,
    presenter: "Alex Thompson",
    department: "Security",
  },
  {
    id: "8",
    title: "Monthly Product Roadmap Update",
    description:
      "Latest updates on Okta product development, upcoming features, and strategic product direction for Q1 2024.",
    vimeoId: "1103161104",
    thumbnail:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop",
    duration: "35:50",
    category: categories[4],
    tags: ["roadmap", "product", "features"],
    publishedAt: "2024-01-20",
    views: 1156,
    presenter: "Rachel Kim",
    department: "Product",
  },
  {
    id: "9",
    title: "Advanced Identity Governance Training",
    description:
      "Deep dive into identity governance concepts, compliance requirements, and best practices for enterprise implementations.",
    vimeoId: "1053808307",
    thumbnail:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=450&fit=crop",
    duration: "58:30",
    category: categories[0],
    tags: ["governance", "compliance", "training"],
    publishedAt: "2024-01-22",
    views: 445,
    presenter: "Maria Santos",
    department: "Training",
  },
  {
    id: "10",
    title: "Leadership Excellence Workshop",
    description:
      "Interactive workshop focused on developing leadership skills, team management, and strategic thinking for Okta managers.",
    vimeoId: "1051277253",
    thumbnail:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=450&fit=crop",
    duration: "49:45",
    category: categories[3],
    tags: ["workshop", "leadership", "management"],
    publishedAt: "2024-01-25",
    views: 723,
    presenter: "David Park",
    department: "Leadership Development",
  },
  {
    id: "11",
    title: "Customer Success Stories & Case Studies",
    description:
      "Inspiring customer success stories showcasing how organizations have transformed their identity strategies with Okta.",
    vimeoId: "1051694947",
    thumbnail:
      "https://images.unsplash.com/photo-1553484771-371a605b060b?w=800&h=450&fit=crop",
    duration: "42:20",
    category: categories[1],
    tags: ["customer success", "case studies", "testimonials"],
    publishedAt: "2024-01-28",
    views: 934,
    presenter: "Jennifer Lee",
    department: "Customer Success",
  },
];

export const featuredVideo: FeaturedVideo = {
  ...mockVideos[0],
  isFeatured: true,
  heroImage:
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920&h=1080&fit=crop",
  shortDescription:
    "Join CEO Todd McKinnon for our quarterly company update covering key achievements and future strategy.",
};
