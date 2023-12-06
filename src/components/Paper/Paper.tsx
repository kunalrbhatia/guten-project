import React from 'react';
import ArrowRight from 'assets/images/svg/Next.svg';
import './Paper.styles.css';
const PaperComponent = ({
  title,
  icon,
  onClick,
}: {
  title: string;
  icon: string;
  onClick: (title: string) => void;
}) => {
  return (
    <div
      onClick={() => {
        onClick(title);
      }}
      className="bg-gutenWhite rounded-[4px] flex items-center justify-between shadow-custom cursor-pointer pb-2 pt-2"
    >
      <div className="flex items-center pl-[10px]">
        {icon && <img className="w-8 mr-2" src={icon} alt="icon" />}
        <div className="text-small font-Montserrat-Regular uppercase">
          {title}
        </div>
      </div>
      <img className="pr-[10px] w-8" src={ArrowRight} alt="arrow right" />
    </div>
  );
};

export default PaperComponent;
