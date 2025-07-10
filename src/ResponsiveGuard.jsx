import React, { useEffect, useState } from "react";

export default function ResponsiveGuard({ children }) {
  const [isAllowed, setIsAllowed] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsAllowed(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isAllowed) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "20px",
          backgroundColor: "#ffe0e0",
          color: "#a70000",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div>
          <h2>This device is not suitable for this software.</h2>
          <p>Please use a tablet or PC for a better experience.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
