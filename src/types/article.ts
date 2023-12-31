export interface Article {
  title: string;
  content: string;
  category?: string;
  hidden?: boolean;
  path: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ArticleListParams {
  page: number;
  pageSize: number;
}
