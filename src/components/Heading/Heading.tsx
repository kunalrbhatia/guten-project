import { useTranslation } from 'react-i18next';

const Heading = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex justify-left font-Montserrat-SemiBold text-extraLarge text-gutenBlue">
        {t('lbl_heading')}
      </div>
      <div className="flex justify-left font-Montserrat-Regular text-medium mb-8">
        {t('lbl_title')}
      </div>
    </>
  );
};
export default Heading;
