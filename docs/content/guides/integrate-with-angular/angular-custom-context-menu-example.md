---
id: d4l2e6vr
title: Custom context menu in Angular
metaTitle: Custom context menu - Angular Data Grid | Handsontable
description: Customize the context menu of your Angular data grid, by creating a custom function for each menu item.
permalink: /angular-custom-context-menu-example
canonicalUrl: /angular-custom-context-menu-example
searchCategory: Guides
---

# Custom context menu in Angular

Customize the context menu of your Angular data grid, by creating a custom function for each menu item.

[[toc]]

## Example

The following is an implementation of the `@handsontable/angular` component with a custom context menu added.

::: example :angular --html 1 --js 2

```html
<app-root></app-root>
```
```js
/* file: app.component.ts */
import { Component } from '@angular/core';
import Handsontable from 'handsontable/base';
import { ContextMenu } from 'handsontable/plugins/contextMenu';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <hot-table [settings]="hotSettings"></hot-table>
    </div>
  `,
})
export class AppComponent {
  hotSettings: Handsontable.GridSettings = {
    data: [
      ['A1', 'B1', 'C1', 'D1', 'E1'],
      ['A2', 'B2', 'C2', 'D2', 'E2'],
      ['A3', 'B3', 'C3', 'D3', 'E3'],
      ['A4', 'B4', 'C4', 'D4', 'E4'],
      ['A5', 'B5', 'C5', 'D5', 'E5'],
    ],
    colHeaders: true,
    contextMenu: {
      items: {
        'row_above': {
          name: 'Insert row above this one (custom name)'
        },
        'row_below': {},
        'separator': ContextMenu.SEPARATOR,
        'clear_custom': {
          name: 'Clear all cells (custom)',
          callback: function() {
            this.clear();
          }
        }
      }
    },
    height: 'auto',
    licenseKey: 'non-commercial-and-evaluation'
  };
}

/* file: app.module.ts */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HotTableModule } from '@handsontable/angular';
import { registerAllModules } from 'handsontable/registry';
/* start:skip-in-compilation */
import { AppComponent } from './app.component';
/* end:skip-in-compilation */

// register Handsontable's modules
registerAllModules();

@NgModule({
  imports: [ BrowserModule, HotTableModule ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

/* start:skip-in-preview */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => { console.error(err) });
/* end:skip-in-preview */
```

:::

## Related articles

### Related guides

- [Context menu](@/guides/accessories-and-menus/context-menu.md)
- [Adding comments via the context menu](@/guides/cell-features/comments.md#add-comments-via-the-context-menu)
- [Clipboard: Context menu](@/guides/cell-features/clipboard.md#context-menu)
- [Icon pack](@/guides/accessories-and-menus/icon-pack.md)

### Related blog articles

- [Customize Handsontable context menu](https://handsontable.com/blog/customize-handsontable-context-menu)

### Related API reference

- Configuration options:
  - [`allowInsertColumn`](@/api/options.md#allowinsertcolumn)
  - [`allowInsertRow`](@/api/options.md#allowinsertrow)
  - [`allowRemoveColumn`](@/api/options.md#allowremovecolumn)
  - [`allowRemoveRow`](@/api/options.md#allowremoverow)
  - [`contextMenu`](@/api/options.md#contextmenu)
  - [`dropdownMenu`](@/api/options.md#dropdownmenu)
- Hooks:
  - [`afterContextMenuDefaultOptions`](@/api/hooks.md#aftercontextmenudefaultoptions)
  - [`afterContextMenuHide`](@/api/hooks.md#aftercontextmenuhide)
  - [`afterContextMenuShow`](@/api/hooks.md#aftercontextmenushow)
  - [`afterDropdownMenuDefaultOptions`](@/api/hooks.md#afterdropdownmenudefaultoptions)
  - [`afterDropdownMenuHide`](@/api/hooks.md#afterdropdownmenuhide)
  - [`afterDropdownMenuShow`](@/api/hooks.md#afterdropdownmenushow)
  - [`afterOnCellContextMenu`](@/api/hooks.md#afteroncellcontextmenu)
  - [`beforeContextMenuSetItems`](@/api/hooks.md#beforecontextmenusetitems)
  - [`beforeContextMenuShow`](@/api/hooks.md#beforecontextmenushow)
  - [`beforeDropdownMenuSetItems`](@/api/hooks.md#beforedropdownmenusetitems)
  - [`beforeDropdownMenuShow`](@/api/hooks.md#beforedropdownmenushow)
  - [`beforeOnCellContextMenu`](@/api/hooks.md#beforeoncellcontextmenu)
- Plugins:
  - [`ContextMenu`](@/api/contextMenu.md)
