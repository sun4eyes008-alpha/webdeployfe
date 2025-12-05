# Hướng dẫn Cập nhật và Quản lý Nội dung

Tài liệu này hướng dẫn cách bạn có thể dễ dàng thêm, sửa đổi hoặc xóa các điều kiện và file PDF hiển thị trên trang web.

---

## 1. Cấu trúc Dữ liệu Cốt lõi

Tất cả nội dung của các ô điều kiện được quản lý trong tệp `flowchart-data.js`. Dữ liệu trong tệp này được tổ chức dưới dạng một "cây" đối tượng JavaScript lồng nhau.

- **Nhánh (Branch):** Là một đối tượng chứa các đối tượng con. Tên của đối tượng (key) chính là nội dung hiển thị trong ô điều kiện (combobox).
- **Lá (Leaf):** Là điểm cuối cùng của một nhánh. Đây là một đối tượng **bắt buộc** phải chứa 3 thuộc tính sau:
  - `pdf`: Tên file PDF sẽ được hiển thị (ví dụ: `"Thông tin công ty.pdf"`).
  - `note`: Nội dung sẽ hiển thị trong ô **LƯU Ý**.
  - `xmtt`: Nội dung sẽ hiển thị trong ô **XMTT**. Bạn có thể dùng các biến `XMTT_` đã được định nghĩa sẵn ở đầu tệp.
- **Cảnh báo (Alert):** (Tùy chọn) Thêm thuộc tính `alert` nếu bạn muốn một thông báo dạng popup hiện lên khi người dùng chọn đến mục này.

**Ví dụ:**

```javascript
const flowchartData = {
    "1. THÔNG TIN CHUNG": { // <--- Đây là một "nhánh"

        "1.1. Thông tin công ty": { // <--- Đây là một "lá"
            "pdf": "Thông tin công ty.pdf",
            "note": "Các thông tin cơ bản về công ty.",
            "xmtt": XMTT_1,
            "alert": "Đây là một thông báo popup!" // Thuộc tính tùy chọn
        },

        "1.2. Hợp tác kinh doanh": { // <--- Một "lá" khác
            "pdf": "Hợp tác kinh doanh.pdf",
            "note": "Thông tin dành cho đối tác muốn hợp tác kinh doanh.",
            "xmtt": XMTT_1
        }
    },
    // ... các nhánh khác
};
```

---

## 2. Cách Thêm một Mục Mới

Giả sử bạn muốn thêm một điều kiện mới là `"Khiếu nại Dịch vụ"` trong mục `"1. THÔNG TIN CHUNG"`.

1.  **Chuẩn bị file PDF:**
    *   Tạo file PDF của bạn, ví dụ: `Khieu-nai-Dich-vu.pdf`.
    *   Đặt file này vào đúng thư mục con trong `pdfile`. Vì mục cha là `"1. THÔNG TIN CHUNG"`, bạn cần đặt file vào `pdfile/THONG_TIN_CHUNG/`.

2.  **Mở tệp `flowchart-data.js`**.

3.  **Tìm đến đúng "nhánh":**
    *   Tìm đến đối tượng `"1. THÔNG TIN CHUNG"`.

4.  **Thêm "lá" mới:**
    *   Bên trong đối tượng `"1. THÔNG TIN CHUNG"`, thêm một cặp key-value mới. Key là tên bạn muốn hiển thị trong ô điều kiện.

    ```javascript
    "1. THÔNG TIN CHUNG": {
        "1.1. Thông tin công ty": {
            // ...
        },
        "1.2. Hợp tác kinh doanh": {
            // ...
        },
        // ... các mục khác

        // Thêm mục mới của bạn ở đây
        "1.7. Khiếu nại Dịch vụ": {
            "pdf": "Khieu-nai-Dich-vu.pdf",
            "note": "Hướng dẫn các bước xử lý khiếu nại dịch vụ.",
            "xmtt": XMTT_2 // Ví dụ: yêu cầu XMTT loại 2
        }
    },
    ```

5.  **Lưu tệp `flowchart-data.js`**. Trang web sẽ tự động cập nhật ô điều kiện và chức năng tìm kiếm sau khi bạn tải lại trang.

---

## 3. Cách Sửa hoặc Xóa một Mục

- **Để sửa:**
  - Mở tệp `flowchart-data.js`.
  - Tìm đến đúng mục bạn muốn sửa.
  - Chỉnh sửa lại tên (key) hoặc các giá trị (`pdf`, `note`, `xmtt`).
- **Để xóa:**
  - Mở tệp `flowchart-data.js`.
  - Tìm đến đúng mục bạn muốn xóa.
  - Xóa toàn bộ khối mã của mục đó (từ tên key cho đến dấu `{` và `}` đóng của nó). Hãy cẩn thận với các dấu phẩy (`,`) để không làm hỏng cấu trúc file.

---

## 4. Về Chức năng Tìm kiếm

Chức năng tìm kiếm được thiết kế để **tự động cập nhật**. Mỗi khi bạn thay đổi nội dung trong `flowchart-data.js` và tải lại trang, hệ thống sẽ tự động quét lại toàn bộ dữ liệu để xây dựng "bản đồ" tìm kiếm mới.

**Bạn không cần phải làm thêm bất kỳ thao tác nào** để cập nhật cho chức năng tìm kiếm. Chỉ cần đảm bảo dữ liệu trong `flowchart-data.js` là chính xác.