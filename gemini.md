Giao diện web:

HEADER: 10% đầu trang
Thành phần:
Bên trái là: logo (trong logo/logo-fecredit.svg)
bên phải là:
LOAN, CARD, XMTT, QUY ĐỊNH CHUNG, KHUYẾN MÃI, CHANGE LOG

Side bar: 20% bên trái trang

Chứa điêu kiện lọc theo flowchart:
trong file flowchart.md
Chi tiết điều kiện:

- làm theo dạng combobox
- sau khi chọn xong thì ra 1 combobox ở dưới để chọn các điều kiện con

vd: tại combobox 1 chọn "Thông tin chung" thì sẽ show ra menu 2 với các nội dung con theo flowchart

Phần còn lại body:
20% ở trên được chia đôi

- 50% là ô chứa XMTT
  - XMTT này sẽ dựa vào điều kiện tại side bar và flowchart.md mà trả kết quả
- 50% là ô chứa Lưu ý
  80$ còn lại ở dưới: sẽ iframe ra file pdf cùng tên trong thư mục pdfile

Bộ màu web: 81c753,009f52, nền F8F9FA

Nội dung thêm:

- khi click chọn vào: kênh thanh toán > Thanh toán trực tuyến > sẽ popup lên thông báo: " Thanh toán chuyển khoản qua VPbank được hoàn 5.000vnd vào tháng tiếp theo" (không phải là kiểu arlert mà là kiểu thông báo riêng, đẹp mắt, nhấp máy càng tốt)
- Mục lưu ý và XMTT tại body có thêm scoll bar để tránh nội dung bị tràn ra
- sidebar có thể thu vào bên trái hoặc mở ra tuỳ ý
- khi croll xuống để đọc nội dung thì header sẽ ẩn, khi scroll lên sẽ xuất hiện lại.
- phần iframe cho chiều dọc dài hơn để có thể dễ đọc hết nội dung của 1 trang dpf
- mục tiêu code cho người sau code có thể tự thêm, xoá các phần tử trong điều kiện nên làm đến đâu thì vui lòng note hướng dẫn vào.

- tất cả phản hồi phải đưa ra hướng xử ý và hỏi tôi có đồng ý không, nếu được đồng ý mới được code
