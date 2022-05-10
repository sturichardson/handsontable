const $ = (selector, context = document) => context.querySelector(selector);

/**
 * Return ASCII symbol for headers depends on what the class name HTMLTableCellElement has.
 *
 * @param {HTMLTableCellElement} cell The cell element to process.
 * @returns {string} Returns '   ', ` * ` or ' - '.
 */
function getSelectionSymbolForHeader(cell) {
  const hasActiveHeader = cell.classList.contains('ht__active_highlight');
  const hasHighlight = cell.classList.contains('ht__highlight');

  let symbol = '   ';

  if (hasActiveHeader) {
    symbol = ' * ';

  } else if (hasHighlight) {
    symbol = ' - ';
  }

  return symbol;
}

/**
 * Return ASCII symbol for cells depends on what the class name HTMLTableCellElement has.
 *
 * @param {HTMLTableCellElement} cell The cell element to process.
 * @returns {string} Returns valid symbol for the pariticaul cell.
 */
function getSelectionSymbolForCell(cell) {
  const hasCurrent = cell.classList.contains('current');
  const hasArea = cell.classList.contains('area');
  let areaLevel = new Array(7)
    .fill()
    .map((_, i, arr) => `area-${arr.length - i}`)
    .find(className => cell.classList.contains(className));

  areaLevel = areaLevel ? parseInt(areaLevel.replace('area-', ''), 10) : areaLevel;

  let symbol = '   ';

  if (hasCurrent && hasArea && areaLevel) {
    symbol = ` ${String.fromCharCode(65 + areaLevel)} `;

  } else if (hasCurrent && hasArea && areaLevel === void 0) {
    symbol = ' A ';

  } else if (hasCurrent && !hasArea && areaLevel === void 0) {
    symbol = ' # ';

  } else if (!hasCurrent && hasArea && areaLevel === void 0) {
    symbol = ' 0 ';

  } else if (!hasCurrent && hasArea && areaLevel) {
    symbol = ` ${areaLevel} `;
  }

  return symbol;
}

/**
 * Generate ASCII symbol for passed cell element.
 *
 * @param {HTMLTableCellElement} cell The cell element to process.
 * @returns {string}
 */
function getSelectionSymbol(cell) {
  if (isLeftHeader(cell) || isTopHeader(cell)) {
    return getSelectionSymbolForHeader(cell);
  }

  return getSelectionSymbolForCell(cell);
}

/**
 * Check if passed element belong to the left header.
 *
 * @param {HTMLTableCellElement} cell The cell element to process.
 * @returns {boolean}
 */
function isLeftHeader(cell) {
  return cell.tagName === 'TH' && cell.parentElement.parentElement.tagName === 'TBODY';
}

/**
 * Check if passed element belong to the top header.
 *
 * @param {HTMLTableCellElement} cell The cell element to process.
 * @returns {boolean}
 */
function isTopHeader(cell) {
  return cell.tagName === 'TH' && cell.parentElement.parentElement.tagName === 'THEAD';
}

/**
 * Check if the provided cell element is a table header.
 *
 * @param {HTMLTableCellElement} cell The overlay element to process.
 * @returns {boolean}
 */
function isHeader(cell) {
  return cell.tagName === 'TH';
}

/**
 * @param {HTMLTableElement} overlay The overlay element to process.
 * @returns {Function}
 */
function cellFactory(overlay) {
  return (row, column) => overlay && overlay.rows[row] && overlay.rows[row].cells[column];
}

/**
 * Generates table based on Handsontable structure.
 *
 * @param {HTMLElement} context The root element of the Handsontable instance to be generated.
 * @returns {string}
 */
export function generateASCIITable(context) {
  const TABLE_EDGES_SYMBOL = '|';
  const COLUMN_SEPARATOR = ':';
  const ROW_HEADER_SEPARATOR = '\u2551';
  const COLUMN_HEADER_SEPARATOR = '===';
  const ROW_OVERLAY_SEPARATOR = '|';
  const COLUMN_OVERLAY_SEPARATOR = '---';

  const topStartCornerOverlayTable = $('.ht_clone_top_inline_start_corner .htCore', context);
  const bottomStartCornerOverlayTable = $('.ht_clone_bottom_inline_start_corner .htCore', context);
  const inlineStartOverlayTable = $('.ht_clone_inline_start .htCore', context);
  const topOverlayTable = $('.ht_clone_top .htCore', context);
  const bottomOverlayTable = $('.ht_clone_bottom .htCore', context);
  const masterTable = $('.ht_master .htCore', context);
  const stringRows = [];

  const topStartCornerOverlayCells = cellFactory(topStartCornerOverlayTable);
  const bottomStartCornerOverlayCells = cellFactory(bottomStartCornerOverlayTable);
  const inlineStartOverlayCells = cellFactory(inlineStartOverlayTable);
  const topOverlayCells = cellFactory(topOverlayTable);
  const bottomOverlayCells = cellFactory(bottomOverlayTable);
  const masterCells = cellFactory(masterTable);
  const isRtl = $('.ht_master').dir === 'rtl';

  const hasTopHeader = topOverlayCells(0, 0) ? isTopHeader(topOverlayCells(0, 0)) : false;
  const hasCornerHeader = topStartCornerOverlayCells(0, 0) ? isHeader(topStartCornerOverlayCells(0, 0)) : false;
  const hasLeftHeader = (inlineStartOverlayCells(0, 0) && isLeftHeader(inlineStartOverlayCells(0, 0))) ||
                        (hasTopHeader && hasCornerHeader);
  const firstCellCoords = {
    row: hasTopHeader ? 1 : 0,
    column: hasLeftHeader ? 1 : 0
  };
  const inlineStartOverlayFirstCell = inlineStartOverlayCells(firstCellCoords.row, firstCellCoords.column);
  const hasFixedLeftCells = inlineStartOverlayFirstCell ? !isLeftHeader(inlineStartOverlayFirstCell) : false;
  const topOverlayFirstCell = topOverlayCells(firstCellCoords.row, firstCellCoords.column);
  const hasFixedTopCells = topOverlayFirstCell ? !isTopHeader(topOverlayFirstCell) : false;
  const hasFixedBottomCells = topOverlayFirstCell ? !isTopHeader(topOverlayFirstCell) : false;

  const consumedFlags = new Map([
    ['hasLeftHeader', hasLeftHeader],
    ['hasTopHeader', hasTopHeader],
    ['hasCornerHeader', hasCornerHeader],
    ['hasFixedLeftCells', hasFixedLeftCells],
    ['hasFixedTopCells', hasLeftHeader],
  ]);

  const rowsLength = masterTable.rows.length;

  for (let r = 0; r < rowsLength; r++) {
    const stringCells = [];
    const columnsLength = masterTable.rows[0].cells.length;
    const bottomRowIndex = r - (rowsLength - bottomOverlayTable.rows.length);
    let isLastColumn = false;
    let insertTopOverlayRowSeparator = false;
    let insertBottomOverlayRowSeparator = false;

    for (let c = 0; c < columnsLength; c++) {
      let cellSymbol;
      let separatorSymbol = COLUMN_SEPARATOR;

      isLastColumn = c === columnsLength - 1;

      if (topStartCornerOverlayCells(r, c)) {
        const cell = topStartCornerOverlayCells(r, c);
        const nextCell = topStartCornerOverlayCells(r, c + 1);

        cellSymbol = getSelectionSymbol(cell);

        if (isLeftHeader(cell) && (!nextCell || !isLeftHeader(nextCell))) {
          separatorSymbol = ROW_HEADER_SEPARATOR;
        }
        if (!isLeftHeader(cell) && !nextCell) {
          separatorSymbol = ROW_OVERLAY_SEPARATOR;
        }
        if (r === 0 && c === 0 && hasCornerHeader) { // Fix for header symbol
          separatorSymbol = ROW_HEADER_SEPARATOR;
        }

      } else if (bottomStartCornerOverlayCells(bottomRowIndex, c)) {
        const cell = bottomStartCornerOverlayCells(bottomRowIndex, c);
        const nextCell = bottomStartCornerOverlayCells(bottomRowIndex, c + 1);

        cellSymbol = getSelectionSymbol(cell);

        if (isLeftHeader(cell) && (!nextCell || !isLeftHeader(nextCell))) {
          separatorSymbol = ROW_HEADER_SEPARATOR;
        }
        if (!isLeftHeader(cell) && !nextCell) {
          separatorSymbol = ROW_OVERLAY_SEPARATOR;
        }

      } else if (inlineStartOverlayCells(r, c)) {
        const cell = inlineStartOverlayCells(r, c);
        const nextCell = inlineStartOverlayCells(r, c + 1);

        cellSymbol = getSelectionSymbol(cell);

        if (isLeftHeader(cell) && (!nextCell || !isLeftHeader(nextCell))) {
          separatorSymbol = ROW_HEADER_SEPARATOR;
        }
        if (!isLeftHeader(cell) && !nextCell) {
          separatorSymbol = ROW_OVERLAY_SEPARATOR;
        }

      } else if (topOverlayCells(r, c)) {
        const cell = topOverlayCells(r, c);

        cellSymbol = getSelectionSymbol(cell);

        if (hasFixedTopCells && isLastColumn && !topOverlayCells(r + 1, c)) {
          insertTopOverlayRowSeparator = true;
        }

      } else if (bottomOverlayCells(bottomRowIndex, c)) {
        const cell = bottomOverlayCells(bottomRowIndex, c);

        cellSymbol = getSelectionSymbol(cell);

        if (hasFixedBottomCells && isLastColumn && !bottomOverlayCells(bottomRowIndex - 1, c)) {
          insertBottomOverlayRowSeparator = true;
        }

      } else if (masterCells(r, c)) {
        const cell = masterCells(r, c);

        cellSymbol = getSelectionSymbol(cell);
      }

      stringCells.push(cellSymbol);

      if (!isLastColumn) {
        stringCells.push(separatorSymbol);
      }
    }

    if (insertBottomOverlayRowSeparator) {
      insertBottomOverlayRowSeparator = false;
      stringRows.push(TABLE_EDGES_SYMBOL + new Array(columnsLength)
        .fill(COLUMN_OVERLAY_SEPARATOR).join(COLUMN_SEPARATOR) + TABLE_EDGES_SYMBOL);
    }

    const cellsStringified = (isRtl ? stringCells.reverse() : stringCells).join('');

    stringRows.push(TABLE_EDGES_SYMBOL + cellsStringified + TABLE_EDGES_SYMBOL);

    if (consumedFlags.get('hasTopHeader')) {
      consumedFlags.delete('hasTopHeader');
      stringRows.push(TABLE_EDGES_SYMBOL + new Array(columnsLength)
        .fill(COLUMN_HEADER_SEPARATOR).join(COLUMN_SEPARATOR) + TABLE_EDGES_SYMBOL);
    }

    if (insertTopOverlayRowSeparator) {
      insertTopOverlayRowSeparator = false;
      stringRows.push(TABLE_EDGES_SYMBOL + new Array(columnsLength)
        .fill(COLUMN_OVERLAY_SEPARATOR).join(COLUMN_SEPARATOR) + TABLE_EDGES_SYMBOL);
    }
  }

  return stringRows.join('\n');
}
