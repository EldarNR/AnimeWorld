export interface Root {
  list: List[];
  pagination: Pagination;
}

export interface List {
  id: number;
  title: string;
  preview: Preview;
  youtube_id: string;
  comments: number;
  views: number;
  timestamp: number;
}

export interface Preview {
  src: string;
  thumbnail: string;
}

export interface Pagination {
  pages: number;
  current_page: number;
  items_per_page: number;
  total_items: number;
}
