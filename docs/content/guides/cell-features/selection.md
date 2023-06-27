---
id: a52om5wr
title: Selection
metaTitle: Selection - JavaScript Data Grid | Handsontable
description: Select a single cell, a range of adjacent cells, or multiple non-adjacent ranges of cells.
permalink: /selection
canonicalUrl: /selection
tags:
  - selecting ranges
  - cell selection
react:
  id: k88lznt8
  metaTitle: Selection - React Data Grid | Handsontable
searchCategory: Guides
---

# Selection

Select a single cell, a range of adjacent cells, or multiple non-adjacent ranges of cells.

[[toc]]

## Overview

Selection enables you to select a single cell or ranges of cells within Handsontable. Once selected, you can retrieve data from the cell, edit the cell's contents, or change the style of the cell.

## Basic configuration

With this feature, you can select single cells or ranges of cells across a grid. Easily retrieve the coordinates of the selected cells to clear or change the cells' content.

Use <kbd>**Cmd**</kbd> on Mac or <kbd>**Ctrl**</kbd> on Windows to select non-adjacent ranges of cells.

## Select ranges

There are different modes in which you can use this plugin. Choose between selecting a single cell, a range of adjacent cells, and multiple non-adjacent ranges of cells.

Possible values of [`selectionMode`](@/api/options.md#selectionmode):

- [`single`](@/api/options.md#selectionmode) - You can select a single cell.
- [`range`](@/api/options.md#selectionmode) - You can select multiple cells within a single rangeselected.
- [`multiple`](@/api/options.md#selectionmode) - You can select multiple, non-adjacent ranges of cells.

::: only-for javascript

::: example #example1 --html 1 --js 2

```html
<div id="example1"></div>
<div class="controls">
  <select id="selectOption">
    <option>Single selection</option>
    <option>Range selection</option>
    <option selected="selected">Multiple ranges selection</option>
  </select>
</div>
```
```js
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.min.css';

const selectOption = document.querySelector('#selectOption');
const container = document.querySelector('#example1');
const hot = new Handsontable(container, {
  data: [
    ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1'],
    ['A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2', 'H2', 'I2'],
    ['A3', 'B3', 'C3', 'D3', 'E3', 'F3', 'G3', 'H3', 'I3'],
    ['A4', 'B4', 'C4', 'D4', 'E4', 'F4', 'G4', 'H4', 'I4'],
    ['A5', 'B5', 'C5', 'D5', 'E5', 'F5', 'G5', 'H5', 'I5'],
    ['A6', 'B6', 'C6', 'D6', 'E6', 'F6', 'G6', 'H6', 'I6'],
    ['A7', 'B7', 'C7', 'D7', 'E7', 'F7', 'G7', 'H7', 'I7'],
    ['A8', 'B8', 'C8', 'D8', 'E8', 'F8', 'G8', 'H8', 'I8'],
    ['A9', 'B9', 'C9', 'D9', 'E9', 'F9', 'G9', 'H9', 'I9'],
  ],
  width: 'auto',
  height: 'auto',
  colWidths: 100,
  rowHeights: 23,
  rowHeaders: true,
  colHeaders: true,
  selectionMode: 'multiple', // 'single', 'range' or 'multiple',
  licenseKey: 'non-commercial-and-evaluation'
});

selectOption.addEventListener('change', event => {
  const value = event.target.value;
  const first = value.split(' ')[0].toLowerCase();

  hot.updateSettings({
    selectionMode: first
  });
});
```

:::

:::

::: only-for react

::: example #example1 :react

```jsx
import { useRef, useEffect } from 'react';
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';

// register Handsontable's modules
registerAllModules();

export const ExampleComponent = () => {
  const hotRef = useRef(null);

  let selectOptionChangeCallback;

  useEffect(() => {
    const hot = hotRef.current.hotInstance;

    selectOptionChangeCallback = event => {
      const value = event.target.value;
      const first = value.split(' ')[0].toLowerCase();

      hot.updateSettings({
        selectionMode: first
      });
    };
  });

  return (
    <>
      <HotTable
        ref={hotRef}
        data={[
          ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1'],
          ['A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2', 'H2', 'I2'],
          ['A3', 'B3', 'C3', 'D3', 'E3', 'F3', 'G3', 'H3', 'I3'],
          ['A4', 'B4', 'C4', 'D4', 'E4', 'F4', 'G4', 'H4', 'I4'],
          ['A5', 'B5', 'C5', 'D5', 'E5', 'F5', 'G5', 'H5', 'I5'],
          ['A6', 'B6', 'C6', 'D6', 'E6', 'F6', 'G6', 'H6', 'I6'],
          ['A7', 'B7', 'C7', 'D7', 'E7', 'F7', 'G7', 'H7', 'I7'],
          ['A8', 'B8', 'C8', 'D8', 'E8', 'F8', 'G8', 'H8', 'I8'],
          ['A9', 'B9', 'C9', 'D9', 'E9', 'F9', 'G9', 'H9', 'I9'],
        ]}
        width="auto"
        height="auto"
        colWidths={100}
        rowHeights={23}
        rowHeaders={true}
        colHeaders={true}
        selectionMode="multiple" // 'single', 'range' or 'multiple',
        licenseKey="non-commercial-and-evaluation"
      />
      <div className="controls">
        <select
          id="selectOption"
          onChange={(...args) => selectOptionChangeCallback(...args)}
          defaultValue="multiple"
        >
          <option value="single">Single selection</option>
          <option value="range">Range selection</option>
          <option value="multiple">Multiple ranges selection</option>
        </select>
      </div>
    </>
  );
};

/* start:skip-in-preview */
ReactDOM.render(<ExampleComponent />, document.getElementById('example1'));
/* end:skip-in-preview */
```

:::

:::

## Get data from the selected ranges

To retrieve the selected cells as an array of arrays, you use the [`getSelected()`](@/api/core.md#getselected) or [`getSelectedRange()`](@/api/core.md#getselectedrange) methods.

::: only-for javascript

::: example #example2 --html 1 --js 2

```html
<div id="example2"></div>
<output class="console" id="output">Here you will see the log</output>
<div class="controls">
  <button id="getButton">Get data</button>
</div>
```
```js
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.min.css';

const output = document.querySelector('#output');
const getButton = document.querySelector('#getButton');
const container = document.querySelector('#example2');
const hot = new Handsontable(container, {
  data: [
    ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1'],
    ['A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2', 'H2', 'I2'],
    ['A3', 'B3', 'C3', 'D3', 'E3', 'F3', 'G3', 'H3', 'I3'],
    ['A4', 'B4', 'C4', 'D4', 'E4', 'F4', 'G4', 'H4', 'I4'],
    ['A5', 'B5', 'C5', 'D5', 'E5', 'F5', 'G5', 'H5', 'I5'],
    ['A6', 'B6', 'C6', 'D6', 'E6', 'F6', 'G6', 'H6', 'I6'],
    ['A7', 'B7', 'C7', 'D7', 'E7', 'F7', 'G7', 'H7', 'I7'],
    ['A8', 'B8', 'C8', 'D8', 'E8', 'F8', 'G8', 'H8', 'I8'],
    ['A9', 'B9', 'C9', 'D9', 'E9', 'F9', 'G9', 'H9', 'I9'],
  ],
  width: 'auto',
  height: 'auto',
  colWidths: 100,
  rowHeights: 23,
  rowHeaders: true,
  colHeaders: true,
  outsideClickDeselects: false,
  selectionMode: 'multiple', // 'single', 'range' or 'multiple',
  licenseKey: 'non-commercial-and-evaluation'
});

getButton.addEventListener('click', event => {
  const selected = hot.getSelected() || [];
  const data = [];

  for (let i = 0; i < selected.length; i += 1) {
    const item = selected[i];

    data.push(hot.getData(...item));
  }

  output.innerText = JSON.stringify(data);
});
```

:::

:::

::: only-for react

::: example #example2 :react

```jsx
import { useRef, useEffect, useState } from 'react';
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';

// register Handsontable's modules
registerAllModules();

export const ExampleComponent = () => {
  const hotRef = useRef(null);
  const [output, setOutput] = useState('');

  let getButtonClickCallback;

  useEffect(() => {
    const hot = hotRef.current.hotInstance;

    getButtonClickCallback = event => {
      const selected = hot.getSelected() || [];
      const data = [];

      for (let i = 0; i < selected.length; i += 1) {
        const item = selected[i];

        data.push(hot.getData(...item));
      }

      setOutput(JSON.stringify(data));
    };
  });

  return (
    <>
      <HotTable
        ref={hotRef}
        data={[
          ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1'],
          ['A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2', 'H2', 'I2'],
          ['A3', 'B3', 'C3', 'D3', 'E3', 'F3', 'G3', 'H3', 'I3'],
          ['A4', 'B4', 'C4', 'D4', 'E4', 'F4', 'G4', 'H4', 'I4'],
          ['A5', 'B5', 'C5', 'D5', 'E5', 'F5', 'G5', 'H5', 'I5'],
          ['A6', 'B6', 'C6', 'D6', 'E6', 'F6', 'G6', 'H6', 'I6'],
          ['A7', 'B7', 'C7', 'D7', 'E7', 'F7', 'G7', 'H7', 'I7'],
          ['A8', 'B8', 'C8', 'D8', 'E8', 'F8', 'G8', 'H8', 'I8'],
          ['A9', 'B9', 'C9', 'D9', 'E9', 'F9', 'G9', 'H9', 'I9'],
        ]}
        width="auto"
        height="auto"
        colWidths={100}
        rowHeights={23}
        rowHeaders={true}
        colHeaders={true}
        outsideClickDeselects={false}
        selectionMode="multiple" // 'single', 'range' or 'multiple',
        licenseKey="non-commercial-and-evaluation"
      />
      <output className="console" id="output">{output}</output>
      <div className="controls">
        <button
          id="getButton"
          onClick={(...args) => getButtonClickCallback(...args)}
        >
          Get data
        </button>
      </div>
    </>
  );
};

/* start:skip-in-preview */
ReactDOM.render(<ExampleComponent />, document.getElementById('example2'));
/* end:skip-in-preview */
```

:::

:::

## Modify the selected cells

You may want to delete, format, or otherwise change the selected cells. For example, you can change a value or add CSS classes to the selected cells using the demo below.

::: only-for javascript

::: example #example3 --html 1 --css 2 --js 3

```html
<div id="example3"></div>

<div class="controls">
  <button id="set-data-action">Click to modify the selected cells</button>
</div>
```
```css
.c-red {
  color: red;
}
```
```js
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.min.css';

const button = document.querySelector('#set-data-action');
const container = document.querySelector('#example3');
const hot = new Handsontable(container, {
  data: [
    ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1'],
    ['A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2', 'H2', 'I2'],
    ['A3', 'B3', 'C3', 'D3', 'E3', 'F3', 'G3', 'H3', 'I3'],
    ['A4', 'B4', 'C4', 'D4', 'E4', 'F4', 'G4', 'H4', 'I4'],
    ['A5', 'B5', 'C5', 'D5', 'E5', 'F5', 'G5', 'H5', 'I5'],
    ['A6', 'B6', 'C6', 'D6', 'E6', 'F6', 'G6', 'H6', 'I6'],
    ['A7', 'B7', 'C7', 'D7', 'E7', 'F7', 'G7', 'H7', 'I7'],
    ['A8', 'B8', 'C8', 'D8', 'E8', 'F8', 'G8', 'H8', 'I8'],
    ['A9', 'B9', 'C9', 'D9', 'E9', 'F9', 'G9', 'H9', 'I9'],
  ],
  width: 'auto',
  height: 272,
  colWidths: 100,
  rowHeights: 23,
  rowHeaders: true,
  colHeaders: true,
  outsideClickDeselects: false,
  selectionMode: 'multiple', // 'single', 'range' or 'multiple',
  licenseKey: 'non-commercial-and-evaluation'
});

button.addEventListener('click', event => {
  const selected = hot.getSelected() || [];
  const target = event.target.id;

  hot.suspendRender();

  for (let index = 0; index < selected.length; index += 1) {
    const [row1, column1, row2, column2] = selected[index];
    const startRow = Math.max(Math.min(row1, row2), 0);
    const endRow = Math.max(row1, row2);
    const startCol = Math.max(Math.min(column1, column2), 0);
    const endCol = Math.max(column1, column2);

    for (let rowIndex = startRow; rowIndex <= endRow; rowIndex += 1) {
      for (let columnIndex = startCol; columnIndex <= endCol; columnIndex += 1) {
        hot.setDataAtCell(rowIndex, columnIndex, 'data changed');
        hot.setCellMeta(rowIndex, columnIndex, 'className', 'c-red');
      }
    }
  }

  hot.render();
  hot.resumeRender();
});
```

:::

:::

::: only-for react

::: example #example3 :react --css 1 --js 2

```css
.c-red {
  color: red;
}
```
```jsx
import { useRef, useEffect } from 'react';
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';

// register Handsontable's modules
registerAllModules();

export const ExampleComponent = () => {
  const hotRef = useRef(null);

  let buttonClickCallback;

  useEffect(() => {
    const hot = hotRef.current.hotInstance;

    buttonClickCallback = event => {
      const selected = hot.getSelected() || [];
      const target = event.target.id;

      hot.suspendRender();

      for (let index = 0; index < selected.length; index += 1) {
        const [row1, column1, row2, column2] = selected[index];
        const startRow = Math.max(Math.min(row1, row2), 0);
        const endRow = Math.max(row1, row2);
        const startCol = Math.max(Math.min(column1, column2), 0);
        const endCol = Math.max(column1, column2);

        for (let rowIndex = startRow; rowIndex <= endRow; rowIndex += 1) {
          for (let columnIndex = startCol; columnIndex <= endCol; columnIndex += 1) {
            hot.setDataAtCell(rowIndex, columnIndex, 'data changed');
            hot.setCellMeta(rowIndex, columnIndex, 'className', 'c-red');
          }
        }
      }

      hot.render();
      hot.resumeRender();
    };
  });

  return (
    <>
      <HotTable
        ref={hotRef}
        data={[
          ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1'],
          ['A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2', 'H2', 'I2'],
          ['A3', 'B3', 'C3', 'D3', 'E3', 'F3', 'G3', 'H3', 'I3'],
          ['A4', 'B4', 'C4', 'D4', 'E4', 'F4', 'G4', 'H4', 'I4'],
          ['A5', 'B5', 'C5', 'D5', 'E5', 'F5', 'G5', 'H5', 'I5'],
          ['A6', 'B6', 'C6', 'D6', 'E6', 'F6', 'G6', 'H6', 'I6'],
          ['A7', 'B7', 'C7', 'D7', 'E7', 'F7', 'G7', 'H7', 'I7'],
          ['A8', 'B8', 'C8', 'D8', 'E8', 'F8', 'G8', 'H8', 'I8'],
          ['A9', 'B9', 'C9', 'D9', 'E9', 'F9', 'G9', 'H9', 'I9'],
        ]}
        width="auto"
        height={272}
        colWidths={100}
        rowHeights={23}
        rowHeaders={true}
        colHeaders={true}
        outsideClickDeselects={false}
        selectionMode="multiple" // 'single', 'range' or 'multiple',
        licenseKey="non-commercial-and-evaluation"
      />
      <div className="controls">
        <button id="set-data-action" onClick={(...args) => buttonClickCallback(...args)}>Click to modify the selected cells</button>
      </div>
    </>
  );
};

/* start:skip-in-preview */
ReactDOM.render(<ExampleComponent />, document.getElementById('example3'));
/* end:skip-in-preview */
```

:::

:::

## Style the selection area

You can easily change the background color, using CSS styles. The main, light blue background color is defined in the `.area` class.

For non-adjacent selection, multiple classes are making each level a bit darker. These classes are called `area-1`, `area-2`, etc.

Unfortunately, there is no easy way to change the border color of the selection.

## Jump across the grid's edges

When you use keyboard navigation to cross an edge of the grid, you can set cell selection to jump to the opposite edge.

#### Jump across vertical edges

To enable jumping across the left and right edges:
- Set the [`autoWrapRow`](@/api/options.md#autowraprow) configuration option to `true`.

To jump across a vertical edge:
- When cell selection is on a row's first cell, press the left arrow key.
- When cell selection is on a row's last cell, press the right arrow key, or press <kbd>**Tab**</kbd>.

#### Jump across horizontal edges

To enable jumping across the top and bottom edges:
- Set the [`autoWrapCol`](@/api/options.md#autowrapcol) configuration option to `true`.

To jump across a horizontal edge:
- When cell selection is on a column's first cell, press the up arrow key.
- When cell selection is on a column's last cell, press the down arrow key, or press <kbd>**Enter**</kbd>.

## Related keyboard shortcuts

| Windows                                                       | macOS                                                        | Action                                                                           |  Excel  | Sheets  |
| ------------------------------------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------------------------------- | :-----: | :-----: |
| <kbd>**Ctrl**</kbd> + <kbd>**A**</kbd>                        | <kbd>**Cmd**</kbd> + <kbd>**A**</kbd>                        | Select all cells and headers                                                     | &check; | &check; |
| <kbd>**Ctrl**</kbd> + <kbd>**Shift**</kbd> + <kbd>**↑**</kbd> | <kbd>**Cmd**</kbd> + <kbd>**Shift**</kbd> + <kbd>**↑**</kbd> | Extend the selection to the first cell of the current column<sup>**</sup>        | &check; | &check; |
| <kbd>**Ctrl**</kbd> + <kbd>**Shift**</kbd> + <kbd>**↓**</kbd> | <kbd>**Cmd**</kbd> + <kbd>**Shift**</kbd> + <kbd>**↓**</kbd> | Extend the selection to the last cell of the current column<sup>**</sup>         | &check; | &check; |
| <kbd>**Ctrl**</kbd> + <kbd>**Shift**</kbd> + <kbd>**←**</kbd> | <kbd>**Cmd**</kbd> + <kbd>**Shift**</kbd> + <kbd>**←**</kbd> | Extend the selection to the leftmost cell of the current row<sup>**</sup>        | &check; | &check; |
| <kbd>**Ctrl**</kbd> + <kbd>**Shift**</kbd> + <kbd>**→**</kbd> | <kbd>**Cmd**</kbd> + <kbd>**Shift**</kbd> + <kbd>**→**</kbd> | Extend the selection to the rightmost cell of the current row<sup>**</sup>       | &check; | &check; |
| <kbd>**Shift**</kbd> + Arrow keys                             | <kbd>**Shift**</kbd> + Arrow keys                            | Extend the selection by one cell                                                 | &check; | &check; |
| <kbd>**Shift**</kbd> + <kbd>**Home**</kbd>                    | <kbd>**Shift**</kbd> + <kbd>**Home**</kbd>                   | Extend the selection to the first non-frozen cell of the current row<sup>*</sup> | &check; | &cross; |
| <kbd>**Shift**</kbd> + <kbd>**End**</kbd>                     | <kbd>**Shift**</kbd> + <kbd>**End**</kbd>                    | Extend the selection to the last non-frozen cell of the current row<sup>*</sup>  | &cross; | &cross; |
| <kbd>**Shift**</kbd> + <kbd>**Page Up**</kbd>                 | <kbd>**Shift**</kbd> + <kbd>**Page Up**</kbd>                | Extend the selection by one screen up                                            | &check; | &check; |
| <kbd>**Shift**</kbd> + <kbd>**Page Down**</kbd>               | <kbd>**Shift**</kbd> + <kbd>**Page Down**</kbd>              | Extend the selection by one screen down                                          | &check; | &check; |
| <kbd>**Ctrl**</kbd> + <kbd>**Enter**</kbd>                    | <kbd>**Cmd**</kbd> + <kbd>**Enter**</kbd>                    | Fill the selected range of cells with the value of the active cell               | &cross; | &check; |
| <kbd>**Delete**</kbd>                                         | <kbd>**Delete**</kbd>                                        | Clear the contents of the selected cells                                         | &check; | &check; |
| <kbd>**Backspace**</kbd>                                      | <kbd>**Backspace**</kbd>                                     | Clear the contents of the selected cells                                         | &check; | &check; |

<sup>*</sup> This action depends on your [layout direction](@/guides/internationalization/layout-direction.md).<br>
<sup>**</sup> In case of multiple selection layers, only the last selection layer gets extended.

## Related API reference

- Configuration options:
  - [`autoWrapCol`](@/api/options.md#autowrapcol)
  - [`autoWrapRow`](@/api/options.md#autowraprow)
  - [`fragmentSelection`](@/api/options.md#fragmentselection)
  - [`disableVisualSelection`](@/api/options.md#disablevisualselection)
  - [`dragToScroll`](@/api/options.md#dragtoscroll)
  - [`selectionMode`](@/api/options.md#selectionmode)
  - [`outsideClickDeselects`](@/api/options.md#outsideclickdeselects)
- Core methods:
  - [`deselectCell()`](@/api/core.md#deselectcell)
  - [`getSelected()`](@/api/core.md#getselected)
  - [`getSelectedLast()`](@/api/core.md#getselectedlast)
  - [`getSelectedRange()`](@/api/core.md#getselectedrange)
  - [`getSelectedRangeLast()`](@/api/core.md#getselectedrangelast)
  - [`selectAll()`](@/api/core.md#selectall)
  - [`selectCell()`](@/api/core.md#selectcell)
  - [`selectCells()`](@/api/core.md#selectcells)
  - [`selectColumns()`](@/api/core.md#selectcolumns)
  - [`selectRows()`](@/api/core.md#selectrows)
- Hooks:
  - [`afterDeselect`](@/api/hooks.md#afterdeselect)
  - [`afterDrawSelection`](@/api/hooks.md#afterdrawselection)
  - [`afterModifyTransformEnd`](@/api/hooks.md#aftermodifytransformend)
  - [`afterModifyTransformStart`](@/api/hooks.md#aftermodifytransformstart)
  - [`afterSelection`](@/api/hooks.md#afterselection)
  - [`afterSelectionByProp`](@/api/hooks.md#afterselectionbyprop)
  - [`afterSelectionEnd`](@/api/hooks.md#afterselectionend)
  - [`afterSelectionEndByProp`](@/api/hooks.md#afterselectionendbyprop)
  - [`modifyTransformStart`](@/api/hooks.md#modifytransformstart)
- Plugins:
  - [`DragToScroll`](@/api/dragToScroll.md)
