import { Link, useParams } from 'react-router-dom';
import { capitalize } from 'lodash';
import BackIcon from 'assets/images/svg/Back.svg';
import getTranslation from 'utils/common';
import { useTranslation } from 'react-i18next';
import SearchBar from 'components/SearchBar/SearchBar';
import { useEffect, useState } from 'react';
import { BASE_URL } from 'utils/constants';
import BookShelf from 'components/BookShelf/BookShelf';
import FullPagePreloader from 'components/FullPagePreloader/FullPagePreloader';
const DetailHeader = () => {
  const { t } = useTranslation();
  const { title } = useParams();
  const capitalizeTitle = capitalize(t(getTranslation(title ? title : '')));
  const [books, setBooks] = useState<Book[] | null>(null);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [isShowLoader, setIsShowLoader] = useState<boolean>(false);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        let response;
        if (title) {
          setIsShowLoader(true);
          response = await fetch(
            `${BASE_URL}/books?topic=${title}&mime_type=image%2Fjpeg`
          );
        }
        if (searchTerm) {
          setIsShowLoader(true);
          response = await fetch(
            `${BASE_URL}/books?search=${searchTerm}&mime_type=image%2Fjpeg`
          );
        }
        if (response) {
          setIsShowLoader(false);
          const data = await response.json();
          setBooks(data.results);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchBooks();
  }, [title, searchTerm]);
  useEffect(() => {
    console.log(books);
  }, [books]);
  return (
    <>
      <div className="flex items-center justify-between p-4 bg-white mb-4">
        <Link to="/" className="flex items-center text-gutenBlue">
          <img src={BackIcon} alt="Back" className="w-4 h-4 mr-2" />
          <div className="font-Montserrat-SemiBold text-medium">
            {capitalizeTitle}
          </div>
        </Link>
      </div>
      <SearchBar
        onSearch={(value) => {
          setSearchTerm(value);
        }}
      />
      {isShowLoader && <FullPagePreloader />}
      {Array.isArray(books) && books.length > 0 && <BookShelf books={books} />}
    </>
  );
};

export default DetailHeader;
