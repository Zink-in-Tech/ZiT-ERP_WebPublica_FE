export interface Author {
    name: string;
    slug: string;
    imageUrl: string;
    bio: any[];
  }
  
  export interface Category {
    title: string;
    slug: string;
  }
  
  export interface PostSummary {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  mainImageUrl: string;
  author: { name: string; slug: string; imageUrl: string; bio?: string };
  categories: Category[];
}
  
  export interface PostDetail extends PostSummary {
    body: any[];
    description?: string | null;
    _updatedAt?: string;
    mainImage?: { asset?: { _ref?: string }; crop?: unknown; hotspot?: unknown } | null;
  }
  