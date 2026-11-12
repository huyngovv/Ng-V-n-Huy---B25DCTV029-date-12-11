import React from "react";

class ExpenseList extends React.Component {
  render() {
    const { items, onDelete } = this.props;
    const tong = items.reduce((sum, x) => sum + x.soTien, 0);

    return (
      <div>
        <ul className="list">
          {items.map((x) => (
            <li key={x.id}>
              <span>
                {x.ngay} - {x.ten} ({x.loai}): {x.soTien.toLocaleString("vi-VN")}đ
              </span>
              <button onClick={() => onDelete(x.id)}>Xóa</button>
            </li>
          ))}
        </ul>
        {items.length === 0 && <p>Chưa có khoản chi nào.</p>}
        <h3>Tổng tiền: {tong.toLocaleString("vi-VN")}đ</h3>
      </div>
    );
  }
}

export default ExpenseList;
