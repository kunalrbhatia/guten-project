const getTranslation = (title: string) => {
  const translationKeys = [
    'lbl_fiction',
    'lbl_drama',
    'lbl_humor',
    'lbl_politics',
    'lbl_philosophy',
    'lbl_history',
    'lbl_adventure',
  ];
  if (translationKeys.includes(`lbl_${title}`)) {
    return `lbl_${title}`;
  }
  return title;
};
export default getTranslation;
