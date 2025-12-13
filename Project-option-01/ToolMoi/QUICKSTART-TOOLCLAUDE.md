# 🚀 QUICK START: Sửa loan-flowchart.js An Toàn

## TL;DR - Làm Gì?
Thay vì sửa trực tiếp file `loan-flowchart.js` (dễ lỗi), dùng `toolclaude.html` để sửa trong GUI.

---

## ⚡ 3 Bước Cơ Bản

### 1️⃣ MỞ EDITOR
- Double click vào file `toolclaude.html` 
- Hoặc kéo thả vào browser (Chrome, Edge, Firefox)

### 2️⃣ IMPORT FILE
- Click nút **"Tải file"**
- Chọn `loan-flowchart.js`
- Đợi load xong

### 3️⃣ SỬA & EXPORT
- Sửa bất cứ thứ gì bạn muốn (xem hướng dẫn bên dưới)
- Click **"Lưu File"**
- File mới sẽ download: `loan-flowchart-final.js`
- Đổi tên thành `loan-flowchart.js` và thay thế file cũ

---

## 📝 Các Thao Tác Chính

### A. Sửa Biến XMTT (Ví dụ: XMTT_1, XMTT_8, ...)

```
1. Click nút "Quản lý Biến"
2. Tìm biến cần sửa (VD: XMTT_8)
3. Click vào textarea bên phải
4. Sửa nội dung (có thể nhiều dòng, có thể dùng HTML)
5. Click "X" để đóng modal (tự động lưu)
```

**✨ Ưu điểm**: Sửa 1 lần, tất cả chỗ dùng biến đó đều được cập nhật!

### B. Thêm Nhánh Mới

```
1. Tìm nhánh cha (VD: "6. THANH TOÁN + CIC")
2. Click nút "Thêm nhánh con"
3. Nhập tên: "Tên nhánh mới"
4. Enter → Done!
```

### C. Thêm Kết Quả (PDF/HTML)

```
1. Tìm nhánh cha
2. Click nút "Thêm PDF/HTML"
3. Nhập tên kết quả
4. Click icon ✏️ (màu xanh) để sửa chi tiết:
   - displayName: Tên hiển thị
   - pdf: Tên file PDF
   - note: Ghi chú
   - xmttib: Nội dung XMTT cho IB
   - xmttecom: Nội dung XMTT cho ECOM
5. Click "Lưu"
```

### D. Sửa Nội Dung Có Sẵn

```
1. Tìm item cần sửa trong tree
2. Click icon ✏️ (màu xanh)
3. Sửa trong modal
4. Click "Lưu"
```

### E. Xóa / Di Chuyển

```
- Xóa: Click icon 🗑️ (đỏ)
- Lên/Xuống: Click icon ⬆️⬇️
- Đổi tên: Click icon 🟣 (tím)
```

---

## ⚠️ Lưu Ý Quan Trọng

### ✅ CÓ NÊN:
- Backup file trước khi sửa: `cp loan-flowchart.js loan-flowchart.backup.js`
- Test sau khi export bằng cách mở HTML sử dụng flowchart
- Dùng HTML trong trường `note` nếu cần format phức tạp

### ❌ KHÔNG NÊN:
- Sửa trực tiếp file `loan-flowchart.js` (trừ khi bạn rất chắc chắn)
- Quên export sau khi sửa xong
- Deploy mà không test trước

---

## 🎯 Ví Dụ Thực Tế

### Tình huống 1: Sửa nội dung XMTT_8
**Trước đây**: Phải tìm dòng 22-23, sửa cẩn thận, dễ thiếu dấu ngoặc  
**Bây giờ**:
1. Mở toolclaude.html
2. Import loan-flowchart.js
3. Click "Quản lý Biến"
4. Sửa XMTT_8
5. Export
✅ Không sợ lỗi cú pháp!

### Tình huống 2: Thêm loại hợp đồng "Bán Nợ ABC"
**Trước đây**: Copy-paste 7 lần, dễ thiếu dấu phẩy  
**Bây giờ**:
1. Vào từng nhóm (Lịch Trả Nợ, Lịch Sử TT, ...)
2. Click "Thêm PDF/HTML"
3. Điền thông tin
4. Lặp lại cho các nhóm khác
✅ Editor tự động thêm dấu phẩy đúng chỗ!

---

## 🆘 Gặp Lỗi?

### "Lỗi cú pháp file JS"
→ File `loan-flowchart.js` đã lỗi từ trước, cần sửa thủ công hoặc dùng backup

### "Tên này đã tồn tại"
→ Đổi tên khác hoặc xóa node cũ

### Dropdown không hiện sau import lại
→ Đã fix, import lại và export lại là xong

---

## 📚 Tài Liệu Đầy Đủ

Xem chi tiết hơn tại: [`huong-dan-sua-flowchart.md`](file:///C:/Users/Sun/.gemini/antigravity/brain/8d377bd3-3fa3-4173-923e-d0f0995fa0a4/huong-dan-sua-flowchart.md)

---

## 💡 Tóm Tắt 1 Câu

**Dùng `toolclaude.html` để sửa `loan-flowchart.js` → Không lo lỗi cú pháp!** 🎉
