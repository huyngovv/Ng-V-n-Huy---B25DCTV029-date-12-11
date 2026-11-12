import React, { useState, useRef } from "react";

export const LOAI = ["Ăn uống", "Đi lại", "Học tập", "Giải trí"];

function ExpenseForm({ onAdd }) {
  const [ten, setTen] = useState("");
  const [soTien, setSoTien] = useState("");
  const [loai, setLoai] = useState(LOAI[0]);
  const [ngay, setNgay] = useState("");
  const [loi, setLoi] = useState("");
  const tenRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (ten.trim() === "") return setLoi("Nội dung không được để trống");
    if (soTien === "" || Number(soTien) <= 0)
      return setLoi("Số tiền phải lớn hơn 0");
    if (ngay === "") return setLoi("Vui lòng chọn ngày chi");

    const thanhCong = await onAdd({
      ten: ten.trim(),
      soTien: Number(soTien),
      loai,
      ngay,
    });

    if (thanhCong) {
      setTen("");
      setSoTien("");
      setLoai(LOAI[0]);
      setNgay("");
      setLoi("");
      tenRef.current.focus();
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        ref={tenRef}
        placeholder="Nội dung"
        value={ten}
        onChange={(e) => setTen(e.target.value)}
      />
      <input
        type="number"
        placeholder="Số tiền"
        value={soTien}
        onChange={(e) => setSoTien(e.target.value)}
      />
      <select value={loai} onChange={(e) => setLoai(e.target.value)}>
        {LOAI.map((l) => (
          <option key={l} value={l}>
            {l}
          </option>
        ))}
      </select>
      <input
        type="date"
        value={ngay}
        onChange={(e) => setNgay(e.target.value)}
      />
      <button type="submit">Thêm</button>
      {loi && <p className="error">{loi}</p>}
    </form>
  );
}

export default ExpenseForm;
