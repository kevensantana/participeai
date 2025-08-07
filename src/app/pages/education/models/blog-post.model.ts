export interface BlogPost {
date: any;
image: any;
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string | Author;
  category: Category;
  tags: string[];
  publishedAt: Date;
  updatedAt: Date;
  readTime: string;
  views: number;
  likes: number;
  comments: number;
  featured: boolean;
  imageUrl: string;
  status: 'draft' | 'published' | 'archived';
}

export interface Author {
  [x: string]: any;
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  role: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
  description?: string;
  icon: string;
}

export interface Comment {
  id: string;
  postId: string;
  author: string;
  email: string;
  content: string;
  createdAt: Date;
  approved: boolean;
  parentId?: string;
}

export interface BlogFilters {
  search?: string;
  category?: string;
  tags?: string[];
  author?: string;
  dateFrom?: Date;
  dateTo?: Date;
  featured?: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface BlogStats {
  totalPosts: number;
  totalCategories: number;
  totalViews: number;
  totalComments: number;
}