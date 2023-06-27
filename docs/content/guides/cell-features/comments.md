---
id: deqvum60
title: Comments
metaTitle: Comments - JavaScript Data Grid | Handsontable
description: Add a comment (a note) to a cell, using the context menu, just like in Excel. Edit and delete comments. Make comments read-only.
permalink: /comments
canonicalUrl: /comments
tags:
  - notes
react:
  id: lxw2632u
  metaTitle: Comments - React Data Grid | Handsontable
searchCategory: Guides
---

# Comments

Add a comment (a note) to a cell, using the context menu, just like in Excel. Edit and delete comments. Make comments read-only.

[[toc]]

## Enable the plugin

Set the [`comments`](@/api/options.md#comments) configuration option to `true` to enable the feature and add all the needed context menu items. For example:

::: only-for javascript

```js
const hot = new Handsontable(container, {
  data: [
    ['A1', 'B1', 'C1'],
    ['A2', 'B2', 'C2'],
  ],
  comments: true
});
```

:::

::: only-for react

```jsx
<HotTable
  data={[
    ['A1', 'B1', 'C1'],
    ['A2', 'B2', 'C2'],
  ]}
  comments={true}
/>
```

:::

## Add comments via the context menu

After you've enabled the plugin, the [Context Menu](@/guides/accessories-and-menus/context-menu.md) gains a few new items:

- Add/Edit comment
- Delete comment
- Read-only comment

## Set up pre-set comments

You can also pre-define comments for your table. Comments are stored in the table's/column's/cell's metadata object and you can declare as any value of the respective type. For example:

::: only-for javascript

```js
cell: [
  { row: 1, col: 1, comment: { value: 'Hello world!' } }
]
```

:::

::: only-for react

```jsx
cell={[
  { row: 1, col: 1, comment: { value: 'Hello world!' } }
]}
```

:::

In this example, the comment "Hello world!" is added to the cell at `(1,1)`.

## Basic example

::: only-for javascript

::: example #example1

```js
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.min.css';

const container = document.querySelector('#example1');
const hot = new Handsontable(container, {
  data: [
    ['', 'Tesla', 'Nissan', 'Toyota', 'Honda', 'Mazda', 'Ford'],
    ['2017', 10, 11, 12, 13, 15, 16],
    ['2018', 10, 11, 12, 13, 15, 16],
    ['2019', 10, 11, 12, 13, 15, 16],
    ['2020', 10, 11, 12, 13, 15, 16],
    ['2021', 10, 11, 12, 13, 15, 16]
  ],
  rowHeaders: true,
  colHeaders: true,
  contextMenu: true,
  comments: true,
  cell: [
    { row: 1, col: 1, comment: { value: 'Some comment' } },
    { row: 2, col: 2, comment: { value: 'More comments' } }
  ],
  height: 'auto',
  licenseKey: 'non-commercial-and-evaluation'
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
      data={[
        ['', 'Tesla', 'Nissan', 'Toyota', 'Honda', 'Mazda', 'Ford'],
        ['2017', 10, 11, 12, 13, 15, 16],
        ['2018', 10, 11, 12, 13, 15, 16],
        ['2019', 10, 11, 12, 13, 15, 16],
        ['2020', 10, 11, 12, 13, 15, 16],
        ['2021', 10, 11, 12, 13, 15, 16]
      ]}
      rowHeaders={true}
      colHeaders={true}
      contextMenu={true}
      comments={true}
      cell={[
        { row: 1, col: 1, comment: { value: 'Some comment' } },
        { row: 2, col: 2, comment: { value: 'More comments' } }
      ]}
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

## Make a comment read-only

By default, all comments are editable. To change this, set the [`readOnly`](@/api/options.md#comments) configuration option to `true` when adding a comment. This example makes the "Tesla" comment attached to a cell read-only, whereas the "Honda" comment attached to another cell is editable.

::: only-for javascript

::: example #example2

```js
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.min.css';

const container = document.querySelector('#example2');
const hot = new Handsontable(container, {
  data: [
    ['', 'Tesla', 'Toyota', 'Honda', 'Ford'],
    ['2018', 10, 11, 12, 13, 15, 16],
    ['2019', 10, 11, 12, 13, 15, 16],
    ['2020', 10, 11, 12, 13, 15, 16],
  ],
  rowHeaders: true,
  colHeaders: true,
  contextMenu: true,
  comments: true,
  cell: [
    { row: 0, col: 1, comment: { value: 'A read-only comment.', readOnly: true } },
    { row: 0, col: 3, comment: { value: 'You can edit this comment' } }
  ],
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
  return (
    <HotTable
      data={[
        ['', 'Tesla', 'Toyota', 'Honda', 'Ford'],
        ['2018', 10, 11, 12, 13, 15, 16],
        ['2019', 10, 11, 12, 13, 15, 16],
        ['2020', 10, 11, 12, 13, 15, 16],
      ]}
      rowHeaders={true}
      colHeaders={true}
      contextMenu={true}
      comments={true}
      cell={[
        { row: 0, col: 1, comment: { value: 'A read-only comment.', readOnly: true } },
        { row: 0, col: 3, comment: { value: 'You can edit this comment' } }
      ]}
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

## Set a comment box's size

To set the width and height of a comment box, use the [`style`](@/api/options.md#comments) parameter.

::: only-for javascript

::: example #example3

```js
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.min.css';

const container = document.querySelector('#example3');
const hot = new Handsontable(container, {
  data: [
    ['', 'Tesla', 'Nissan', 'Toyota', 'Honda', 'Mazda', 'Ford'],
    ['2017', 10, 11, 12, 13, 15, 16],
    ['2018', 10, 11, 12, 13, 15, 16],
    ['2019', 10, 11, 12, 13, 15, 16],
  ],
  rowHeaders: true,
  colHeaders: true,
  contextMenu: true,
  comments: true,
  cell: [
    { row: 1, col: 1, comment: { value: 'Some comment' } },
    // add the `style` parameter
    { row: 2, col: 2, comment: { value: 'Comment 200x50 px', style: { width: 200, height: 50 } } }
  ],
  height: 'auto',
  licenseKey: 'non-commercial-and-evaluation'
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
      data={[
        ['', 'Tesla', 'Nissan', 'Toyota', 'Honda', 'Mazda', 'Ford'],
        ['2017', 10, 11, 12, 13, 15, 16],
        ['2018', 10, 11, 12, 13, 15, 16],
        ['2019', 10, 11, 12, 13, 15, 16],
      ]}
      rowHeaders={true}
      colHeaders={true}
      contextMenu={true}
      comments={true}
      cell={[
        { row: 1, col: 1, comment: { value: 'Some comment' } },
        // add the `style` parameter
        { row: 2, col: 2, comment: { value: 'Comment 200x50 px', style: { width: 200, height: 50 } } }
      ]}
      height="auto"
      licenseKey="non-commercial-and-evaluation"
    />
  );
};

/* start:skip-in-preview */
ReactDOM.render(<ExampleComponent />, document.getElementById('example3'));
/* end:skip-in-preview */
```

:::

:::

## Set a delay for displaying comments

To display comments after a pre-configured time delay, use the [`displayDelay`](@/api/options.md#comments) parameter.

::: only-for javascript

::: example #example4

```js
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.min.css';

const container = document.querySelector('#example4');
const hot = new Handsontable(container, {
  data: [
    ['', 'Tesla', 'Toyota', 'Honda', 'Ford'],
    ['2018', 10, 11, 12, 13, 15, 16],
    ['2019', 10, 11, 12, 13, 15, 16],
    ['2020', 10, 11, 12, 13, 15, 16],
  ],
  rowHeaders: true,
  colHeaders: true,
  contextMenu: true,
  comments: {
    // on mouseover, wait 2 seconds before the comment box displays
    displayDelay: 2000,
  },
  cell: [
    { row: 1, col: 1, comment: { value: 'Some comment' } },
  ],
  height: 'auto',
  licenseKey: 'non-commercial-and-evaluation'
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
      data={[
        ['', 'Tesla', 'Toyota', 'Honda', 'Ford'],
        ['2018', 10, 11, 12, 13, 15, 16],
        ['2019', 10, 11, 12, 13, 15, 16],
        ['2020', 10, 11, 12, 13, 15, 16],
      ]}
      rowHeaders={true}
      colHeaders={true}
      contextMenu={true}
      comments={{
        // on mouseover, wait 2 seconds before the comment box displays
        displayDelay: 2000,
      }}
      cell={[
        { row: 1, col: 1, comment: { value: 'Some comment' } },
      ]}
      height="auto"
      licenseKey="non-commercial-and-evaluation"
    />
  );
};

/* start:skip-in-preview */
ReactDOM.render(<ExampleComponent />, document.getElementById('example4'));
/* end:skip-in-preview */
```

:::

:::

## Related API reference

- Configuration options:
  - [`commentedCellClassName`](@/api/options.md#commentedcellclassname)
  - [`comments`](@/api/options.md#comments)
