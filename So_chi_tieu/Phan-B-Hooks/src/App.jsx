import React, { useState, useEffect, useMemo } from "react";
import Header from "./components/Header.jsx";
import ExpenseForm, { LOAI } from "./components/ExpenseForm.jsx";
import ExpenseList from "./components/ExpenseList.jsx";
import useFetch from "./hooks/useFetch.js";
import useDebounce from "./hooks/useDebounce.js";

const API_URL = "https://6af52765f6270fa08d67c7d2.mockapi.io/expenses";

function App() {
  const { data, loading, error, addItem, removeItem } = useFetch(API_URL);
  const [loaiLoc, setLoaiLoc] = useState("Tất cả");
  const [tuKhoa, setTuKhoa] = useState("");
  const tuKhoaDebounce = useDebounce(tuKhoa, 500);

  const hienThi = useMemo(() => {
    return data.filter(
      (x) =>
        (loaiLoc === "Tất cả" || x.loai === loaiLoc) &&
        x.ten.toLowerCase().includes(tuKhoaDebounce.toLowerCase()),
    );
  }, [data, loaiLoc, tuKhoaDebounce]);

  const tong = useMemo(
    () => hienThi.reduce((sum, x) => sum + Number(x.soTien), 0),
    [hienThi],
  );

  const tongTatCa = useMemo(
    () => data.reduce((sum, x) => sum + Number(x.soTien), 0),
    [data],
  );

  useEffect(() => {
    document.title = "Tổng chi: " + tongTatCa.toLocaleString("vi-VN") + "đ";
  }, [tongTatCa]);

  const xoaKhoanChi = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa khoản chi này?")) {
      removeItem(id);
    }
  };

  return (
    <div className="app">
      <Header />
      <ExpenseForm onAdd={addItem} />

      <input
        className="search"
        placeholder="Tìm theo nội dung..."
        value={tuKhoa}
        onChange={(e) => setTuKhoa(e.target.value)}
      />

      <div className="filter">
        {["Tất cả", ...LOAI].map((l) => (
          <button
            key={l}
            className={loaiLoc === l ? "active" : ""}
            onClick={() => setLoaiLoc(l)}
          >
            {l}
          </button>
        ))}
      </div>

      {loading && <p>Đang tải...</p>}
      {error && <p className="error">Lỗi: {error}</p>}
      {!loading && (
        <ExpenseList items={hienThi} tong={tong} onDelete={xoaKhoanChi} />
      )}
    </div>
  );
}

export default App;
