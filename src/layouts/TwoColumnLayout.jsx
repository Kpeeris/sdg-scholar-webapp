/**
 * TwoColumnLayout creates a responsive two-column layout with 
 * an image on the left and content on the right.
 * 
 * @param {Object} props - The component props.
 * @param {string} props.imageSrc - The source URL for the image on the left side.
 * @param {string} props.imageAlt - The alt text for the image.
 * @param {JSX.Element} props.rightContent - The content for the right side.
 * 
 * @returns {JSX.Element} The rendered TwoColumnLayout component.
 */
export const TwoColumnLayout = ({ imageSrc, imageAlt, rightContent }) => {
  return (
    <div className="flex items-center justify-center">
      {/* Outer container with two columns */}
      <div className="w-full flex flex-col pl-16 pr-16 lg:flex-row items-center justify-between space-x-4">
        
        {/* Left container with image */}
        <div className="flex-1 p-10 justify-center items-center">
          <img src={imageSrc} alt={imageAlt} className="w-4/5 h-auto mx-auto" />
        </div>

        {/* Right container */}
        <div className="flex-1 p-10">{rightContent}</div>
      </div>
    </div>
  );
};
