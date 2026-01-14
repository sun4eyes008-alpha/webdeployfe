# Copilot Instructions for Tool_Check_V1

This repository is a very small static front-end demo that displays Excel files in the browser using SheetJS. The goal of these instructions is to help an AI coding agent become productive quickly and make safe, focused changes.

- **Project root:** `Index.html` is the single source of truth. There is no build tooling, server, or package manifest in the repo.
- **Primary behaviour:** the page accepts an `.xlsx`/`.xls` file via `<input id="upload-file">`, reads it with `FileReader.readAsArrayBuffer`, parses with `XLSX.read(..., { type: 'array' })`, and renders the first sheet via `XLSX.utils.sheet_to_html` into `#excel-display`.
- **External dependency:** SheetJS is loaded from CDN (`https://cdn.sheetjs.com/xlsx-0.20.0/package/dist/xlsx.full.min.js`) directly in the HTML. Do not assume npm or local bundling exists.

What to do when making changes

- **Local dev / sanity checks:** open `Index.html` directly in a browser, or serve the folder with a simple HTTP server.
  - Quick commands (PowerShell):
    - `python -m http.server 8000`
    - `npx http-server . -p 8000`
  - Then visit `http://localhost:8000/Index.html`.
- **Debugging tips:** use browser DevTools — check Console for runtime errors, Network for CDN load failures, and ensure the file input was accepted (check `e.target.files[0]`).

Patterns and conventions in this repo

- **Single-file, imperative JS:** all JS is inline in `Index.html`. Keep changes scoped and avoid introducing complex build requirements unless explicitly requested.
- **DOM anchors to edit:**
  - File input: `#upload-file`
  - Output container: `#excel-display`
- **Sheet handling:** the code only uses `workbook.SheetNames[0]`. If asked to add multi-sheet support, prefer adding a small UI (select dropdown) and avoid pulling in large frameworks.

Safety, compatibility, and performance notes

- Loading remote scripts from CDN is expected here. If you change the external URL, verify the script still exposes `XLSX` globally.
- For large files, `readAsArrayBuffer` is acceptable but be mindful of memory on low-end machines. Consider streaming or worker-based parsing only if requested.

Examples of safe edits an agent may perform

- Add a dropdown to choose which sheet to render: enumerate `workbook.SheetNames`, create `<select>`, and call `XLSX.utils.sheet_to_html` on the selected name.
- Add basic error handling: check `file.type` and wrap `XLSX.read(...)` in try/catch, displaying user-friendly messages in `#excel-display`.
- Upgrade SheetJS URL: replace CDN script element but test in browser to confirm global `XLSX` remains available.

What not to do

- Do not introduce a Node-based build unless the user asks—this repo is intentionally simple.
- Do not change the page encoding or language metadata without reason; the file is set to `lang="vi"` and `charset="UTF-8"`.

If this file already exists

- Merge carefully: preserve any project-specific notes and examples. Prefer small, incremental PRs and test locally after changes.

Questions for the user

- Do you want multi-sheet support or just a clearer display of the first sheet?
- Should we add a tiny local dev helper (package.json + http-server) or keep the repo zero-dependency?

If anything is unclear or you want me to expand examples or add tests/CI, tell me which direction to take next.