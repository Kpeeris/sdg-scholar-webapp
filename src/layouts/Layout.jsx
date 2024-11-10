import Navbar from "../components/Navbar/Navbar";
import { useLocation } from "react-router-dom";

/**
 * Layout component wraps all pages with a common Navbar and applies global 
 * layout styles like padding and spacing based on the current route.
 * 
 * @param {Object} props - The component props.
 * @param {JSX.Element} props.children - The child components that are rendered within the layout.
 * 
 * @returns {JSX.Element} The rendered Layout component with a Navbar and dynamic padding.
 */
function Layout({ children }) {
  const location = useLocation();
  const noPaddingRoute = "/sdg11";
  const reducedPaddingRoute = "/signup";
  const quizRoute = "/quiz";
  const contentRoute = "/content";

  return (
    <>
      <Navbar />
      <div
        className={
          location.pathname === noPaddingRoute
            ? "pt-20" // for sdg 11 page
            : location.pathname === reducedPaddingRoute
            ? "pt-20 pb-16 px-12" // for sign up page
            : location.pathname.includes(quizRoute)
            ? "pt-20"
            : location.pathname.includes(contentRoute)
            ? "pt-20"
            : "pt-28 pb-16 px-12" // for every other page
        }
      >
        {children}
      </div>
    </>
  );
}

export default Layout;
