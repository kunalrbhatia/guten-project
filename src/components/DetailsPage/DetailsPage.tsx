import { Link, useParams } from 'react-router-dom';
import { capitalize } from 'lodash';
import BackIcon from 'assets/images/svg/Back.svg';
import getTranslation from 'utils/common';
import { useTranslation } from 'react-i18next';
import SearchBar from 'components/SearchBar/SearchBar';
const DetailHeader = () => {
  const { t } = useTranslation();
  const { title } = useParams();
  const capitalizeTitle = capitalize(t(getTranslation(title ? title : '')));
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
      <SearchBar onSearch={() => {}} />
    </>
  );
};

export default DetailHeader;
