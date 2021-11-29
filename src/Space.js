import React from 'react';

const Space = ({ children }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      {children}
    </div>
  );
};

export default Space;
