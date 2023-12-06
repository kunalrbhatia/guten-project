import Adventure from 'assets/images/svg/Adventure.svg';
import Drama from 'assets/images/svg/Drama.svg';
import Humour from 'assets/images/svg/Humour.svg';
import Philosophy from 'assets/images/svg/Philosophy.svg';
import Fiction from 'assets/images/svg/Fiction.svg';
import Politics from 'assets/images/svg/Politics.svg';
import History from 'assets/images/svg/History.svg';
import PaperComponent from 'components/Paper/Paper';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Heading from 'components/Heading/Heading';

const GenreSelector = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const translationKeys = [
    'lbl_fiction',
    'lbl_drama',
    'lbl_humor',
    'lbl_politics',
    'lbl_philosophy',
    'lbl_history',
    'lbl_adventure',
  ];
  const svgData = [
    Fiction,
    Drama,
    Humour,
    Politics,
    Philosophy,
    History,
    Adventure,
  ];
  const handleClick = (title: string) => {
    navigate(`/details/${title}`);
  };
  return (
    <>
      <Heading />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {translationKeys.map((item, index) => (
          <div className="mb-4" key={index}>
            <PaperComponent
              title={t(translationKeys[index])}
              icon={svgData[index]}
              onClick={(title) => {
                handleClick(title);
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default GenreSelector;
