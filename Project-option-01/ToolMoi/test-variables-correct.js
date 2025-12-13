// ✅ ĐÚNG - File gốc phải viết KHÔNG CÓ QUOTES
const XMTT_0 = "This is the original content";
const XMTT_1 = XMTT_0;  // ← Không có dấu quotes, backticks, gì cả!

const NOTE_BASE = "Base note content";
const NOTE_COMMON = NOTE_BASE;  // ← Không có dấu quotes, backticks, gì cả!

const testData = {
    "Option 1": {
        displayName: "Test Option",
        pdf: "test.pdf",
        note: XMTT_1,
        xmttib: NOTE_COMMON,
        xmttecom: ""
    }
};
