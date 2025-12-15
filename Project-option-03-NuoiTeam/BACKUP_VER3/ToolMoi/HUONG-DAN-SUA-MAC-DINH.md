# 🔧 Hướng Dẫn Sửa Mặc Định Quote Type

## Vị Trí File
`Tool/toolclaude.html`

---

## 1️⃣ Mặc Định Cho BIẾN (Variables Manager)

**Mặc định hiện tại**: Backtick (`)

**Để đổi thành Double Quote (")**:

1. Mở `Tool/toolclaude.html`
2. Tìm (Ctrl+F): `varQuoteTypes[key] || '\`'`
3. Đổi `'\`'` thành `'"'`

**Ví dụ**:
```javascript
// Hiện tại (mặc định backtick):
const quoteType = varQuoteTypes[key] || '`';

// Đổi thành double quote:
const quoteType = varQuoteTypes[key] || '"';
```

**Vị trí trong file**:
- Dòng ~560 (trong `handleDownload`)
- Dòng ~1157 (trong `ConstantsManager` UI)

---

## 2️⃣ Mặc Định Cho NỘI DUNG NODE 

Hiện tại flowchartData sử dụng JSON format, các field được xử lý tự động.

Để thêm dropdown cho Node Editor:
- Tìm phần `editingNode` modal (dòng ~1267)
- Thêm `<select>` tương tự như trong Variables Manager

---

## 3️⃣ Dropdown Options

| Option | Ký hiệu | Dùng cho |
|--------|---------|----------|
| Backtick | ` | HTML, multi-line |
| Double Quote | " | Text đơn giản |
| Variable | var | Tên biến (không export value) |

---

## 📝 Lưu Ý

- Thay đổi chỉ ảnh hưởng đến **file export**
- Data trong tool vẫn được lưu giống nhau
- Khi đổi mặc định, các biến mới sẽ dùng mặc định mới
- Biến cũ đã có selection sẽ giữ nguyên

---

## 🔍 Tìm Kiếm Nhanh

Trong VS Code, dùng Ctrl+F và tìm:
- `ĐỂ SỬA MẶC ĐỊNH` - Comments hướng dẫn trong code
- `varQuoteTypes` - State lưu quote type
- `quoteType ===` - Logic xử lý export
