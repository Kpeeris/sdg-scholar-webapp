import React from 'react';

export const TwoColumnLayout = ({ imageSrc, imageAlt, rightContent }) => {
  return (
    <div className="flex items-center justify-center">
      
      {/* Outer container with two columns */}
      <div className="w-full p-10 flex flex-col lg:flex-row items-center justify-between space-x-4">
        
        {/* Left container with image */}
        <div className="flex-1 p-10 justify-center items-center">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-4/5 h-auto mx-auto"
          />
        </div>

        {/* Right container */}
        <div className="flex-1 p-10">
          {rightContent}
        </div>
      </div>
    </div>
  );
};
