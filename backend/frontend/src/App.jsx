import { useEffect, useState, lazy, Suspense } from "react";

import DesktopView from "./pages/Desktop/DesktopView";

// Mobile is lazy-loaded so its Bootstrap CSS only enters the bundle for mobile users
const MobileView = lazy(() => import("./pages/Mobile/MobileView"));

const App = () => {
  const getIsMobile = () => window.innerWidth <= 480;

  const [isMobile] = useState(getIsMobile);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 480px)");

    const handleChange = () => {
      window.location.reload();
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  if (isMobile) {
    return (
      <Suspense fallback={<div />}>
        <MobileView />
      </Suspense>
    );
  }

  return <DesktopView />;
};

export default App;
