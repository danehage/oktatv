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
    id: 'trainings',
    name: 'Training Sessions',
    description: 'Professional development and skills training',
    color: 'okta-blue'
  },
  {
    id: 'townhalls',
    name: 'Town Halls',
    description: 'Company updates and announcements',
    color: 'okta-green'
  },
  {
    id: 'onboarding',
    name: 'Onboarding',
    description: 'New employee orientation and welcome sessions',
    color: 'primary'
  },
  {
    id: 'leadership',
    name: 'Leadership Talks',
    description: 'Insights from company leadership',
    color: 'destructive'
  },
  {
    id: 'product',
    name: 'Product Updates',
    description: 'Latest product features and roadmap',
    color: 'secondary'
  }
];

export const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Q4 2024 All Hands Meeting',
    description: 'Join CEO Todd McKinnon for our quarterly company update covering key achievements, future strategy, and Q&A session.',
    vimeoId: '123456789',
    thumbnail: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=450&fit=crop',
    duration: '45:30',
    category: categories[1],
    tags: ['quarterly', 'ceo', 'strategy'],
    publishedAt: '2024-01-15',
    views: 1247,
    presenter: 'Todd McKinnon',
    department: 'Executive'
  },
  {
    id: '2',
    title: 'Identity Security Best Practices',
    description: 'Learn the latest in identity security practices and how to implement zero trust architecture in your organization.',
    vimeoId: '987654321',
    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=450&fit=crop',
    duration: '32:15',
    category: categories[0],
    tags: ['security', 'identity', 'best practices'],
    publishedAt: '2024-01-12',
    views: 856,
    presenter: 'Sarah Johnson',
    department: 'Security'
  },
  {
    id: '3',
    title: 'Welcome to Okta: New Employee Orientation',
    description: 'A comprehensive introduction to Okta culture, values, and what makes our company special.',
    vimeoId: '456789123',
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=450&fit=crop',
    duration: '28:45',
    category: categories[2],
    tags: ['onboarding', 'culture', 'welcome'],
    publishedAt: '2024-01-10',
    views: 432,
    presenter: 'HR Team',
    department: 'Human Resources'
  },
  {
    id: '4',
    title: 'Customer Identity Platform Deep Dive',
    description: 'Technical deep dive into Okta\'s Customer Identity platform features and implementation strategies.',
    vimeoId: '789123456',
    thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=450&fit=crop',
    duration: '52:20',
    category: categories[4],
    tags: ['product', 'technical', 'customer identity'],
    publishedAt: '2024-01-08',
    views: 673,
    presenter: 'Mike Chen',
    department: 'Product'
  },
  {
    id: '5',
    title: 'Building Resilient Teams',
    description: 'Leadership insights on building and maintaining high-performing, resilient teams in today\'s work environment.',
    vimeoId: '321654987',
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=450&fit=crop',
    duration: '41:10',
    category: categories[3],
    tags: ['leadership', 'teams', 'management'],
    publishedAt: '2024-01-05',
    views: 891,
    presenter: 'Jessica Williams',
    department: 'Leadership'
  },
  {
    id: '6',
    title: 'API Security Workshop',
    description: 'Hands-on workshop covering API security fundamentals and Okta\'s API Access Management solutions.',
    vimeoId: '654987321',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=450&fit=crop',
    duration: '38:25',
    category: categories[0],
    tags: ['api', 'security', 'workshop'],
    publishedAt: '2024-01-03',
    views: 524,
    presenter: 'David Rodriguez',
    department: 'Engineering'
  }
];

export const featuredVideo: FeaturedVideo = {
  ...mockVideos[0],
  isFeatured: true,
  heroImage: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920&h=1080&fit=crop',
  shortDescription: 'Join CEO Todd McKinnon for our quarterly company update covering key achievements and future strategy.'
};
