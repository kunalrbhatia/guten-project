interface Author {
  name: string;
  birth_year: number;
  death_year: number;
}

interface Book {
  id: number;
  title: string;
  authors: Author[];
  translators: any[]; // You might want to define a type for translators if needed
  subjects: string[];
  bookshelves: string[];
  languages: string[];
  copyright: boolean;
  media_type: string;
  formats: {
    [key: string]: string; // Dynamic keys for various formats
    'image/jpeg'?: string; // Optional cover image field
  };
  download_count: number;
}
