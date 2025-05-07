import React from 'react';
import PropTypes from 'prop-types';

function Button({ children, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors ${className}`}
      data-testid="button"
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

Button.defaultProps = {
  onClick: () => {},
  className: '',
};

export default Button;
