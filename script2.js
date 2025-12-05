document.addEventListener("DOMContentLoaded", () => {
  // Check if data is loaded
  if (typeof flowchartData === "undefined") {
    console.error(
      "Flowchart data not loaded. Make sure flowchart-data.js is included and correct."
    );
    return;
  }

  // --- DOM ELEMENT REFERENCES ---
  const dynamicFiltersContainer = document.getElementById(
    "dynamic-filters-container"
  );
  const xmttResult = document.getElementById("xmtt-result");
  const notesResult = document.getElementById("notes-result");
  const pdfViewer = document.getElementById("pdf-viewer");
  const sidebarToggle = document.getElementById("sidebar-toggle");
  const mainHeader = document.getElementById("main-header");
  const mainContent = document.getElementById("main-content");
  const body = document.body;
  const logoBtnElement = document.getElementById("logo-btn");
  const toastContainer = document.getElementById("toast-container");
  const overlay = document.getElementById("overlay");
  const headerSearch = document.getElementById("header-search");
  const searchResultsContainer = document.getElementById(
    "search-results-container"
  );

  // --- CONSTANTS AND STATE VARIABLES ---
  const FOLDER_MAP = {
    1: "THONG_TIN_CHUNG",
    2: "THONG_TIN_SAN_PHAM",
    3: "DANG_KY_VAY",
    4: "GIAI_NGAN",
    5: "KENH_THANH_TOAN",
    6: "THANH_TOAN_CIC",
  };
  const levelLabels = {
    1: "Chọn vấn đề:",
    2: "Chọn chi tiết vấn đề:",
    3: "Chọn loại HĐ:",
    4: "Chọn kênh:",
    5: "Chọn loại đầu vào:",
  };
  let flattenedFlowchartData = []; // For efficient searching

  // --- UTILITY FUNCTIONS ---
  function isObject(value) {
    return typeof value === "object" && value !== null;
  }

  function isLeaf(node) {
    return isObject(node) && node.pdf !== undefined;
  }

  /**
   * HƯỚNG DẪN CẬP NHẬT TÌM KIẾM
   * Hàm `flattenFlowchart` này duyệt qua toàn bộ cây dữ liệu `flowchartData`
   * và tạo ra một danh sách phẳng (`flattenedFlowchartData`) chứa tất cả
   * các đường dẫn đến file PDF.
   *
   * Mỗi khi bạn thêm/sửa/xóa một mục trong `flowchart-data.js`,
   * hàm này sẽ tự động cập nhật danh sách tìm kiếm khi trang được tải lại.
   * Bạn không cần phải chỉnh sửa gì ở đây. Chỉ cần đảm bảo dữ liệu trong
   * `flowchart-data.js` có cấu trúc đúng là được.
   */
  function flattenFlowchart(node, path = [], breadcrumb = []) {
    Object.keys(node).forEach((key) => {
      const newPath = [...path, key];
      const newBreadcrumb = [...breadcrumb, key.replace(/^\d+\.\s*/, "")]; // Remove numeric prefix for display
      const childNode = node[key];

      if (isLeaf(childNode)) {
        flattenedFlowchartData.push({
          path: newPath,
          pdfName: childNode.pdf || "",
          displayText: newBreadcrumb.join(" > "),
        });
      } else if (isObject(childNode)) {
        flattenFlowchart(childNode, newPath, newBreadcrumb);
      }
    });
  }

  // --- INITIALIZATION ---
  function initialize() {
    flattenFlowchart(flowchartData);
    createFirstLevelDropdown();
    setupEventListeners();
  }

  // --- SEARCH FUNCTIONALITY ---
  function searchFlowchartData(query) {
    if (!query) return [];
    const lowerQuery = query.toLowerCase();

    return flattenedFlowchartData.filter((item) => {
      const matchesDisplayText = item.displayText.toLowerCase().includes(lowerQuery);
      const matchesPdf = item.pdfName.toLowerCase().includes(lowerQuery);
      return matchesDisplayText || matchesPdf;
    });
  }

  function displaySearchResults(results) {
    searchResultsContainer.innerHTML = "";
    if (results.length === 0) {
      searchResultsContainer.classList.remove("show");
      return;
    }

    results.slice(0, 10).forEach((result) => {
      const resultItem = document.createElement("div");
      resultItem.className = "search-result-item";
      resultItem.textContent = result.displayText;
      resultItem.dataset.path = JSON.stringify(result.path);
      searchResultsContainer.appendChild(resultItem);
    });
    searchResultsContainer.classList.add("show");
  }

  function applySearchResult(path) {
    removeDropdowns(1); // Clear all dropdowns
    let currentDataNode = flowchartData;
    let lastKey = "";

    path.forEach((key, index) => {
      const level = index + 1;
      const options = Object.keys(currentDataNode);
      createDropdown(options, level, currentDataNode);
      const select = dynamicFiltersContainer.querySelector(
        `select[data-level="${level}"]`
      );
      if (select) {
        select.value = key;
        lastKey = key;
        currentDataNode = currentDataNode[key];
      }
    });

    if (isLeaf(currentDataNode)) {
      displayResult(currentDataNode, lastKey);
    }

    searchResultsContainer.classList.remove("show");
    headerSearch.value = "";
    headerSearch.blur();
  }

  // --- DROPDOWN AND SELECTION LOGIC ---
  function createFirstLevelDropdown() {
    dynamicFiltersContainer.innerHTML = "";
    createDropdown(Object.keys(flowchartData), 1, flowchartData);
  }

  function createDropdown(options, level, dataNode) {
    const filterGroup = document.createElement("div");
    filterGroup.className = "filter-group";

    const label = document.createElement("label");
    label.className = "filter-label";
    label.textContent = levelLabels[level] || `Cấp ${level}:`;
    filterGroup.appendChild(label);

    const select = document.createElement("select");
    select.className = "filter-select";
    select.dataset.level = level;
    select.innerHTML = '<option value="">-- Chọn --</option>';
    options.forEach((text) => {
      const option = document.createElement("option");
      option.value = text;
      option.textContent = text;
      select.appendChild(option);
    });
    select.addEventListener("change", (e) => handleSelection(e, level, dataNode));
    filterGroup.appendChild(select);
    dynamicFiltersContainer.appendChild(filterGroup);
  }

  function handleSelection(event, level, parentDataNode) {
    const selectedKey = event.target.value;
    removeDropdowns(level + 1);
    resetResults();

    if (!selectedKey) return;

    const selectedNode = parentDataNode[selectedKey];
    if (isLeaf(selectedNode)) {
      displayResult(selectedNode, selectedKey);
    } else if (isObject(selectedNode)) {
      createDropdown(Object.keys(selectedNode), level + 1, selectedNode);
    }
  }

  // --- UI AND EVENT LISTENERS SETUP ---
  function setupEventListeners() {
    sidebarToggle.addEventListener("click", () =>
      body.classList.toggle("sidebar-collapsed")
    );
    logoBtnElement?.addEventListener("click", () => location.reload());

    // Search listeners
    headerSearch.addEventListener("input", (e) => {
      const results = searchFlowchartData(e.target.value);
      displaySearchResults(results);
    });
    headerSearch.addEventListener("focus", (e) => {
      const results = searchFlowchartData(e.target.value);
      if (results.length > 0) searchResultsContainer.classList.add("show");
    });
    searchResultsContainer.addEventListener("mousedown", (e) => {
      const item = e.target.closest(".search-result-item");
      if (item?.dataset.path) applySearchResult(JSON.parse(item.dataset.path));
    });
    document.addEventListener("click", (e) => {
      if (!headerSearch.contains(e.target) && !searchResultsContainer.contains(e.target)) {
        searchResultsContainer.classList.remove("show");
      }
    });

    // Expand/Collapse and Overlay listeners
    document.querySelectorAll(".expand-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetBox = document.getElementById(btn.dataset.target);
        if (targetBox) {
          const isExpanded = targetBox.classList.toggle("expanded");
          overlay.classList.toggle("show", isExpanded);
          btn.textContent = isExpanded ? "✖" : "⤢";
        }
      });
    });
    overlay.addEventListener("click", () => {
      const expandedBox = document.querySelector(".sub-header-box.expanded");
      if (expandedBox) {
        expandedBox.classList.remove("expanded");
        overlay.classList.remove("show");
        expandedBox.querySelector(".expand-btn").textContent = "⤢";
      }
    });
  }

  // --- UI DISPLAY LOGIC ---
  function displayResult(resultObject, selectionText) {
    xmttResult.innerHTML = resultObject.xmtt ? `<p>${resultObject.xmtt}</p>` : "<p>Không yêu cầu XMTT.</p>";
    notesResult.innerHTML = resultObject.note ? `<p>${resultObject.note}</p>` : "<p>Không có lưu ý.</p>";

    if (resultObject.pdf) {
      const firstLevelSelect = dynamicFiltersContainer.querySelector('select[data-level="1"]');
      const categoryIndexMatch = firstLevelSelect?.value.match(/^(\d+)/);
      const folderName = categoryIndexMatch ? FOLDER_MAP[categoryIndexMatch[1]] : null;
      pdfViewer.src = folderName ? `./pdfile/${folderName}/${resultObject.pdf}` : `./pdfile/${resultObject.pdf}`;
    } else {
      pdfViewer.src = "";
    }

    if (resultObject.alert) {
      (Array.isArray(resultObject.alert) ? resultObject.alert : [resultObject.alert])
        .forEach(msg => showNotification(msg));
    }
  }

  function showNotification(message) {
    if (!toastContainer) return;
    const toast = document.createElement("div");
    toast.className = "notification-toast show";
    toast.innerHTML = `<p>${message}</p><button class="toast-close">✕</button>`;
    toast.querySelector('.toast-close').onclick = () => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 400);
    };
    toastContainer.appendChild(toast);
  }

  function resetResults() {
    xmttResult.innerHTML = "<p>Chọn điều kiện để xem kết quả</p>";
    notesResult.innerHTML = "<p>Thông báo và lưu ý sẽ hiển thị ở đây</p>";
    pdfViewer.src = "";
  }

  function removeDropdowns(startLevel) {
    dynamicFiltersContainer.querySelectorAll(".filter-group").forEach((group) => {
      const select = group.querySelector("select");
      if (parseInt(select.dataset.level) >= startLevel) group.remove();
    });
  }

  // --- START THE APP ---
  initialize();
});