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
      note: "Các thông tin cơ bản về công ty.",
      xmtt: XMTT_1,
    },
    "Hợp tác kinh doanh": {
      displayName: "Hợp tác kinh doanh",
      pdf: "Hợp tác kinh doanh.pdf",
      note: "Thông tin dành cho đối tác muốn hợp tác kinh doanh.",
      xmtt: XMTT_1,
    },
    "Xóa Dữ Liệu Cá Nhân": {
      displayName: "Xóa Dữ Liệu Cá Nhân",
      pdf: "Xóa Dữ Liệu Cá Nhân.pdf",
      note: "Hướng dẫn thực hiện yêu cầu xóa dữ liệu cá nhân theo quy định.",
      xmtt: XMTT_1,
    },
    "Mở Chặn Cuộc Gọi": {
      displayName: "Mở Chặn Cuộc Gọi",
      pdf: "Mở Chặn Cuộc Gọi.pdf",
      note: "N/A",
      xmtt: XMTT_1,
    },
    "Ngừng Mời Vay/QC": {
      displayName: "Ngừng Mời Vay/QC",
      pdf: "Ngừng Mời Vay_QC.pdf",
      note: "N/A",
      xmtt: XMTT_1,
    },
    "Khuyến Mãi": {
      displayName: "Khuyến Mãi",
      pdf: "Khuyến Mãi.pdf",
      note: "N/A",
      xmtt: XMTT_1,
    },
  },
  "2. THÔNG TIN SẢN PHẨM": {
    "Vay Mua Xe Máy": {
      pdf: "Sản Phẩm Vay Mua Xe Máy.pdf",
      note: "N/A",
      xmtt: XMTT_1,
    },
    "Vay Mua Điện Máy": {
      pdf: "Sản Phẩm Vay Mua Điện Máy.pdf",
      note: "N/A",
      xmtt: XMTT_1,
    },
    "Vay Tiền Mặt": {
      pdf: "Sản Phẩm Vay Tiền Mặt.pdf",
      note: "N/A",
      xmtt: XMTT_1,
    },
  },
  "3. ĐĂNG KÝ VAY": {
    "Vay Mua Xe Máy": {
      displayName: "Đăng ký vay mua xe máy",
      pdf: "Vay Sản Phẩm Vay Mua Xe Máy.pdf",
      note: "N/A",
      xmtt: XMTT_1,
    },
    "Vay Mua Điện Máy": {
      displayName: "Đăng ký vay mua điện máy",
      pdf: "Vay Sản Phẩm Vay Mua Điện Máy.pdf",
      note: "N/A",
      xmtt: XMTT_1,
    },
    "Vay Tiền Mặt": {
      pdf: "Vay Sản Phẩm Vay Tiền Mặt.pdf",
      note: "N/A",
      xmtt: XMTT_1,
      displayName: "Đăng ký vay tiền mặt",
    },
  },
  "4. GIẢI NGÂN": {
    "Giải Ngân Tiền Mặt": {
      pdf: "Giải Ngân Tiền Mặt.pdf",
      note: "N/A",
      xmtt: XMTT_1,
    },
  },
  "5. KÊNH THANH TOÁN": {
    "Thanh toán trực tuyến": {
      pdf: "THANH TOÁN TRỰC TUYẾN.pdf",
      note: `Thanh toán chuyển khoản qua VPbank được hoàn 5.000vnd vào tháng tiếp theo.
                    </br> Lưu ý: Chuyển khoản đúng số hợp đồng và tên người vay.
                    </br> Lưu ý: Chuyển khoản đúng số hợp đồng và tên người vay.
                    </br> Lưu ý: Chuyển khoản đúng số hợp đồng và tên người vay.
                    </br> Lưu ý: Chuyển khoản đúng số hợp đồng và tên người vay.
                    </br> Lưu ý: Chuyển khoản đúng số hợp đồng và tên người vay.
                    </br> Lưu ý: Chuyển khoản đúng số hợp đồng và tên người vay.
                    </br> Lưu ý: Chuyển khoản đúng số hợp đồng và tên người vay.`,
      xmtt: XMTT_1,
      alert:
        "Thanh toán chuyển khoản qua VPbank được hoàn 5.000vnd vào tháng tiếp theo",
    },
    "Thanh toán tiền mặt": {
      pdf: "THANH TOÁN TIỀN MẶT.pdf",
      note: "N/A",
      xmtt: XMTT_1,
    },
    "Thanh toán qua ATM/CDM": {
      pdf: "THANH TOÁN QUA ATM CDM.pdf",
      note: "N/A",
      xmtt: XMTT_1,
    },
    "Trích nợ tự động": {
      pdf: "TRÍCH NỢ TỰ ĐỘNG.pdf",
      note: "N/A",
      xmtt: XMTT_1,
    },
  },
  "6. THANH TOÁN + CIC": {
    "Lịch Trả Nợ": {
      "HĐ FEC": { pdf: "IB Dung SDT.pdf", note: "N/A", xmtt: XMTT_4 },
      "Cash 24": { pdf: "HD Cash 24.pdf", note: "N/A", xmtt: XMTT_1 },
      "Kim An": {
        pdf: "HĐ Kim An.pdf",
        note: "Lưu ý cho hợp đồng Kim An.",
        xmtt: XMTT_2,
      },
      "Bán Nợ Một Phần": {
        pdf: "HĐ Bán Nợ Một Phần.pdf",
        note: "N/A",
        xmtt: XMTT_4,
      },
      "Bán Nợ Galaxy": {
        pdf: "HĐ Bán Nợ Galaxy.pdf",
        note: "N/A",
        xmtt: XMTT_4,
      },
      "Bán Nợ Fc Sold_Azura": {
        pdf: "HĐ Bán Nợ Fc Sold_Azura.pdf",
        note: "N/A",
        xmtt: XMTT_4,
      },
      "Bán Nợ Welcome Vina": {
        pdf: "HĐ Bán Nợ Welcome Vina.pdf",
        note: "N/A",
        xmtt: XMTT_4,
      },
    },
    "Lịch Sử TT": {
      "HĐ FEC": { pdf: "IB Dung SDT.pdf", note: "N/A", xmtt: XMTT_4 },
      "Cash 24": { pdf: "HD Cash 24.pdf", note: "N/A", xmtt: XMTT_1 },
      "Kim An": {
        pdf: "HĐ Kim An.pdf",
        note: "Lưu ý cho hợp đồng Kim An.",
        xmtt: XMTT_2,
      },
      "Bán Nợ Một Phần": {
        pdf: "HĐ Bán Nợ Một Phần.pdf",
        note: "N/A",
        xmtt: XMTT_4,
      },
      "Bán Nợ Galaxy": {
        pdf: "HĐ Bán Nợ Galaxy.pdf",
        note: "N/A",
        xmtt: XMTT_4,
      },
      "Bán Nợ Fc Sold_Azura": {
        pdf: "HĐ Bán Nợ Fc Sold_Azura.pdf",
        note: "N/A",
        xmtt: XMTT_4,
      },
      "Bán Nợ Welcome Vina": {
        pdf: "HĐ Bán Nợ Welcome Vina.pdf",
        note: "N/A",
        xmtt: XMTT_4,
      },
    },
    "Thanh Lý HĐ": {
      "HĐ FEC": { pdf: "IB Dung SDT.pdf", note: "N/A", xmtt: XMTT_4 },
      "Cash 24": { pdf: "HD Cash 24.pdf", note: "N/A", xmtt: XMTT_1 },
      "Kim An": {
        pdf: "HĐ Kim An.pdf",
        note: "Lưu ý cho hợp đồng Kim An.",
        xmtt: XMTT_2,
      },
      "Bán Nợ Một Phần": {
        pdf: "HĐ Bán Nợ Một Phần.pdf",
        note: "N/A",
        xmtt: XMTT_4,
      },
      "Bán Nợ Galaxy": {
        pdf: "HĐ Bán Nợ Galaxy.pdf",
        note: "N/A",
        xmtt: XMTT_4,
      },
      "Bán Nợ Fc Sold_Azura": {
        pdf: "HĐ Bán Nợ Fc Sold_Azura.pdf",
        note: "N/A",
        xmtt: XMTT_4,
      },
      "Bán Nợ Welcome Vina": {
        pdf: "HĐ Bán Nợ Welcome Vina.pdf",
        note: "N/A",
        xmtt: XMTT_4,
      },
    },
    "Thỏa Thuận KV": {
      "HĐ FEC": { pdf: "IB Dung SDT.pdf", note: "N/A", xmtt: XMTT_8 },
      "Cash 24": { pdf: "HD Cash 24.pdf", note: "N/A", xmtt: XMTT_1 },
      "Kim An": {
        pdf: "HĐ Kim An.pdf",
        note: "Lưu ý cho hợp đồng Kim An.",
        xmtt: XMTT_2,
      },
      "Bán Nợ Một Phần": {
        pdf: "HĐ Bán Nợ Một Phần.pdf",
        note: "N/A",
        xmtt: XMTT_4,
      },
      "Bán Nợ Galaxy": {
        pdf: "HĐ Bán Nợ Galaxy.pdf",
        note: "N/A",
        xmtt: XMTT_4,
      },
      "Bán Nợ Fc Sold_Azura": {
        pdf: "HĐ Bán Nợ Fc Sold_Azura.pdf",
        note: "N/A",
        xmtt: XMTT_4,
      },
      "Bán Nợ Welcome Vina": {
        pdf: "HĐ Bán Nợ Welcome Vina.pdf",
        note: "N/A",
        xmtt: XMTT_4,
      },
    },
    "Tình Trạng HĐ": {
      "HĐ FEC": { pdf: "IB Dung SDT.pdf", note: "N/A", xmtt: XMTT_8 },
      "Cash 24": { pdf: "HD Cash 24.pdf", note: "N/A", xmtt: XMTT_1 },
      "Kim An": {
        pdf: "HĐ Kim An.pdf",
        note: "Lưu ý cho hợp đồng Kim An.",
        xmtt: XMTT_2,
      },
      "Bán Nợ Một Phần": {
        pdf: "HĐ Bán Nợ Một Phần.pdf",
        note: "N/A",
        xmtt: XMTT_4,
      },
      "Bán Nợ Galaxy": {
        pdf: "HĐ Bán Nợ Galaxy.pdf",
        note: "N/A",
        xmtt: XMTT_4,
      },
      "Bán Nợ Fc Sold_Azura": {
        pdf: "HĐ Bán Nợ Fc Sold_Azura.pdf",
        note: "N/A",
        xmtt: XMTT_4,
      },
      "Bán Nợ Welcome Vina": {
        pdf: "HĐ Bán Nợ Welcome Vina.pdf",
        note: "N/A",
        xmtt: XMTT_4,
      },
    },
    "Đóng HĐ": {
      "HĐ FEC": { pdf: "IB Dung SDT.pdf", note: "N/A", xmtt: XMTT_4 },
      "Cash 24": { pdf: "HD Cash 24.pdf", note: "N/A", xmtt: XMTT_1 },
      "Kim An": {
        pdf: "HĐ Kim An.pdf",
        note: "Lưu ý cho hợp đồng Kim An.",
        xmtt: XMTT_2,
      },
      "Bán Nợ Một Phần": {
        pdf: "HĐ Bán Nợ Một Phần.pdf",
        note: "N/A",
        xmtt: XMTT_4,
      },
      "Bán Nợ Galaxy": {
        pdf: "HĐ Bán Nợ Galaxy.pdf",
        note: "N/A",
        xmtt: XMTT_4,
      },
      "Bán Nợ Fc Sold_Azura": {
        pdf: "HĐ Bán Nợ Fc Sold_Azura.pdf",
        note: "N/A",
        xmtt: XMTT_4,
      },
      "Bán Nợ Welcome Vina": {
        pdf: "HĐ Bán Nợ Welcome Vina.pdf",
        note: "N/A",
        xmtt: XMTT_4,
      },
      "Cash 24": { pdf: "HD Cash 24.pdf", note: "N/A", xmtt: XMTT_1 },
      "Kim An": {
        pdf: "HĐ Kim An.pdf",
        note: "Lưu ý cho hợp đồng Kim An.",
        xmtt: XMTT_2,
      },
      "Bán Nợ Một Phần": {
        pdf: "HĐ Bán Nợ Một Phần.pdf",
        note: "N/A",
        xmtt: XMTT_4,
      },
      "Bán Nợ Galaxy": {
        pdf: "HĐ Bán Nợ Galaxy.pdf",
        note: "N/A",
        xmtt: XMTT_4,
      },
      "Bán Nợ Fc Sold_Azura": {
        pdf: "HĐ Bán Nợ Fc Sold_Azura.pdf",
        note: "N/A",
        xmtt: XMTT_4,
      },
      "Bán Nợ Welcome Vina": {
        pdf: "HĐ Bán Nợ Welcome Vina.pdf",
        note: "N/A",
        xmtt: XMTT_4,
      },
    },
    CIC: {
      "HĐ FEC": { pdf: "IB Dung SDT.pdf", note: "N/A", xmtt: XMTT_4 },
      "Cash 24": { pdf: "HD Cash 24.pdf", note: "N/A", xmtt: XMTT_1 },
      "Kim An": {
        pdf: "HĐ Kim An.pdf",
        note: "Lưu ý cho hợp đồng Kim An.",
        xmtt: XMTT_2,
      },
      "Bán Nợ Một Phần": {
        pdf: "HĐ Bán Nợ Một Phần.pdf",
        note: "N/A",
        xmtt: XMTT_4,
      },
      "Bán Nợ Galaxy": {
        pdf: "HĐ Bán Nợ Galaxy.pdf",
        note: "N/A",
        xmtt: XMTT_4,
      },
      "Bán Nợ Fc Sold_Azura": {
        pdf: "HĐ Bán Nợ Fc Sold_Azura.pdf",
        note: "N/A",
        xmtt: XMTT_4,
      },
      "Bán Nợ Welcome Vina": {
        pdf: "HĐ Bán Nợ Welcome Vina.pdf",
        note: "N/A",
        xmtt: XMTT_4,
      },
    },
  },
  "7. Test": {
    "7.1. Mục con Test": {
        pdf: "Test.pdf",
        note: "Đây là ghi chú cho mục test.",
        xmttib: "Nội dung cho IB ở mục Test.",
        xmttecom: "Nội dung cho ECOM ở mục Test."
    }
  },
};
