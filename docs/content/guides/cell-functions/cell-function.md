---
id: neoo8dhv
title: Cell functions
metaTitle: Cell functions - JavaScript Data Grid | Handsontable
description: Render, edit, and validate the contents of your cells, using Handsontable's cell functions. Quickly set up your cells, using cell types.
permalink: /cell-function
canonicalUrl: /cell-function
react:
  id: i2sqtwh6
  metaTitle: Cell functions - React Data Grid | Handsontable
searchCategory: Guides
---

# Cell functions

Render, edit, and validate the contents of your cells, using Handsontable's cell functions. Quickly set up your cells, using cell types.

[[toc]]

## Overview

With every cell in the Handsontable there are 3 associated functions:

- [Renderer](#renderer)
- [Editor](#editor)
- [Validator](#validator)

Each of those functions are responsible for a different cell behavior. You can define them separately or use a [cell type](#cell-type) to define all three at once.

## Renderer

Handsontable does not display the values stored in the data source directly. Instead, every time a value from data source needs to be displayed in a table cell, it is passed to the cell `renderer` function, together with the table cell object of type `HTMLTableCellElement` (DOM node), along with other useful information.

`Renderer` is expected to format the passed value and place it as a content of the cell object. `Renderer` can also alter the cell class list, i.e. it can add a `htInvalid` class to let the user know, that the displayed value is invalid.

## Editor

Cell editors are the most complex cell functions. We have prepared a separate page [custom cell editor](@/guides/cell-functions/cell-editor.md) explaining how cell edit works and how to write your own cell editor.

## Validator

Cell validator can be either a function or a regular expression. A cell is considered valid, when the validator function calls a `callback` (passed as one of the `validator` arguments) with `true` or the validation regex [`test()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test) method returns `true`. Because the validity of a value is determined only by the argument that is passed to `callback`, `validator` function can be synchronous or asynchronous.

Contrary to `renderer` and `editor` functions, the `validator` function doesn't have to be defined for each cell. If the `validator` function is not defined, then a cell value is always valid.

## Cell type

Manually defining those functions for cells or columns would be tedious, so to simplify the configuration, Handsontable introduced [cell types](@/guides/cell-types/cell-type.md).

## Cell functions getters

::: only-for react

::: tip

To use the Handsontable API, you'll need access to the Handsontable instance. You can do that by utilizing a reference to the `HotTable` component, and reading its `hotInstance` property.

For more information, see the [Instance methods](@/guides/getting-started/react-methods.md) page.

:::

:::

If, for some reason, you have to get the `renderer`, `editor` or `validator` function of specific cell you can use standard [`getCellMeta()`](@/api/core.md#getcellmeta) method to get all properties of particular cell and then refer to cell functions like so:

```js
// get cell properties for cell [0, 0]
const cellProperties = hot.getCellMeta(0, 0);

cellProperties.renderer; // get cell renderer
cellProperties.editor; // get cell editor
cellProperties.validator; // get cell validator
```

However, you have to remember that [`getCellMeta()`](@/api/core.md#getcellmeta) return cell properties "as they are", which means that if you use cell type to set cell functions, instead of defining functions directly those cell functions will be `undefined`:

::: only-for javascript

```js
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.min.css';

const container = document.querySelector('#container');
const hot = new Handsontable(container, {
  columns: [{
    type: 'numeric'
  }]
});

// get cell properties for cell [0, 0]
const cellProperties = hot.getCellMeta(0, 0);

cellProperties.renderer; // undefined
cellProperties.editor; // undefined
cellProperties.validator; // undefined
cellProperties.type; // "numeric"
```

:::

::: only-for react

```jsx
export const ExampleComponent = () => {
  const hotRef = useRef(null);

  useEffect(() => {
    const hot = hotRef.current.hotInstance;

    // get cell properties for cell [0, 0]
    const cellProperties = hot.getCellMeta(0, 0);

    cellProperties.renderer; // undefined
    cellProperties.editor; // undefined
    cellProperties.validator; // undefined
    cellProperties.type; // "numeric"
  });

  return (
    <HotTable
      ref={hotRef}
      columns={[{
        type: 'numeric'
      }]}
    />
  );
};
```

:::

To get the actual cell function use appropriate _cell function getter_:

- [`getCellRenderer(row, col)`](@/api/core.md#getcellrenderer)
- [`getCellEditor(row, col)`](@/api/core.md#getcelleditor)
- [`getCellValidator(row, col)`](@/api/core.md#getcellvalidator)

Those functions will always return an appropriate value, regardless of whether cell functions have been defined directly or using a cell type.

## Related articles

### Related guides

- [Cell editor](@/guides/cell-functions/cell-editor.md)
- [Cell renderer](@/guides/cell-functions/cell-renderer.md)
- [Cell validator](@/guides/cell-functions/cell-validator.md)
- [Cell type](@/guides/cell-types/cell-type.md)

### Related API reference

- Configuration options:
  - [`editor`](@/api/options.md#editor)
  - [`renderer`](@/api/options.md#renderer)
  - [`type`](@/api/options.md#type)
  - [`validator`](@/api/options.md#validator)
- Core methods:
  - [`destroyEditor()`](@/api/core.md#destroyeditor)
  - [`getActiveEditor()`](@/api/core.md#getactiveeditor)
  - [`getCellEditor()`](@/api/core.md#getcelleditor)
  - [`getCellMeta()`](@/api/core.md#getcellmeta)
  - [`getCellMetaAtRow()`](@/api/core.md#getcellmetaatrow)
  - [`getCellsMeta()`](@/api/core.md#getcellsmeta)
  - [`getCellRenderer()`](@/api/core.md#getcellrenderer)
  - [`getCellValidator()`](@/api/core.md#getcellvalidator)
  - [`setCellMeta()`](@/api/core.md#setcellmeta)
  - [`setCellMetaObject()`](@/api/core.md#setcellmetaobject)
  - [`removeCellMeta()`](@/api/core.md#removecellmeta)
- Hooks:
  - [`afterBeginEditing`](@/api/hooks.md#afterbeginediting)
  - [`afterGetCellMeta`](@/api/hooks.md#aftergetcellmeta)
  - [`afterGetColumnHeaderRenderers`](@/api/hooks.md#aftergetcolumnheaderrenderers)
  - [`afterGetRowHeaderRenderers`](@/api/hooks.md#aftergetrowheaderrenderers)
  - [`afterValidate`](@/api/hooks.md#aftervalidate)
  - [`afterRenderer`](@/api/hooks.md#afterrenderer)
  - [`beforeGetCellMeta`](@/api/hooks.md#beforegetcellmeta)
  - [`beforeRenderer`](@/api/hooks.md#beforerenderer)
  - [`beforeValidate`](@/api/hooks.md#beforevalidate)
