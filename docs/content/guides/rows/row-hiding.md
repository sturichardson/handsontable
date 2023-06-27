---
id: 37786931
title: Row hiding
metaTitle: Row hiding - JavaScript Data Grid | Handsontable
description: Hide individual rows to avoid rendering them as DOM elements. It helps you reduce screen clutter and improve the grid's performance.
permalink: /row-hiding
canonicalUrl: /row-hiding
react:
  id: al1djb6l
  metaTitle: Row hiding - React Data Grid | Handsontable
searchCategory: Guides
---

# Row hiding

Hide individual rows to avoid rendering them as DOM elements. It helps you reduce screen clutter and improve the grid's performance.

[[toc]]

## Overview

"Hiding a row" means that the hidden row doesn't get rendered as a DOM element.

When you're hiding a row:
- The source data doesn't get modified.
- The [`HiddenRows`](@/api/hiddenRows.md) plugin doesn't participate in data transformation<br>(the shape of the data returned by the [`getData*()` methods](@/api/core.md#getdata) stays intact).

## Enable row hiding

To enable row hiding, use the [`hiddenRows`](@/api/options.md#hiddenrows) option.

::: only-for javascript

::: example #example1

```js
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.min.css';

const container = document.querySelector('#example1');
const hot = new Handsontable(container, {
  licenseKey: 'non-commercial-and-evaluation',
  data: [
    ['A1', 'B1', 'C1', 'D1', 'E1'],
    ['A2', 'B2', 'C2', 'D2', 'E2'],
    ['A3', 'B3', 'C3', 'D3', 'E3'],
    ['A4', 'B4', 'C4', 'D4', 'E4'],
    ['A5', 'B5', 'C5', 'D5', 'E5'],
    ['A6', 'B6', 'C6', 'D6', 'E6'],
    ['A7', 'B7', 'C7', 'D7', 'E7'],
    ['A8', 'B8', 'C8', 'D8', 'E8'],
    ['A9', 'B9', 'C9', 'D9', 'E9'],
    ['A10', 'B10', 'C10', 'D10', 'E10'],
    ['A11', 'B11', 'C11', 'D11', 'E11'],
    ['A12', 'B12', 'C12', 'D12', 'E12'],
  ],
  height: 'auto',
  colHeaders: true,
  rowHeaders: true,
  // enable the `HiddenRows` plugin
  hiddenRows: {
    rows: [3, 5, 9],
    // show UI indicators to mark hidden rows
    indicators: true
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
import 'handsontable/dist/handsontable.full.min.css';

// register Handsontable's modules
registerAllModules();

export const ExampleComponent = () => {
  return (
    <HotTable
      licenseKey="non-commercial-and-evaluation"
      data={[
        ['A1', 'B1', 'C1', 'D1', 'E1'],
        ['A2', 'B2', 'C2', 'D2', 'E2'],
        ['A3', 'B3', 'C3', 'D3', 'E3'],
        ['A4', 'B4', 'C4', 'D4', 'E4'],
        ['A5', 'B5', 'C5', 'D5', 'E5'],
        ['A6', 'B6', 'C6', 'D6', 'E6'],
        ['A7', 'B7', 'C7', 'D7', 'E7'],
        ['A8', 'B8', 'C8', 'D8', 'E8'],
        ['A9', 'B9', 'C9', 'D9', 'E9'],
        ['A10', 'B10', 'C10', 'D10', 'E10'],
        ['A11', 'B11', 'C11', 'D11', 'E11'],
        ['A12', 'B12', 'C12', 'D12', 'E12'],
      ]}
      height="auto"
      colHeaders={true}
      rowHeaders={true}
      hiddenRows={{
        rows: [3, 5, 9],
        // show UI indicators to mark hidden rows
        indicators: true
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

## Set up row hiding

To set up your row hiding configuration, follow the steps below.

### Step 1: Specify rows hidden by default

To both enable row hiding and specify rows hidden by default, set the [`hiddenRows`](@/api/options.md#hiddenrows) configuration option  to an object.

In the object, add a `rows` property, and set it to an array of row indexes.

Now, those rows are hidden by default:

::: only-for javascript

::: example #example2

```js
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.min.css';

const container = document.querySelector('#example2');
const hot = new Handsontable(container, {
  licenseKey: 'non-commercial-and-evaluation',
  data: [
    ['A1', 'B1', 'C1', 'D1', 'E1'],
    ['A2', 'B2', 'C2', 'D2', 'E2'],
    ['A3', 'B3', 'C3', 'D3', 'E3'],
    ['A4', 'B4', 'C4', 'D4', 'E4'],
    ['A5', 'B5', 'C5', 'D5', 'E5'],
    ['A6', 'B6', 'C6', 'D6', 'E6'],
    ['A7', 'B7', 'C7', 'D7', 'E7'],
    ['A8', 'B8', 'C8', 'D8', 'E8'],
    ['A9', 'B9', 'C9', 'D9', 'E9'],
    ['A10', 'B10', 'C10', 'D10', 'E10'],
    ['A11', 'B11', 'C11', 'D11', 'E11'],
    ['A12', 'B12', 'C12', 'D12', 'E12'],
  ],
  height: 'auto',
  colHeaders: true,
  rowHeaders: true,
  // enable the `HiddenRows` plugin
  hiddenRows: {
    // specify rows hidden by default
    rows: [3, 5, 9]
  }
});
```

:::

:::

::: only-for react

::: example #example2 :react

```jsx
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';

// register Handsontable's modules
registerAllModules();

export const ExampleComponent = () => {
  return (
    <HotTable
      licenseKey="non-commercial-and-evaluation"
      data={[
        ['A1', 'B1', 'C1', 'D1', 'E1'],
        ['A2', 'B2', 'C2', 'D2', 'E2'],
        ['A3', 'B3', 'C3', 'D3', 'E3'],
        ['A4', 'B4', 'C4', 'D4', 'E4'],
        ['A5', 'B5', 'C5', 'D5', 'E5'],
        ['A6', 'B6', 'C6', 'D6', 'E6'],
        ['A7', 'B7', 'C7', 'D7', 'E7'],
        ['A8', 'B8', 'C8', 'D8', 'E8'],
        ['A9', 'B9', 'C9', 'D9', 'E9'],
        ['A10', 'B10', 'C10', 'D10', 'E10'],
        ['A11', 'B11', 'C11', 'D11', 'E11'],
        ['A12', 'B12', 'C12', 'D12', 'E12'],
      ]}
      height="auto"
      colHeaders={true}
      rowHeaders={true}
      hiddenRows={{
        // specify rows hidden by default
        rows: [3, 5, 9]
      }}
    />
  );
};

/* start:skip-in-preview */
ReactDOM.render(<ExampleComponent />, document.getElementById('example2'));
/* end:skip-in-preview */
```

:::

:::

### Step 2: Show UI indicators

To easily see which rows are currently hidden, display UI indicators.

To enable the UI indicators, in the `hiddenRows` object, set the `indicators` property to `true`:

::: tip

If you use both the [`NestedHeaders`](@/api/nestedHeaders.md) plugin and the [`HiddenRows`](@/api/hiddenRows.md) plugin, you also need to set the `colHeaders` property to `true`. Otherwise, `indicators` won't work.

:::

::: only-for javascript

::: example #example3

```js
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.min.css';

const container = document.querySelector('#example3');
const hot = new Handsontable(container, {
  licenseKey: 'non-commercial-and-evaluation',
  data: [
    ['A1', 'B1', 'C1', 'D1', 'E1'],
    ['A2', 'B2', 'C2', 'D2', 'E2'],
    ['A3', 'B3', 'C3', 'D3', 'E3'],
    ['A4', 'B4', 'C4', 'D4', 'E4'],
    ['A5', 'B5', 'C5', 'D5', 'E5'],
    ['A6', 'B6', 'C6', 'D6', 'E6'],
    ['A7', 'B7', 'C7', 'D7', 'E7'],
    ['A8', 'B8', 'C8', 'D8', 'E8'],
    ['A9', 'B9', 'C9', 'D9', 'E9'],
    ['A10', 'B10', 'C10', 'D10', 'E10'],
    ['A11', 'B11', 'C11', 'D11', 'E11'],
    ['A12', 'B12', 'C12', 'D12', 'E12'],
  ],
  height: 'auto',
  colHeaders: true,
  rowHeaders: true,
  hiddenRows: {
    rows: [3, 5, 9],
    // show UI indicators to mark hidden rows
    indicators: true
  }
});
```

:::

:::

::: only-for react

::: example #example3 :react

```jsx
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';

// register Handsontable's modules
registerAllModules();

export const ExampleComponent = () => {
  return (
    <HotTable
      licenseKey="non-commercial-and-evaluation"
      data={[
        ['A1', 'B1', 'C1', 'D1', 'E1'],
        ['A2', 'B2', 'C2', 'D2', 'E2'],
        ['A3', 'B3', 'C3', 'D3', 'E3'],
        ['A4', 'B4', 'C4', 'D4', 'E4'],
        ['A5', 'B5', 'C5', 'D5', 'E5'],
        ['A6', 'B6', 'C6', 'D6', 'E6'],
        ['A7', 'B7', 'C7', 'D7', 'E7'],
        ['A8', 'B8', 'C8', 'D8', 'E8'],
        ['A9', 'B9', 'C9', 'D9', 'E9'],
        ['A10', 'B10', 'C10', 'D10', 'E10'],
        ['A11', 'B11', 'C11', 'D11', 'E11'],
        ['A12', 'B12', 'C12', 'D12', 'E12'],
      ]}
      height="auto"
      colHeaders={true}
      rowHeaders={true}
      hiddenRows={{
        rows: [3, 5, 9],
        // show UI indicators to mark hidden rows
        indicators: true
      }}
    />
  );
};

/* start:skip-in-preview */
ReactDOM.render(<ExampleComponent />, document.getElementById('example3'));
/* end:skip-in-preview */
```

:::

:::

### Step 3: Set up context menu items

To easily hide and unhide rows, add row hiding items to Handsontable's [context menu](@/guides/accessories-and-menus/context-menu.md).

Enable both the [`ContextMenu`](@/api/contextMenu.md) plugin and the [`HiddenRows`](@/api/hiddenRows.md) plugin. Now, the [context menu](@/guides/accessories-and-menus/context-menu.md) automatically displays additional items for hiding and unhiding rows.

::: only-for javascript

::: example #example4

```js
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.min.css';

const container = document.querySelector('#example4');
const hot = new Handsontable(container, {
  licenseKey: 'non-commercial-and-evaluation',
  data: [
    ['A1', 'B1', 'C1', 'D1', 'E1'],
    ['A2', 'B2', 'C2', 'D2', 'E2'],
    ['A3', 'B3', 'C3', 'D3', 'E3'],
    ['A4', 'B4', 'C4', 'D4', 'E4'],
    ['A5', 'B5', 'C5', 'D5', 'E5'],
    ['A6', 'B6', 'C6', 'D6', 'E6'],
    ['A7', 'B7', 'C7', 'D7', 'E7'],
    ['A8', 'B8', 'C8', 'D8', 'E8'],
    ['A9', 'B9', 'C9', 'D9', 'E9'],
    ['A10', 'B10', 'C10', 'D10', 'E10'],
    ['A11', 'B11', 'C11', 'D11', 'E11'],
    ['A12', 'B12', 'C12', 'D12', 'E12'],
  ],
  height: 'auto',
  colHeaders: true,
  rowHeaders: true,
  // enable the context menu
  contextMenu: true,
  // enable the `HiddenRows` plugin
  // automatically adds the context menu's row hiding items
  hiddenRows: {
    rows: [3, 5, 9],
    indicators: true
  }
});
```

:::

:::

::: only-for react

::: example #example4 :react

```jsx
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';

// register Handsontable's modules
registerAllModules();

export const ExampleComponent = () => {
  return (
    <HotTable
      licenseKey="non-commercial-and-evaluation"
      data={[
        ['A1', 'B1', 'C1', 'D1', 'E1'],
        ['A2', 'B2', 'C2', 'D2', 'E2'],
        ['A3', 'B3', 'C3', 'D3', 'E3'],
        ['A4', 'B4', 'C4', 'D4', 'E4'],
        ['A5', 'B5', 'C5', 'D5', 'E5'],
        ['A6', 'B6', 'C6', 'D6', 'E6'],
        ['A7', 'B7', 'C7', 'D7', 'E7'],
        ['A8', 'B8', 'C8', 'D8', 'E8'],
        ['A9', 'B9', 'C9', 'D9', 'E9'],
        ['A10', 'B10', 'C10', 'D10', 'E10'],
        ['A11', 'B11', 'C11', 'D11', 'E11'],
        ['A12', 'B12', 'C12', 'D12', 'E12'],
      ]}
      height="auto"
      colHeaders={true}
      rowHeaders={true}
      contextMenu={true}
      hiddenRows={{
        rows: [3, 5, 9],
        indicators: true
      }}
    />
  );
};

/* start:skip-in-preview */
ReactDOM.render(<ExampleComponent />, document.getElementById('example4'));
/* end:skip-in-preview */
```

:::

:::

You can also add the row hiding menu items individually, by adding the [`hidden_rows_show`](@/guides/accessories-and-menus/context-menu.md#context-menu-with-specific-options) and [`hidden_rows_hide`](@/guides/accessories-and-menus/context-menu.md#context-menu-with-specific-options) strings to the `contextMenu` parameter:

::: only-for javascript

::: example #example5

```js
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.min.css';

const container = document.querySelector('#example5');
const hot = new Handsontable(container, {
  licenseKey: 'non-commercial-and-evaluation',
  data: [
    ['A1', 'B1', 'C1', 'D1', 'E1'],
    ['A2', 'B2', 'C2', 'D2', 'E2'],
    ['A3', 'B3', 'C3', 'D3', 'E3'],
    ['A4', 'B4', 'C4', 'D4', 'E4'],
    ['A5', 'B5', 'C5', 'D5', 'E5'],
    ['A6', 'B6', 'C6', 'D6', 'E6'],
    ['A7', 'B7', 'C7', 'D7', 'E7'],
    ['A8', 'B8', 'C8', 'D8', 'E8'],
    ['A9', 'B9', 'C9', 'D9', 'E9'],
    ['A10', 'B10', 'C10', 'D10', 'E10'],
    ['A11', 'B11', 'C11', 'D11', 'E11'],
    ['A12', 'B12', 'C12', 'D12', 'E12'],
  ],
  height: 'auto',
  colHeaders: true,
  rowHeaders: true,
  // individually add row hiding context menu items
  contextMenu: [`hidden_rows_show`, `hidden_rows_hide`],
  hiddenRows: {
    rows: [3, 5, 9],
    indicators: true
  }
});
```

:::

:::

::: only-for react

::: example #example5 :react

```jsx
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';

// register Handsontable's modules
registerAllModules();

export const ExampleComponent = () => {
  return (
    <HotTable
      licenseKey="non-commercial-and-evaluation"
      data={[
        ['A1', 'B1', 'C1', 'D1', 'E1'],
        ['A2', 'B2', 'C2', 'D2', 'E2'],
        ['A3', 'B3', 'C3', 'D3', 'E3'],
        ['A4', 'B4', 'C4', 'D4', 'E4'],
        ['A5', 'B5', 'C5', 'D5', 'E5'],
        ['A6', 'B6', 'C6', 'D6', 'E6'],
        ['A7', 'B7', 'C7', 'D7', 'E7'],
        ['A8', 'B8', 'C8', 'D8', 'E8'],
        ['A9', 'B9', 'C9', 'D9', 'E9'],
        ['A10', 'B10', 'C10', 'D10', 'E10'],
        ['A11', 'B11', 'C11', 'D11', 'E11'],
        ['A12', 'B12', 'C12', 'D12', 'E12'],
      ]}
      height="auto"
      colHeaders={true}
      rowHeaders={true}
      contextMenu={[`hidden_rows_show`, `hidden_rows_hide`]}
      hiddenRows={{
        rows: [3, 5, 9],
        indicators: true
      }}
    />
  );
};

/* start:skip-in-preview */
ReactDOM.render(<ExampleComponent />, document.getElementById('example5'));
/* end:skip-in-preview */
```

:::

:::

### Step 4: Set up copy and paste behavior

By default, hidden rows are included in copying and pasting.

To exclude hidden rows from copying and pasting, in the `hiddenRows` object, set the `copyPasteEnabled` property to `false`:

::: only-for javascript

::: example #example6

```js
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.min.css';

const container = document.querySelector('#example6');
const hot = new Handsontable(container, {
  licenseKey: 'non-commercial-and-evaluation',
  data: [
    ['A1', 'B1', 'C1', 'D1', 'E1'],
    ['A2', 'B2', 'C2', 'D2', 'E2'],
    ['A3', 'B3', 'C3', 'D3', 'E3'],
    ['A4', 'B4', 'C4', 'D4', 'E4'],
    ['A5', 'B5', 'C5', 'D5', 'E5'],
    ['A6', 'B6', 'C6', 'D6', 'E6'],
    ['A7', 'B7', 'C7', 'D7', 'E7'],
    ['A8', 'B8', 'C8', 'D8', 'E8'],
    ['A9', 'B9', 'C9', 'D9', 'E9'],
    ['A10', 'B10', 'C10', 'D10', 'E10'],
    ['A11', 'B11', 'C11', 'D11', 'E11'],
    ['A12', 'B12', 'C12', 'D12', 'E12'],
  ],
  height: 'auto',
  colHeaders: true,
  rowHeaders: true,
  contextMenu: [`hidden_rows_show`, `hidden_rows_hide`],
  hiddenRows: {
    rows: [3, 5, 9],
    indicators: true,
    // exclude hidden rows from copying and pasting
    copyPasteEnabled: false
  }
});
```

:::

:::

::: only-for react

::: example #example6 :react

```jsx
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';

// register Handsontable's modules
registerAllModules();

export const ExampleComponent = () => {
  return (
    <HotTable
      licenseKey="non-commercial-and-evaluation"
      data={[
        ['A1', 'B1', 'C1', 'D1', 'E1'],
        ['A2', 'B2', 'C2', 'D2', 'E2'],
        ['A3', 'B3', 'C3', 'D3', 'E3'],
        ['A4', 'B4', 'C4', 'D4', 'E4'],
        ['A5', 'B5', 'C5', 'D5', 'E5'],
        ['A6', 'B6', 'C6', 'D6', 'E6'],
        ['A7', 'B7', 'C7', 'D7', 'E7'],
        ['A8', 'B8', 'C8', 'D8', 'E8'],
        ['A9', 'B9', 'C9', 'D9', 'E9'],
        ['A10', 'B10', 'C10', 'D10', 'E10'],
        ['A11', 'B11', 'C11', 'D11', 'E11'],
        ['A12', 'B12', 'C12', 'D12', 'E12'],
      ]}
      height="auto"
      colHeaders={true}
      rowHeaders={true}
      contextMenu={[`hidden_rows_show`, `hidden_rows_hide`]}
      hiddenRows={{
        rows: [3, 5, 9],
        indicators: true,
        // exclude hidden rows from copying and pasting
        copyPasteEnabled: false
      }}
    />
  );
};

/* start:skip-in-preview */
ReactDOM.render(<ExampleComponent />, document.getElementById('example6'));
/* end:skip-in-preview */
```

:::

:::

## Row hiding API methods

::: only-for react

::: tip

To use the Handsontable API, you'll need access to the Handsontable instance. You can do that by utilizing a reference to the `HotTable` component, and reading its `hotInstance` property.

For more information, see the [Instance methods](@/guides/getting-started/react-methods.md) page.

:::

:::

For the most popular row hiding tasks, use the API methods below.

To see your changes, re-render your Handsontable instance with the [`render()`](@/api/core.md#render) method.

### Access the `HiddenRows` plugin instance

To access the [`HiddenRows`](@/api/hiddenRows.md) plugin instance, use the [`getPlugin()`](@/api/core.md#getplugin) method:

```js
const plugin = hot.getPlugin('hiddenRows');
```

### Hide a single row

To hide a single row, use the [`hideRow()`](@/api/hiddenRows.md#hiderow) method:

```js
const plugin = hot.getPlugin('hiddenRows');

plugin.hideRow(4);
```

### Hide multiple rows

To hide multiple rows:
- Either pass row indexes as arguments to the `hideRow()` method
- Or pass an array of row indexes to the `hideRows()` method

```js
const plugin = hot.getPlugin('hiddenRows');

plugin.hideRow(0, 4, 6);
// or
plugin.hideRows([0, 4, 6]);
```

### Unhide a single row

To unhide a single row, use the `showRow()` method:

```js
const plugin = hot.getPlugin('hiddenRows');

plugin.showRow(4);
```

### Unhide multiple rows

To unhide multiple rows:
- Either pass row indexes as arguments to the `showRow()` method
- Or pass an array of row indexes to the `showRows()` method

```js
const plugin = hot.getPlugin('hiddenRows');

plugin.showRow(0, 4, 6);
// or
plugin.showRows([0, 4, 6]);
```

## Related API reference

- Configuration options:
  - [`hiddenRows`](@/api/options.md#hiddenrows)
- Hooks:
  - [`afterHideRows`](@/api/hooks.md#afterhiderows)
  - [`afterUnhideRows`](@/api/hooks.md#afterunhiderows)
  - [`beforeHideRows`](@/api/hooks.md#beforehiderows)
  - [`beforeUnhideRows`](@/api/hooks.md#beforeunhiderows)
- Plugins:
  - [`HiddenRows`](@/api/hiddenRows.md)
