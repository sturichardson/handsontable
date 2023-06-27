---
id: 161z7hq7
title: Custom editor in Angular
metaTitle: Custom cell editor - Angular Data Grid | Handsontable
description: Create a custom cell editor, and use it in your Angular data grid by declaring it as a class.
permalink: /angular-custom-editor-example
canonicalUrl: /angular-custom-editor-example
searchCategory: Guides
---

# Custom editor example in Angular

Create a custom cell editor, and use it in your Angular data grid by declaring it as a class.

[[toc]]

## Example

The following is an implementation of the `@handsontable/angular` component with a custom editor added. It utilizes the `placeholder` attribute in the editor's `input` element.

::: example :angular --html 1 --js 2 --no-edit

```html
<app-root></app-root>
```

```js
/* file: app.component.ts */
import { Component } from '@angular/core';
import Handsontable from 'handsontable/base';
/* start:skip-in-compilation */
import { CustomEditor } from './CustomEditor';
/* end:skip-in-compilation */

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
    startRows: 5,
    columns: [
      {
        editor: CustomEditor
      }
    ],
    colHeaders: true,
    colWidths: 200,
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

/* file: CustomEditor.ts */
import { TextEditor } from 'handsontable/editors/textEditor';

export class CustomEditor extends TextEditor {
  override createElements() {
    super.createElements();

    this.TEXTAREA = document.createElement('input');
    this.TEXTAREA.setAttribute('placeholder', 'Custom placeholder');
    this.TEXTAREA.setAttribute('data-hot-input', true);
    this.textareaStyle = this.TEXTAREA.style;
    this.TEXTAREA_PARENT.innerText = '';
    this.TEXTAREA_PARENT.appendChild(this.TEXTAREA);
  }
}

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

- [Cell editor](@/guides/cell-functions/cell-editor.md)

### Related API reference

- APIs:
  - [`BasePlugin`](@/api/basePlugin.md)
- Configuration options:
  - [`editor`](@/api/options.md#editor)
  - [`enterBeginsEditing`](@/api/options.md#enterbeginsediting)
- Core methods:
  - [`destroyEditor()`](@/api/core.md#destroyeditor)
  - [`getActiveEditor()`](@/api/core.md#getactiveeditor)
  - [`getCellEditor()`](@/api/core.md#getcelleditor)
  - [`getCellMeta()`](@/api/core.md#getcellmeta)
  - [`getCellMetaAtRow()`](@/api/core.md#getcellmetaatrow)
  - [`getCellsMeta()`](@/api/core.md#getcellsmeta)
  - [`setCellMeta()`](@/api/core.md#setcellmeta)
  - [`setCellMetaObject()`](@/api/core.md#setcellmetaobject)
  - [`removeCellMeta()`](@/api/core.md#removecellmeta)
- Hooks:
  - [`afterBeginEditing`](@/api/hooks.md#afterbeginediting)
  - [`afterGetCellMeta`](@/api/hooks.md#aftergetcellmeta)
  - [`beforeGetCellMeta`](@/api/hooks.md#beforegetcellmeta)
