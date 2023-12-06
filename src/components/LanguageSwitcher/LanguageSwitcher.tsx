import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const languageOptions = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'French' },
  ];

  return (
    <>
      <div className="flex items-center mr-2 font-Montserrat-Regular text-16 text-gutenBlue">
        {t('lbl_lang_select')}
      </div>
      <select
        value={i18n.language}
        onChange={(e) => changeLanguage(e.target.value)}
        className="px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring focus:border-blue-300"
      >
        {languageOptions.map((option) => (
          <option key={option.code} value={option.code}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default LanguageSwitcher;
