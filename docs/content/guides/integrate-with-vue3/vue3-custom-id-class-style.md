---
id: 2kg0f1og
title: Custom ID, Class, Style and other attributes in Vue 3
metaTitle: Custom ID, class, and style - Vue 3 Data Grid | Handsontable
description: Pass a custom ID, class, and style to the "HotTable" component, to further customize your Vue 3 data grid.
permalink: /vue3-custom-id-class-style
canonicalUrl: /vue3-custom-id-class-style
searchCategory: Guides
---

# Custom ID, Class, Style, and other attributes in Vue 3

Pass a custom ID, class, and style to the "HotTable" component, to further customize your Vue 3 data grid.

[[toc]]

## Overview

Custom `id`, `class`, `style`, and other attributes can be passed into the `hot-table` wrapper element.
Each of them will be applied to the root Handsontable element, allowing further customization of the table.

[Find out which Vue 3 versions are supported](@/guides/integrate-with-vue3/vue3-installation.md#vue-3-version-support)

## Example

::: example #example1 :vue3 --html 1 --js 2

```html
<div id="example1">
  <hot-table :id="id" :class="className" :style="style" :settings="hotSettings"></hot-table>
</div>
```

```js
import { defineComponent } from 'vue';
import { HotTable } from '@handsontable/vue3';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.css';

// register Handsontable's modules
registerAllModules();

const ExampleComponent = defineComponent({
  data() {
    return {
      hotSettings: {
        startRows: 5,
        startCols: 5,
        colHeaders: true,
        stretchH: 'all',
        licenseKey: 'non-commercial-and-evaluation'
      },
      id: 'my-custom-id',
      className: 'my-custom-classname',
      style: 'height: 142px; overflow: hidden; border: 1px solid red;'
    }
  },
  components: {
    HotTable,
  }
});

export default ExampleComponent;

/* start:skip-in-preview */
import { createApp } from 'vue';

const app = createApp(ExampleComponent);

app.mount('#example1');
/* end:skip-in-preview */
```

:::
