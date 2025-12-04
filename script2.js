document.addEventListener("DOMContentLoaded", () => {
  // Check if data is loaded
  if (typeof flowchartData === "undefined") {
    console.error(
      "Flowchart data not loaded. Make sure flowchart-data.js is included and correct."
    );
    return;
  }

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

  const FOLDER_MAP = {
    1: "THONG_TIN_CHUNG",
    2: "THONG_TIN_SAN_PHAM",
    3: "DANG_KY_VAY",
    4: "GIAI_NGAN",
    5: "KENH_THANH_TOAN",
    6: "THANH_TOAN_CIC",
  };

  const overlay = document.getElementById("overlay");

  let lastScrollY = 0;
  let isHeaderHidden = false;

  // --- INITIALIZATION ---
  function initialize() {
    createFirstLevelDropdown();
    setupEventListeners();
  }

  const levelLabels = {
    1: "Chọn vấn đề:",
    2: "Chọn chi tiết vấn đề:",
    3: "Chọn loại HĐ:",
    4: "Chọn kênh:",
    5: "Chọn loại đầu vào:",
  };

  // --- DROPDOWN CREATION ---
  function createFirstLevelDropdown() {
    if (!dynamicFiltersContainer) return;
    dynamicFiltersContainer.innerHTML = ""; // Clear previous dropdowns
    const initialOptions = Object.keys(flowchartData);
    createDropdown(initialOptions, 1, flowchartData);
  }

  function createDropdown(options, level, dataNode) {
    const filterGroup = document.createElement("div");
    filterGroup.className = "filter-group";

    const label = document.createElement("label");
    label.className = "filter-label";
    label.textContent = levelLabels[level] || `Chọn điều kiện cấp ${level}:`;

    const select = document.createElement("select");
    select.className = "filter-select";
    select.dataset.level = level;

    select.innerHTML = '<option value="">-- Chọn --</option>';
    options.forEach((optionText) => {
      const option = document.createElement("option");
      option.value = optionText;
      option.textContent = optionText;
      select.appendChild(option);
    });

    select.addEventListener("change", (e) =>
      handleSelection(e, level, dataNode)
    );

    filterGroup.appendChild(label);
    filterGroup.appendChild(select);
    dynamicFiltersContainer.appendChild(filterGroup);
  }

  // --- EVENT HANDLING ---
  function handleSelection(event, level, parentDataNode) {
    const selectedKey = event.target.value;

    removeDropdowns(level + 1);
    resetResults();

    if (!selectedKey) return;

    const selectedValue = parentDataNode[selectedKey];

    if (typeof selectedValue === "object" && selectedValue !== null) {
      if (selectedValue.pdf !== undefined) {
        displayResult(selectedValue, selectedKey);
      } else {
        const nextOptions = Object.keys(selectedValue);
        createDropdown(nextOptions, level + 1, selectedValue);
      }
    } else if (typeof selectedValue === "string") {
      displayResult({ note: "Chức năng đang phát triển" }, selectedKey);
    }
  }

  function setupEventListeners() {
    sidebarToggle.addEventListener("click", () => {
      body.classList.toggle("sidebar-collapsed");
    });

    logoBtnElement &&
      logoBtnElement.addEventListener("click", () => location.reload());

    mainContent.addEventListener("scroll", handleHeaderScroll);

    // Event listeners for expand buttons
    const expandBtns = document.querySelectorAll(".expand-btn");
    expandBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetBox = document.getElementById(btn.dataset.target);
        if (targetBox) {
          const isExpanded = targetBox.classList.toggle("expanded");
          overlay.classList.toggle("show", isExpanded);
          btn.textContent = isExpanded ? "✖" : "⤢";
        }
      });
    });

    // Event listener for overlay to close expanded boxes
    overlay.addEventListener("click", () => {
      const expandedBox = document.querySelector(".sub-header-box.expanded");
      if (expandedBox) {
        expandedBox.classList.remove("expanded");
        overlay.classList.remove("show");
        // Reset the button text
        const expandBtn = expandedBox.querySelector(".expand-btn");
        if (expandBtn) {
          expandBtn.textContent = "⤢";
        }
      }
    });
  }

  // --- UI UPDATES ---
  function displayResult(resultObject, selectionText) {
    xmttResult.innerHTML = resultObject.xmtt
      ? `<p>${resultObject.xmtt}</p>`
      : "<p>Không yêu cầu XMTT.</p>";
    notesResult.innerHTML = resultObject.note
      ? `<p>${resultObject.note}</p>`
      : "<p>Không có lưu ý.</p>";

    if (resultObject.pdf) {
      let pdfPath;
      // If pdf value contains a '/', treat it as a full path
      if (resultObject.pdf.includes("/")) {
        pdfPath = resultObject.pdf;
      } else {
        // Otherwise, construct path dynamically based on category
        const categoryIndex = selectionText.charAt(0);
        const folderName = FOLDER_MAP[categoryIndex];
        if (folderName) {
          pdfPath = `./pdfile/${folderName}/${resultObject.pdf}`;
        } else {
          // Fallback to root pdfile directory if no folder is mapped
          pdfPath = `./pdfile/${resultObject.pdf}`;
        }
      }
      pdfViewer.src = pdfPath;
    } else {
      pdfViewer.src = "";
    }

    // Handle single or multiple alerts
    if (resultObject.alert) {
      if (Array.isArray(resultObject.alert)) {
        resultObject.alert.forEach((msg) => showNotification(msg));
      } else {
        showNotification(resultObject.alert);
      }
    }
  }

  function showNotification(message) {
    if (!toastContainer) return;

    const toast = document.createElement("div");
    toast.className = "notification-toast";

    const toastMessage = document.createElement("p");
    toastMessage.textContent = message;

    const toastClose = document.createElement("button");
    toastClose.className = "toast-close";
    toastClose.innerHTML = "✕";
    toastClose.onclick = () => {
      toast.classList.remove("show");
      // Optional: remove the element after transition
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 400);
    };

    toast.appendChild(toastMessage);
    toast.appendChild(toastClose);
    toastContainer.appendChild(toast);

    // Trigger the show animation
    setTimeout(() => {
      toast.classList.add("show");
    }, 10); // Short delay to allow CSS transition
  }

  function resetResults() {
    xmttResult.innerHTML = "<p>Chọn điều kiện để xem kết quả</p>";
    notesResult.innerHTML = "<p>Thông báo và lưu ý sẽ hiển thị ở đây</p>";
    pdfViewer.src = "";
  }

  function removeDropdowns(startLevel) {
    const allDropdowns =
      dynamicFiltersContainer.querySelectorAll(".filter-group");
    allDropdowns.forEach((dropdown) => {
      const select = dropdown.querySelector("select");
      if (parseInt(select.dataset.level, 10) >= startLevel) {
        dropdown.remove();
      }
    });
  }

  function handleHeaderScroll() {
    const currentScrollY = mainContent.scrollTop;
    if (
      currentScrollY > lastScrollY &&
      currentScrollY > 50 &&
      !isHeaderHidden
    ) {
      mainHeader.classList.add("hidden");
      isHeaderHidden = true;
    } else if (
      (currentScrollY < lastScrollY || currentScrollY <= 50) &&
      isHeaderHidden
    ) {
      mainHeader.classList.remove("hidden");
      isHeaderHidden = false;
    }
    lastScrollY = currentScrollY;
  }

  // --- START THE APP ---
  initialize();
});
