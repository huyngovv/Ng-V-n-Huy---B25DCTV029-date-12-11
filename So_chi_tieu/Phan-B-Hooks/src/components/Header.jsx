import React, { useState } from "react";
import useClock from "../hooks/useClock.js";
import { useTheme } from "../context/ThemeContext.jsx";

function Header() {
  const [showClock, setShowClock] = useState(true);
  const now = useClock(showClock);
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="header">
      <h2>Sổ chi tiêu cá nhân</h2>
      <div>
        {showClock && <span className="clock">{now.toLocaleTimeString("vi-VN")}</span>}
        <button onClick={() => setShowClock(!showClock)}>
          {showClock ? "Ẩn đồng hồ" : "Hiện đồng hồ"}
        </button>
        <button onClick={toggleTheme}>
          {theme === "light" ? "Chế độ tối" : "Chế độ sáng"}
        </button>
      </div>
    </div>
  );
}

export default Header;
