export interface Book {
  id: string | number;       // keep as string since you use it that way
  title: string;
  author: string;
  price: number;
  img: string;      // you already use "img" for cover image
  category: string;
  quantity?: number;


  // New optional fields
  rating?: number;
  views?: number;
  description?: string;
}
