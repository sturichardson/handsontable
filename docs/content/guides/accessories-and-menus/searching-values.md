---
id: ct5f32ig
title: Searching values
metaTitle: Searching values - JavaScript Data Grid | Handsontable
description: Search data across Handsontable, using built-in API methods and implementing your own search UI.
permalink: /searching-values
canonicalUrl: /searching-values
tags:
  - find values
  - highlight values
  - search values
react:
  id: 48lhnrbd
  metaTitle: Searching values - React Data Grid | Handsontable
searchCategory: Guides
---

# Searching values

Search data across Handsontable, using the built-in API methods of the [`Search`](@/api/search.md) plugin, and implementing your own search UI.

[[toc]]

## Overview

::: only-for react

::: tip

To use the Handsontable API, you'll need access to the Handsontable instance. You can do that by utilizing a reference to the `HotTable` component, and reading its `hotInstance` property.

For more information, see the [Instance methods](@/guides/getting-started/react-methods.md) page.

:::

:::

The [`Search`](@/api/search.md) plugin provides an easy API to search data across Handsontable.

You should first enable the plugin by setting the [`search`](@/api/options.md#search) option to `true`. When enabled, the [`Search`](@/api/search.md) plugin exposes a new method [`query(queryStr)`](@/api/search.md#query), where [`queryStr`](@/api/search.md#query) is a string to find within the table. By default, the search is case insensitive.

[`query(queryStr, [callback], [queryMethod])`](@/api/search.md#query) method does 2 things. First of all, it returns an array of search results. Every element is an objects containing 3 properties:

- `row` – index of the row where the value has been found
- `col` – index of the column where the value has been found
- `data` – the value that has been found

The second thing the [`query()`](@/api/search.md#query) method does is set the `isSearchResult` property for each cell. If a cell is in search results, then its `isSearchResult` is set to `true`, otherwise the property is set to `false`.

All you have to do now, is use the [`query()`](@/api/search.md#query) method inside search input listener and you're done.

## Search result class

By default, the [`Search`](@/api/search.md) plugin adds `htSearchResult` class to every cell which `isSearchResult` property is `true`. You can change this class using [`searchResultClass`](@/api/options.md#search) configuration option.

To change the result class, you use the [`var searchPlugin = hot.getPlugin('search'); searchPlugin.setSearchResultClass(className);`](@/api/search.md#setsearchresultclass) method.

## Custom `queryMethod`

The [`queryMethod()`](@/api/search.md#query) function is responsible for determining whether a `queryStr` matches the value stored in a cell. It takes 2 arguments: `queryStr` and `cellData`. The first is a string passed to [`query()`](@/api/search.md#query) method. The second is a value returned by [`getDataAtCell()`](@/api/core.md#getdataatcell). The [`queryMethod()`](@/api/options.md#search) function should return `true` if there is a match.

The default [`queryMethod`](@/api/options.md#search) function is dead simple:

```js
const DEFAULT_QUERY_METHOD = function(query, value) {
  if (isUndefined(query) || query === null || !query.toLowerCase || query.length === 0) {
    return false;
  }
  if (isUndefined(value) || value === null) {
    return false;
  }

  return value.toString().toLowerCase().indexOf(query.toLowerCase()) !== -1;
};
```

If you want to change the [`queryMethod`](@/api/search.md#query), use the [`queryMethod`](@/api/options.md#search) option. You can also pass the [`queryMethod`](@/api/options.md#search) as the third argument of [`query()`](@/api/search.md#query) method. To change the [`queryMethod`](@/api/options.md#search), use [`var searchPlugin = hot.getPlugin('search'); searchPlugin.setQueryMethod(myNewQueryMethod);`](@/api/search.md#setquerymethod).

## Custom result callback

After calling [`queryMethod`](@/api/options.md#search) the [`Search`](@/api/search.md) plugin calls `callback(instance, rowIndex, colIndex, cellData, testResult)` for every cell.

Just as the [`queryMethod`](@/api/options.md#search), you can override this callback, using [`var searchPlugin = hot.getPlugin('search'); searchPlugin.setCallback(myNewCallbackFunction);`](@/api/search.md#setcallback), or passing your callback as the second argument of [`query()`](@/api/search.md#query) method.

The default `callback` is responsible for setting the `isSearchResult` property.

```js
const DEFAULT_CALLBACK = function(instance, row, col, data, testResult) {
  instance.getCellMeta(row, col).isSearchResult = testResult;
};
```

## Simplest use case

The example below:
- Enables the [`Search`](@/api/search.md) plugin (by setting the [`search`](@/api/options.md#search) configuration option to `true`)
- Adds a search input listener
- Inside the search input listener, gets the [`Search`](@/api/search.md) plugin's instance
- Uses the [`Search`](@/api/search.md) plugin's [`query()`](@/api/search.md#query) method

::: only-for javascript

::: example #example1 --html 1 --js 2

```html
<div class="controls">
  <input id="search_field" type="search" placeholder="Search">
</div>
<div id="example1"></div>
```
```js
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.min.css';

const container = document.querySelector('#example1');
const searchField = document.querySelector('#search_field');
const data = [
  ['Tesla', 2017, 'black', 'black'],
  ['Nissan', 2018, 'blue', 'blue'],
  ['Chrysler', 2019, 'yellow', 'black'],
  ['Volvo', 2020, 'yellow', 'gray']
];

const hot = new Handsontable(container, {
  data,
  colHeaders: true,
  // enable the `Search` plugin
  search: true,
  height: 'auto',
  licenseKey: 'non-commercial-and-evaluation'
});

// add a search input listener
searchField.addEventListener('keyup', function(event) {
  // get the `Search` plugin's instance
  const search = hot.getPlugin('search');
  // use the `Search` plugin's `query()` method
  const queryResult = search.query(event.target.value);

  console.log(queryResult);

  hot.render();
});
```

:::

:::

::: only-for react

::: example #example1 :react

```jsx
import { useRef, useEffect } from 'react';
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';

// register Handsontable's modules
registerAllModules();

export const ExampleComponent = () => {
  const hotRef = useRef(null);

  const data = [
    ['Tesla', 2017, 'black', 'black'],
    ['Nissan', 2018, 'blue', 'blue'],
    ['Chrysler', 2019, 'yellow', 'black'],
    ['Volvo', 2020, 'yellow', 'gray']
  ];
  let searchFieldKeyupCallback;

  useEffect(() => {
    const hot = hotRef.current.hotInstance;

    //  add a search input listener
    searchFieldKeyupCallback = function(event) {
      // get the `Search` plugin's instance
      const search = hot.getPlugin('search');
      // use the `Search` plugin's `query()` method
      const queryResult = search.query(event.target.value);

      console.log(queryResult);

      hot.render();
    };
  });

  return (
    <>
      <div className="controls">
        <input id="search_field" type="search" placeholder="Search" onKeyUp={(...args) => searchFieldKeyupCallback(...args)}/>
      </div>
      <HotTable
        ref={hotRef}
        data={data}
        colHeaders={true}
        search={true}
        height="auto"
        licenseKey="non-commercial-and-evaluation"
      />
    </>
  );
};

/* start:skip-in-preview */
ReactDOM.render(<ExampleComponent />, document.getElementById('example1'));
/* end:skip-in-preview */
```

:::

:::

## Custom search result class

You can style your search results with a custom CSS class, using the [`Search`](@/api/search.md) plugin's [`searchResultClass`](@/api/options.md#search) option.

The example below highlights its search results in bold red. To do this, it:
- Defines a custom CSS class called `my-custom-search-result-class`
- Enables the [`Search`](@/api/search.md) plugin (by setting the [`search`](@/api/options.md#search) configuration option to an object)
- Sets the [`Search`](@/api/search.md) plugin's [`searchResultClass`](@/api/options.md#search) option to `'my-custom-search-result-class'`

::: only-for javascript

::: example #example2 --css 1 --html 2 --js 3

````css
.my-custom-search-result-class{
  color: #ff0000;
  font-weight: 900;
}
````
```html
<div class="controls">
  <input id="search_field2" type="search" placeholder="Search">
</div>
<div id="example2"></div>
```
```js
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.min.css';

const container = document.querySelector('#example2');
const searchField = document.querySelector('#search_field2');
const data = [
  ['Tesla', 2017, 'black', 'black'],
  ['Nissan', 2018, 'blue', 'blue'],
  ['Chrysler', 2019, 'yellow', 'black'],
  ['Volvo', 2020, 'yellow', 'gray']
];

const hot = new Handsontable(container, {
  data,
  colHeaders: true,
  // enable the `Search` plugin
  search: {
    // add your custom CSS class
    searchResultClass: 'my-custom-search-result-class'
  },
  height: 'auto',
  licenseKey: 'non-commercial-and-evaluation'
});

searchField.addEventListener('keyup', function(event) {
  const search = hot.getPlugin('search');
  const queryResult = search.query(event.target.value);

  console.log(queryResult);
  hot.render();
});
```

:::

:::

::: only-for react

::: example #example2 :react --css 1 --js 2

````css
.my-custom-search-result-class{
  color: #ff0000;
  font-weight: 900;
}
````
```jsx
import { useRef, useEffect } from 'react';
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';

// register Handsontable's modules
registerAllModules();

export const ExampleComponent = () => {
  const hotRef = useRef(null);

  const data = [
    ['Tesla', 2017, 'black', 'black'],
    ['Nissan', 2018, 'blue', 'blue'],
    ['Chrysler', 2019, 'yellow', 'black'],
    ['Volvo', 2020, 'yellow', 'gray']
  ];
  let searchFieldKeyupCallback;

  useEffect(() => {
    const hot = hotRef.current.hotInstance;

    searchFieldKeyupCallback = function(event) {
      const search = hot.getPlugin('search');
      const queryResult = search.query(event.target.value);

      console.log(queryResult);
      hot.render();
    };
  });

  return (
    <>
      <div className="controls">
        <input id="search_field2" type="search" placeholder="Search" onKeyUp={(...args) => searchFieldKeyupCallback(...args)}/>
      </div>
      <HotTable
        ref={hotRef}
        data={data}
        colHeaders={true}
        // enable the `Search` plugin
        search={{
          // add your custom CSS class
          searchResultClass: 'my-custom-search-result-class'
        }}
        height="auto"
        licenseKey="non-commercial-and-evaluation"
      />
    </>
  );
};

/* start:skip-in-preview */
ReactDOM.render(<ExampleComponent />, document.getElementById('example2'));
/* end:skip-in-preview */
```

:::

:::

## Custom query method

You can add a custom query method, using the [`Search`](@/api/search.md) plugin's [`queryMethod`](@/api/search.md#query).

The example below searches only for exact search query matches. To do this, it:
- Defines a custom query method called `onlyExactMatch`
- Enables the [`Search`](@/api/search.md) plugin (by setting the [`search`](@/api/options.md#search) configuration option to an object)
- Sets the [`Search`](@/api/search.md) plugin's [`queryMethod`](@/api/options.md#search) option to `onlyExactMatch`

::: only-for javascript

::: example #example3 --html 1 --js 2

```html
<div class="controls">
  <input id="search_field3" type="search" placeholder="Search">
</div>
<div id="example3"></div>
```
```js
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.min.css';

const container = document.querySelector('#example3');
const searchField = document.querySelector('#search_field3');
const data = [
  ['Tesla', 2017, 'black', 'black'],
  ['Nissan', 2018, 'blue', 'blue'],
  ['Chrysler', 2019, 'yellow', 'black'],
  ['Volvo', 2020, 'white', 'gray']
];

// define your custom query method
function onlyExactMatch(queryStr, value) {
  return queryStr.toString() === value.toString();
};

const hot = new Handsontable(container, {
  data,
  colHeaders: true,
  // enable the `Search` plugin
  search: {
    // add your custom query method
    queryMethod: onlyExactMatch
  },
  height: 'auto',
  licenseKey: 'non-commercial-and-evaluation'
});

searchField.addEventListener('keyup', function(event) {
  const search = hot.getPlugin('search');
  // use the `Search`'s `query()` method
  const queryResult = search.query(event.target.value);

  console.log(queryResult);

  hot.render();
});
```

:::

:::

::: only-for react

::: example #example3 :react

```jsx
import { useRef, useEffect } from 'react';
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';

// register Handsontable's modules
registerAllModules();

export const ExampleComponent = () => {
  const hotRef = useRef(null);

  const data = [
    ['Tesla', 2017, 'black', 'black'],
    ['Nissan', 2018, 'blue', 'blue'],
    ['Chrysler', 2019, 'yellow', 'black'],
    ['Volvo', 2020, 'white', 'gray']
  ];
  let searchFieldKeyupCallback;

  //  define your custom query method
  function onlyExactMatch(queryStr, value) {
    return queryStr.toString() === value.toString();
  }

  useEffect(() => {
    const hot = hotRef.current.hotInstance;

    searchFieldKeyupCallback = function(event) {
      const search = hot.getPlugin('search');
      // use the `Search`'s `query()` method
      const queryResult = search.query(event.target.value);

      console.log(queryResult);

      hot.render();
    };
  });

  return (
    <>
      <div className="controls">
        <input id="search_field3" type="search" placeholder="Search" onKeyUp={(...args) => searchFieldKeyupCallback(...args)}/>
      </div>
      <HotTable
        ref={hotRef}
        data={data}
        colHeaders={true}
        // enable the `Search` plugin
        search={{
          // add your custom query method
          queryMethod: onlyExactMatch
        }}
        height="auto"
        licenseKey="non-commercial-and-evaluation"
      />
    </>
  );
};

/* start:skip-in-preview */
ReactDOM.render(<ExampleComponent />, document.getElementById('example3'));
/* end:skip-in-preview */
```

:::

:::

## Custom callback

You can add a custom callback function, using the [`Search`](@/api/search.md) plugin's [`callback`](@/api/search.md) option.

The example below displays the number of matching search results. To do this, it:
- Defines a custom callback function called `searchResultCounter`
- Enables the [`Search`](@/api/search.md) plugin (by setting the [`search`](@/api/options.md#search) configuration option to an object)
- Sets the [`Search`](@/api/search.md) plugin's [`callback`](@/api/search.md) option to `searchResultCounter`

::: only-for javascript

::: example #example4 --html 1 --js 2

```html
<div class="controls">
  <input id="search_field4" type="search" placeholder="Search">
</div>
<output class="console" id="output">0 results</output>
<div id="example4"></div>
```
```js
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.min.css';

const container = document.querySelector('#example4');
const searchField = document.querySelector('#search_field4');
const output = document.querySelector('#output');

let searchResultCount = 0;

const data = [
  ['Tesla', 2017, 'black', 'black'],
  ['Nissan', 2018, 'blue', 'blue'],
  ['Chrysler', 2019, 'yellow', 'black'],
  ['Volvo', 2020, 'white', 'gray']
];

// define your custom callback function
function searchResultCounter(instance, row, col, value, result) {
  const DEFAULT_CALLBACK = function(instance, row, col, data, testResult) {
    instance.getCellMeta(row, col).isSearchResult = testResult;
  };

  DEFAULT_CALLBACK.apply(this, arguments);

  if (result) {
    searchResultCount++;
  }
}

const hot = new Handsontable(container, {
  data,
  colHeaders: true,
  // enable the `Search` plugin
  search: {
    // add your custom callback function
    callback: searchResultCounter
  },
  height: 'auto',
  licenseKey: 'non-commercial-and-evaluation'
});

searchField.addEventListener('keyup', function(event) {
  searchResultCount = 0;

  const search = hot.getPlugin('search');
  const queryResult = search.query(event.target.value);

  console.log(queryResult);
  output.innerText = `${searchResultCount} results`;
  hot.render();
});
```

:::

:::

::: only-for react

::: example #example4 :react

```jsx
import { useRef, useEffect, useState } from 'react';
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';

// register Handsontable's modules
registerAllModules();

export const ExampleComponent = () => {
  const hot4Ref = useRef(null);
  const [output, setOutput] = useState('');

  const data = [
    ['Tesla', 2017, 'black', 'black'],
    ['Nissan', 2018, 'blue', 'blue'],
    ['Chrysler', 2019, 'yellow', 'black'],
    ['Volvo', 2020, 'white', 'gray']
  ];
  let searchResultCount = 0;
  let searchFieldKeyupCallback;

  //  define your custom callback function
  function searchResultCounter(instance, row, col, value, result) {
    const DEFAULT_CALLBACK = function(instance, row, col, data, testResult) {
      instance.getCellMeta(row, col).isSearchResult = testResult;
    };

    DEFAULT_CALLBACK.apply(this, arguments);

    if (result) {
      searchResultCount++;
    }
  }

  useEffect(() => {
    const hot4 = hot4Ref.current.hotInstance;

    searchFieldKeyupCallback = function(event) {
      searchResultCount = 0;

      const search = hot4.getPlugin('search');
      const queryResult = search.query(event.target.value);

      console.log(queryResult);
      setOutput(`${searchResultCount} results`);
      hot4.render();
    };
  });

  return (
    <>
      <div className="controls">
        <input id="search_field4" type="search" placeholder="Search" onKeyUp={(...args) => searchFieldKeyupCallback(...args)}/>
      </div>
      <output className="console" id="output">{output}</output>
      <HotTable
        ref={hot4Ref}
        data={data}
        colHeaders={true}
        // enable the `Search` plugin
        search={{
          // add your custom callback function
          callback: searchResultCounter
        }}
        height="auto"
        licenseKey="non-commercial-and-evaluation"
      />
    </>
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
  - [`search`](@/api/options.md#search)
- Plugins:
  - [`Search`](@/api/search.md)
