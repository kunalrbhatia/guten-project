import React from 'react';
import { get, startCase, upperCase } from 'lodash';
import './IndividualBook.styles.css';
interface Book {
  id: number;
  title: string;
  authors: Author[];
  cover: string | undefined;
  onClick: () => void;
}
const IndividualBook = ({ id, title, authors, cover, onClick }: Book) => {
  let author = null;
  if (Array.isArray(authors) && authors.length > 0) {
    author = get(authors, '0', null) || null;
  }
  return (
    <div key={id} onClick={onClick} className="cursor-pointer" title={title}>
      {cover && (
        <img
          src={cover}
          alt={`${title} Cover`}
          className="mb-2 w-[114px] h-[162px] object-cover rounded-[8px] custom-shadow"
        />
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
