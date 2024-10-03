import { useState, useEffect } from "react";
const FullScreenDiv = ({ children }) => {
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const { availWidth, availHeight } = window.screen;
    setScreenSize({ width: availWidth, height: availHeight });
    console.log(
      `Available width: ${availWidth}, Available height: ${availHeight}`
    );
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
