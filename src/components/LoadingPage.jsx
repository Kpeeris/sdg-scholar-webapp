import { ArrowPathIcon } from "@heroicons/react/24/outline";


/**
 * LoadingPage to display a loading spinner and message.
 * 
 * @param {Object} props - The component props.
 * @param {string} [props.message="Loading..."] - The message to display below the loading spinner.
 * 
 * @returns {JSX.Element} The rendered LoadingPage component.
 */
const LoadingPage = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="flex flex-col items-center">
        {/* the loading spinner */}
        <ArrowPathIcon className="h-12 w-12 text-orange-500 animate-spin mb-4" />
        <p className="text-orange-500 text-3xl">{message}</p>
      </div>
    </div>
  );
};

export default LoadingPage;
