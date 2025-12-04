document.addEventListener("DOMContentLoaded", () => {
    // Check if data is loaded
    if (typeof flowchartData === 'undefined' || typeof xmttData === 'undefined') {
        console.error("Flowchart data not loaded. Make sure flowchart-data.js is included and correct.");
        return;
    }

    const dynamicFiltersContainer = document.getElementById("dynamic-filters-container");
    const xmttResult = document.getElementById("xmtt-result");
    const notesResult = document.getElementById("notes-result");
    const pdfViewer = document.getElementById("pdf-viewer");
    const sidebarToggle = document.getElementById("sidebar-toggle");
    const mainHeader = document.getElementById("main-header");
    const mainContent = document.getElementById("main-content");
    const body = document.body;
    const logoBtnElement = document.getElementById("logo-btn");
    const notificationToast = document.getElementById("notification-toast");
    const toastMessage = document.getElementById("toast-message");
    const toastClose = document.getElementById("toast-close");

    let lastScrollY = 0;
    let isHeaderHidden = false;
    let toastTimeout = null;

    // --- INITIALIZATION ---
    function initialize() {
        createFirstLevelDropdown();
        setupEventListeners();
    }

    // --- DROPDOWN CREATION ---
    function createFirstLevelDropdown() {
        if (!dynamicFiltersContainer) return;
        dynamicFiltersContainer.innerHTML = ''; // Clear previous dropdowns
        const initialOptions = Object.keys(flowchartData);
        createDropdown(initialOptions, 1, flowchartData);
    }

    function createDropdown(options, level, dataNode) {
        const filterGroup = document.createElement("div");
        filterGroup.className = "filter-group";

        const label = document.createElement("label");
        label.className = "filter-label";
        label.textContent = getLabelForLevel(level, dataNode);
        
        const select = document.createElement("select");
        select.className = "filter-select";
        select.dataset.level = level;

        select.innerHTML = '<option value="">-- Chọn --</option>';
        options.forEach(optionText => {
            const option = document.createElement("option");
            option.value = optionText;
            option.textContent = optionText.replace(/^\d+\.\s*/, '');
            select.appendChild(option);
        });

        select.addEventListener("change", (e) => handleSelection(e, level, dataNode));

        filterGroup.appendChild(label);
        filterGroup.appendChild(select);
        dynamicFiltersContainer.appendChild(filterGroup);
    }
    
    function getLabelForLevel(level, dataNode) {
        // Find a key in the dataNode that is an object, and return that key
        for (const key in dataNode) {
            if (typeof dataNode[key] === 'object' && dataNode[key] !== null) {
                 // A bit of a hack to get the title of the next level dropdown
                 const nextNodeKeys = Object.keys(dataNode[key]);
                 if(nextNodeKeys.length > 0 && typeof dataNode[key][nextNodeKeys[0]] === 'object') {
                    const potentialLabel = Object.keys(dataNode[key][nextNodeKeys[0]])[0];
                    if(potentialLabel && potentialLabel.includes('?')){
                        return potentialLabel;
                    }
                 }
            }
        }
        return `Chọn điều kiện cấp ${level}:`;
    }


    // --- EVENT HANDLING ---
    function handleSelection(event, level, parentDataNode) {
        const selectedValue = event.target.value;
        
        removeDropdowns(level + 1);
        resetResults();

        if (!selectedValue) return;

        let nextNode = parentDataNode[selectedValue];

        if (nextNode === "deep") {
            const mainParentKey = "6. THANH TOÁN + CIC";
            const deepStructureParent = flowchartData[mainParentKey];
            nextNode = deepStructureParent["Lịch Trả Nợ"]; 
        }

        if (typeof nextNode === 'string') {
            displayResult(nextNode, selectedValue);
        } else if (typeof nextNode === 'object' && nextNode !== null) {
            const nextOptions = Object.keys(nextNode);
            createDropdown(nextOptions, level + 1, nextNode);
        }
    }
    
    function setupEventListeners() {
        sidebarToggle.addEventListener("click", () => {
            // Toggle sidebar for both desktop and mobile
            body.classList.toggle("sidebar-collapsed");
        });

        logoBtnElement && logoBtnElement.addEventListener("click", () => location.reload());
        
        toastClose.addEventListener("click", () => {
            notificationToast.classList.remove("show");
            if (toastTimeout) clearTimeout(toastTimeout);
        });

        mainContent.addEventListener("scroll", handleHeaderScroll);
    }

    // --- UI UPDATES ---
    function displayResult(resultKey, selectionText) {
        const xmttValue = xmttData[resultKey] || "Không cần XMTT";
        xmttResult.innerHTML = `<p><strong>${xmttValue}</strong></p>`;

        if (resultKey.toLowerCase().startsWith("xem slide")) {
            notesResult.innerHTML = `<p><b>${selectionText}:</b> ${resultKey}</p>`;
            pdfViewer.src = "";
        } else if (resultKey.toLowerCase().endsWith('.pdf')) {
            const pdfPath = `./pdfile/${resultKey}`;
            pdfViewer.src = pdfPath;
            notesResult.innerHTML = `<p>Hiển thị file: <b>${resultKey}</b></p>`;
        } else {
            notesResult.innerHTML = `<p><b>Kết quả:</b> ${resultKey}</p>`;
            pdfViewer.src = "";
        }

        if (resultKey === "THANH TOÁN TRỰC TUYẾN.pdf") {
            showNotification("Thanh toán chuyển khoản qua VPbank được hoàn 5.000vnd vào tháng tiếp theo");
        }
    }

    function resetResults() {
        xmttResult.innerHTML = "<p>Chọn điều kiện để xem kết quả</p>";
        notesResult.innerHTML = "<p>Thông báo và lưu ý sẽ hiển thị ở đây</p>";
        pdfViewer.src = "";
    }
    
    function removeDropdowns(startLevel) {
        const allDropdowns = dynamicFiltersContainer.querySelectorAll(".filter-group");
        allDropdowns.forEach(dropdown => {
            const select = dropdown.querySelector("select");
            if (parseInt(select.dataset.level, 10) >= startLevel) {
                dropdown.remove();
            }
        });
    }

    function showNotification(message) {
        toastMessage.textContent = message;
        notificationToast.classList.add("show");
        if (toastTimeout) clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => notificationToast.classList.remove("show"), 5000);
    }
    
    function handleHeaderScroll() {
        const currentScrollY = mainContent.scrollTop;
        if (currentScrollY > lastScrollY && currentScrollY > 50 && !isHeaderHidden) {
            mainHeader.classList.add("hidden");
            isHeaderHidden = true;
        } else if ((currentScrollY < lastScrollY || currentScrollY <= 50) && isHeaderHidden) {
            mainHeader.classList.remove("hidden");
            isHeaderHidden = false;
        }
        lastScrollY = currentScrollY;
    }

    // --- START THE APP ---
    initialize();
});
