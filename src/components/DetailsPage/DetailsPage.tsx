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
import { get as _get } from 'lodash';
const DetailHeader = () => {
  const { t } = useTranslation();
  const { title } = useParams();
  const capitalizeTitle = capitalize(t(getTranslation(title ? title : '')));
  const [books, setBooks] = useState<Book[] | null>(null);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [isShowLoader, setIsShowLoader] = useState<boolean>(false);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const getPageFromUrl = ({ url }: GetPageFromUrl): GetPageFromUrlResponse => {
    try {
      const urlSearchParams = new URLSearchParams(url);
      return urlSearchParams.get('page');
    } catch (error) {
      console.error('Error parsing URL:', error);
      return null;
    }
  };
  const handleNextPage = () => {
    if (nextPage) {
      const pageValue = getPageFromUrl({ url: nextPage });
      if (pageValue) fetchBooks({ title, searchTerm, page: pageValue });
    }
  };
  const handlePreviousPage = () => {
    if (prevPage) {
      const pageValue = getPageFromUrl({ url: prevPage });
      if (pageValue) fetchBooks({ title, searchTerm, page: pageValue });
    }
  };
  const fetchBooks = async ({ title, searchTerm, page = '1' }: FetchBooks) => {
    try {
      let response;
      if (title) {
        setIsShowLoader(true);
        response = await fetch(
          `${BASE_URL}/books?topic=${title}&mime_type=image%2Fjpeg&page=${page}`
        );
      }
      if (searchTerm) {
        setIsShowLoader(true);
        response = await fetch(
          `${BASE_URL}/books?search=${searchTerm}&mime_type=image%2Fjpeg&page=${page}`
        );
      }
      if (response) {
        setIsShowLoader(false);
        const data = await response.json();
        setNextPage(_get(data, 'next', null) || null);
        setPrevPage(_get(data, 'previous', null) || null);
        setBooks(data.results);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchBooks({ title, searchTerm });
  }, [title, searchTerm]);
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
      {Array.isArray(books) && books.length > 0 && (
        <>
          <BookShelf books={books} />
          <div className="flex justify-between p-4">
            <button
              onClick={handlePreviousPage}
              disabled={!prevPage}
              className="bg-gutenBlue text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={!nextPage}
              className="bg-gutenBlue text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default DetailHeader;
