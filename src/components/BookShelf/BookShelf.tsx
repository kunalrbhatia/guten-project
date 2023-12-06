import React from 'react';
import IndividualBook from 'components/IndividualBook/IndividualBook';

interface BookShelfProps {
  books: Book[];
}
interface BookFormats {
  [key: string]: string;
}

const BookShelf: React.FC<BookShelfProps> = ({ books }) => {
  const openBookInBrowser = (bookFormats: BookFormats) => {
    const preferredFormats = [
      'text/html',
      'application/pdf',
      'text/plain; charset=us-ascii',
    ];

    for (const format of preferredFormats) {
      if (bookFormats[format]) {
        window.open(bookFormats[format], '_blank');
        return;
      }
    }
    const availableFormats = Object.values(bookFormats);
    if (availableFormats.length > 0) {
      window.open(availableFormats[0], '_blank');
    } else {
      alert('No valid formats available for the book.');
    }
  };
  return (
    <div className="container mx-auto mt-8 bg-gutenLightGrey p-4 align-middle justify-center">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2 auto-cols-min justify-center items-center">
        {books.map((book) => (
          <div key={book.id} className="w-[112px]">
            <IndividualBook
              onClick={() => {
                openBookInBrowser(book.formats);
              }}
              id={book.id}
              authors={book.authors}
              cover={book.formats['image/jpeg']}
              title={book.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookShelf;
