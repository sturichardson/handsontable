---
id: 4ca0c70r
title: Conditional formatting
metaTitle: Conditional formatting - JavaScript Data Grid | Handsontable
description: Format specified cells, based on dynamic conditions.
permalink: /conditional-formatting
canonicalUrl: /conditional-formatting
react:
  id: eyatgywe
  metaTitle: Conditional formatting - React Data Grid | Handsontable
searchCategory: Guides
---

# Conditional formatting

Format specified cells, based on dynamic conditions.

[[toc]]

## Overview

Conditional formatting can be used to set the font, color, typeface, etc., for cell content and can also be used to format the style of a cell, all based on a predefined set of criteria.

## Example of conditional formatting

<style>
.make-me-red {
  color: #FF5A12;
}
</style>

This demo shows how to use the cell type renderer feature to make some conditional formatting:

1. The first row is read-only and formatted as bold green text.
2. All cells in the Nissan column are formatted as italic text.
3. Empty cells are formatted with a silver background.
4. Negative numbers are formatted as red text.

::: only-for javascript

::: example #example1

```js
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.min.css';

const container = document.querySelector('#example1');
const data = [
  ['', 'Tesla', 'Nissan', 'Toyota', 'Honda'],
  ['2017', -5, '', 12, 13],
  ['2018', '', -11, 14, 13],
  ['2019', '', 15, -12, 'readOnly']
];

function firstRowRenderer(instance, td, row, col, prop, value, cellProperties) {
  Handsontable.renderers.TextRenderer.apply(this, arguments);
  td.style.fontWeight = 'bold';
  td.style.color = 'green';
  td.style.background = '#CEC';
}

function negativeValueRenderer(instance, td, row, col, prop, value, cellProperties) {
  Handsontable.renderers.TextRenderer.apply(this, arguments);

  // if the row contains a negative number
  if (parseInt(value, 10) < 0) {
    // add class 'make-me-red'
    td.className = 'make-me-red';
  }

  if (!value || value === '') {
    td.style.background = '#EEE';

  } else {
    if (value === 'Nissan') {
      td.style.fontStyle = 'italic';
    }

    td.style.background = '';
  }
}
// maps function to a lookup string
Handsontable.renderers.registerRenderer('negativeValueRenderer', negativeValueRenderer);

const hot = new Handsontable(container, {
  data: data,
  licenseKey: 'non-commercial-and-evaluation',
  height: 'auto',
  afterSelection(row, col, row2, col2) {
    const meta = this.getCellMeta(row2, col2);

    if (meta.readOnly) {
      this.updateSettings({fillHandle: false});

    } else {
      this.updateSettings({fillHandle: true});
    }
  },
  cells(row, col) {
    const cellProperties = {};
    const data = this.instance.getData();

    if (row === 0 || data[row] && data[row][col] === 'readOnly') {
      cellProperties.readOnly = true; // make cell read-only if it is first row or the text reads 'readOnly'
    }

    if (row === 0) {
      cellProperties.renderer = firstRowRenderer; // uses function directly

    } else {
      cellProperties.renderer = 'negativeValueRenderer'; // uses lookup map
    }

    return cellProperties;
  }
});
```

:::

:::

::: only-for react

::: example #example1 :react

```jsx
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import { registerRenderer, textRenderer } from 'handsontable/renderers';
import 'handsontable/dist/handsontable.full.min.css';

// register Handsontable's modules
registerAllModules();

export const ExampleComponent = () => {
  const data = [
    ['', 'Tesla', 'Nissan', 'Toyota', 'Honda'],
    ['2017', -5, '', 12, 13],
    ['2018', '', -11, 14, 13],
    ['2019', '', 15, -12, 'readOnly']
  ];

  function firstRowRenderer(instance, td, row, col, prop, value, cellProperties) {
    textRenderer.apply(this, arguments);
    td.style.fontWeight = 'bold';
    td.style.color = 'green';
    td.style.background = '#CEC';
  }

  function negativeValueRenderer(instance, td, row, col, prop, value, cellProperties) {
    textRenderer.apply(this, arguments);

    // if row contains negative number
    if (parseInt(value, 10) < 0) {
      // add class "negative"
      td.className = 'make-me-red';
    }

    if (!value || value === '') {
      td.style.background = '#EEE';

    } else {
      if (value === 'Nissan') {
        td.style.fontStyle = 'italic';
      }

      td.style.background = '';
    }
  }
  //  maps function to a lookup string
  registerRenderer('negativeValueRenderer', negativeValueRenderer);

  return (
    <HotTable
      data={data}
      licenseKey="non-commercial-and-evaluation"
      height="auto"
      afterSelection={function(row, col, row2, col2) {
        const meta = this.getCellMeta(row2, col2);

        if (meta.readOnly) {
        this.updateSettings({ fillHandle: false });

        } else {
          this.updateSettings({ fillHandle: true });
        }
      }}
      cells={function(row, col) {
        const cellProperties = {};
        const data = this.instance.getData();

        if (row === 0 || data[row] && data[row][col] === 'readOnly') {
        cellProperties.readOnly = true; // make cell read-only if it is first row or the text reads 'readOnly'
        }

        if (row === 0) {
          cellProperties.renderer = firstRowRenderer; // uses function directly

        } else {
          cellProperties.renderer = 'negativeValueRenderer'; // uses lookup map
        }

        return cellProperties;
      }}
    />
  );
};

/* start:skip-in-preview */
ReactDOM.render(<ExampleComponent />, document.getElementById('example1'));
/* end:skip-in-preview */
```

:::

:::

## Related articles

### Related guides

- [Formatting cells](@/guides/cell-features/formatting-cells.md)

### Related API reference

- Configuration options:
  - [`activeHeaderClassName`](@/api/options.md#activeheaderclassname)
  - [`className`](@/api/options.md#classname)
  - [`commentedCellClassName`](@/api/options.md#commentedcellclassname)
  - [`currentColClassName`](@/api/options.md#currentcolclassname)
  - [`currentHeaderClassName`](@/api/options.md#currentheaderclassname)
  - [`currentRowClassName`](@/api/options.md#currentrowclassname)
  - [`customBorders`](@/api/options.md#customborders)
  - [`invalidCellClassName`](@/api/options.md#invalidcellclassname)
  - [`noWordWrapClassName`](@/api/options.md#nowordwrapclassname)
  - [`placeholder`](@/api/options.md#placeholder)
  - [`placeholderCellClassName`](@/api/options.md#placeholdercellclassname)
  - [`readOnlyCellClassName`](@/api/options.md#readonlycellclassname)
  - [`tableClassName`](@/api/options.md#tableclassname)
- Plugins:
  - [`CustomBorders`](@/api/customBorders.md)
