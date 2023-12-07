import { useState, ChangeEvent, MouseEvent } from 'react';
import SearchIcon from 'assets/images/svg/Search.svg';
import './SearchBar.styles.css';
import { useTranslation } from 'react-i18next';
interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useTranslation();
  const handleIconClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder={t('lbl_search')}
        value={searchTerm}
        onChange={handleChange}
        className="border border-gutenLightGrey focus:border-gutenBlue focus:outline-none p-2 pl-10 pr-[10px] w-full bg-gutenLightGrey placeholder-custom rounded-[4px] h-[40px]"
      />
      <button
        onClick={handleIconClick}
        className="absolute left-3 top-3 text-gutenDarkGray focus:outline-none"
      >
        <img src={SearchIcon} alt="search icon" />
      </button>
    </div>
  );
};

export default SearchBar;
