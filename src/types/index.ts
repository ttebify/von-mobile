export interface User {
  author_name: string;
  author_email: string;
}

export interface Comment {
  id: number;
  post: number;
  parent: number;
  author_name: string;
  date: string;
  content: {
    rendered: string;
  };
  status: string;
  type: string;
  author_avatar_urls: {
    "24": string;
    "48": string;
    "96": string;
  };
}
