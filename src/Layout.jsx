import Navbar from "./components/Navbar/Navbar";
import { useLocation } from "react-router-dom";

/* 
  The layout component wraps all pages with a common Navbar. It applies global 
  layout styles like padding and spacing to all pages except the sdg 11 page.
*/
function Layout({ children }) {
  const location = useLocation();
  const noPaddingRoute = "/sdg11";
  const reducedPaddingRoute = "/signup";

  return (
    <>
      <Navbar />
      <div
        className={
          location.pathname === noPaddingRoute ? "pt-20" // for sdg 11 page
          : location.pathname === reducedPaddingRoute ? "pt-20 pb-16 px-12" // for sign up page
          : "pt-36 pb-16 px-12" // for every other page
        }
      >
        {children}
      </div>
    </>
  );
}

export default Layout;
