/**
 * HƯỚNG DẪN CẬP NHẬT DỮ LIỆU FLOWCHART
 *
 * 1. CẤU TRÚC:
 *    - Dữ liệu được tổ chức dưới dạng một đối tượng (Object) lồng nhau.
 *    - "Value" (giá trị) có thể là một đối tượng con (nhánh) hoặc một đối tượng chứa thông tin điều kiện cuối (lá).
 *    - Điều kiện cuối (lá) phải chứa các thuộc tính: `pdf`, `note`, `xmtt`.
 *
 * 2. KHAI BÁO XMTT:
 *    - Các nội dung XMTT dùng chung được khai báo bằng biến hằng (const) ở đầu file.
 *    - Khi cần sửa nội dung một XMTT, chỉ cần sửa ở dòng khai báo tương ứng.
 */

// --- KHAI BÁO CÁC LOẠI XMTT DÙNG CHUNG ---
const XMTT_1 = "1. Không cần XMTT";
const XMTT_2 = "2. CMND/CCCD";
const XMTT_3 = "3. CCCD/CMND/SHD";
const XMTT_4 = "4. Đúng SĐT + CMND/CCCD + 1A";
const XMTT_5 = "5. Đúng SĐT + CMND + Sai 1A";
const XMTT_6 = "6. Đúng SĐT + CMND + 1A + 1B";
const XMTT_7 = "7. Đúng SĐT update + CMND + 2A + 1B";
const XMTT_8 =
  "8. Sai SĐT<br>  a. còn dùng SDT cũ: dùng đúng SDT gọi lại<br>  b. Không còn dùng SDT:<br>   - HĐ Closed hết: CMND/CCCD + 1A<br>   - HĐ còn mở: CMND/CCCD + 2A  đồng thời hướng dẫn cập nhật SDT.";
const XMTT_9 = "9. Sai SĐT + CMND + 1A";

window.flowchartData = {
  "1. THÔNG TIN CHUNG": {
    "Thông tin công ty": {
      displayName: "Thông tin công ty",
      pdf: "Thông tin công ty.pdf",
      note: '<div\n  style="line-height:90%;margin-top:10.0pt;margin-bottom:0pt;margin-left:.38in;text-indent:-.38in;text-align:left;"\n  data-pasted="true"><span style="font-size:8px;"><span\n      style="font-family:Calibri;">⁻</span></span><span\n    style="font-size:8px;font-family:Calibri;color:red;">Asdasdasdsdasdasd</span><span\n    style="font-size:8px;font-family:Calibri;color:black;">&nbsp;:</span><span\n    style="font-size:8px;font-family:Calibri;color:black;">asdasdasdsadaskugdasjgdjasgdjashdasdasdadasndghasd</span>\n</div>\n<div\n  style="line-height:90%;margin-top:10.0pt;margin-bottom:0pt;margin-left:.38in;text-indent:-.38in;text-align:left;">\n  <span style="font-size:8px;"><span\n      style="font-family:Calibri;">⁻</span></span><span\n    style="font-size:8px;font-family:Calibri;color:black;">Asdasjkhdgasjhgjashdgjhgahjsgdhasdasdasd</span>\n</div>\n<div\n  style="line-height:90%;margin-top:10.0pt;margin-bottom:0pt;margin-left:.38in;text-indent:-.38in;text-align:left;">\n  <span style="font-size:8px;"><span\n      style="font-family:Calibri;">⁻</span></span></div>\n<div\n  style="line-height:90%;margin-top:10.0pt;margin-bottom:0pt;margin-left:.38in;text-indent:-.38in;text-align:left;">\n  <span style="font-size:8px;"><span\n      style="font-family:Calibri;">⁻</span></span></div>\n<div\n  style="line-height:90%;margin-top:10.0pt;margin-bottom:0pt;margin-left:.38in;text-indent:-.38in;text-align:left;">\n  <span style="font-size:8px;"><span\n      style="font-family:Calibri;">⁻</span></span><span\n    style="font-size:8px;font-family:Calibri;color:black;">Asd</span></div>\n<div\n  style="line-height:90%;margin-top:10.0pt;margin-bottom:0pt;margin-left:.38in;text-indent:-.38in;text-align:left;">\n  <span style="font-size:8px;"><span\n      style="font-family:Calibri;">⁻</span></span><span\n    style="font-size:8px;font-family:Calibri;color:black;">Asd</span></div>\n<div\n  style="line-height:90%;margin-top:10.0pt;margin-bottom:0pt;margin-left:.38in;text-indent:-.38in;text-align:left;">\n  <span style="font-size:8px;"><span\n      style="font-family:Calibri;">⁻</span></span><span\n    style="font-size:8px;font-family:Calibri;color:black;">Asd</span></div>\n<div\n  style="line-height:90%;margin-top:10.0pt;margin-bottom:0pt;margin-left:.38in;text-indent:-.38in;text-align:left;">\n  <span style="font-size:8px;"><span\n      style="font-family:Calibri;">⁻</span></span><span\n    style="font-size:8px;font-family:Calibri;color:black;">asaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</span>\n</div>',
      xmtt: "1. Không cần XMTT",
      xmttib:
        '<div\n  style="line-height:90%;margin-top:10.0pt;margin-bottom:0pt;margin-left:.38in;text-indent:-.38in;text-align:left;"\n  data-pasted="true"><span style="font-size:8px;"><span\n      style="font-family:Calibri;">⁻</span></span><span\n    style="font-size:8px;font-family:Calibri;color:red;">Asdasdasdsdasdasd</span><span\n    style="font-size:8px;font-family:Calibri;color:black;">&nbsp;:</span><span\n    style="font-size:8px;font-family:Calibri;color:black;">asdasdasdsadaskugdasjgdjasgdjashdasdasdadasndghasd</span>\n</div>\n<div\n  style="line-height:90%;margin-top:10.0pt;margin-bottom:0pt;margin-left:.38in;text-indent:-.38in;text-align:left;">\n  <span style="font-size:8px;"><span\n      style="font-family:Calibri;">⁻</span></span><span\n    style="font-size:8px;font-family:Calibri;color:black;">Asdasjkhdgasjhgjashdgjhgahjsgdhasdasdasd</span>\n</div>\n<div\n  style="line-height:90%;margin-top:10.0pt;margin-bottom:0pt;margin-left:.38in;text-indent:-.38in;text-align:left;">\n  <span style="font-size:8px;"><span\n      style="font-family:Calibri;">⁻</span></span></div>\n<div\n  style="line-height:90%;margin-top:10.0pt;margin-bottom:0pt;margin-left:.38in;text-indent:-.38in;text-align:left;">\n  <span style="font-size:8px;"><span\n      style="font-family:Calibri;">⁻</span></span></div>\n<div\n  style="line-height:90%;margin-top:10.0pt;margin-bottom:0pt;margin-left:.38in;text-indent:-.38in;text-align:left;">\n  <span style="font-size:8px;"><span\n      style="font-family:Calibri;">⁻</span></span><span\n    style="font-size:8px;font-family:Calibri;color:black;">Asd</span></div>\n<div\n  style="line-height:90%;margin-top:10.0pt;margin-bottom:0pt;margin-left:.38in;text-indent:-.38in;text-align:left;">\n  <span style="font-size:8px;"><span\n      style="font-family:Calibri;">⁻</span></span><span\n    style="font-size:8px;font-family:Calibri;color:black;">Asd</span></div>\n<div\n  style="line-height:90%;margin-top:10.0pt;margin-bottom:0pt;margin-left:.38in;text-indent:-.38in;text-align:left;">\n  <span style="font-size:8px;"><span\n      style="font-family:Calibri;">⁻</span></span><span\n    style="font-size:8px;font-family:Calibri;color:black;">Asd</span></div>\n<div\n  style="line-height:90%;margin-top:10.0pt;margin-bottom:0pt;margin-left:.38in;text-indent:-.38in;text-align:left;">\n  <span style="font-size:8px;"><span\n      style="font-family:Calibri;">⁻</span></span><span\n    style="font-size:8px;font-family:Calibri;color:black;">asaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</span>\n</div>',
    },
    "Hợp tác kinh doanh": {
      displayName: "Hợp tác kinh doanh",
      pdf: "Hợp tác kinh doanh.pdf",
      note: '<div\n  style="line-height:90%;margin-top:10.0pt;margin-bottom:0pt;margin-left:.38in;text-indent:-.38in;text-align:left;"\n  data-pasted="true"><span style="font-size:8px;"><span\n      style="font-family:Calibri;">⁻</span></span><span\n    style="font-size:8px;font-family:Calibri;color:red;">Asdasdasdsdasdasd</span><span\n    style="font-size:8px;font-family:Calibri;color:black;">&nbsp;:</span><span\n    style="font-size:8px;font-family:Calibri;color:black;">asdasdasdsadaskugdasjgdjasgdjashdasdasdadasndghasd</span>\n</div>\n<div\n  style="line-height:90%;margin-top:10.0pt;margin-bottom:0pt;margin-left:.38in;text-indent:-.38in;text-align:left;">\n  <span style="font-size:8px;"><span\n      style="font-family:Calibri;">⁻</span></span><span\n    style="font-size:8px;font-family:Calibri;color:black;">Asdasjkhdgasjhgjashdgjhgahjsgdhasdasdasd</span>\n</div>\n<div\n  style="line-height:90%;margin-top:10.0pt;margin-bottom:0pt;margin-left:.38in;text-indent:-.38in;text-align:left;">\n  <span style="font-size:8px;"><span\n      style="font-family:Calibri;">⁻</span></span><span\n    style="font-size:8px;font-family:Calibri;color:black;">Asdasdasdadasdasdsad</span><span\n    style="font-size:8px;font-family:Calibri;color:black;">(</span><span\n    style="font-size:8px;font-family:Calibri;color:black;">gsgdfgdfg</span><span\n    style="font-size:8px;font-family:Calibri;color:black;">)</span><span\n    style="font-size:8px;font-family:Calibri;color:black;">asdasdadadasd</span><span\n    style="font-size:8px;font-family:Calibri;color:black;">@@@@</span></div>\n<div\n  style="line-height:90%;margin-top:10.0pt;margin-bottom:0pt;margin-left:.38in;text-indent:-.38in;text-align:left;">\n  <span style="font-size:8px;"><span\n      style="font-family:Calibri;">⁻</span></span><span\n    style="font-size:8px;font-family:Calibri;color:black;">3123654!@#%!#%#&amp;!!$!@~~~</span>\n</div>\n<div\n  style="line-height:90%;margin-top:10.0pt;margin-bottom:0pt;margin-left:.38in;text-indent:-.38in;text-align:left;">\n  <span style="font-size:8px;"><span\n      style="font-family:Calibri;">⁻</span></span><span\n    style="font-size:8px;font-family:Calibri;color:black;">Asdasdasda</span>\n</div>\n<div\n  style="line-height:90%;margin-top:10.0pt;margin-bottom:0pt;margin-left:.38in;text-indent:-.38in;text-align:left;">\n  <span style="font-size:8px;"><span\n      style="font-family:Calibri;">⁻</span></span><span\n    style="font-size:8px;font-family:Calibri;color:black;">Asd</span><span\n    style="font-size:8px;font-family:Calibri;color:black;">&nbsp;</span><span\n    style="font-size:8px;font-family:Calibri;color:black;">asdasdasdsad</span><span\n    style="font-size:8px;font-family:Calibri;color:black;">&nbsp;</span><span\n    style="font-size:8px;font-family:Calibri;color:black;">asad&rdquo;asdsadadasd</span><span\n    style="font-size:8px;font-family:Calibri;color:black;">&rdquo; ~~</span>\n</div>\n<div\n  style="line-height:90%;margin-top:10.0pt;margin-bottom:0pt;margin-left:.38in;text-indent:-.38in;text-align:left;">\n  <span style="font-size:8px;"><span\n      style="font-family:Calibri;">⁻</span></span><span\n    style="font-size:8px;font-family:Calibri;color:black;">Asd</span><span\n    style="font-size:8px;font-family:Calibri;color:black;">&nbsp;&nbsp;</span><span\n    style="font-size:8px;font-family:Calibri;color:black;">asdasdasdasdasd</span><span\n    style="font-size:8px;font-family:Calibri;color:black;">&nbsp;as(</span><span\n    style="font-size:8px;font-family:Calibri;color:black;">fthdfghfghhfhfh</span><span\n    style="font-size:8px;font-family:Calibri;color:black;">)</span></div>\n<div\n  style="line-height:90%;margin-top:10.0pt;margin-bottom:0pt;margin-left:.38in;text-indent:-.38in;text-align:left;">\n  <span style="font-size:8px;"><span\n      style="font-family:Calibri;">⁻</span></span><span\n    style="font-size:8px;font-family:Calibri;color:black;">asaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</span>\n</div>',
      xmtt: "1. Không cần XMTT",
      xmttib:
        "``Asdasdasdsdasdasd :asdasdasdsadaskugdasjgdjasgdjashdasdasdadasndghasd\nAsdasjkhdgasjhgjashdgjhgahjsgdhasdasdasd\nAsdasdasdadasdasdsad(gsgdfgdfg)asdasdadadasd@@@@``````3123654!@#%!#%#&!!$!@~~~\nAsdasdasda\nAsd asdasdasdsad asad”asdsadadasd” ~~\nAsd  asdasdasdasdasd as(fthdfghfghhfhfh)\nasaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\n",
      xmttecom:
        '```<div\n  style="line-height:90%;margin-top:10.0pt;margin-bottom:0pt;margin-left:.38in;text-indent:-.38in;text-align:left;"\n  data-pasted="true"><span style="font-size:8px;"><span\n      style="font-family:Calibri;">⁻</span></span><span\n    style="font-size:8px;font-family:Calibri;color:red;">Asdasdasdsdasdasd</span><span\n    style="font-size:8px;font-family:Calibri;color:black;">&nbsp;:</span><span\n    style="font-size:8px;font-family:Calibri;color:black;">asdasdasdsadaskugdasjgdjasgdjashdasdasdadasndghasd</span>\n</div>\n<div\n  style="line-height:90%;margin-top:10.0pt;margin-bottom:0pt;margin-left:.38in;text-indent:-.38in;text-align:left;">\n  <span style="font-size:8px;"><span\n      style="font-family:Calibri;">⁻</span></span><span\n    style="font-size:8px;font-family:Calibri;color:black;">Asdasjkhdgasjhgjashdgjhgahjsgdhasdasdasd</span>\n</div>\n<div\n  style="line-height:90%;margin-top:10.0pt;margin-bottom:0pt;margin-left:.38in;text-indent:-.38in;text-align:left;">\n  <span style="font-size:8px;"><span\n      style="font-family:Calibri;">⁻</span></span><span\n    style="font-size:8px;font-family:Calibri;color:black;">Asdasdasdadasdasdsad</span><span\n    style="font-size:8px;font-family:Calibri;color:black;">(</span><span\n    style="font-size:8px;font-family:Calibri;color:black;">gsgdfgdfg</span><span\n    style="font-size:8px;font-family:Calibri;color:black;">)</span><span\n    style="font-size:8px;font-family:Calibri;color:black;">asdasdadadasd</span><span\n    style="font-size:8px;font-family:Calibri;color:black;">@@@@</span></div>\n<div\n  style="line-height:90%;margin-top:10.0pt;margin-bottom:0pt;margin-left:.38in;text-indent:-.38in;text-align:left;">\n  <span style="font-size:8px;"><span\n      style="font-family:Calibri;">⁻</span></span><span\n    style="font-size:8px;font-family:Calibri;color:black;">3123654!@#%!#%#&amp;!!$!@~~~</span>\n</div>\n<div\n  style="line-height:90%;margin-top:10.0pt;margin-bottom:0pt;margin-left:.38in;text-indent:-.38in;text-align:left;">\n  <span style="font-size:8px;"><span\n      style="font-family:Calibri;">⁻</span></span><span\n    style="font-size:8px;font-family:Calibri;color:black;">Asdasdasda</span>\n</div>\n<div\n  style="line-height:90%;margin-top:10.0pt;margin-bottom:0pt;margin-left:.38in;text-indent:-.38in;text-align:left;">\n  <span style="font-size:8px;"><span\n      style="font-family:Calibri;">⁻</span></span><span\n    style="font-size:8px;font-family:Calibri;color:black;">Asd</span><span\n    style="font-size:8px;font-family:Calibri;color:black;">&nbsp;</span><span\n    style="font-size:8px;font-family:Calibri;color:black;">asdasdasdsad</span><span\n    style="font-size:8px;font-family:Calibri;color:black;">&nbsp;</span><span\n    style="font-size:8px;font-family:Calibri;color:black;">asad&rdquo;asdsadadasd</span><span\n    style="font-size:8px;font-family:Calibri;color:black;">&rdquo; ~~</span>\n</div>\n<div\n  style="line-height:90%;margin-top:10.0pt;margin-bottom:0pt;margin-left:.38in;text-indent:-.38in;text-align:left;">\n  <span style="font-size:8px;"><span\n      style="font-family:Calibri;">⁻</span></span><span\n    style="font-size:8px;font-family:Calibri;color:black;">Asd</span><span\n    style="font-size:8px;font-family:Calibri;color:black;">&nbsp;&nbsp;</span><span\n    style="font-size:8px;font-family:Calibri;color:black;">asdasdasdasdasd</span><span\n    style="font-size:8px;font-family:Calibri;color:black;">&nbsp;as(</span><span\n    style="font-size:8px;font-family:Calibri;color:black;">fthdfghfghhfhfh</span><span\n    style="font-size:8px;font-family:Calibri;color:black;">)</span></div>\n<div\n  style="line-height:90%;margin-top:10.0pt;margin-bottom:0pt;margin-left:.38in;text-indent:-.38in;text-align:left;">\n  <span style="font-size:8px;"><span\n      style="font-family:Calibri;">⁻</span></span><span\n    style="font-size:8px;font-family:Calibri;color:black;">asaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</span>\n</div>```',
    },
    "Xóa Dữ Liệu Cá Nhân": {
      displayName: "Xóa Dữ Liệu Cá Nhân",
      pdf: "Xóa Dữ Liệu Cá Nhân.pdf",
      note: "Hướng dẫn thực hiện yêu cầu xóa dữ liệu cá nhân theo quy định.",
      xmtt: "1. Không cần XMTT",
    },
    "Mở Chặn Cuộc Gọi": {
      displayName: "Mở Chặn Cuộc Gọi",
      pdf: "Mở Chặn Cuộc Gọi.pdf",
      note: "N/A",
      xmtt: "1. Không cần XMTT",
    },
    "Ngừng Mời Vay/QC": {
      displayName: "Ngừng Mời Vay/QC",
      pdf: "Ngừng Mời Vay_QC.pdf",
      note: "N/A",
      xmtt: "1. Không cần XMTT",
    },
    "Khuyến Mãi": {
      displayName: "Khuyến Mãi",
      pdf: "Khuyến Mãi.pdf",
      note: "N/A",
      xmtt: "1. Không cần XMTT",
    },
  },
  "2. THÔNG TIN SẢN PHẨM": {
    "Vay Mua Xe Máy": {
      pdf: "Sản Phẩm Vay Mua Xe Máy.pdf",
      note: "N/A",
      xmtt: "1. Không cần XMTT",
    },
    "Vay Mua Điện Máy": {
      pdf: "Sản Phẩm Vay Mua Điện Máy.pdf",
      note: "N/A",
      xmtt: "1. Không cần XMTT",
    },
    "Vay Tiền Mặt": {
      pdf: "Sản Phẩm Vay Tiền Mặt.pdf",
      note: "N/A",
      xmtt: "1. Không cần XMTT",
    },
  },
  "3. ĐĂNG KÝ VAY": {
    "Vay Mua Xe Máy": {
      displayName: "Đăng ký vay mua xe máy",
      pdf: "Vay Sản Phẩm Vay Mua Xe Máy.pdf",
      note: "N/A",
      xmtt: "1. Không cần XMTT",
    },
    "Vay Mua Điện Máy": {
      displayName: "Đăng ký vay mua điện máy",
      pdf: "Vay Sản Phẩm Vay Mua Điện Máy.pdf",
      note: "N/A",
      xmtt: "1. Không cần XMTT",
    },
    "Vay Tiền Mặt": {
      pdf: "Vay Sản Phẩm Vay Tiền Mặt.pdf",
      note: "N/A",
      xmtt: "1. Không cần XMTT",
      displayName: "Đăng ký vay tiền mặt",
    },
  },
  "4. GIẢI NGÂN": {
    "Giải Ngân Tiền Mặt": {
      pdf: "Giải Ngân Tiền Mặt.pdf",
      note: "N/A",
      xmtt: "1. Không cần XMTT",
    },
  },
  "5. KÊNH THANH TOÁN": {
    "Thanh toán trực tuyến": {
      pdf: "THANH TOÁN TRỰC TUYẾN.pdf",
      note: "Thanh toán chuyển khoản qua VPbank được hoàn 5.000vnd vào tháng tiếp theo.\n                    </br> Lưu ý: Chuyển khoản đúng số hợp đồng và tên người vay.\n                    </br> Lưu ý: Chuyển khoản đúng số hợp đồng và tên người vay.\n                    </br> Lưu ý: Chuyển khoản đúng số hợp đồng và tên người vay.\n                    </br> Lưu ý: Chuyển khoản đúng số hợp đồng và tên người vay.\n                    </br> Lưu ý: Chuyển khoản đúng số hợp đồng và tên người vay.\n                    </br> Lưu ý: Chuyển khoản đúng số hợp đồng và tên người vay.\n                    </br> Lưu ý: Chuyển khoản đúng số hợp đồng và tên người vay.",
      xmtt: "1. Không cần XMTT",
      alert:
        "Thanh toán chuyển khoản qua VPbank được hoàn 5.000vnd vào tháng tiếp theo",
    },
    "Thanh toán tiền mặt": {
      pdf: "THANH TOÁN TIỀN MẶT.pdf",
      note: "N/A",
      xmtt: "1. Không cần XMTT",
    },
    "Thanh toán qua ATM/CDM": {
      pdf: "THANH TOÁN QUA ATM CDM.pdf",
      note: "N/A",
      xmtt: "1. Không cần XMTT",
    },
    "Trích nợ tự động": {
      pdf: "TRÍCH NỢ TỰ ĐỘNG.pdf",
      note: "N/A",
      xmtt: "1. Không cần XMTT",
    },
  },
  "6. THANH TOÁN + CIC": {
    "Lịch Trả Nợ": {
      "HĐ FEC": {
        pdf: "IB Dung SDT.pdf",
        note: "N/A",
        xmtt: "4. Đúng SĐT + CMND/CCCD + 1A",
      },
      "Cash 24": {
        pdf: "HD Cash 24.pdf",
        note: "N/A",
        xmtt: "1. Không cần XMTT",
      },
      "Kim An": {
        pdf: "HĐ Kim An.pdf",
        note: "Lưu ý cho hợp đồng Kim An.",
        xmtt: "2. CMND/CCCD",
      },
      "Bán Nợ Một Phần": {
        pdf: "HĐ Bán Nợ Một Phần.pdf",
        note: "N/A",
        xmtt: "4. Đúng SĐT + CMND/CCCD + 1A",
      },
      "Bán Nợ Galaxy": {
        pdf: "HĐ Bán Nợ Galaxy.pdf",
        note: "N/A",
        xmtt: "4. Đúng SĐT + CMND/CCCD + 1A",
      },
      "Bán Nợ Fc Sold_Azura": {
        pdf: "HĐ Bán Nợ Fc Sold_Azura.pdf",
        note: "N/A",
        xmtt: "4. Đúng SĐT + CMND/CCCD + 1A",
      },
      "Bán Nợ Welcome Vina": {
        pdf: "HĐ Bán Nợ Welcome Vina.pdf",
        note: "N/A",
        xmtt: "4. Đúng SĐT + CMND/CCCD + 1A",
      },
    },
    "Lịch Sử TT": {
      "HĐ FEC": {
        pdf: "IB Dung SDT.pdf",
        note: "N/A",
        xmtt: "4. Đúng SĐT + CMND/CCCD + 1A",
      },
      "Cash 24": {
        pdf: "HD Cash 24.pdf",
        note: "N/A",
        xmtt: "1. Không cần XMTT",
      },
      "Kim An": {
        pdf: "HĐ Kim An.pdf",
        note: "Lưu ý cho hợp đồng Kim An.",
        xmtt: "2. CMND/CCCD",
      },
      "Bán Nợ Một Phần": {
        pdf: "HĐ Bán Nợ Một Phần.pdf",
        note: "N/A",
        xmtt: "4. Đúng SĐT + CMND/CCCD + 1A",
      },
      "Bán Nợ Galaxy": {
        pdf: "HĐ Bán Nợ Galaxy.pdf",
        note: "N/A",
        xmtt: "4. Đúng SĐT + CMND/CCCD + 1A",
      },
      "Bán Nợ Fc Sold_Azura": {
        pdf: "HĐ Bán Nợ Fc Sold_Azura.pdf",
        note: "N/A",
        xmtt: "4. Đúng SĐT + CMND/CCCD + 1A",
      },
      "Bán Nợ Welcome Vina": {
        pdf: "HĐ Bán Nợ Welcome Vina.pdf",
        note: "N/A",
        xmtt: "4. Đúng SĐT + CMND/CCCD + 1A",
      },
    },
    "Thanh Lý HĐ": {
      "HĐ FEC": {
        pdf: "IB Dung SDT.pdf",
        note: "N/A",
        xmtt: "4. Đúng SĐT + CMND/CCCD + 1A",
      },
      "Cash 24": {
        pdf: "HD Cash 24.pdf",
        note: "N/A",
        xmtt: "1. Không cần XMTT",
      },
      "Kim An": {
        pdf: "HĐ Kim An.pdf",
        note: "Lưu ý cho hợp đồng Kim An.",
        xmtt: "2. CMND/CCCD",
      },
      "Bán Nợ Một Phần": {
        pdf: "HĐ Bán Nợ Một Phần.pdf",
        note: "N/A",
        xmtt: "4. Đúng SĐT + CMND/CCCD + 1A",
      },
      "Bán Nợ Galaxy": {
        pdf: "HĐ Bán Nợ Galaxy.pdf",
        note: "N/A",
        xmtt: "4. Đúng SĐT + CMND/CCCD + 1A",
      },
      "Bán Nợ Fc Sold_Azura": {
        pdf: "HĐ Bán Nợ Fc Sold_Azura.pdf",
        note: "N/A",
        xmtt: "4. Đúng SĐT + CMND/CCCD + 1A",
      },
      "Bán Nợ Welcome Vina": {
        pdf: "HĐ Bán Nợ Welcome Vina.pdf",
        note: "N/A",
        xmtt: "4. Đúng SĐT + CMND/CCCD + 1A",
      },
    },
    "Thỏa Thuận KV": {
      "HĐ FEC": {
        pdf: "IB Dung SDT.pdf",
        note: "N/A",
        xmtt: "8. Sai SĐT\n  a. còn dùng SDT cũ: dùng đúng SDT gọi lại\n  b. Không còn dùng SDT:\n   - HĐ Closed hết: CMND/CCCD + 1A\n   - HĐ còn mở: CMND/CCCD + 2A  đồng thời hướng dẫn cập nhật SDT.",
      },
      "Cash 24": {
        pdf: "HD Cash 24.pdf",
        note: "N/A",
        xmtt: "1. Không cần XMTT",
      },
      "Kim An": {
        pdf: "HĐ Kim An.pdf",
        note: "Lưu ý cho hợp đồng Kim An.",
        xmtt: "2. CMND/CCCD",
      },
      "Bán Nợ Một Phần": {
        pdf: "HĐ Bán Nợ Một Phần.pdf",
        note: "N/A",
        xmtt: "4. Đúng SĐT + CMND/CCCD + 1A",
      },
      "Bán Nợ Galaxy": {
        pdf: "HĐ Bán Nợ Galaxy.pdf",
        note: "N/A",
        xmtt: "4. Đúng SĐT + CMND/CCCD + 1A",
      },
      "Bán Nợ Fc Sold_Azura": {
        pdf: "HĐ Bán Nợ Fc Sold_Azura.pdf",
        note: "N/A",
        xmtt: "4. Đúng SĐT + CMND/CCCD + 1A",
      },
      "Bán Nợ Welcome Vina": {
        pdf: "HĐ Bán Nợ Welcome Vina.pdf",
        note: "N/A",
        xmtt: "4. Đúng SĐT + CMND/CCCD + 1A",
      },
    },
    "Tình Trạng HĐ": {
      "HĐ FEC": {
        pdf: "IB Dung SDT.pdf",
        note: "N/A",
        xmtt: "8. Sai SĐT\n  a. còn dùng SDT cũ: dùng đúng SDT gọi lại\n  b. Không còn dùng SDT:\n   - HĐ Closed hết: CMND/CCCD + 1A\n   - HĐ còn mở: CMND/CCCD + 2A  đồng thời hướng dẫn cập nhật SDT.",
      },
      "Cash 24": {
        pdf: "HD Cash 24.pdf",
        note: "N/A",
        xmtt: "1. Không cần XMTT",
      },
      "Kim An": {
        pdf: "HĐ Kim An.pdf",
        note: "Lưu ý cho hợp đồng Kim An.",
        xmtt: "2. CMND/CCCD",
      },
      "Bán Nợ Một Phần": {
        pdf: "HĐ Bán Nợ Một Phần.pdf",
        note: "N/A",
        xmtt: "4. Đúng SĐT + CMND/CCCD + 1A",
      },
      "Bán Nợ Galaxy": {
        pdf: "HĐ Bán Nợ Galaxy.pdf",
        note: "N/A",
        xmtt: "4. Đúng SĐT + CMND/CCCD + 1A",
      },
      "Bán Nợ Fc Sold_Azura": {
        pdf: "HĐ Bán Nợ Fc Sold_Azura.pdf",
        note: "N/A",
        xmtt: "4. Đúng SĐT + CMND/CCCD + 1A",
      },
      "Bán Nợ Welcome Vina": {
        pdf: "HĐ Bán Nợ Welcome Vina.pdf",
        note: "N/A",
        xmtt: "4. Đúng SĐT + CMND/CCCD + 1A",
      },
    },
    "Đóng HĐ": {
      "HĐ FEC": {
        pdf: "IB Dung SDT.pdf",
        note: "N/A",
        xmtt: "4. Đúng SĐT + CMND/CCCD + 1A",
      },
      "Cash 24": {
        pdf: "HD Cash 24.pdf",
        note: "N/A",
        xmtt: "1. Không cần XMTT",
      },
      "Kim An": {
        pdf: "HĐ Kim An.pdf",
        note: "Lưu ý cho hợp đồng Kim An.",
        xmtt: "2. CMND/CCCD",
      },
      "Bán Nợ Một Phần": {
        pdf: "HĐ Bán Nợ Một Phần.pdf",
        note: "N/A",
        xmtt: "4. Đúng SĐT + CMND/CCCD + 1A",
      },
      "Bán Nợ Galaxy": {
        pdf: "HĐ Bán Nợ Galaxy.pdf",
        note: "N/A",
        xmtt: "4. Đúng SĐT + CMND/CCCD + 1A",
      },
      "Bán Nợ Fc Sold_Azura": {
        pdf: "HĐ Bán Nợ Fc Sold_Azura.pdf",
        note: "N/A",
        xmtt: "4. Đúng SĐT + CMND/CCCD + 1A",
      },
      "Bán Nợ Welcome Vina": {
        pdf: "HĐ Bán Nợ Welcome Vina.pdf",
        note: "N/A",
        xmtt: "4. Đúng SĐT + CMND/CCCD + 1A",
      },
    },
    CIC: {
      "HĐ FEC": {
        pdf: "IB Dung SDT.pdf",
        note: "N/A",
        xmtt: "4. Đúng SĐT + CMND/CCCD + 1A",
      },
      "Cash 24": {
        pdf: "HD Cash 24.pdf",
        note: "N/A",
        xmtt: "1. Không cần XMTT",
      },
      "Kim An": {
        pdf: "HĐ Kim An.pdf",
        note: "Lưu ý cho hợp đồng Kim An.",
        xmtt: "2. CMND/CCCD",
      },
      "Bán Nợ Một Phần": {
        pdf: "HĐ Bán Nợ Một Phần.pdf",
        note: "N/A",
        xmtt: "4. Đúng SĐT + CMND/CCCD + 1A",
      },
      "Bán Nợ Galaxy": {
        pdf: "HĐ Bán Nợ Galaxy.pdf",
        note: "N/A",
        xmtt: "4. Đúng SĐT + CMND/CCCD + 1A",
      },
      "Bán Nợ Fc Sold_Azura": {
        pdf: "HĐ Bán Nợ Fc Sold_Azura.pdf",
        note: "N/A",
        xmtt: "4. Đúng SĐT + CMND/CCCD + 1A",
      },
      "Bán Nợ Welcome Vina": {
        pdf: "HĐ Bán Nợ Welcome Vina.pdf",
        note: "N/A",
        xmtt: "4. Đúng SĐT + CMND/CCCD + 1A",
      },
    },
  },
  "7. Test": {
    "7.1. Mục con Test": {
      pdf: "Test.pdf",
      note: "Đây là ghi chú cho mục test.",
      xmttib: "Nội dung cho IB ở mục Test.",
      xmttecom: "Nội dung cho ECOM ở mục Test.",
    },
  },
};
