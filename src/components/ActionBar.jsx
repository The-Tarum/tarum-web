import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ActionBar = ({ name }) => {
  const navigate = useNavigate();
  
  const handleGoBack = () => {
    navigate(-1); // Go back one step in history
  };

  return (
    <div className="p-4 bg-white ">
      <div className="flex items-center gap-4">
        <button 
          onClick={handleGoBack}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <FaArrowLeft  />
        </button>
        <h2 className="text-base font-bold">{name}</h2>
      </div>
    </div>
  );
};

export default ActionBar;