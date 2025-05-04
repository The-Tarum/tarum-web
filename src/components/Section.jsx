import ArrowRight from '../assets/arrow-right.svg';

const Section = ({ name, children, onHeaderClick }) => {
  return (
    <div className="p-4 bg-white">
      <div 
        className="flex mb-6 items-center gap-2 cursor-pointer"
        onClick={onHeaderClick}
      >
        <h2 className="text-base font-bold">{name}</h2>
        <img src={ArrowRight} alt="Right arrow" className="w-5 h-5" />
      </div>
      {children}
    </div>
  );
};

export default Section;