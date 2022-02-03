---
title: Migrating from 10.0 to 11.0
metaTitle: Migrating from 10.0 to 11.0 - Guide - Handsontable Documentation
permalink: /11.1/migration-from-10.0-to-11.0
canonicalUrl: /migration-from-10.0-to-11.0
pageClass: migration-guide
---

# Migrating from 10.0 to 11.0

[[toc]]

To upgrade your Handsontable version from 10.x.x to 11.x.x, follow this guide.

## Step 1: React, Angular, Vue – register your modules

Starting with Handsontable 11.0.0, the [React wrapper](@/guides/integrate-with-react/react-installation.md), the [Angular wrapper](@/guides/integrate-with-angular/angular-installation.md), and the [Vue wrapper](@/guides/integrate-with-vue/vue-installation.md) support [modularization](@/guides/building-and-testing/modules.md).

If you don't use any of the wrappers, you don't need to change anything.

### Using all modules

To continue using all Handsontable modules with your wrapper, register all modules with the new `registerAllModules()` method.

In the entry point file of your application, add the following code:
```js
// import the registerAllModules() method
import { registerAllModules } from 'handsontable/registry';

// register all Handsontable modules
registerAllModules();
```

### Using individual modules

To start using individual Handsontable modules with your wrapper, see the following guides:
- [Using modules with React](@/guides/integrate-with-react/react-modules.md)
- [Using modules with Angular](@/guides/integrate-with-angular/angular-modules.md)
- [Using modules with Vue](@/guides/integrate-with-vue/vue-modules.md)

## Step 2: Adapt to the type definition changes

In Handsontable 11.0.0, we reorganized the TypeScript definitions files, and improved the overall consistency of Handsontable's types.

For more details, see [this pull request](https://github.com/handsontable/handsontable/pull/8875).

### TypeScript definitions files

#### Before

Before, all of Handsontable's TypeScript definitions were kept in one file, placed in the root directory: `./handsontable.d.ts`.

The only way to import types was to get all of them by importing the `Handsontable` package:

```ts
import Handsontable from 'handsontable';
```

#### Now

Now, each module has its own TypeScript definitions file. They're all kept in a new directory called `types`: [`./handsontable/types`](https://github.com/handsontable/handsontable/tree/master/handsontable/types).

You can still import all of Handsontable's type definitions in the same as way as before. Additionally, you can also import individual modules from within the Handsontable package, with correct types:

```ts
import Handsontable from 'handsontable/base';
import { registerPlugin, HiddenRows } from 'handsontable/plugins';
```

### Editors' interfaces

When improving the consistency of Handsontable's types, we needed to change the editors' interfaces.

#### Before

```ts
class CustomEditor extends Handsontable.editors.BaseEditor implements Handsontable._editors.Base ()
```

#### Now

```ts
class CustomEditor extends Handsontable.editors.BaseEditor implements Handsontable.editors.BaseEditor ()
```

## Step 3: Adapt to the `populateFromArray()` method's changes

The [`populateFromArray()`](@/api/core.md#populatefromarray) method works differently now, when its `method` argument is set to `shift_down` or `shift_right`.

For more details, see [this pull request](https://github.com/handsontable/handsontable/pull/8867).

#### Before

- [`populateFromArray()`](@/api/core.md#populatefromarray) performed a separate `spliceRow` action for each populated row, and a separate `spliceColumn` action for each populated column.
- The [`beforeChange`](@/api/hooks.md#beforechange) and [`afterChange`](@/api/hooks.md#afterchange) hooks were triggered multiple times, separately for each populated row and column.
- The [`beforeChange`](@/api/hooks.md#beforechange) and [`afterChange`](@/api/hooks.md#afterchange) hooks were triggered by each `spliceRow` and `spliceColumn` action, with the `source` argument defined as `spliceRow` or `spliceCol`.

```js
new Handsontable(element, {
  afterChange: (changes, source) => {
    if (source === 'spliceRow' || source === 'spliceCol') {
      handleChange(changes[0]);
    }
  }
});
```

#### Now

- [`populateFromArray()`](@/api/core.md#populatefromarray) populates rows and columns with one large operation.
- The [`beforeChange`](@/api/hooks.md#beforechange) and [`afterChange`](@/api/hooks.md#afterchange) hooks are triggered only once, for all populated rows and columns.
- The [`beforeChange`](@/api/hooks.md#beforechange) and [`afterChange`](@/api/hooks.md#afterchange) hooks are triggered directly by the [`populateFromArray()`](@/api/core.md#populatefromarray) method, with the `source` argument defined as `populateFromArray`.

```js
new Handsontable(element, {
  afterChange: (changes, source) => {
    if (source === 'populateFromArray') {
      changes.forEach(change =>  handleChange(change))
    }
  }
});
```