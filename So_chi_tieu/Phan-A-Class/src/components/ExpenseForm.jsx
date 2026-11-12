import React from "react";

export const LOAI = ["Ăn uống", "Đi lại", "Học tập", "Giải trí"];

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ten: "",
      soTien: "",
      loai: LOAI[0],
      ngay: "",
      loi: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { ten, soTien, loai, ngay } = this.state;

    // validate
    if (ten.trim() === "") {
      this.setState({ loi: "Nội dung không được để trống" });
      return;
    }
    if (soTien === "" || Number(soTien) <= 0) {
      this.setState({ loi: "Số tiền phải lớn hơn 0" });
      return;
    }
    if (ngay === "") {
      this.setState({ loi: "Vui lòng chọn ngày chi" });
      return;
    }

    this.props.onAdd({
      id: Date.now(),
      ten: ten.trim(),
      soTien: Number(soTien),
      loai,
      ngay,
    });
    this.setState({ ten: "", soTien: "", loai: LOAI[0], ngay: "", loi: "" });
  };

  render() {
    const { ten, soTien, loai, ngay, loi } = this.state;
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <input
          name="ten"
          placeholder="Nội dung"
          value={ten}
          onChange={this.handleChange}
        />
        <input
          name="soTien"
          type="number"
          placeholder="Số tiền"
          value={soTien}
          onChange={this.handleChange}
        />
        <select name="loai" value={loai} onChange={this.handleChange}>
          {LOAI.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
        <input name="ngay" type="date" value={ngay} onChange={this.handleChange} />
        <button type="submit">Thêm</button>
        {loi && <p className="error">{loi}</p>}
      </form>
    );
  }
}

export default ExpenseForm;
