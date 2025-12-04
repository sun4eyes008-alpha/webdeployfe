const flowchartData = {
    "1. THÔNG TIN CHUNG": {
        "Thông tin công ty": "Thông tin công ty.pdf",
        "Hợp tác kinh doanh": "Hợp tác kinh doanh.pdf",
        "Xóa Dữ Liệu Cá Nhân": "Xóa Dữ Liệu Cá Nhân.pdf",
        "Mở Chặn Cuộc Gọi": "Mở Chặn Cuộc Gọi.pdf",
        "Ngừng Mời Vay/QC": "Ngừng Mời Vay/QC.pdf",
        "Khuyến Mãi": "Khuyến Mãi.pdf"
    },
    "2. THÔNG TIN SẢN PHẨM": {
        "Vay Mua Xe Máy": "Sản Phẩm Vay Mua Xe Máy.pdf",
        "Vay Mua Điện Máy": "Sản Phẩm Vay Mua Điện Máy.pdf",
        "Vay Tiền Mặt": "Sản Phẩm Vay Tiền Mặt.pdf"
    },
    "3. ĐĂNG KÝ VAY": {
        "Vay Mua Xe Máy": "Vay Sản Phẩm Vay Mua Xe Máy.pdf",
        "Vay Mua Điện Máy": "Vay Sản Phẩm Vay Mua Điện Máy.pdf",
        "Vay Tiền Mặt": "Vay Sản Phẩm Vay Tiền Mặt.pdf"
    },
    "4. GIẢI NGÂN": {
        "Giải Ngân Tiền Mặt": "Giải Ngân Tiền Mặt.pdf"
    },
    "5. KÊNH THANH TOÁN": {
        "TT TRỰC TUYẾN": "THANH TOÁN TRỰC TUYẾN.pdf",
        "TT TIỀN MẶT": "THANH TOÁN TIỀN MẶT.pdf",
        "TT QUA ATM/CDM": "THANH TOÁN QUA ATM CDM.pdf",
        "TRÍCH NỢ TỰ ĐỘNG": "TRÍCH NỢ TỰ ĐỘNG.pdf"
    },
    "6. THANH TOÁN + CIC": {
        "Lịch Trả Nợ": {
            "Cash 24": "HD Cash 24.pdf",
            "Kim An": "HĐ Kim An.pdf",
            "Bán Nợ Một Phần": "HĐ Bán Nợ Một Phần.pdf",
            "Bán Nợ Galaxy": "HĐ Bán Nợ Galaxy.pdf",
            "Bán Nợ Fc Sold_Azura": "HĐ Bán Nợ Fc Sold_Azura.pdf",
            "Bán Nợ Welcome Vina": "HĐ Bán Nợ Welcome Vina.pdf",
            "HĐ FEC": {
                "Email": "Xem Slide 12+13",
                "Chat": {
                    "Post Login": "PDF Chat Post Login",
                    "Trường hợp khác": "Xem Slide 10+11"
                },
                "IB": {
                    "Đúng SĐT": "PDF IB Đúng SĐT",
                    "Sai SĐT": "PDF IB Sai SĐT"
                }
            }
        },
        "Lịch Sử TT": "deep",
        "Thanh Lý HĐ": "deep",
        "Thỏa Thuận KV": "deep",
        "Tình Trạng HĐ": "deep",
        "Đóng HĐ": "deep",
        "CIC": "deep"
    }
};

const xmttData = {
    "Thông tin công ty.pdf": "1. Không cần XMTT",
    "Hợp tác kinh doanh.pdf": "1. Không cần XMTT",
    "Xóa Dữ Liệu Cá Nhân.pdf": "1. Không cần XMTT",
    "Mở Chặn Cuộc Gọi.pdf": "1. Không cần XMTT",
    "Ngừng Mời Vay/QC.pdf": "1. Không cần XMTT",
    "Khuyến Mãi.pdf": "1. Không cần XMTT",
    "Sản Phẩm Vay Mua Xe Máy.pdf": "1. Không cần XMTT",
    "Sản Phẩm Vay Mua Điện Máy.pdf": "1. Không cần XMTT",
    "Sản Phẩm Vay Tiền Mặt.pdf": "1. Không cần XMTT",
    "Vay Sản Phẩm Vay Mua Xe Máy.pdf": "1. Không cần XMTT",
    "Vay Sản Phẩm Vay Mua Điện Máy.pdf": "1. Không cần XMTT",
    "Vay Sản Phẩm Vay Tiền Mặt.pdf": "1. Không cần XMTT",
    "Giải Ngân Tiền Mặt.pdf": "1. Không cần XMTT",
    "THANH TOÁN TRỰC TUYẾN.pdf": "1. Không cần XMTT",
    "THANH TOÁN TIỀN MẶT.pdf": "1. Không cần XMTT",
    "THANH TOÁN QUA ATM CDM.pdf": "1. Không cần XMTT",
    "TRÍCH NỢ TỰ ĐỘNG.pdf": "1. Không cần XMTT",
    "HD Cash 24.pdf": "1. Không cần XMTT",
    "HĐ Kim An.pdf": "2. CMND/CCCD",
    "HĐ Bán Nợ Một Phần.pdf": "4. Đúng SĐT + CMND/CCCD + 1A",
    "HĐ Bán Nợ Galaxy.pdf": "4. Đúng SĐT + CMND/CCCD + 1A",
    "HĐ Bán Nợ Fc Sold_Azura.pdf": "4. Đúng SĐT + CMND/CCCD + 1A",
    "HĐ Bán Nợ Welcome Vina.pdf": "4. Đúng SĐT + CMND/CCCD + 1A",
    "PDF Chat Post Login": "4. Đúng SĐT + CMND/CCCD + 1A",
    "PDF IB Đúng SĐT": "4. Đúng SĐT + CMND/CCCD + 1A",
    "PDF IB Sai SĐT": "4. Đúng SĐT + CMND/CCCD + 1A"
};
