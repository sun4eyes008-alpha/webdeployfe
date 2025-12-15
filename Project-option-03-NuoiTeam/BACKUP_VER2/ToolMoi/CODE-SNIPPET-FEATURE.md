# 🎯 Tính Năng Mới: Code Snippet Highlighting

## ✨ Đã Thêm Gì?

Bây giờ khi có lỗi, **Error Modal sẽ hiển thị đoạn code bị lỗi và bôi vàng dòng lỗi**!

---

## 📸 Ví Dụ Trực Quan

### Trước (Chỉ có số dòng):
```
❌ Lỗi Cú Pháp flowchartData
📍 Dòng 41
🔍 Unexpected string
```
→ Bạn phải tự mở file và tìm dòng 41

---

### Sau (Có code snippet + highlight):
```
❌ Lỗi Cú Pháp flowchartData

📍 Vị trí lỗi:
Dòng 41

📄 Code tại vị trí lỗi:
┌─────────────────────────────────────────────────────┐
│  38   "Hợp tác kinh doanh": {                       │
│  39     "displayName": "Hợp tác kinh doanh",        │
│  40     "pdf": "Hợp tác kinh doanh.pdf",            │
│ ▶41     "note": "111111"Thông tin...",  ← LỖI!     │ 🟡
│  42     "xmtt": XMTT_1                              │
│  43   },                                            │
│  44   "Xóa Dữ Liệu Cá Nhân": {                      │
└─────────────────────────────────────────────────────┘
█ Dòng được đánh dấu vàng là vị trí lỗi
```
→ Bạn **thấy ngay** code bị lỗi mà không cần mở file!

---

## 🎨 UI Design

### Màu Sắc:
- **Background**: Đen (#000) như terminal
- **Line numbers**: Xám nhạt
- **Code thông thường**: Trắng
- **Dòng lỗi**: 
  - Background: Vàng mờ (warning bg-opacity-25)
  - Border left: Vàng đậm (4px)
  - Text: Vàng + bold

### Font:
- Consolas, Monaco, monospace
- Font size: 13px
- Giống như code editor thật

### Layout:
```
┌─────────────────────────────────────┐
│ 📄 Code tại vị trí lỗi:             │
├─────────────────────────────────────┤
│ ┌─ Code Block (Dark Theme) ────┐   │
│ │  38  ...normal code...        │   │
│ │  39  ...normal code...        │   │
│ │  40  ...normal code...        │   │
│ │▶ 41  ...ERROR LINE...     🟡  │   │ ← Highlighted
│ │  42  ...normal code...        │   │
│ │  43  ...normal code...        │   │
│ │  44  ...normal code...        │   │
│ └───────────────────────────────┘   │
│ █ Dòng được đánh dấu vàng là lỗi   │
└─────────────────────────────────────┘
```

---

## 🔍 Context Lines

**Mặc định**: Hiển thị **3 dòng trước** và **3 dòng sau** dòng lỗi

Có thể thay đổi trong code:
```javascript
// toolclaude.html
codeSnippet: getCodeSnippet(content, lineNumber, 3)
//                                              ↑ số dòng context
```

---

## 📋 Các Trường Hợp Sử Dụng

### Case 1: Thiếu Dấu Phẩy
**File lỗi**:
```javascript
{
  "Test": {
    displayName: "Test"  // ← Thiếu dấu phẩy
    pdf: "Test.pdf"
  }
}
```

**Code snippet hiển thị**:
```
  1  {
  2    "Test": {
▶ 3      displayName: "Test"  🟡 ← Highlight vàng
  4      pdf: "Test.pdf"
  5    }
  6  }
```

---

### Case 2: String Không Đóng
**File lỗi**:
```javascript
{
  "note": "Hello world  // ← Thiếu dấu ngoặc kép đóng
}
```

**Code snippet hiển thị**:
```
  1  {
▶ 2    "note": "Hello world  🟡 ← Highlight vàng
  3  }
```

---

### Case 3: Biến Không Tồn Tại
**File lỗi**:
```javascript
const flowchartData = {
  "test": {
    note: UNDEFINED_VARIABLE  // ← Biến không được khai báo
  }
}
```

**Code snippet hiển thị**:
```
  1  const flowchartData = {
  2    "test": {
▶ 3      note: UNDEFINED_VARIABLE  🟡 ← Highlight vàng
  4    }
  5  }
```

---

## 🎯 Lợi Ích

### 1. Tiết Kiệm Thời Gian ⚡
- **Trước**: Xem error → Mở file → Tìm dòng → Đọc code
- **Sau**: Xem error → Thấy ngay code trong modal!

### 2. Dễ Debug 🔍
- Thấy context xung quanh dòng lỗi
- Hiểu ngay vấn đề là gì
- Không cần switch qua lại giữa windows

### 3. UX Tốt Hơn 🎨
- UI đẹp, giống code editor
- Highlight rõ ràng
- Line numbers dễ tham khảo

---

## 🧪 Test Tính Năng

### Bước 1: Tạo File Có Lỗi
```javascript
// test-error.js
const XMTT_1 = "Test";

const flowchartData = {
  "Test": {
    displayName: "Test"  // ← Thiếu dấu phẩy
    pdf: "Test.pdf"
  }
};
```

### Bước 2: Import Vào toolclaude.html
```
1. Mở toolclaude.html
2. Click "Tải file"
3. Chọn test-error.js
4. ✅ Sẽ thấy error modal với code snippet!
```

### Bước 3: Kiểm Tra
```
✅ Có section "📄 Code tại vị trí lỗi"
✅ Dòng lỗi được highlight vàng
✅ Có line numbers
✅ Background đen như terminal
✅ Có chú thích "█ Dòng được đánh dấu vàng..."
```

---

## 🔧 Kỹ Thuật Implementation

### Helper Function:
```javascript
const getCodeSnippet = (content, lineNumber, contextLines = 3) => {
  const lines = content.split('\n');
  const startLine = Math.max(0, lineNumber - contextLines - 1);
  const endLine = Math.min(lines.length, lineNumber + contextLines);
  
  const snippet = [];
  for (let i = startLine; i < endLine; i++) {
    snippet.push({
      lineNum: i + 1,           // 1-indexed line number
      content: lines[i],        // Code content
      isError: i + 1 === lineNumber  // Is this the error line?
    });
  }
  return snippet;
};
```

### Error Modal Render:
```jsx
{errorInfo.codeSnippet && (
  <div className="alert alert-light border mb-3">
    <h6 className="fw-bold mb-2">📄 Code tại vị trí lỗi:</h6>
    <div className="bg-dark text-white p-3 rounded">
      {errorInfo.codeSnippet.map((line, idx) => (
        <div
          key={idx}
          className={line.isError ? 'bg-warning bg-opacity-25' : ''}
          style={{ borderLeft: line.isError ? '4px solid #ffc107' : '' }}
        >
          <span className="text-secondary">{line.lineNum}</span>
          <span className={line.isError ? 'text-warning fw-bold' : ''}>
            {line.content}
          </span>
        </div>
      ))}
    </div>
  </div>
)}
```

---

## 📊 So Sánh: Trước vs Sau

| Tính năng | Trước | Sau |
|-----------|-------|-----|
| Hiển thị số dòng | ✅ | ✅ |
| Hiển thị code snippet | ❌ | ✅ |
| Highlight dòng lỗi | ❌ | ✅ |
| Line numbers | ❌ | ✅ |
| Context xung quanh | ❌ | ✅ (3 dòng trước/sau) |
| Syntax highlighting | ❌ | ⚠️ (màu cơ bản) |
| Copy code dễ dàng | ❌ | ✅ |

---

## 💡 Future Improvements

### Có thể thêm sau:
1. **Full syntax highlighting** (màu sắc cho keywords, strings, etc.)
2. **Copy button** để copy code snippet
3. **Line click** để scroll đến dòng đó (nếu có full editor)
4. **More context** option (hiển thị nhiều dòng hơn)
5. **Diff view** nếu có suggestion để sửa

---

## 🎉 Kết Luận

Tính năng **Code Snippet Highlighting** giúp:
- ✅ **Thấy ngay** code bị lỗi
- ✅ **Hiểu ngay** vấn đề
- ✅ **Sửa nhanh** hơn
- ✅ **UX tốt** hơn nhiều

**→ Không cần mở file để tìm lỗi nữa!** 🚀
