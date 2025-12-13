# 🐛 Hướng Dẫn Xử Lý Lỗi - toolclaude.html

## ✨ Cải Tiến Mới

Phiên bản mới của toolclaude.html đã được cải tiến với **Error Modal chi tiết** thay vì các alert đơn giản.

---

## 🎯 Các Loại Lỗi & Cách Xử Lý

### 1. ❌ Sai Định Dạng File

**Khi nào xảy ra**: Upload file không phải `.js`

**Error Message**:
```
❌ Sai Định Dạng File
Vui lòng chọn file JavaScript (.js)
File được chọn: xyz.txt
```

**Cách sửa**: Chọn đúng file `.js`

---

### 2. ❌ Lỗi Parse Biến

**Khi nào xảy ra**: Biến có syntax lỗi hoặc giá trị không hợp lệ

**Error Message**:
```
❌ Lỗi Parse Biến
Không thể parse biến "XMTT_8"
Dòng 23: Lỗi decode HTML entities: ...
```

**Chi tiết hiển thị**:
- 📋 Thông báo: Tên biến bị lỗi
- 📍 Vị trí lỗi: Số dòng trong file
- 🔍 Chi tiết: Mô tả lỗi cụ thể

**Cách sửa**:
1. Mở file `.js` bằng editor (VS Code, Notepad++)
2. Đi tới dòng được báo
3. Kiểm tra cú pháp của biến
4. Sửa và import lại

---

### 3. ❌ Không Tìm Thấy flowchartData

**Khi nào xảy ra**: File không có `const flowchartData = {...}`

**Error Message**:
```
❌ Không Tìm Thấy flowchartData
File không chứa 'const flowchartData = {...}'
Đảm bảo file có khai báo:
const flowchartData = { ... };
```

**Cách sửa**:
1. Kiểm tra file có khai báo `const flowchartData = {...}` không
2. Đảm bảo flowchartData ở cuối file
3. Đảm bảo có dấu `;` ở cuối

---

### 4. ❌ Lỗi Cú Pháp flowchartData

**Khi nào xảy ra**: flowchartData có lỗi JavaScript syntax

**Error Message**:
```
❌ Lỗi Cú Pháp flowchartData
Không thể parse flowchartData

Chi tiết: Unexpected token ',' at position 123

🔍 Kiểm tra:
• Thiếu/thừa dấu phẩy (,)
• Thiếu/thừa dấu ngoặc ({, }, [, ])
• Tên biến không tồn tại
• Cú pháp JavaScript không hợp lệ
```

**Chi tiết hiển thị**:
- Error message từ JavaScript engine
- Gợi ý các lỗi thường gặp
- Số dòng (nếu có)

**Cách sửa**:
1. Đọc error message để biết vấn đề gì
2. Mở file bằng editor có syntax highlighting
3. Tìm vị trí lỗi (thường là thiếu/thừa dấu phẩy hoặc ngoặc)
4. Sửa và import lại

**Ví dụ lỗi thường gặp**:

```javascript
// ❌ Thiếu dấu phẩy
{
  "Test": {
    displayName: "Test"  // ← Thiếu dấu phẩy
    pdf: "Test.pdf"
  }
}

// ✅ Đúng
{
  "Test": {
    displayName: "Test",  // ← Có dấu phẩy
    pdf: "Test.pdf"
  }
}

// ❌ Thừa dấu phẩy cuối
{
  "Test": {
    displayName: "Test",
    pdf: "Test.pdf",  // ← Không nên có dấu phẩy cuối
  }
}

// ✅ Đúng (hoặc bỏ dấu phẩy)
{
  "Test": {
    displayName: "Test",
    pdf: "Test.pdf"  // ← Không có dấu phẩy
  }
}
```

---

### 5. ❌ Lỗi Đọc File (General Error)

**Khi nào xảy ra**: Lỗi không xác định khi đọc file

**Error Message**:
```
❌ Lỗi Đọc File
Có lỗi khi đọc và parse file

Chi tiết: [Error message]

Stack trace:
[Stack trace nếu có]
```

**Cách sửa**:
1. Đọc stack trace để hiểu vấn đề
2. Thử import file khác để test
3. Kiểm tra xem file có bị corrupt không
4. Dùng file backup

---

### 6. ✅ Import Thành Công!

**Khi nào xảy ra**: File được import thành công

**Success Message**:
```
✅ Import Thành Công!
Đã load file: loan-flowchart.js

Chi tiết:
• Số biến: 9
• Số nhóm: 1
• Số nodes: 7
```

**Thông tin hiển thị**:
- Tên file đã import
- Số biến được parse
- Số nhóm biến
- Số nodes trong flowchart

---

## 🎨 Giao Diện Error Modal

### Header:
- **Màu xanh** (bg-success) nếu thành công
- **Màu đỏ** (bg-danger) nếu lỗi
- Nút đóng (X) ở góc phải

### Body:
- **📋 Thông báo**: Message chính
- **📍 Vị trí lỗi**: Số dòng (nếu có)
- **🔍 Chi tiết**: Thông tin chi tiết về lỗi
- **💡 Gợi ý**: Các gợi ý để sửa lỗi (chỉ hiện khi lỗi)

### Footer:
- Nút "Đóng" để đóng modal

---

## 🔍 Debug Tips

### Tip 1: Sao chép error message
1. Click vào phần "Chi tiết" trong error modal
2. Ctrl+A để select all
3. Ctrl+C để copy
4. Paste vào text file để analyze

### Tip 2: Kiểm tra từng bước
File được parse theo thứ tự:
1. Parse groups (`// --- GROUP: ... ---`)
2. Parse constants (`const X = ...`)
3. Parse flowchartData (`const flowchartData = {...}`)

Nếu lỗi ở bước nào, error sẽ báo rõ.

### Tip 3: Validate file trước khi import
Mở file bằng VS Code và:
1. Install extension "JavaScript (ES6) code snippets"
2. Kiểm tra có lỗi syntax highlighting không
3. Nhấn Ctrl+Shift+P → "Format Document" để auto-format
4. Nếu có lỗi sẽ báo ngay

### Tip 4: Dùng online validator
Copy nội dung flowchartData vào:
- https://jsonlint.com/ (cho JSON)
- https://jshint.com/ (cho JavaScript)

---

## 📊 So Sánh: Trước vs Sau

| Trước | Sau |
|-------|-----|
| `alert("Lỗi đọc file: ...")` | Modal với title, message, details |
| Không biết lỗi ở đâu | Hiển thị số dòng lỗi |
| Không có gợi ý | Có gợi ý cách sửa |
| Chỉ có OK button | UI đẹp, dễ đọc |
| Không phân biệt loại lỗi | Phân loại rõ ràng |

---

## ⚡ Keyboard Shortcuts

- **ESC**: Đóng error modal (coming soon)
- **Enter**: Đóng error modal (coming soon)
- **Click ngoài modal**: Đóng modal

---

## 🆘 Vẫn Không Giải Quyết Được?

### Option 1: Dùng File Backup
```bash
# Khôi phục file backup
cp loan-flowchart.backup.js loan-flowchart.js
```

### Option 2: Tạo File Mới Từ Đầu
1. Copy template từ file cũ
2. Thêm từng phần một
3. Test sau mỗi lần thêm

### Option 3: Manual Debug
1. Comment out sections của flowchartData
2. Import từng phần để tìm đoạn bị lỗi
3. Sửa đoạn đó
4. Uncomment và test lại

---

## 📝 Best Practices

### ✅ NÊN:
- Backup file trước khi sửa
- Import thử sau mỗi lần sửa lớn
- Đọc kỹ error message
- Copy error để analyze sau

### ❌ KHÔNG NÊN:
- Bỏ qua error message
- Sửa nhiều chỗ cùng lúc mà không test
- Panic khi thấy lỗi đỏ
- Xóa file gốc mà không backup

---

## 🎓 Kết Luận

Error handling mới giúp:
- ✅ **Tìm lỗi nhanh hơn** - Biết chính xác lỗi ở đâu
- ✅ **Hiểu lỗi rõ hơn** - Chi tiết đầy đủ
- ✅ **Sửa lỗi dễ hơn** - Có gợi ý cụ thể
- ✅ **Tiết kiệm thời gian** - Không phải đoán mò

**→ Không còn lo lỗi "im lặng" nữa!** 🎉
