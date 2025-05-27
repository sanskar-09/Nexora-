import api from './api';

// Types
export interface Article {
  _id?: string;
  title: string;
  content: string;
  summary: string;
  author: string | { _id: string; name: string };
  category: string;
  tags?: string[];
  featuredImage?: string;
  published?: boolean;
  viewCount?: number;
  likes?: number;
  references?: {
    title: string;
    url: string;
  }[];
  relatedArticles?: string[] | Article[];
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface Category {
  id: string;
  name: string;
}

export interface ArticlePagination {
  articles: Article[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
}

// Health education services
const educationService = {
  // Get all articles
  getArticles: async (category?: string, page = 1, limit = 10): Promise<ArticlePagination> => {
    let url = `/education/articles?page=${page}&limit=${limit}`;
    
    if (category) {
      url += `&category=${category}`;
    }
    
    const response = await api.get(url);
    return response.data;
  },
  
  // Get article by ID
  getArticleById: async (id: string): Promise<Article> => {
    const response = await api.get(`/education/articles/${id}`);
    return response.data;
  },
  
  // Create new article
  createArticle: async (articleData: Omit<Article, '_id' | 'author' | 'viewCount' | 'likes' | 'createdAt' | 'updatedAt'>): Promise<Article> => {
    const response = await api.post('/education/articles', articleData);
    return response.data;
  },
  
  // Update article
  updateArticle: async (id: string, articleData: Partial<Article>): Promise<Article> => {
    const response = await api.put(`/education/articles/${id}`, articleData);
    return response.data;
  },
  
  // Delete article
  deleteArticle: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete(`/education/articles/${id}`);
    return response.data;
  },
  
  // Get article categories
  getCategories: async (): Promise<Category[]> => {
    const response = await api.get('/education/categories');
    return response.data;
  },
  
  // Search articles
  searchArticles: async (query: string, page = 1, limit = 10): Promise<ArticlePagination> => {
    const response = await api.get(`/education/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`);
    return response.data;
  }
};

export default educationService;
