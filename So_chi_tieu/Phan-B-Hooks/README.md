# Sổ chi tiêu cá nhân – Phần B (Function Component + Hooks)

## Cách chạy

1. Vào https://mockapi.io, tạo project mới, thêm resource tên **expenses**
   với các trường: `ten` (string), `soTien` (number), `loai` (string), `ngay` (string).
2. Mở `src/App.jsx`, thay `API_URL` bằng đường dẫn của bạn, ví dụ:
   `https://xxxxxxxx.mockapi.io/api/v1/expenses`
3. Chạy:

```
npm install
npm run dev
```

## Cấu trúc

- `hooks/useFetch.js`: lấy (GET), thêm (POST), xóa (DELETE) qua mockapi; có trạng thái `loading` và `error`.
- `hooks/useClock.js`: đồng hồ chạy mỗi giây, tự dừng khi bị ẩn.
- `hooks/useDebounce.js`: trì hoãn giá trị ô tìm kiếm.
- `context/ThemeContext.jsx`: chế độ sáng/tối bằng `useContext`.
- `components/`: Header, ExpenseForm (có `useRef` để focus), ExpenseList.

## Hooks đã khắc phục thách thức của Class ở những chỗ nào

1. **Vòng đời bị chia nhỏ.** Ở Phần A, đồng hồ phải tách `setInterval` (componentDidMount)
   và `clearInterval` (componentWillUnmount) ra hai nơi. Với `useEffect`, bật và dọn dẹp nằm
   cùng một chỗ (hàm cleanup), nên khó quên dừng timer hơn.
2. **Lặp code ở tiêu đề tab.** Class phải viết ở cả `componentDidMount` và `componentDidUpdate`
   (kèm so sánh `prevState`). Hooks chỉ cần một `useEffect` với mảng phụ thuộc `[tongTatCa]`.
3. **Tái sử dụng logic.** Logic đồng hồ, gọi API, debounce được đóng gói thành custom hook
   (`useClock`, `useFetch`, `useDebounce`), dùng lại ở nhiều nơi. Class khó chia sẻ logic như vậy.
4. **`this` và `constructor`.** Class phải bind hoặc dùng arrow function cho handler, và gói state
   vào một object `this.state`. Function Component chỉ dùng biến và hàm thông thường, mỗi state
   một `useState` riêng, code ngắn và dễ đọc hơn.
5. **Truyền dữ liệu dùng chung.** Chế độ sáng/tối dùng `useContext` đọc trực tiếp ở component cần,
   không phải truyền props qua nhiều tầng.
6. **Ref.** `useRef` thay cho `createRef` và `this.xxx`, dùng gọn để focus ô nhập sau khi thêm.
7. **Gọi API an toàn.** `useEffect` có cleanup (`AbortController`) giúp hủy request khi component
   bị gỡ, tránh cập nhật state khi đã unmount.
