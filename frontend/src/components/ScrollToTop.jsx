import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual"; // disable browser auto-restore
    }
    window.scrollTo(0, 0); // always jump to top
  }, [pathname]); // runs on route change

  return null;
};

export default ScrollToTop;
