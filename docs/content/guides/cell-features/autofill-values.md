---
id: if13we5c
title: Autofill values
metaTitle: Autofill values - JavaScript Data Grid | Handsontable
description: Copy a cell's value into multiple other cells, using the "fill handle" UI element. Configure the direction of copying, and more, through Handsontable's API.
permalink: /autofill-values
canonicalUrl: /autofill-values
tags:
  - fill handle
  - smart fill
  - populate data
  - drag down
  - square
  - auto-fill
  - auto fill
react:
  id: m4x3zpiw
  metaTitle: Autofill values - React Data Grid | Handsontable
searchCategory: Guides
---

# Autofill values

Copy a cell's value into multiple other cells, using the "fill handle" UI element. Configure the direction of copying, and more, through Handsontable's API.

[[toc]]

## Autofill in all directions

Using the tiny square known as the 'fill handle' in the corner of the selected cell, you can drag it (drag-down) to repeat the values from the cell. Double click the fill handle in `cell B4` where the value is `30` to fill the selection down to the last value in neighboring column, just like it would in Excel or Google Sheets.

::: only-for javascript

::: example #example1

```js
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.min.css';

const container = document.querySelector('#example1');
const data = [
  ['', 'Tesla', 'Nissan', 'Toyota', 'Honda'],
  ['2017', 10, 11, 12, 13],
  ['2018', 20, 11, 14, 13],
  ['2019', 30, 15, 12, 13],
  ['2020', '', '', '', ''],
  ['2021', '', '', '', '']
];

const hot = new Handsontable(container, {
  rowHeaders: true,
  colHeaders: true,
  fillHandle: true, // possible values: true, false, "horizontal", "vertical",
  height: 'auto',
  licenseKey: 'non-commercial-and-evaluation'
});

// or, use `updateData()` to replace `data` without resetting states
hot.loadData(data);
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
  const data = [
    ['', 'Tesla', 'Nissan', 'Toyota', 'Honda'],
    ['2017', 10, 11, 12, 13],
    ['2018', 20, 11, 14, 13],
    ['2019', 30, 15, 12, 13],
    ['2020', '', '', '', ''],
    ['2021', '', '', '', '']
  ];

  return (
    <HotTable
      data={data}
      rowHeaders={true}
      colHeaders={true}
      fillHandle={true} // possible values: true, false, "horizontal", "vertical",
      height="auto"
      licenseKey="non-commercial-and-evaluation"
    />
  );
};

/* start:skip-in-preview */
ReactDOM.render(<ExampleComponent />, document.getElementById('example1'));
/* end:skip-in-preview */
```

:::

:::

## Autofill in a vertical direction only and creating new rows

In this configuration, the fill handle is restricted to move only vertically. New rows are automatically added to the bottom of the table by changing [`autoInsertRow`](@/api/options.md#fillhandle) to `true`.

::: only-for javascript

::: example #example2

```js
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.min.css';

const container = document.querySelector('#example2');
const data = [
  ['', 'Tesla', 'Nissan', 'Toyota', 'Honda'],
  ['2017', 10, 11, 12, 13],
  ['2018', 20, 11, 14, 13],
  ['2019', 30, 15, 12, 13],
  ['2020', '', '', '', ''],
  ['2021', '', '', '', '']
];

const hot = new Handsontable(container, {
  data: data,
  rowHeaders: true,
  colHeaders: true,
  fillHandle: {
    direction: 'vertical',
    autoInsertRow: true
  },
  height: 'auto',
  licenseKey: 'non-commercial-and-evaluation'
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
  const data = [
    ['', 'Tesla', 'Nissan', 'Toyota', 'Honda'],
    ['2017', 10, 11, 12, 13],
    ['2018', 20, 11, 14, 13],
    ['2019', 30, 15, 12, 13],
    ['2020', '', '', '', ''],
    ['2021', '', '', '', '']
  ];

  return (
    <HotTable
      data={data}
      rowHeaders={true}
      colHeaders={true}
      fillHandle={{
        direction: 'vertical',
        autoInsertRow: true
      }}
      height="auto"
      licenseKey="non-commercial-and-evaluation"
    />
  );
};

/* start:skip-in-preview */
ReactDOM.render(<ExampleComponent />, document.getElementById('example2'));
/* end:skip-in-preview */
```

:::

:::

## Related API reference

- Configuration options:
  - [`fillHandle`](@/api/options.md#fillhandle)
- Hooks:
  - [`afterAutofill`](@/api/hooks.md#afterautofill)
  - [`beforeAutofill`](@/api/hooks.md#beforeautofill)
  - [`modifyAutofillRange`](@/api/hooks.md#modifyautofillrange)
- Plugins:
  - [`Autofill`](@/api/autofill.md)
