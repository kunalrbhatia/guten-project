import React from 'react';
import JSZip from 'jszip';
import IndividualBook from 'components/IndividualBook/IndividualBook';

interface Book {
  id: number;
  authors: Author[];
  formats: BookFormats;
  title: string;
}

interface BookShelfProps {
  books: Book[];
}

interface BookFormats {
  [key: string]: string;
}

const BookShelf: React.FC<BookShelfProps> = ({ books }) => {
  const openBookInBrowser = async (bookFormats: BookFormats): Promise<void> => {
    const preferredFormats: string[] = [
      'text/html',
      'application/pdf',
      'text/plain; charset=us-ascii',
    ];

    for (const format of preferredFormats) {
      if (bookFormats[format] && !isZipFormat(bookFormats[format])) {
        window.open(bookFormats[format], '_blank');
        return;
      }
    }

    const availableFormats: string[] = Object.values(bookFormats).filter(
      (format) => !isZipFormat(format)
    );

    if (availableFormats.length > 0) {
      window.open(availableFormats[0], '_blank');
    } else {
      try {
        const htmlFile = await readHtmlFromZip(
          bookFormats['application/octet-stream']
        );
        if (htmlFile) {
          displayHtmlContent(htmlFile, bookFormats['image/jpeg']);
        } else {
          alert('No valid viewable formats available for the book.');
        }
      } catch (error) {
        console.error('Error reading and displaying zip:', error);
        alert('Error reading and displaying zip.');
      }
    }
  };

  const isZipFormat = (url: string): boolean => {
    return url.toLowerCase().endsWith('.zip');
  };

  const readHtmlFromZip = async (zipUrl: string): Promise<string | null> => {
    try {
      const response = await fetch(zipUrl);
      const zipData = await response.arrayBuffer();
      const zip = await JSZip.loadAsync(zipData);
      const htmlFile = await zip.file('index.html')?.async('text');
      return htmlFile || null;
    } catch (error) {
      console.error('Error reading HTML from zip:', error);
      return null;
    }
  };

  const displayHtmlContent = (
    htmlContent: string | null,
    imageUrl: string | undefined
  ): void => {
    const displayWindow = window.open();
    if (htmlContent) {
      displayWindow?.document.write(htmlContent);
      const images = displayWindow?.document.getElementsByTagName('img');
      if (images && imageUrl) {
        for (const img of images) {
          const src = new URL(img.src, imageUrl).href;
          img.src = src;
        }
      }
    } else {
      console.error('HTML content not found in the zip file.');
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
