// Base64 URL encoding functions for safer handling of special characters
function saveStateToURL(path) {
    // Use base64 encoding for safe handling of special characters
    const jsonPath = JSON.stringify(path);
    const base64Path = btoa(encodeURIComponent(jsonPath));
    // Use query parameter instead of hash for better href compatibility
    const newUrl = window.location.pathname + "?path=" + base64Path;
    history.pushState({ path: path }, "", newUrl);
    console.log('💾 Saved to URL:', newUrl);
}

function restoreStateFromURL() {
    // Check query parameter first (new method with base64)
    const urlParams = new URLSearchParams(window.location.search);
    const pathParam = urlParams.get('path');

    console.log('🔍 Checking URL for state...');
    console.log('Query string:', window.location.search);
    console.log('Hash:', window.location.hash);

    if (pathParam) {
        console.log('📋 Found query parameter:', pathParam);
        try {
            // Decode from base64 first
            const decodedBase64 = decodeURIComponent(atob(pathParam));
            console.log('🔓 Decoded from base64:', decodedBase64);

            const path = JSON.parse(decodedBase64);
            console.log('✅ Parsed path:', path);

            if (Array.isArray(path)) {
                console.log('🎯 Applying search result with path:', path);
                applySearchResult(path, false);
                return;
            }
        } catch (e) {
            console.log("❌ Query parameter is not a valid path:", e);
            // Try old format for backward compatibility
            try {
                const decodedParam = decodeURIComponent(pathParam);
                const path = JSON.parse(decodedParam);
                if (Array.isArray(path)) {
                    applySearchResult(path, false);
                    return;
                }
            } catch (e2) {
                console.log("❌ Both decoding methods failed:", e2);
            }
        }
    }

    // Fallback to hash for backward compatibility
    const hash = window.location.hash;
    if (hash && hash.length > 1) {
        console.log('📋 Trying hash fallback:', hash);
        const hashParam = hash.substring(1);
        try {
            const decodedParam = decodeURIComponent(hashParam);
            const path = JSON.parse(decodedParam);
            if (Array.isArray(path)) {
                console.log('🎯 Applying from hash:', path);
                applySearchResult(path, false);
            }
        } catch (e) {
            console.log("❌ Hash is not a valid path:", e);
        }
    } else {
        console.log('ℹ️ No state found in URL');
    }
}
