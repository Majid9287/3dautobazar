import React from 'react';

const LoadingSpinner = () => {
  const spinnerContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background for blurring
    zIndex: 9999, // Ensure the spinner appears above other elements
  };

  const loaderStyle = {
    border: '4px solid #f3f3f3', /* Light grey */
    borderTop: '4px solid #3498db', /* Blue */
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    animation: 'spin 2s linear infinite',
  };

  return (
    <div style={spinnerContainerStyle}>
      <div style={loaderStyle}></div>
    </div>
  );
};

export default LoadingSpinner;
