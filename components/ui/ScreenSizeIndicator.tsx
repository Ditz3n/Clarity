"use client";

import { useEffect, useState } from "react";

const ScreenSizeIndicator = () => {
  const [screenSize, setScreenSize] = useState("");

  useEffect(() => {
    const updateScreenSize = () => {
      if (window.innerWidth < 640) {
        setScreenSize("xs");
      } else if (window.innerWidth < 768) {
        setScreenSize("sm");
      } else if (window.innerWidth < 1024) {
        setScreenSize("md");
      } else if (window.innerWidth < 1280) {
        setScreenSize("lg");
      } else if (window.innerWidth < 1536) {
        setScreenSize("xl");
      } else {
        setScreenSize("2xl");
      }
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);

    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 bg-gray-800 text-white rounded-full p-2 shadow-lg">
      {screenSize}
    </div>
  );
};

export default ScreenSizeIndicator;