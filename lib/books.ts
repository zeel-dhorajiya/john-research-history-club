export interface Book {
  id: string;
  title: string;
  slug: string;
  author: string;
  description: string;
  coverImage: string;
  pdfUrl: string;
  pagesCount: number;
  featured: boolean;
  category: string;
  publishedYear: string;
}

export const booksData: Book[] = [
  {
    id: "history-of-the-world-map-by-map",
    title: "History of the World Map by Map",
    slug: "history-of-the-world-map-by-map",
    author: "DK Publishing",
    description: "Explore the human story through world history maps. Trace the rise and fall of empires, major trade routes, battlefields, and civilizational shifts across millennia.",
    coverImage: "/hero_ancient_egypt.png",
    pdfUrl: "/books/history-of-the-world-map-by-map.pdf",
    pagesCount: 440,
    featured: true,
    category: "World History",
    publishedYear: "2018"
  }
];

export function getAllBooks(): Book[] {
  return booksData;
}

export function getFeaturedBooks(): Book[] {
  return booksData.filter((b) => b.featured);
}

export function getBookBySlug(slug: string): Book | undefined {
  return booksData.find((b) => b.slug === slug);
}
