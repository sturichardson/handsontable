---
id: ohjf69hj
title: Cell renderer
metaTitle: Cell renderer - JavaScript Data Grid | Handsontable
description: Create a custom cell renderer function, to have full control over how a cell looks.
permalink: /cell-renderer
canonicalUrl: /cell-renderer
react:
  id: 2ej30mcg
  metaTitle: Cell renderer - React Data Grid | Handsontable
searchCategory: Guides
---

# Cell renderer

Create a custom cell renderer function, to have full control over how a cell looks.

[[toc]]

::: only-for javascript

## Overview

When you create a renderer, a good idea is to assign it as an alias that will refer to this particular renderer function. Handsontable defines 10 aliases by default:

- `autocomplete` for `Handsontable.renderers.AutocompleteRenderer`
- `base` for `Handsontable.renderers.BaseRenderer`
- `checkbox` for `Handsontable.renderers.CheckboxRenderer`
- `date` for `Handsontable.renderers.DateRenderer`
- `dropdown` for `Handsontable.renderers.DropdownRenderer`
- `html` for `Handsontable.renderers.HtmlRenderer`
- `numeric` for `Handsontable.renderers.NumericRenderer`
- `password` for `Handsontable.renderers.PasswordRenderer`
- `text` for `Handsontable.renderers.TextRenderer`
- `time` for `Handsontable.renderers.TimeRenderer`

It gives users a convenient way for defining which renderer should be used when table rendering was triggered. User doesn't need to know which renderer function is responsible for displaying the cell value, he does not even need to know that there is any function at all. What is more, you can change the render function associated with an alias without a need to change code that defines a table.

:::

::: only-for react

## Overview

A renderer is a function that determines how a cell looks.

Set together, a renderer, [editor](@/guides/cell-functions/cell-editor.md) and [validator](@/guides/cell-functions/cell-validator.md) form a [cell type](@/guides/cell-types/cell-type.md).

## Declare a custom renderer as a component

Handsontable's React wrapper lets you create custom cell renderers using React components.
Although it's possible to use class-based react components for this purpose, we strongly suggest using functional components, as using the `state` of a class-based component would re-initialize on every Handsontable render.

To mark a component as a Handsontable renderer, simply add a `hot-renderer` attribute to it.

::: tip

Handsontable's [`autoRowSize`](@/api/options.md#autorowsize) and [`autoColumnSize`](@/api/options.md#autocolumnsize) options require calculating the widths/heights of some of the cells before rendering them into the table. For this reason, it's not currently possible to use them alongside component-based renderers, as they're created after the table's initialization.

Be sure to turn those options off in your Handsontable configuration, as keeping them enabled may cause unexpected results. Please note that [`autoColumnSize`](@/api/options.md#autocolumnsize) is enabled by default.

:::

::: example #example1 :react --tab preview

```jsx
import { HotTable, HotColumn } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.min.css';

// your renderer component
const RendererComponent = (props) => {
  // the available renderer-related props are:
  // - `row` (row index)
  // - `col` (column index)
  // - `prop` (column property name)
  // - `TD` (the HTML cell element)
  // - `cellProperties` (the `cellProperties` object for the edited cell)
  return (
    <>
      <i style={{ color: "#a9a9a9" }}>
        Row: {props.row}, column: {props.col},
      </i>{" "}
      value: {props.value}
    </>
  );
}

const hotData = [
  ['A1', 'B1', 'C1', 'D1', 'E1'],
  ['A2', 'B2', 'C2', 'D2', 'E2'],
  ['A3', 'B3', 'C3', 'D3', 'E3'],
  ['A4', 'B4', 'C4', 'D4', 'E4'],
  ['A5', 'B5', 'C5', 'D5', 'E5'],
  ['A6', 'B6', 'C6', 'D6', 'E6'],
  ['A7', 'B7', 'C7', 'D7', 'E7'],
  ['A8', 'B8', 'C8', 'D8', 'E8'],
  ['A9', 'B9', 'C9', 'D9', 'E9'],
];

export const ExampleComponent = () => {
  return (
    <HotTable data={hotData} licenseKey="non-commercial-and-evaluation">
      <HotColumn width={250}>
        {/* add the `hot-renderer` attribute to mark the component as a Handsontable renderer */}
        <RendererComponent hot-renderer />
      </HotColumn>
    </HotTable>
  );
};

/* start:skip-in-preview */
ReactDOM.render(<ExampleComponent />, document.getElementById('example1'));
/* end:skip-in-preview */
```

:::

## Use the renderer component within React's Context

In this example, React's `Context` passes information available in the main app component to the renderer. In this case, we're using just the renderer, but the same principle works with [editors](@/guides/cell-functions/cell-editor.md) as well.

::: example #example2 :react --css 1 --js 2 --tab preview

```css
.handsontable td.dark {
  background: #000;
  color: #fff;
}
```
```jsx
import React, { useState, useContext } from 'react';
import { HotTable, HotColumn } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.min.css';

// a component
const HighlightContext = React.createContext();

// a renderer component
function CustomRenderer(props) {
  const darkMode = useContext(HighlightContext);

  if (darkMode) {
    props.TD.className = 'dark';
  } else {
    props.TD.className = '';
  }

  return <div>{props.value}</div>;
}

export const ExampleComponent = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = (event) => {
    setDarkMode(event.target.checked);
  };

  return (
    <HighlightContext.Provider value={darkMode}>
      <div className="controls">
        <label><input type="checkbox" onClick={toggleDarkMode}/> Dark mode</label>
      </div>
      <HotTable
        data={[
          ['A1'],
          ['A2'],
          ['A3'],
          ['A4'],
          ['A5'],
          ['A6'],
          ['A7'],
          ['A8'],
          ['A9'],
          ['A10'],
        ]}
        rowHeaders={true}
        licenseKey={"non-commercial-and-evaluation"}
      >
        <HotColumn>
          {/* add the `hot-renderer` attribute to mark the component as a Handsontable renderer */}
          <CustomRenderer hot-renderer />
        </HotColumn>
      </HotTable>
    </HighlightContext.Provider>
  );
};

/* start:skip-in-preview */
ReactDOM.render(<ExampleComponent />, document.getElementById('example2'));
/* end:skip-in-preview */
```

:::

## Declare a custom renderer as a function

You can also declare a custom renderer for the `HotTable` component by declaring it as a function. In the simplest scenario, you can pass the rendering function as a Handsontable setting.

The following example implements `@handsontable/react` with a custom renderer added. It takes an image URL as the input and renders the image in the edited cell.

::: example #example3 :react

```jsx
import { HotTable } from '@handsontable/react';
import { textRenderer } from 'handsontable/renderers/textRenderer';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';

// register Handsontable's modules
registerAllModules();

export const ExampleComponent = () => {
  return (
    <HotTable
      id="hot"
      data={[
        ['A1', '{{$basePath}}/img/examples/professional-javascript-developers-nicholas-zakas.jpg'],
        ['A2', '{{$basePath}}/img/examples/javascript-the-good-parts.jpg']
      ]}
      columns={[
        {},
        {
          renderer(instance, td, row, col, prop, value, cellProperties) {
            const img = document.createElement('img');

            img.src = value;

            img.addEventListener('mousedown', event => {
              event.preventDefault();
            });

            td.innerText = '';
            td.appendChild(img);

            return td;
          }
        }
      ]}
      colHeaders={true}
      rowHeights={55}
      height="auto"
      licenseKey="non-commercial-and-evaluation"
    />
  );
}

/* start:skip-in-preview */
ReactDOM.render(<ExampleComponent />, document.getElementById('example3'));
/* end:skip-in-preview */
```

:::

:::

::: only-for javascript

## Use a cell renderer

Use the renderer name of your choice when configuring the column:

:::

::: only-for react

::: tip

All the sections below describe how to utilize the features available for the Handsontable function-based renderers.

:::

### Overview

When you create a renderer, a good idea is to assign it as an alias that will refer to this particular renderer function. Handsontable defines 10 aliases by default:

- `autocomplete` for `Handsontable.renderers.AutocompleteRenderer`
- `base` for `Handsontable.renderers.BaseRenderer`
- `checkbox` for `Handsontable.renderers.CheckboxRenderer`
- `date` for `Handsontable.renderers.DateRenderer`
- `dropdown` for `Handsontable.renderers.DropdownRenderer`
- `html` for `Handsontable.renderers.HtmlRenderer`
- `numeric` for `Handsontable.renderers.NumericRenderer`
- `password` for `Handsontable.renderers.PasswordRenderer`
- `text` for `Handsontable.renderers.TextRenderer`
- `time` for `Handsontable.renderers.TimeRenderer`

It gives users a convenient way for defining which renderer should be used when table rendering was triggered. User doesn't need to know which renderer function is responsible for displaying the cell value, he does not even need to know that there is any function at all. What is more, you can change the render function associated with an alias without a need to change code that defines a table.

::: tip

You can set a cell's [`renderer`](@/api/options.md#renderer), [`editor`](@/api/options.md#editor) or [`validator`](@/api/options.md#validator) individually, but you still need to set that cell's [`type`](@/api/options.md#type). For example:

```js
renderer: Handsontable.NumericRenderer,
editor: Handsontable.editors.NumericEditor,
validator: Handsontable.NumericValidator,
type: 'numeric'
```

:::

### Use a cell renderer

It is possible to register your renderer and re-use it with the name you registered it under.

:::

::: only-for javascript

```js
const container = document.querySelector('#container');
const hot = new Handsontable(container, {
  data: someData,
  columns: [{
    renderer: 'numeric'
  }]
});
```

:::

::: only-for react

```jsx
<HotTable
  data={someData}
  columns={[{
    renderer: 'numeric'
  }]}
/>
```

:::

::: only-for javascript

## Register custom cell renderer

:::

::: only-for react

### Register custom cell renderer

:::

To register your own alias use `Handsontable.renderers.registerRenderer()` function. It takes two arguments:

- `rendererName` - a string representing a renderer function
- `renderer` - a renderer function that will be represented by `rendererName`

If you'd like to register `asterixDecoratorRenderer` under alias `asterix` you have to call:

```js
Handsontable.renderers.registerRenderer('asterix', asterixDecoratorRenderer);
```

Choose aliases wisely. If you register your renderer under name that is already registered, the target function will be overwritten:

```js
Handsontable.renderers.registerRenderer('text', asterixDecoratorRenderer);
```

Now 'text' alias points to `asterixDecoratorRenderer` function, not `Handsontable.renderers.TextRenderer`.

So, unless you intentionally want to overwrite an existing alias, try to choose a unique name. A good practice is prefixing your aliases with some custom name (for example your GitHub username) to minimize the possibility of name collisions. This is especially important if you want to publish your renderer, because you never know aliases has been registered by the user who uses your renderer.

```js
Handsontable.renderers.registerRenderer('asterix', asterixDecoratorRenderer);
```

Someone might already registered such alias

```js
Handsontable.renderers.registerRenderer('my.asterix', asterixDecoratorRenderer);
```

That's better.

::: only-for javascript

## Use an alias

:::

::: only-for react

### Use an alias

:::

The final touch is to using the registered aliases, so that users can easily refer to it without the need to now the actual renderer function is.

To sum up, a well prepared renderer function should look like this:

```js
function customRenderer(hotInstance, td, row, column, prop, value, cellProperties) {
  // Optionally include `BaseRenderer` which is responsible for
  // adding/removing CSS classes to/from the table cells.
  Handsontable.renderers.BaseRenderer.apply(this, arguments);

  // ...your custom logic of the renderer
}

// Register an alias
Handsontable.renderers.registerRenderer('my.custom', customRenderer);
```

From now on, you can use `customRenderer` like so:

::: only-for javascript

```js
const container = document.querySelector('#container');
const hot = new Handsontable(container, {
  data: someData,
  columns: [{
    renderer: 'my.custom'
  }]
});
```

:::

::: only-for react

```jsx
<HotTable
  data={someData}
  columns={[{
    renderer: 'my.custom'
  }]}
/>
```

:::

::: only-for javascript

## Render custom HTML in cells

:::

::: only-for react

### Render custom HTML in cells

:::

This example shows how to use custom cell renderers to display HTML content in a cell. This is a very powerful feature. Just remember to escape any HTML code that could be used for XSS attacks. In the below configuration:

- **Title** column uses built-in HTML renderer that allows any HTML. This is unsafe if your code comes from untrusted source. Take notice that a Handsontable user can use it to enter `<script>` or other potentially malicious tags using the cell editor!
- **Description** column also uses HTML renderer (same as above)
- **Comments** column uses a custom renderer (`safeHtmlRenderer`). This should be safe for user input, because only certain tags are allowed
- **Cover** column accepts image URL as a string and converts it to a `<img>` in the renderer

::: only-for javascript

::: example #example4

```js
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.min.css';

const data = [
  {
    title: '<a href="https://www.amazon.com/Professional-JavaScript-Developers-Nicholas-Zakas/dp/1118026691">Professional JavaScript for Web Developers</a>',
    description: 'This <a href="https://bit.ly/sM1bDf">book</a> provides a developer-level introduction along with more advanced and useful features of <b>JavaScript</b>.',
    comments: 'I would rate it &#x2605;&#x2605;&#x2605;&#x2605;&#x2606;',
    cover: '{{$basePath}}/img/examples/professional-javascript-developers-nicholas-zakas.jpg'
  },
  {
    title: '<a href="https://shop.oreilly.com/product/9780596517748.do">JavaScript: The Good Parts</a>',
    description: 'This book provides a developer-level introduction along with <b>more advanced</b> and useful features of JavaScript.',
    comments: 'This is the book about JavaScript',
    cover: '{{$basePath}}/img/examples/javascript-the-good-parts.jpg'
  },
  {
    title: '<a href="https://shop.oreilly.com/product/9780596805531.do">JavaScript: The Definitive Guide</a>',
    description: '<em>JavaScript: The Definitive Guide</em> provides a thorough description of the core <b>JavaScript</b> language and both the legacy and standard DOMs implemented in web browsers.',
    comments: 'I\'ve never actually read it, but the <a href="https://shop.oreilly.com/product/9780596805531.do">comments</a> are highly <strong>positive</strong>.',
    cover: '{{$basePath}}/img/examples/javascript-the-definitive-guide.jpg'
  }
];

const container = document.querySelector('#example4');
const hot = new Handsontable(container, {
  data,
  colWidths: [200, 200, 200, 80],
  colHeaders: ['Title', 'Description', 'Comments', 'Cover'],
  height: 'auto',
  columns: [
    { data: 'title', renderer: 'html' },
    { data: 'description', renderer: 'html' },
    { data: 'comments', renderer: safeHtmlRenderer },
    { data: 'cover', renderer: coverRenderer }
  ],
  licenseKey: 'non-commercial-and-evaluation'
});

function safeHtmlRenderer(instance, td, row, col, prop, value, cellProperties) {
  // WARNING: Be sure you only allow certain HTML tags to avoid XSS threats.
  // Sanitize the "value" before passing it to the innerHTML property.
  td.innerHTML = value;
}

function coverRenderer(instance, td, row, col, prop, value, cellProperties) {
  const img = document.createElement('img');

  img.src = value;

  img.addEventListener('mousedown', event => {
    event.preventDefault();
  });

  td.innerText = '';
  td.appendChild(img);

  return td;
}
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
  const data = [{
    title: '<a href="https://www.amazon.com/Professional-JavaScript-Developers-Nicholas-Zakas/dp/1118026691">Professional JavaScript for Web Developers</a>',
    description: 'This <a href="https://bit.ly/sM1bDf">book</a> provides a developer-level introduction along with more advanced and useful features of <b>JavaScript</b>.',
    comments: 'I would rate it ★★★★☆',
    cover: '{{$basePath}}/img/examples/professional-javascript-developers-nicholas-zakas.jpg'
  },
    {
      title: '<a href="https://shop.oreilly.com/product/9780596517748.do">JavaScript: The Good Parts</a>',
      description: 'This book provides a developer-level introduction along with <b>more advanced</b> and useful features of JavaScript.',
      comments: 'This is the book about JavaScript',
      cover: '{{$basePath}}/img/examples/javascript-the-good-parts.jpg'
    },
    {
      title: '<a href="https://shop.oreilly.com/product/9780596805531.do">JavaScript: The Definitive Guide</a>',
      description: '<em>JavaScript: The Definitive Guide</em> provides a thorough description of the core <b>JavaScript</b> language and both the legacy and standard DOMs implemented in web browsers.',
      comments: 'I\'ve never actually read it, but the <a href="https://shop.oreilly.com/product/9780596805531.do">comments</a> are highly <strong>positive</strong>.',
      cover: '{{$basePath}}/img/examples/javascript-the-definitive-guide.jpg'
    }
  ];

  function safeHtmlRenderer(instance, td, row, col, prop, value, cellProperties) {
    // WARNING: Be sure you only allow certain HTML tags to avoid XSS threats.
    // Sanitize the "value" before passing it to the innerHTML property.
    td.innerHTML = value;
  }

  function coverRenderer(instance, td, row, col, prop, value, cellProperties) {
    const img = document.createElement('img');

    img.src = value;

    img.addEventListener('mousedown', event => {
      event.preventDefault();
    });

    td.innerText = '';
    td.appendChild(img);

    return td;
  }

  return (
    <HotTable
      data={data}
      colWidths={[200, 200, 200, 80]}
      colHeaders={['Title', 'Description', 'Comments', 'Cover']}
      height="auto"
      columns={[
        { data: 'title', renderer: 'html' },
        { data: 'description', renderer: 'html' },
        { data: 'comments', renderer: safeHtmlRenderer },
        { data: 'cover', renderer: coverRenderer }
      ]}
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

::: only-for javascript

## Render custom HTML in header

:::

::: only-for react

### Render custom HTML in header

:::

You can also put HTML into row and column headers. If you need to attach events to DOM elements like the checkbox below, just remember to identify the element by class name, not by id. This is because row and column headers are duplicated in the DOM tree and id attribute must be unique.

::: only-for javascript

::: example #example5 --js 2 --html 1

```html
<div id="exampleContainer5">
  <div id="example5"></div>
</div>
```
```js
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.min.css';

let isChecked = false;
const exampleContainer = document.querySelector('#exampleContainer5');
const container = document.querySelector('#example5');

function customRenderer(instance, td) {
  Handsontable.renderers.TextRenderer.apply(this, arguments);

  if (isChecked) {
    td.style.backgroundColor = 'yellow';
  } else {
    td.style.backgroundColor = 'white';
  }
}

const hot = new Handsontable(container, {
  height: 'auto',
  columns: [
    {},
    { renderer: customRenderer }
  ],
  colHeaders(col) {
    switch (col) {
      case 0:
        return '<b>Bold</b> and <em>Beautiful</em>';

      case 1:
        return `Some <input type="checkbox" class="checker" ${isChecked ? `checked="checked"` : ''}> checkbox`;
    }
  },
  licenseKey: 'non-commercial-and-evaluation'
});

exampleContainer.addEventListener('mousedown', event => {
  if (event.target.nodeName == 'INPUT' && event.target.className == 'checker') {
    event.stopPropagation();
  }
});

exampleContainer.addEventListener('mouseup', event => {
  if (event.target.nodeName == 'INPUT' && event.target.className == 'checker') {
    isChecked = !event.target.checked;
    hot.render();
  }
});
```

:::

:::

::: only-for react

::: example #example5 :react

```jsx
import { useEffect, useRef } from 'react';
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import { textRenderer } from 'handsontable/renderers/textRenderer';
import 'handsontable/dist/handsontable.full.min.css';

// register Handsontable's modules
registerAllModules();

export const ExampleComponent = () => {
  const hotRef = useRef(null);

  let isChecked = false;

  function customRenderer(instance, td) {
    textRenderer.apply(this, arguments);

    if (isChecked) {
      td.style.backgroundColor = 'yellow';
    } else {
      td.style.backgroundColor = 'white';
    }
  }

  const exampleContainerMousedownCallback = event => {
    if (event.target.nodeName == 'INPUT' && event.target.className == 'checker') {
      event.stopPropagation();
    }
  };
  let exampleContainerMouseupCallback;

  useEffect(() => {
    const hot = hotRef.current.hotInstance;

    exampleContainerMouseupCallback = event => {
      if (event.target.nodeName == 'INPUT' && event.target.className == 'checker') {
        isChecked = !event.target.checked;
        hot.render();
      }
    };
  });

  return (
    <div id="exampleContainer5" onMouseUp={(...args) => exampleContainerMouseupCallback(...args)}>
      <HotTable
        ref={hotRef}
        height="auto"
        columns={[
          {},
          { renderer: customRenderer }
        ]}
        colHeaders={
          function(col) {
            switch (col) {
            case 0:
            return '<b>Bold</b> and <em>Beautiful</em>';

            case 1:
            return `Some <input type="checkbox" class="checker" ${isChecked ? `checked="checked"` : ''}> checkbox`;
          }
        }}
        licenseKey="non-commercial-and-evaluation"
      />
    </div>
  );
};

/* start:skip-in-preview */
ReactDOM.render(<ExampleComponent />, document.getElementById('example5'));
/* end:skip-in-preview */
```

:::

:::

::: only-for javascript

## Add event listeners in cell renderer function

:::

::: only-for react

### Add event listeners in cell renderer function

:::

If you are writing an advanced cell renderer, and you want to add some custom behavior after a certain user action (i.e. after user hover a mouse pointer over a cell) you might be tempted to add an event listener directly to table cell node passed as an argument to the `renderer` function. Unfortunately, this will almost always cause you trouble and you will end up with either performance issues or having the listeners attached to the wrong cell.

This is because Handsontable:

- Calls `renderer` functions multiple times per cell - this can lead to having multiple copies of the same event listener attached to a cell
- Reuses table cell nodes during table scrolling and adding/removing new rows/columns - this can lead to having event listeners attached to the wrong cell

Before deciding to attach an event listener in cell renderer make sure, that there is no [Handsontable event](@/guides/getting-started/events-and-hooks.md) that suits your needs. Using _Handsontable events_ system is the safest way to respond to user actions.

If you did't find a suitable _Handsontable event_ put the cell content into a wrapping `<div>`, attach the event listener to the wrapper and then put it into the table cell.

## Performance considerations

Cell renderers are called separately for every displayed cell, during every table render. Table can be rendered multiple times during its lifetime (after table scroll, after table sorting, after cell edit etc.), therefore you should keep your `renderer` functions as simple and fast as possible or you might experience a performance drop, especially when dealing with large sets of data.

::: only-for javascript

## Related articles

### Related guides

- [Custom renderer in React](@/react/guides/cell-functions/cell-renderer.md)
- [Custom renderer in Angular](@/guides/integrate-with-angular/angular-custom-renderer-example.md)
- [Custom renderer in Vue 2](@/guides/integrate-with-vue/vue-custom-renderer-example.md)
- [Custom renderer in Vue 3](@/guides/integrate-with-vue3/vue3-custom-renderer-example.md)

### Related API reference

:::

::: only-for react

## Related API reference

:::

- APIs:
  - [`BasePlugin`](@/api/basePlugin.md)
- Configuration options:
  - [`renderer`](@/api/options.md#renderer)
- Core methods:
  - [`getCellMeta()`](@/api/core.md#getcellmeta)
  - [`getCellMetaAtRow()`](@/api/core.md#getcellmetaatrow)
  - [`getCellsMeta()`](@/api/core.md#getcellsmeta)
  - [`getCellRenderer()`](@/api/core.md#getcellrenderer)
  - [`setCellMeta()`](@/api/core.md#setcellmeta)
  - [`setCellMetaObject()`](@/api/core.md#setcellmetaobject)
  - [`removeCellMeta()`](@/api/core.md#removecellmeta)
- Hooks:
  - [`afterGetCellMeta`](@/api/hooks.md#aftergetcellmeta)
  - [`afterGetColumnHeaderRenderers`](@/api/hooks.md#aftergetcolumnheaderrenderers)
  - [`afterGetRowHeaderRenderers`](@/api/hooks.md#aftergetrowheaderrenderers)
  - [`afterRenderer`](@/api/hooks.md#afterrenderer)
  - [`beforeGetCellMeta`](@/api/hooks.md#beforegetcellmeta)
  - [`beforeRenderer`](@/api/hooks.md#beforerenderer)
