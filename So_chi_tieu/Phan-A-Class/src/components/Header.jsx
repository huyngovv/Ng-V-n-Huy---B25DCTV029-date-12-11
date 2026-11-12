import React from "react";
import Clock from "./Clock.jsx";

class Header extends React.Component {
  render() {
    const { showClock, onToggleClock } = this.props;
    return (
      <div className="header">
        <h2>Sổ chi tiêu cá nhân</h2>
        <div>
          {showClock && <Clock />}
          <button onClick={onToggleClock}>
            {showClock ? "Ẩn đồng hồ" : "Hiện đồng hồ"}
          </button>
        </div>
      </div>
    );
  }
}

export default Header;
