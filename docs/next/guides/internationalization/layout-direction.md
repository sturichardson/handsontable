---
title: Layout direction
metaTitle: Layout direction - Guide - Handsontable Documentation
permalink: /next/layout-direction
canonicalUrl: /layout-direction
tags:
  - rtl
  - right-to-left
  - arabic
  - hebrew
  - persian
  - farsi
  - internationalization
  - localization
  - L10n
  - i18n
---

# Layout direction

[[toc]]

Configure Handsontable's layout direction, to properly handle right-to-left (RTL) and left-to-right (LTR) [languages](@/guides/internationalization/language.md).

## About layout direction

To properly display Handsontable's UI and data in LTR languages (such as English, Chinese, or Russian) and RTL languages (such as Arabic, Persian, or Hebrew), configure your grid's layout direction.

By default, Handsontable's layout direction is set automatically, based on on the value of your HTML document's [`dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir) attribute.

You can:
- [Set the layout direction automatically](#setting-the-layout-direction-automatically)
- [Set the layout direction to RTL](#setting-the-layout-direction-to-rtl)
- [Set the layout direction to LTR](#setting-the-layout-direction-to-ltr)

### RTL support

If your app uses an RTL language, we recommend [setting Handsontable's layout direction to RTL](#setting-the-layout-direction-to-rtl).

For Arabic, use Handsontable's built-in [Arabic translation](@/guides/internationalization/language.md#list-of-available-languages). For any other RTL language, [add your own translation](@/guides/internationalization/language.md#creating-custom-languages).

#### RTL demo

To try out Handsontable's RTL support, check out the demo below:

::: example #example1 :hot-lang
```js
const container = document.querySelector('#example1');

// generate random RTL data (e.g., Arabic)
function generateArabicData() {
  const randomName = () =>
  ["عمر", "علي", "عبد الله", "معتصم"][Math.floor(Math.random() * 3)];
  const randomCountry = () =>
    ["تركيا", "مصر", "لبنان", "العراق"][Math.floor(Math.random() * 3)];
  const randomDate = () =>
    new Date(Math.floor(Math.random() * Date.now())).toLocaleDateString()
  const randomBool = () => Math.random() > 0.5;
  const randomNumber = (a = 0, b = 1000) => a + Math.floor(Math.random() * b);
  const randomPhrase = () =>
    `${randomCountry()} ${randomName()} ${randomNumber()}`;
  
  const arr = Array.from({ length: 10 }, () => [
    randomBool(),
    randomName(),
    randomCountry(),
    randomPhrase(),
    randomDate(),
    randomPhrase(),
    randomBool(),
    randomNumber(0, 200).toString(),
    randomNumber(0, 10),
    randomNumber(0, 5),
  ]);

  return arr;
}

const hot = new Handsontable(container, {
  licenseKey: 'non-commercial-and-evaluation',
  data: generateArabicData(),
  colHeaders: true,
  rowHeaders: true,
  // render Handsontable from the right to the left
  layoutDirection: 'rtl',
  // load an RTL language (e.g., Arabic)
  language: 'ar-AR',
  // enable a few options that exemplify the layout direction
  dropdownMenu: true,
  filters: true,
  contextMenu: true
});
```
:::

### Elements affected by layout direction

Setting a different layout direction affects the behavior of the following areas of Handsontable:

| Element                                                                                                            | LTR layout direction                                                                                                                                                                          | RTL layout direction                                                                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Starting edge                                                                                                      | The left-hand edge is treated as the starting edge of the grid.                                                                                                                               | The right-hand edge is treated as the starting edge of the grid.                                                                                                                              |
| Ending edge                                                                                                        | The right-hand edge is treated as the ending edge of the grid.                                                                                                                                | The left-hand edge is treated as the ending edge of the grid.                                                                                                                                 |
| Order of columns on the screen                                                                                     | Cell rendering flows from the left-hand side of the screen to right-hand side.<br><br>Cell (0, 0) is rendered in the grid's top-left corner.                                                  | Cell rendering flows from the right-hand side of the screen to left-hand side.<br><br>Cell (0, 0) is rendered in the grid's top-right corner.                                                 |
| Text direction in cells                                                                                            | All cells inherit the LTR direction from the container element.                                                                                                                               | All cells inherit the RTL direction from the container element.                                                                                                                               |
| Position of row headers                                                                                            | Row headers are rendered on the left-hand edge of the grid.                                                                                                                                   | Row headers are rendered on the right-hand edge of the grid.                                                                                                                                  |
| Position of [frozen columns](@/guides/columns/column-freezing.md)                                                  | Columns are frozen at the left-hand edge of the grid.                                                                                                                                         | Columns are frozen at the right-hand edge of the grid.                                                                                                                                        |
| [Keyboard navigation](@/guides/accessories-and-menus/keyboard-shortcuts.md)                                       | <kbd>Tab</kbd> moves to the right.<br><br><kbd>Shift</kbd> + <kbd>Tab</kbd> moves to the left.                                                                                                | <kbd>Tab</kbd> moves to the left.<br><br><kbd>Shift</kbd> + <kbd>Tab</kbd> moves to the right.                                                                                                |
| Position of the [fill handle](@/api/options.md#fillHandle)                                                         | The fill handle displays in the bottom-right corner of the selection border.                                                                                                                  | The fill handle displays in the bottom-left corner of the selection border.                                                                                                                   |
| Position of the [selection](@/guides/cell-features/selection.md) handles, on mobile devices                        | On mobile devices, the selection handles display in the top-left and bottom-right corners of the selection border.                                                                            | On mobile devices, the selection handles display in the top-right and bottom-left corners of the selection border.                                                                            |
| [Custom borders](@/guides/cell-features/formatting-cells.md#custom-cell-borders)                                   | In the [`customBorders`](@/api/options.md#customborders) option:<br><br>- The left-hand border is treated as the starting border.<br>- The right-hand border is treated as the ending border. | In the [`customBorders`](@/api/options.md#customborders) option:<br><br>- The right-hand border is treated as the starting border.<br>- The left-hand border is treated as the ending border. |
| [Context menu](@/guides/accessories-and-menus/context-menu.md) and [column menus](@/guides/columns/column-menu.md) | Menus' layout direction is left-to-right.<br><br>Submenus expand to the right.                                                                                                                | Menus' layout direction is right-to-left.<br><br>Submenus expand to the left.                                                                                                                 |

The list above is not exhaustive. Setting a different layout direction might affect other areas of Handsontable as well.

## Setting the layout direction

You can set the layout direction only at Handsontable's [initialization](@/guides/getting-started/installation.md#initialize-the-grid). Any change of the [`layoutDirection`](@/api/options.md#layoutdirection) option after the initialization (e.g., using the [`updateSettings()`](@/api/core.md#updatesettings) method) is ignored.

### Setting the layout direction automatically

You can set Handsontable's layout direction automatically, 
based on on the value of your HTML document's [`dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir) attribute.
This is the default setting.

At Handsontable's [initialization](@/guides/getting-started/installation.md#initialize-the-grid),
add [`layoutDirection`](@/api/options.md#layoutdirection) as a [top-level grid option](@/guides/getting-started/setting-options.md#setting-grid-options),
and set it to `'inherit'`. As this is the default setting, you can also skip setting the `layoutDirection` option altogether.

In the example below, the RTL layout direction is inherited from a `dir` attribute up in the DOM tree:

::: example #example2 --html 1 --js 2
```html
<section dir="rtl">
  <div id="example2"></div>
</section>
```

```js
const container = document.querySelector('#example2');

const hot = new Handsontable(container, {
  licenseKey: 'non-commercial-and-evaluation',
  data: [
    ['', 'Tesla', 'Volvo', 'Toyota', 'Ford'],
    ['2019', 10, 11, 12, 13],
    ['2020', 20, 11, 14, 13],
    ['2021', 30, 15, 12, 13]
  ],
  colHeaders: true,
  rowHeaders: true,
  // inherit Handsontable's layout direction
  // from the value of your HTML document's `dir` attribute
  layoutDirection: 'inherit',
});
```
:::

### Setting the layout direction to RTL

You can render Handsontable from the right to the left, regardless of your HTML document's [`dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir) attribute.

At Handsontable's [initialization](@/guides/getting-started/installation.md#initialize-the-grid),
add [`layoutDirection`](@/api/options.md#layoutdirection) as a [top-level grid option](@/guides/getting-started/setting-options.md#setting-grid-options),
and set it to `'rtl'`:

::: example #example3
```js
const container = document.querySelector('#example3');

const hot = new Handsontable(container, {
  licenseKey: 'non-commercial-and-evaluation',
  data: [
    ['', 'Tesla', 'Volvo', 'Toyota', 'Ford'],
    ['2019', 10, 11, 12, 13],
    ['2020', 20, 11, 14, 13],
    ['2021', 30, 15, 12, 13]
  ],
  colHeaders: true,
  rowHeaders: true,
  // render Handsontable from the right to the left
  // regardless of your HTML document's `dir`
  layoutDirection: 'rtl',
});
```
:::

### Setting the layout direction to LTR

You can render Handsontable from the left to the right, regardless of your HTML document's [`dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir) attribute.

At Handsontable's [initialization](@/guides/getting-started/installation.md#initialize-the-grid),
add [`layoutDirection`](@/api/options.md#layoutdirection) as a [top-level grid option](@/guides/getting-started/setting-options.md#setting-grid-options),
and set it to `'ltr'`:

::: example #example4
```js
const container = document.querySelector('#example4');

const hot = new Handsontable(container, {
  licenseKey: 'non-commercial-and-evaluation',
  data: [
    ['', 'Tesla', 'Volvo', 'Toyota', 'Ford'],
    ['2019', 10, 11, 12, 13],
    ['2020', 20, 11, 14, 13],
    ['2021', 30, 15, 12, 13]
  ],
  colHeaders: true,
  rowHeaders: true,
  // render Handsontable from the left to the right
  // regardless of your HTML document's `dir`
  layoutDirection: 'ltr',
});
```
:::

## Setting the horizontal text alignment

You can apply different horizontal [text alignment](@/guides/cell-features/text-alignment.md) settings, overwriting the horizontal text alignment resulting from your grid's [layout direction](#about-layout-direction).

In the example below, some columns are explicitly aligned to the left, center, or right:

::: example #example5
```js
const container = document.querySelector('#example5');

const hot = new Handsontable(container, {
  licenseKey: 'non-commercial-and-evaluation',
  data: [
    ['', 'Tesla', 'Volvo', 'Toyota', 'Ford'],
    ['2019', 10, 11, 12, 13],
    ['2020', 20, 11, 14, 13],
    ['2021', 30, 15, 12, 13]
  ],
  colHeaders: true,
  rowHeaders: true,
  // render Handsontable from the right to the left
  // regardless of your HTML document's `dir`
  layoutDirection: 'rtl',
  columns: [
    {},
    // align this column's text to the left
    { className: 'htLeft' },
    // align this column's text to the center
    { className: 'htCenter' },
    // align this column's text to the right
    { className: 'htRight' },
    {},
  ]
});
```
:::

You can apply the horizontal [text alignment](@/guides/cell-features/text-alignment.md) settings to:
- [The entire grid](@/guides/getting-started/setting-options.md#setting-grid-options), by setting [`className`](@/api/options.md#classname) on the global level
- [Individual columns](@/guides/getting-started/setting-options.md#setting-column-options), by setting [`className`](@/api/options.md#classname) on the column level
- [Individual rows](@/guides/getting-started/setting-options.md#setting-row-options), by setting [`className`](@/api/options.md#classname) using the [`cells`](@/api/options.md#cells) option's callback
- [Individual cells](@/guides/getting-started/setting-options.md#setting-cell-options), by setting [`className`](@/api/options.md#classname) on the cell level
- [Individual grid elements, based on any logic you implement](@/guides/getting-started/setting-options.md#implementing-custom-logic), by setting [`className`](@/api/options.md#classname) using the [`cells`](@/api/options.md#cells) option's callback