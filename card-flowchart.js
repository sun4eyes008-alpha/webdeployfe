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

// Default
const XMTT_1 = "1. Không cần XMTT";
const XMTT_2 = "2. CMND/CCCD";
const XMTT_3 = "3. CCCD/CMND/SHD";
const XMTT_4 = "4. Đúng SĐT + CMNaaaaaaaaaaaD/CCCD + 1A";
const XMTT_5 = "5. Đúng SĐT + CMND + Sai 1A";
const XMTT_6 = "6. Đúng SĐT + CMND + 1A + 1B";
const XMTT_7 = "7. Đúng SĐT update + CMND + 2A + 1B";
const XMTT_8 = "8. Sai SĐT<br>  a. còn dùng SDT cũ: dùng đúng SDT gọi lại<br>  b. Không còn dùng SDT:<br>   - HĐ Closed hết: CMND/CCCD + 1A<br>   - HĐ còn mở: CMND/CCCD + 2A  đồng thời hướng dẫn cập nhật SDT.";
const XMTT_9 = "9. Sai SĐT + CMND + 1A";

window.cardFlowchartData = {
  "1. THÔNG TIN CHUNG": {
    "Thông tin công ty": {
      displayName: "Thông tin công ty",
      pdf: "toolclaude.html",
      note: "Các thông tin cơ bản về công ty.",
    },
    "Hợp tác kinh doanh": {
      displayName: "Hợp tác kinh doanh",
      pdf: "Hợp tác kinh doanh.pdf",
      note: "Thông tin dành cho đối tác muốn hợp tác kinh doanh.",
    },
    "Xóa Dữ Liệu Cá Nhân": {
      displayName: "Xóa Dữ Liệu Cá Nhân",
      pdf: "Xóa Dữ Liệu Cá Nhân.pdf",
      note: "Hướng dẫn thực hiện yêu cầu xóa dữ liệu cá nhân theo quy định.",
    },
    "Mở Chặn Cuộc Gọi": {
      displayName: "Mở Chặn Cuộc Gọi",
      pdf: "Mở Chặn Cuộc Gọi.pdf",
      note: "N/A",
    },
    "Ngừng Mời Vay/QC": {
      displayName: "Ngừng Mời Vay/QC",
      pdf: "Ngừng Mời Vay_QC.pdf",
      note: "N/A",
    },
    "Khuyến Mãi": {
      displayName: "Khuyến Mãi",
      pdf: "Khuyến Mãi.pdf",
      note: "N/A",
    }
  },
  "2. THÔNG TIN SẢN PHẨM": {
    "Vay Mua Xe Máy": {
      displayName: "Thông tin sản phẩm > Vay Mua Xe Máy",
      pdf: "Sản Phẩm Vay Mua Xe Máy.pdf",
      note: "N/A",
    },
    "Vay Mua Điện Máy": {
      displayName: "Thông tin sản phẩm > Vay Mua Điện Máy",
      pdf: "Sản Phẩm Vay Mua Điện Máy.pdf",
      note: "N/A",
    },
    "Vay Tiền Mặt": {
      displayName: "Thông tin sản phẩm > Vay Tiền Mặt",
      pdf: "Sản Phẩm Vay Tiền Mặt.pdf",
      note: "N/A",
    }
  },
  "3. ĐĂNG KÝ VAY": {
    "Vay Mua Xe Máy": {
      displayName: "Đăng ký vay > Vay Mua Xe Máy",
      pdf: "Vay Sản Phẩm Vay Mua Xe Máy.pdf",
      note: "N/A",
    },
    "Vay Mua Điện Máy": {
      displayName: "Đăng ký vay > Vay Mua Điện Máy",
      pdf: "Vay Sản Phẩm Vay Mua Điện Máy.pdf",
      note: "N/A",
    },
    "Vay Tiền Mặt": {
      displayName: "Đăng ký vay PL",
      pdf: "Vay Sản Phẩm Vay Tiền Mặt.pdf",
      note: "N/A",
    }
  },
  "4. GIẢI NGÂN": {
    "Giải Ngân Tiền Mặt": {
      displayName: "Giải Ngân Tiền Mặt",
      pdf: "Giải Ngân Tiền Mặt.pdf",
      note: "N/A",
    }
  },
  "5. KÊNH THANH TOÁN": {
    "TT TRỰC TUYẾN": {
      displayName: "Kênh thanh toán > TT TRỰC TUYẾN",
      pdf: "THANH TOÁN TRỰC TUYẾN.pdf",
      note: `Thanh toán chuyển khoản qua VPbank được hoàn 5.000vnd vào tháng tiếp theo.
                    </br> Lưu ý: Chuyển khoản đúng số hợp đồng và tên người vay.
                    </br> Lưu ý: Chuyển khoản đúng số hợp đồng và tên người vay.
                    </br> Lưu ý: Chuyển khoản đúng số hợp đồng và tên người vay.
                    </br> Lưu ý: Chuyển khoản đúng số hợp đồng và tên người vay.
                    </br> Lưu ý: Chuyển khoản đúng số hợp đồng và tên người vay.
                    </br> Lưu ý: Chuyển khoản đúng số hợp đồng và tên người vay.
                    </br> Lưu ý: Chuyển khoản đúng số hợp đồng và tên người vay.`,
      alert: "Thanh toán chuyển khoản qua VPbank được hoàn 5.000vnd vào tháng tiếp theo",
    },
    "TT TIỀN MẶT": {
      displayName: "Kênh thanh toán > TT TIỀN MẶT",
      pdf: "THANH TOÁN TIỀN MẶT.pdf",
      note: "N/A",
    },
    "TT QUA ATM/CDM": {
      displayName: "Kênh thanh toán > TT QUA ATM/CDM",
      pdf: "THANH TOÁN QUA ATM CDM.pdf",
      note: "N/A",
    },
    "TRÍCH NỢ TỰ ĐỘNG": {
      displayName: "Kênh thanh toán > TRÍCH NỢ TỰ ĐỘNG",
      pdf: "TRÍCH NỢ TỰ ĐỘNG.pdf",
      note: "N/A",
    }
  },
  "6. THANH TOÁN + CIC": {
    "Lịch Trả Nợ": {
      "HĐ FEC": { displayName: "Lịch Trả Nợ HĐ FEC", pdf: "IB Dung SDT.pdf", note: "N/A", xmtt: XMTT_4 },
      "Cash 24": { displayName: "Lịch Trả Nợ Cash 24", pdf: "HD Cash 24.pdf", note: "N/A", xmtt: XMTT_1 },
      "Kim An": {
        displayName: "Lịch Trả Nợ Kim An",
        pdf: "HĐ Kim An.pdf",
        note: "Lưu ý cho hợp đồng Kim An.",
      },
      "Bán Nợ Một Phần": {
        displayName: "Lịch Trả Nợ Bán Nợ Một Phần",
        pdf: "HĐ Bán Nợ Một Phần.pdf",
        note: "N/A",
      },
      "Bán Nợ Galaxy": {
        displayName: "Lịch Trả Nợ Bán Nợ Galaxy",
        pdf: "HĐ Bán Nợ Galaxy.pdf",
        note: "N/A",
      },
      "Bán Nợ Fc Sold_Azura": {
        displayName: "Lịch Trả Nợ Bán Nợ Fc Sold_Azura",
        pdf: "HĐ Bán Nợ Fc Sold_Azura.pdf",
        note: "N/A",
      },
      "Bán Nợ Welcome Vina": {
        displayName: "Lịch Trả Nợ Bán Nợ Welcome Vina",
        pdf: "HĐ Bán Nợ Welcome Vina.pdf",
        note: "N/A",
      }
    },
    "Lịch Sử TT": {
      "HĐ FEC": { displayName: "Lịch Sử TT HĐ FEC", pdf: "IB Dung SDT.pdf", note: "N/A", xmtt: XMTT_4 },
      "Cash 24": { displayName: "Lịch Sử TT Cash 24", pdf: "HD Cash 24.pdf", note: "N/A", xmtt: XMTT_1 },
      "Kim An": {
        displayName: "Lịch Sử TT Kim An",
        pdf: "HĐ Kim An.pdf",
        note: "Lưu ý cho hợp đồng Kim An.",
      },
      "Bán Nợ Một Phần": {
        displayName: "Lịch Sử TT Bán Nợ Một Phần",
        pdf: "HĐ Bán Nợ Một Phần.pdf",
        note: "N/A",
      },
      "Bán Nợ Galaxy": {
        displayName: "Lịch Sử TT Bán Nợ Galaxy",
        pdf: "HĐ Bán Nợ Galaxy.pdf",
        note: "N/A",
      },
      "Bán Nợ Fc Sold_Azura": {
        displayName: "Lịch Sử TT Bán Nợ Fc Sold_Azura",
        pdf: "HĐ Bán Nợ Fc Sold_Azura.pdf",
        note: "N/A",
      },
      "Bán Nợ Welcome Vina": {
        displayName: "Lịch Sử TT Bán Nợ Welcome Vina",
        pdf: "HĐ Bán Nợ Welcome Vina.pdf",
        note: "N/A",
      }
    },
    "Thanh Lý HĐ": {
      "HĐ FEC": { displayName: "Thanh Lý HĐ FEC", pdf: "IB Dung SDT.pdf", note: "N/A", xmtt: XMTT_4 },
      "Cash 24": { displayName: "Thanh Lý HĐ Cash 24", pdf: "HD Cash 24.pdf", note: "N/A", xmtt: XMTT_1 },
      "Kim An": {
        displayName: "Thanh Lý HĐ Kim An",
        pdf: "HĐ Kim An.pdf",
        note: "Lưu ý cho hợp đồng Kim An.",
      },
      "Bán Nợ Một Phần": {
        displayName: "Thanh Lý HĐ Bán Nợ Một Phần",
        pdf: "HĐ Bán Nợ Một Phần.pdf",
        note: "N/A",
      },
      "Bán Nợ Galaxy": {
        displayName: "Thanh Lý HĐ Bán Nợ Galaxy",
        pdf: "HĐ Bán Nợ Galaxy.pdf",
        note: "N/A",
      },
      "Bán Nợ Fc Sold_Azura": {
        displayName: "Thanh Lý HĐ Bán Nợ Fc Sold_Azura",
        pdf: "HĐ Bán Nợ Fc Sold_Azura.pdf",
        note: "N/A",
      },
      "Bán Nợ Welcome Vina": {
        displayName: "Thanh Lý HĐ Bán Nợ Welcome Vina",
        pdf: "HĐ Bán Nợ Welcome Vina.pdf",
        note: "N/A",
      }
    },
    "Thỏa Thuận KV": {
      "HĐ FEC": {
        displayName: "Thỏa Thuận KV HĐ FEC",
        pdf: "IB Dung SDT.pdf",
        note: "N/A",
      },
      "Cash 24": {
        displayName: "Thỏa Thuận KV Cash 24",
        pdf: "HD Cash 24.pdf",
        note: "N/A",
      },
      "Kim An": {
        displayName: "Thỏa Thuận KV Kim An",
        pdf: "HĐ Kim An.pdf",
        note: "Lưu ý cho hợp đồng Kim An.",
      },
      "Bán Nợ Một Phần": {
        displayName: "Thỏa Thuận KV Bán Nợ Một Phần",
        pdf: "HĐ Bán Nợ Một Phần.pdf",
        note: "N/A",
      },
      "Bán Nợ Galaxy": {
        displayName: "Thỏa Thuận KV Bán Nợ Galaxy",
        pdf: "HĐ Bán Nợ Galaxy.pdf",
        note: "N/A",
      },
      "Bán Nợ Fc Sold_Azura": {
        displayName: "Thỏa Thuận KV Bán Nợ Fc Sold_Azura",
        pdf: "HĐ Bán Nợ Fc Sold_Azura.pdf",
        note: "N/A",
      },
      "Bán Nợ Welcome Vina": {
        displayName: "Thỏa Thuận KV Bán Nợ Welcome Vina",
        pdf: "HĐ Bán Nợ Welcome Vina.pdf",
        note: "N/A",
      }
    },
    "Tình Trạng HĐ": {
      "HĐ FEC": {
        displayName: "Tình Trạng HĐ FEC",
        pdf: "IB Dung SDT.pdf",
        note: "N/A",
      },
      "Cash 24": {
        displayName: "Tình Trạng HĐ Cash 24",
        pdf: "HD Cash 24.pdf",
        note: "N/A",
      },
      "Kim An": {
        displayName: "Tình Trạng HĐ Kim An",
        pdf: "HĐ Kim An.pdf",
        note: "Lưu ý cho hợp đồng Kim An.",
      },
      "Bán Nợ Một Phần": {
        displayName: "Tình Trạng HĐ Bán Nợ Một Phần",
        pdf: "HĐ Bán Nợ Một Phần.pdf",
        note: "N/A",
      },
      "Bán Nợ Galaxy": {
        displayName: "Tình Trạng HĐ Bán Nợ Galaxy",
        pdf: "HĐ Bán Nợ Galaxy.pdf",
        note: "N/A",
      },
      "Bán Nợ Fc Sold_Azura": {
        displayName: "Tình Trạng HĐ Bán Nợ Fc Sold_Azura",
        pdf: "HĐ Bán Nợ Fc Sold_Azura.pdf",
        note: "N/A",
      },
      "Bán Nợ Welcome Vina": {
        displayName: "Tình Trạng HĐ Bán Nợ Welcome Vina",
        pdf: "HĐ Bán Nợ Welcome Vina.pdf",
        note: "N/A",
      }
    },
    "Đóng HĐ": {
      "HĐ FEC": { displayName: "Đóng HĐ FEC", pdf: "IB Dung SDT.pdf", note: "N/A", xmtt: XMTT_4 },
      "Cash 24": { displayName: "Đóng HĐ Cash 24", pdf: "HD Cash 24.pdf", note: "N/A", xmtt: XMTT_1 },
      "Kim An": {
        displayName: "Đóng HĐ Kim An",
        pdf: "HĐ Kim An.pdf",
        note: "Lưu ý cho hợp đồng Kim An.",
      },
      "Bán Nợ Một Phần": {
        displayName: "Đóng HĐ Bán Nợ Một Phần",
        pdf: "HĐ Bán Nợ Một Phần.pdf",
        note: "N/A",
      },
      "Bán Nợ Galaxy": {
        displayName: "Đóng HĐ Bán Nợ Galaxy",
        pdf: "HĐ Bán Nợ Galaxy.pdf",
        note: "N/A",
      },
      "Bán Nợ Fc Sold_Azura": {
        displayName: "Đóng HĐ Bán Nợ Fc Sold_Azura",
        pdf: "HĐ Bán Nợ Fc Sold_Azura.pdf",
        note: "N/A",
      },
      "Bán Nợ Welcome Vina": {
        displayName: "Đóng HĐ Bán Nợ Welcome Vina",
        pdf: "HĐ Bán Nợ Welcome Vina.pdf",
        note: "N/A",
      }
    },
    CIC: {
      "HĐ FEC": { displayName: "CIC HĐ FEC", pdf: "IB Dung SDT.pdf", note: "N/A", xmtt: XMTT_4 },
      "Cash 24": { displayName: "CIC Cash 24", pdf: "HD Cash 24.pdf", note: "N/A", xmtt: XMTT_1 },
      "Kim An": {
        displayName: "CIC Kim An",
        pdf: "HĐ Kim An.pdf",
        note: "Lưu ý cho hợp đồng Kim An.",
      },
      "Bán Nợ Một Phần": {
        displayName: "CIC Bán Nợ Một Phần",
        pdf: "HĐ Bán Nợ Một Phần.pdf",
        note: "N/A",
      },
      "Bán Nợ Galaxy": {
        displayName: "CIC Bán Nợ Galaxy",
        pdf: "HĐ Bán Nợ Galaxy.pdf",
        note: "N/A",
      },
      "Bán Nợ Fc Sold_Azura": {
        displayName: "CIC Bán Nợ Fc Sold_Azura",
        pdf: "HĐ Bán Nợ Fc Sold_Azura.pdf",
        note: "N/A",
      },
      "Bán Nợ Welcome Vina": {
        displayName: "CIC Bán Nợ Welcome Vina",
        pdf: "HĐ Bán Nợ Welcome Vina.pdf",
        note: "N/A",
      }
    }
  },
  "7. Test": {
    "7.1. Mục con Test": {
      displayName: "Test > Mục con Test",
      pdf: "Test.pdf",
      note: "Đây là ghi chú cho mục test.",
      xmttib: "Nội dung cho IB ở mục Test.",
      xmttecom: "Nội dung cho ECOM ở mục Test."
    }
  },
};
