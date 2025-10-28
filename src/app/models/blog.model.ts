export interface Blog {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
}
export interface CreateBlogDto {
  title: string;
  content: string;
}