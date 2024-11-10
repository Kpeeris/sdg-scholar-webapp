import { useState, useEffect } from "react";

/**
 * A full-screen div that dynamically takes up the entire screen.
 */
const FullScreenDiv = ({ children }) => {
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const { availWidth, availHeight } = window.screen;
    setScreenSize({ width: availWidth, height: availHeight });
  }, []);
  return (
    <div
      style={{
        width: `${screenSize.width}px`,
        height: `calc(${screenSize.height}px - 4rem)`,
        position: "relative",
      }}
    >
      {children}
    </div>
  );
};

export default FullScreenDiv;
