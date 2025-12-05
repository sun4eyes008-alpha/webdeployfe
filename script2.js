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
  const body = document.body;
  const logoBtnElement = document.getElementById("logo-btn");
  const toastContainer = document.getElementById("toast-container");
  const overlay = document.getElementById("overlay");
  const headerSearch = document.getElementById("header-search");
  const searchResultsContainer = document.getElementById(
    "search-results-container"
  );
  const subHeader = document.getElementById("sub-header");

  // --- CONSTANTS AND STATE VARIABLES ---
  const FOLDER_MAP = {
    1: "THONG_TIN_CHUNG",
    2: "THONG_TIN_SAN_PHAM",
    3: "DANG_KY_VAY",
    4: "GIAI_NGAN",
    5: "KENH_THANH_TOAN",
    6: "THANH_TOAN_CIC",
    7: "TEST",
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

  function flattenFlowchart(node, path = [], breadcrumb = []) {
    Object.keys(node).forEach((key) => {
      const newPath = [...path, key];
      const newBreadcrumb = [...breadcrumb, key.replace(/^\d+\.\s*/, "")];
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
    // New: Check URL for state on load
    restoreStateFromURL();
  }

  // --- STATE MANAGEMENT (URL) ---
  function saveStateToURL(path) {
    const url = new URL(window.location);
    url.searchParams.set("path", JSON.stringify(path));
    // Use pushState to update the URL without reloading the page
    history.pushState({ path: path }, "", url);
  }

  function restoreStateFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const pathParam = urlParams.get("path");
    if (pathParam) {
      try {
        const path = JSON.parse(pathParam);
        if (Array.isArray(path)) {
          applySearchResult(path, false); // Apply without saving state again
        }
      } catch (e) {
        console.error("Error parsing path from URL:", e);
      }
    }
  }

  // --- SEARCH FUNCTIONALITY ---
  function searchFlowchartData(query) {
    if (!query) return [];
    const lowerQuery = query.toLowerCase();

    return flattenedFlowchartData.filter((item) => {
      const matchesDisplayText = item.displayText
        .toLowerCase()
        .includes(lowerQuery);
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
  
  // Modified to prevent re-saving state when restoring
  function applySearchResult(path, shouldSaveState = true) {
    removeDropdowns(1);
    let currentDataNode = flowchartData;
    let lastKey = "";
    let finalNode = null;
    let finalPath = [];

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
        finalPath.push(key);
        currentDataNode = currentDataNode[key];
      }
    });

    finalNode = currentDataNode;

    if (isLeaf(finalNode)) {
      displayResult(finalNode, lastKey);
      if (shouldSaveState) {
        saveStateToURL(finalPath);
      }
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
    select.addEventListener("change", (e) =>
      handleSelection(e, level, dataNode)
    );
    filterGroup.appendChild(select);
    dynamicFiltersContainer.appendChild(filterGroup);
  }

  // Modified to save state to URL
  function handleSelection(event, level, parentDataNode) {
    const selectedKey = event.target.value;
    removeDropdowns(level + 1);
    resetResults();

    if (!selectedKey) {
        history.pushState(null, '', window.location.pathname); // Clear URL params if selection is cleared
        return;
    }

    const selectedNode = parentDataNode[selectedKey];
    if (isLeaf(selectedNode)) {
      displayResult(selectedNode, selectedKey);
      // Construct the path and save it
      const path = [];
      document.querySelectorAll('.filter-select').forEach(select => {
          if(select.value) {
              path.push(select.value);
          }
      });
      saveStateToURL(path);

    } else if (isObject(selectedNode)) {
      createDropdown(Object.keys(selectedNode), level + 1, selectedNode);
    }
  }

  // --- UI AND EVENT LISTENERS SETUP ---
  function setupEventListeners() {
    sidebarToggle.addEventListener("click", () =>
      body.classList.toggle("sidebar-collapsed")
    );
    logoBtnElement?.addEventListener("click", () => {
        // Navigate to the base URL without reloading
        history.pushState(null, '', window.location.pathname);
        // Reset the view
        removeDropdowns(1);
        createFirstLevelDropdown();
        resetResults();
    });

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
      if (item?.dataset.path)
        applySearchResult(JSON.parse(item.dataset.path)); // Default to save state
    });
    document.addEventListener("click", (e) => {
      if (
        !headerSearch.contains(e.target) &&
        !searchResultsContainer.contains(e.target)
      ) {
        searchResultsContainer.classList.remove("show");
      }
    });

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
    // New logic for IB/ECOM
    const xmttIbContent = document.getElementById("xmtt-ib-content");
    const xmttEcomContent = document.getElementById("xmtt-ecom-content");
    
    xmttIbContent.innerHTML = resultObject["xmtt-ib"]
      ? `<p>${resultObject["xmtt-ib"]}</p>`
      : "<p>...</p>";
    xmttEcomContent.innerHTML = resultObject["xmtt-ecom"]
      ? `<p>${resultObject["xmtt-ecom"]}</p>`
      : "<p>...</p>";

    // Handle old 'xmtt' property for backward compatibility
    if (resultObject.xmtt) {
      xmttIbContent.innerHTML = `<p>${resultObject.xmtt}</p>`;
      xmttEcomContent.innerHTML = `<p>${resultObject.xmtt}</p>`;
    }

    notesResult.innerHTML = resultObject.note
      ? `<p>${resultObject.note}</p>`
      : "<p>Không có lưu ý.</p>";

    if (resultObject.pdf) {
      const firstLevelSelect = dynamicFiltersContainer.querySelector(
        'select[data-level="1"]'
      );
      const categoryIndexMatch = firstLevelSelect?.value.match(/^(\d+)/);
      const folderName = categoryIndexMatch
        ? FOLDER_MAP[categoryIndexMatch[1]]
        : null;
      pdfViewer.src = folderName
        ? `./pdfile/${folderName}/${resultObject.pdf}`
        : `./pdfile/${resultObject.pdf}`;
    } else {
      pdfViewer.src = "";
    }

    if (resultObject.alert) {
      (Array.isArray(resultObject.alert)
        ? resultObject.alert
        : [resultObject.alert]
      ).forEach((msg) => showNotification(msg));
    }
  }

  function showNotification(message) {
    if (!toastContainer) return;
    const toast = document.createElement("div");
    toast.className = "notification-toast show";
    toast.innerHTML = `<p>${message}</p><button class="toast-close">✕</button>`;
    toast.querySelector(".toast-close").onclick = () => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 400);
    };
    toastContainer.appendChild(toast);
  }

  function resetResults() {
    const xmttIbContent = document.getElementById("xmtt-ib-content");
    const xmttEcomContent = document.getElementById("xmtt-ecom-content");
    // Clear all content areas
    xmttIbContent.innerHTML = "<p>...</p>";
    xmttEcomContent.innerHTML = "<p>...</p>";
    notesResult.innerHTML = "<p>Thông báo và lưu ý sẽ hiển thị ở đây</p>";
    pdfViewer.src = "";
  }

  function removeDropdowns(startLevel) {
    dynamicFiltersContainer
      .querySelectorAll(".filter-group")
      .forEach((group) => {
        const select = group.querySelector("select");
        if (parseInt(select.dataset.level) >= startLevel) group.remove();
      });
  }

  // --- START THE APP ---
  initialize();
});