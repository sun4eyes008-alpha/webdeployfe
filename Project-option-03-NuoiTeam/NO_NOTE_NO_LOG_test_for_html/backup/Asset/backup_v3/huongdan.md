# Hướng dẫn Cập nhật và Quản lý Nội dung

Tài liệu này hướng dẫn cách bạn có thể dễ dàng thêm, sửa đổi hoặc xóa các điều kiện và file PDF hiển thị trên trang web.

---

## 1. Cấu trúc Dữ liệu Cốt lõi

Tất cả nội dung của các ô điều kiện được quản lý trong tệp `flowchart-data.js`. Dữ liệu trong tệp này được tổ chức dưới dạng một "cây" đối tượng JavaScript lồng nhau.

- **Nhánh (Branch):** Là một đối tượng chứa các đối tượng con. Tên của đối tượng (key) chính là nội dung hiển thị trong ô điều kiện (combobox).
- **nhánh con:** Là điểm cuối cùng của một nhánh. Đây là một đối tượng **bắt buộc** phải chứa 3 thuộc tính sau:
  - `pdf`: Tên file PDF sẽ được hiển thị (ví dụ: `"Thông tin công ty.pdf"`).
  - `note`: Nội dung sẽ hiển thị trong ô **LƯU Ý**.
  - `xmtt`: Nội dung sẽ hiển thị trong ô **XMTT**. Bạn có thể dùng các biến `XMTT_` đã được định nghĩa sẵn ở đầu tệp.
- **Cảnh báo (Alert):** (Tùy chọn) Thêm thuộc tính `alert` nếu bạn muốn một thông báo dạng popup hiện lên khi người dùng chọn đến mục này.

**Ví dụ:**

```javascript
const flowchartData = {
  "1. THÔNG TIN CHUNG": {
    // <--- Đây là một "nhánh"

    "1.1. Thông tin công ty": {
      // <--- Đây là một "nhánh con"
      pdf: "Thông tin công ty.pdf",
      note: "Các thông tin cơ bản về công ty.",
      xmtt: XMTT_1,
      alert: "Đây là một thông báo popup!", // Thuộc tính tùy chọn
    },

    "1.2. Hợp tác kinh doanh": {
      // <--- Một "nhánh con" khác
      pdf: "Hợp tác kinh doanh.pdf",
      note: "Thông tin dành cho đối tác muốn hợp tác kinh doanh.",
      xmtt: XMTT_1,
    },
  },
  // ... các nhánh khác
};
```

---

## 2. Cách Thêm một Mục Mới (Cấp cao nhất hoặc mục con)

### 2.1. Thêm một mục con vào nhánh hiện có

Giả sử bạn muốn thêm một điều kiện mới là `"Khiếu nại Dịch vụ"` trong mục `"1. THÔNG TIN CHUNG"`.

1.  **Chuẩn bị file PDF:**

    - Tạo file PDF của bạn, ví dụ: `Khieu-nai-Dich-vu.pdf`.
    - Đặt file này vào đúng thư mục con trong `pdfile`. Vì mục cha là `"1. THÔNG TIN CHUNG"`, bạn cần đặt file vào `pdfile/THONG_TIN_CHUNG/`.
      **Lưu ý:** Tên thư mục `THONG_TIN_CHUNG` được định nghĩa trong `FOLDER_MAP` của `script2.js` ánh xạ với số `1` của mục cấp 1.

2.  **Mở tệp `flowchart-data.js`**.

3.  **Tìm đến đúng "nhánh":**

    - Tìm đến đối tượng `"1. THÔNG TIN CHUNG"`.

4.  **Thêm "nhánh con" mới:**

    - Bên trong đối tượng `"1. THÔNG TIN CHUNG"`, thêm một cặp key-value mới. Key là tên bạn muốn hiển thị trong ô điều kiện.

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
        "1.7. Khiếu nại Dịch vụ": { // Sử dụng số thứ tự để dễ quản lý
            "pdf": "Khieu-nai-Dich-vu.pdf",
            "note": "Hướng dẫn các bước xử lý khiếu nại dịch vụ.",
            "xmtt": XMTT_2 // Ví dụ: yêu cầu XMTT loại 2
        }
    },
    ```

5.  **Lưu tệp `flowchart-data.js`**. Trang web sẽ tự động cập nhật ô điều kiện và chức năng tìm kiếm sau khi bạn tải lại trang.

### 2.2. Thêm một mục cấp cao nhất mới (Ví dụ: "Mục 7. Test")

Giả sử bạn muốn thêm một mục cấp cao nhất mới là `"7. TEST"` vào `flowchartData`.

1.  **Chỉnh sửa `flowchart-data.js`:**
    _ Mở `flowchart-data.js`.
    _ Thêm mục mới vào cuối đối tượng `flowchartData`. Đảm bảo cú pháp JSON (dấu phẩy) là chính xác.

        ```javascript
        // ... các mục hiện có
        "6. THANH TOÁN + CIC": {
            // ... nội dung Mục 6
        },
        "7. TEST": { // <--- Thêm Mục 7 này
            "7.1. Mục con Test": { // Có thể có nhiều mục con khác
                "pdf": "Test.pdf",
                "note": "Đây là ghi chú cho mục test.",
                "xmtt": XMTT_1
            }
        }

    }; // Đảm bảo dấu ngoặc này đóng đối tượng flowchartData
    ```

2.  **Tạo thư mục PDF tương ứng:**

    - Trong thư mục `pdfile/`, tạo một thư mục con mới. Tên của thư mục này phải khớp với giá trị bạn sẽ khai báo trong `FOLDER_MAP`. Ví dụ: `pdfile/TEST/`.
    - Đặt tất cả các file PDF liên quan đến "Mục 7. TEST" vào thư mục này (ví dụ: `pdfile/TEST/Test.pdf`).

3.  **Cập nhật `FOLDER_MAP` trong `script2.js`:**

    - Mở tệp `script2.js`.
    - Tìm biến `FOLDER_MAP` (thường ở gần đầu tệp).
    - Thêm một ánh xạ mới cho số thứ tự của mục cấp cao nhất của bạn với tên thư mục PDF.

    ```javascript
    const FOLDER_MAP = {
      1: "THONG_TIN_CHUNG",
      2: "THONG_TIN_SAN_PHAM",
      // ... các mục khác
      6: "THANH_TOAN_CIC",
      7: "TEST", // <--- Thêm dòng này! Số 7 ánh xạ đến thư mục 'TEST'
    };
    ```

4.  **Lưu các tệp `flowchart-data.js` và `script2.js`**. Sau đó tải lại trang web.

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
  - Nếu bạn xóa một mục cấp cao nhất, hãy nhớ xóa ánh xạ tương ứng trong `FOLDER_MAP` trong `script2.js` nếu không cần thiết.

---

## 4. Về Chức năng Tìm kiếm

Chức năng tìm kiếm được thiết kế để **tự động cập nhật**. Mỗi khi bạn thay đổi nội dung trong `flowchart-data.js` và tải lại trang, hệ thống sẽ tự động quét lại toàn bộ dữ liệu để xây dựng "bản đồ" tìm kiếm mới.

**Bạn không cần phải làm thêm bất kỳ thao tác nào** để cập nhật cho chức năng tìm kiếm. Chỉ cần đảm bảo dữ liệu trong `flowchart-data.js` là chính xác và `FOLDER_MAP` trong `script2.js` được cập nhật tương ứng cho các mục cấp cao nhất mới.
