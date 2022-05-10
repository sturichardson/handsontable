---
title: ShortcutManager
metaTitle: ShortcutManager - API Reference - Handsontable Documentation
permalink: /12.0/api/shortcut-manager
canonicalUrl: /api/shortcut-manager
hotPlugin: false
editLink: false
---

# ShortcutManager

[[toc]]

## Description

The `ShortcutManager` API lets you store and manage [keyboard shortcut contexts](@/guides/accessories-and-menus/keyboard-shortcuts.md#keyboard-shortcut-contexts) ([`ShortcutContext`](@/api/shortcutContext.md)).

Each `ShortcutManager` object:
- Stores and manages its own set of keyboard shortcut contexts.
- Listens to the [`KeyboardEvent`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent) events and runs actions for them.


## Methods

### addContext
  
::: source-code-link https://github.com/handsontable/handsontable/blob/b12f53bf59ffd1b5d8daad41f560076366c49a0d/handsontable/src/shortcuts/manager.js#L44

:::

_shortcutManager.addContext(contextName) ⇒ object_

Create a new [`ShortcutContext`](@/api/shortcutContext.md) object.


| Param | Type | Description |
| --- | --- | --- |
| contextName | `string` | The name of the new shortcut context |



### destroy
  
::: source-code-link https://github.com/handsontable/handsontable/blob/b12f53bf59ffd1b5d8daad41f560076366c49a0d/handsontable/src/shortcuts/manager.js#L154

:::

_shortcutManager.destroy() : function_

Destroy a context manager instance.



### getActiveContextName
  
::: source-code-link https://github.com/handsontable/handsontable/blob/b12f53bf59ffd1b5d8daad41f560076366c49a0d/handsontable/src/shortcuts/manager.js#L58

:::

_shortcutManager.getActiveContextName() ⇒ string_

Get the ID of the active [`ShortcutContext`](@/api/shortcutContext.md).



### getContext
  
::: source-code-link https://github.com/handsontable/handsontable/blob/b12f53bf59ffd1b5d8daad41f560076366c49a0d/handsontable/src/shortcuts/manager.js#L69

:::

_shortcutManager.getContext(contextName) ⇒ object | undefined_

Get a keyboard shortcut context by its name.


| Param | Type | Description |
| --- | --- | --- |
| contextName | `string` | The name of the shortcut context |


**Returns**: `object` | `undefined` - A [`ShortcutContext`](@/api/shortcutContext.md) object that stores registered shortcuts  

### isCtrlPressed
  
::: source-code-link https://github.com/handsontable/handsontable/blob/b12f53bf59ffd1b5d8daad41f560076366c49a0d/handsontable/src/shortcuts/manager.js#L147

:::

_shortcutManager.isCtrlPressed() ⇒ boolean_

Returns whether `control` or `meta` keys are pressed.



### setActiveContextName
  
::: source-code-link https://github.com/handsontable/handsontable/blob/b12f53bf59ffd1b5d8daad41f560076366c49a0d/handsontable/src/shortcuts/manager.js#L79

:::

_shortcutManager.setActiveContextName(contextName)_

Start listening to keyboard shortcuts within a given [`ShortcutContext`](@/api/shortcutContext.md).


| Param | Type | Description |
| --- | --- | --- |
| contextName | `string` | The name of the shortcut context |


