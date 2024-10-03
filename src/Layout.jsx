import Navbar from "./components/Navbar";
import { useLocation } from "react-router-dom";

/* 
  The layout component wraps all pages with a common Navbar. It applies global 
  layout styles like padding and spacing to all pages except the sdg 11 page.
*/
function Layout({ children }) {
  const location = useLocation();
  const noPaddingRoute = "/sdg11";

  return (
    <>
      <Navbar />
      <div
        className={
          location.pathname === noPaddingRoute ? "" : "pt-32 pb-16 px-12"
        }
      >
        {children}
      </div>
    </>
  );
}

export default Layout;
