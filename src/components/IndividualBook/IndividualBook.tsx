import React, { useState } from 'react';
import { get, startCase, upperCase } from 'lodash';
import './IndividualBook.styles.css';

interface Book {
  id: number;
  title: string;
  authors: Author[];
  cover: string | undefined;
  onClick: () => void;
}

const IndividualBook: React.FC<Book> = ({
  id,
  title,
  authors,
  cover,
  onClick,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  let author = null;
  if (Array.isArray(authors) && authors.length > 0) {
    author = get(authors, '0', null) || null;
  }

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div key={id} onClick={onClick} className="cursor-pointer" title={title}>
      {cover && (
        <div
          className={`w-[114px] h-[162px] mb-2 relative overflow-hidden rounded-[8px] custom-shadow`}
        >
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
            </div>
          )}
          <img
            src={cover}
            alt={`${title} Cover`}
            className={`w-full h-full object-cover ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleImageLoad}
          />
        </div>
      )}
      <h3 className="text-extraSmall font-Montserrat-Regular mb-1 truncate">
        {upperCase(title)}
      </h3>
      {author && (
        <p className="text-gutenDarkGrey text-extraSmall font-Montserrat-Regular">
          {startCase(author.name)}
        </p>
      )}
    </div>
  );
};

export default IndividualBook;
