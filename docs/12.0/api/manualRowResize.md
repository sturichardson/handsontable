---
title: ManualRowResize
metaTitle: ManualRowResize - Plugin - Handsontable Documentation
permalink: /12.0/api/manual-row-resize
canonicalUrl: /api/manual-row-resize
hotPlugin: true
editLink: false
---

# ManualRowResize

[[toc]]

## Description

This plugin allows to change rows height. To make rows height persistent the [Options#persistentState](@/api/options.md#persistentstate)
plugin should be enabled.

The plugin creates additional components to make resizing possibly using user interface:
- handle - the draggable element that sets the desired height of the row.
- guide - the helper guide that shows the desired height as a horizontal guide.


## Options

### manualRowResize
  
::: source-code-link https://github.com/handsontable/handsontable/blob/b12f53bf59ffd1b5d8daad41f560076366c49a0d/handsontable/src/dataMap/metaManager/metaSchema.js#L2792

:::

_manualRowResize.manualRowResize : boolean | Array&lt;number&gt;_

The `manualRowResize` option configures the [`ManualRowResize`](@/api/manualRowResize.md) plugin.

You can set the `manualRowResize` option to one of the following:

| Setting  | Description                                                                                                   |
| -------- | ------------------------------------------------------------------------------------------------------------- |
| `true`   | Enable the [`ManualRowResize`](@/api/manualRowResize.md) plugin                                               |
| `false`  | Disable the [`ManualRowResize`](@/api/manualRowResize.md) plugin                                              |
| An array | - Enable the [`ManualRowResize`](@/api/manualRowResize.md) plugin<br>- Set initial heights of individual rows |

Read more:
- [Row height: Adjust the row height manually &#8594;](@/guides/rows/row-height.md#adjust-the-row-height-manually)

**Default**: <code>undefined</code>  
**Example**  
```js
// enable the `ManualRowResize` plugin
manualColumnResize: true,

// enable the `ManualRowResize` plugin
// set the initial height of row 0 to 40 pixels
// set the initial height of row 1 to 50 pixels
// set the initial height of row 2 to 60 pixels
manualColumnResize: [40, 50, 60],
```

## Methods

### destroy
  
::: source-code-link https://github.com/handsontable/handsontable/blob/b12f53bf59ffd1b5d8daad41f560076366c49a0d/handsontable/src/plugins/manualRowResize/manualRowResize.js#L598

:::

_manualRowResize.destroy()_

Destroys the plugin instance.



### disablePlugin
  
::: source-code-link https://github.com/handsontable/handsontable/blob/b12f53bf59ffd1b5d8daad41f560076366c49a0d/handsontable/src/plugins/manualRowResize/manualRowResize.js#L130

:::

_manualRowResize.disablePlugin()_

Disables the plugin functionality for this Handsontable instance.



### enablePlugin
  
::: source-code-link https://github.com/handsontable/handsontable/blob/b12f53bf59ffd1b5d8daad41f560076366c49a0d/handsontable/src/plugins/manualRowResize/manualRowResize.js#L98

:::

_manualRowResize.enablePlugin()_

Enables the plugin functionality for this Handsontable instance.



### isEnabled
  
::: source-code-link https://github.com/handsontable/handsontable/blob/b12f53bf59ffd1b5d8daad41f560076366c49a0d/handsontable/src/plugins/manualRowResize/manualRowResize.js#L91

:::

_manualRowResize.isEnabled() ⇒ boolean_

Checks if the plugin is enabled in the handsontable settings. This method is executed in [Hooks#beforeInit](@/api/hooks.md#beforeinit)
hook and if it returns `true` than the [ManualRowResize#enablePlugin](@/api/manualRowResize.md#enableplugin) method is called.



### loadManualRowHeights
  
::: source-code-link https://github.com/handsontable/handsontable/blob/b12f53bf59ffd1b5d8daad41f560076366c49a0d/handsontable/src/plugins/manualRowResize/manualRowResize.js#L156

:::

_manualRowResize.loadManualRowHeights() ⇒ Array_

Loads the previously saved sizes using the persistentState plugin (the [Options#persistentState](@/api/options.md#persistentstate) option
has be enabled).

**Emits**: [`Hooks#event:persistentStateLoad`](@/api/hooks.md#persistentstateload)  


### saveManualRowHeights
  
::: source-code-link https://github.com/handsontable/handsontable/blob/b12f53bf59ffd1b5d8daad41f560076366c49a0d/handsontable/src/plugins/manualRowResize/manualRowResize.js#L145

:::

_manualRowResize.saveManualRowHeights()_

Saves the current sizes using the persistentState plugin (the [Options#persistentState](@/api/options.md#persistentstate) option has to be
enabled).

**Emits**: [`Hooks#event:persistentStateSave`](@/api/hooks.md#persistentstatesave)  


### setManualSize
  
::: source-code-link https://github.com/handsontable/handsontable/blob/b12f53bf59ffd1b5d8daad41f560076366c49a0d/handsontable/src/plugins/manualRowResize/manualRowResize.js#L171

:::

_manualRowResize.setManualSize(row, height) ⇒ number_

Sets the new height for specified row index.


| Param | Type | Description |
| --- | --- | --- |
| row | `number` | Visual row index. |
| height | `number` | Row height. |


**Returns**: `number` - Returns new height.  

### updatePlugin
  
::: source-code-link https://github.com/handsontable/handsontable/blob/b12f53bf59ffd1b5d8daad41f560076366c49a0d/handsontable/src/plugins/manualRowResize/manualRowResize.js#L120

:::

_manualRowResize.updatePlugin()_

Updates the plugin's state.

This method is executed when [`updateSettings()`](@/api/core.md#updatesettings) is invoked with any of the following configuration options:
 - [`manualRowResize`](@/api/options.md#manualrowresize)


