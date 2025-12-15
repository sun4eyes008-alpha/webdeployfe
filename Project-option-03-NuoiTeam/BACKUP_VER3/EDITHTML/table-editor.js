// Table Editor Logic for GrapesJS
// Helper functions
function findParentRow(component) {
    let current = component;
    while (current) {
        if (!current.get) return null;
        if (current.get('tagName') === 'TR') return current;
        current = current.parent();
    }
    return null;
}

function findTable(component) {
    let current = component;
    while (current) {
        if (!current.get) return null;
        if (current.get('tagName') === 'TABLE') return current;
        current = current.parent();
    }
    return null;
}

function createTableRow(colCount) {
    const cells = [];
    for (let i = 0; i < colCount; i++) {
        cells.push(createTableCell(false));
    }
    return {
        tagName: 'tr',
        components: cells
    };
}

function createTableCell(isHeader = false) {
    return {
        type: 'table-cell',
        tagName: 'td',
        content: 'New',
        style: {
            'border': '1px solid #ddd',
            'padding': '12px',
            ...(isHeader ? { 'background': '#f0f0f0', 'font-weight': 'bold' } : {})
        }
    };
}

// Register table commands
function registerTableCommands(editor) {
    // Add row below
    editor.Commands.add('table-add-row-below', {
        run(editor) {
            const selected = editor.getSelected();
            if (!selected) {
                console.error('No component selected');
                return;
            }

            const row = findParentRow(selected);
            if (!row) {
                console.error('Could not find parent row');
                alert('Lỗi: Không tìm thấy hàng!');
                return;
            }

            const colCount = row.components().length;
            const newRow = createTableRow(colCount);
            const parent = row.parent();
            const index = parent.components().indexOf(row);
            parent.components().add(newRow, { at: index + 1 });
        }
    });

    // Add column right
    editor.Commands.add('table-add-col-right', {
        run(editor) {
            const selected = editor.getSelected();
            if (!selected) {
                console.error('No component selected');
                return;
            }

            const row = findParentRow(selected);
            if (!row) {
                console.error('Could not find parent row');
                alert('Lỗi: Không tìm thấy hàng!');
                return;
            }

            const cellIndex = row.components().indexOf(selected);
            const table = findTable(selected);
            if (!table) {
                console.error('Could not find table');
                alert('Lỗi: Không tìm thấy table!');
                return;
            }

            const rows = table.find('tr');
            rows.forEach((r, i) => {
                const isHeader = i === 0;
                r.components().add(createTableCell(isHeader), { at: cellIndex + 1 });
            });
        }
    });

    // Delete row
    editor.Commands.add('table-delete-row', {
        run(editor) {
            const selected = editor.getSelected();
            if (!selected) return;

            const row = findParentRow(selected);
            if (!row) return;

            const parent = row.parent();
            if (parent.components().length > 1) {
                row.remove();
            } else {
                alert('Không thể xóa hàng cuối cùng!');
            }
        }
    });

    // Delete column
    editor.Commands.add('table-delete-col', {
        run(editor) {
            const selected = editor.getSelected();
            if (!selected) return;

            const row = findParentRow(selected);
            if (!row) return;

            const cellIndex = row.components().indexOf(selected);
            const table = findTable(selected);
            if (!table) return;

            const rows = table.find('tr');
            if (rows[0] && rows[0].components().length > 1) {
                rows.forEach(r => {
                    const cell = r.components().at(cellIndex);
                    if (cell) cell.remove();
                });
            } else {
                alert('Không thể xóa cột cuối cùng!');
            }
        }
    });

    // Merge right (colspan)
    editor.Commands.add('table-merge-right', {
        run(editor) {
            const selected = editor.getSelected();
            if (!selected) return;

            const row = findParentRow(selected);
            if (!row) return;

            const cellIndex = row.components().indexOf(selected);
            const nextCell = row.components().at(cellIndex + 1);

            if (!nextCell) {
                alert('Không có ô bên phải để gộp!');
                return;
            }

            // Get content from next cell
            const nextText = nextCell.view?.el?.innerText?.trim() || '';

            // Combine content if next cell has content
            if (nextText && nextText !== 'New' && nextText !== '') {
                const currentText = selected.view?.el?.innerText?.trim() || '';
                selected.components(currentText + ' ' + nextText);
            }

            // Increase colspan
            const currentColspan = parseInt(selected.getAttributes().colspan || 1);
            selected.addAttributes({ colspan: currentColspan + 1 });

            // Remove next cell
            nextCell.remove();
        }
    });

    // Merge down (rowspan)
    editor.Commands.add('table-merge-down', {
        run(editor) {
            const selected = editor.getSelected();
            if (!selected) return;

            const row = findParentRow(selected);
            if (!row) return;

            const tbody = row.parent();
            const rows = tbody.components();
            const rowIndex = rows.indexOf(row);
            const cellIndex = row.components().indexOf(selected);

            // Find the row below
            const nextRow = rows.at(rowIndex + 1);
            if (!nextRow) {
                alert('Không có hàng bên dưới để gộp!');
                return;
            }

            // Find cell at same column position in next row
            const cellBelow = nextRow.components().at(cellIndex);
            if (!cellBelow) {
                alert('Không tìm thấy ô bên dưới!');
                return;
            }

            // Get content from cell below
            const belowText = cellBelow.view?.el?.innerText?.trim() || '';

            // Combine content
            if (belowText && belowText !== 'New' && belowText !== '') {
                const currentText = selected.view?.el?.innerText?.trim() || '';
                selected.components(currentText + '<br>' + belowText);
            }

            // Increase rowspan
            const currentRowspan = parseInt(selected.getAttributes().rowspan || 1);
            selected.addAttributes({ rowspan: currentRowspan + 1 });

            // Remove cell below
            cellBelow.remove();
        }
    });

    // Change background color
    editor.Commands.add('table-change-bgcolor', {
        run(editor) {
            const selected = editor.getSelected();
            if (!selected) return;
            const currentColor = selected.getStyle()['background-color'] || '#ffffff';
            const newColor = prompt('Nhập màu nền (hex, rgb, hoặc tên màu):', currentColor);
            if (newColor) {
                selected.addStyle({ 'background-color': newColor });
            }
        }
    });
}

// Export for use in index.html
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { registerTableCommands };
}
