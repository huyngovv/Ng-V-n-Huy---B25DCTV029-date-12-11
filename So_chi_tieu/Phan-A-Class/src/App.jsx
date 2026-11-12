import React from "react";
import Header from "./components/Header.jsx";
import ExpenseForm, { LOAI } from "./components/ExpenseForm.jsx";
import ExpenseList from "./components/ExpenseList.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // dữ liệu mẫu viết sẵn
      danhSach: [
        { id: 1, ten: "Ăn trưa", soTien: 35000, loai: "Ăn uống", ngay: "2026-11-10" },
        { id: 2, ten: "Xăng xe", soTien: 50000, loai: "Đi lại", ngay: "2026-11-10" },
        { id: 3, ten: "Mua sách", soTien: 120000, loai: "Học tập", ngay: "2026-11-11" },
        { id: 4, ten: "Xem phim", soTien: 90000, loai: "Giải trí", ngay: "2026-11-12" },
      ],
      loaiLoc: "Tất cả",
      showClock: true,
    };
  }

  tinhTong() {
    return this.state.danhSach.reduce((sum, x) => sum + x.soTien, 0);
  }

  componentDidMount() {
    document.title = "Tổng chi: " + this.tinhTong().toLocaleString("vi-VN") + "đ";
  }

  // cập nhật tiêu đề tab khi danh sách thay đổi
  componentDidUpdate(prevProps, prevState) {
    if (prevState.danhSach !== this.state.danhSach) {
      document.title = "Tổng chi: " + this.tinhTong().toLocaleString("vi-VN") + "đ";
    }
  }

  themKhoanChi = (khoan) => {
    this.setState({ danhSach: [...this.state.danhSach, khoan] });
  };

  xoaKhoanChi = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa khoản chi này?")) {
      this.setState({
        danhSach: this.state.danhSach.filter((x) => x.id !== id),
      });
    }
  };

  render() {
    const { danhSach, loaiLoc, showClock } = this.state;
    const hienThi =
      loaiLoc === "Tất cả" ? danhSach : danhSach.filter((x) => x.loai === loaiLoc);

    return (
      <div className="app">
        <Header
          showClock={showClock}
          onToggleClock={() => this.setState({ showClock: !showClock })}
        />
        <ExpenseForm onAdd={this.themKhoanChi} />

        <div className="filter">
          {["Tất cả", ...LOAI].map((l) => (
            <button
              key={l}
              className={loaiLoc === l ? "active" : ""}
              onClick={() => this.setState({ loaiLoc: l })}
            >
              {l}
            </button>
          ))}
        </div>

        <ExpenseList items={hienThi} onDelete={this.xoaKhoanChi} />
      </div>
    );
  }
}

export default App;
