export interface Quote {
  id: number;
  text: string;
  author: string;
  created_at: string; // backend usually returns ISO string
}
