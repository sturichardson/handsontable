---
title: MapCollection
metaTitle: MapCollection - API Reference - Handsontable Documentation
permalink: /11.1/api/map-collection
canonicalUrl: /api/map-collection
hotPlugin: false
editLink: false
---

# MapCollection

[[toc]]
## Members

### collection
  
::: source-code-link https://github.com/handsontable/handsontable/blob/0472af66268f29ceb64d1f046b74a05149cffe8d/../handsontable/src/translations/mapCollections/mapCollection.js#L18

:::

_mapCollection.collection : Map&lt;string, [IndexMap](@/api/indexMap.md)&gt;_

Collection of index maps.


## Methods

### get
  
::: source-code-link https://github.com/handsontable/handsontable/blob/0472af66268f29ceb64d1f046b74a05149cffe8d/../handsontable/src/translations/mapCollections/mapCollection.js#L69

:::

_mapCollection.get([name]) ⇒ Array | [IndexMap](@/api/indexMap.md)_

Get index map for the provided name.


| Param | Type | Description |
| --- | --- | --- |
| [name] | `string` | `optional` Name of the index map. |



### getLength
  
::: source-code-link https://github.com/handsontable/handsontable/blob/0472af66268f29ceb64d1f046b74a05149cffe8d/../handsontable/src/translations/mapCollections/mapCollection.js#L82

:::

_mapCollection.getLength() ⇒ number_

Get collection size.



### initEvery
  
::: source-code-link https://github.com/handsontable/handsontable/blob/0472af66268f29ceb64d1f046b74a05149cffe8d/../handsontable/src/translations/mapCollections/mapCollection.js#L116

:::

_mapCollection.initEvery(length)_

Set default values to index maps within collection.


| Param | Type | Description |
| --- | --- | --- |
| length | `number` | Destination length for all stored maps. |



### register
  
::: source-code-link https://github.com/handsontable/handsontable/blob/0472af66268f29ceb64d1f046b74a05149cffe8d/../handsontable/src/translations/mapCollections/mapCollection.js#L27

:::

_mapCollection.register(uniqueName, indexMap)_

Register custom index map.


| Param | Type | Description |
| --- | --- | --- |
| uniqueName | `string` | Unique name of the index map. |
| indexMap | `IndexMap` | Index map containing miscellaneous (i.e. Meta data, indexes sequence), updated after remove and insert data actions. |



### unregister
  
::: source-code-link https://github.com/handsontable/handsontable/blob/0472af66268f29ceb64d1f046b74a05149cffe8d/../handsontable/src/translations/mapCollections/mapCollection.js#L42

:::

_mapCollection.unregister(name)_

Unregister custom index map.


| Param | Type | Description |
| --- | --- | --- |
| name | `string` | Name of the index map. |



### unregisterAll
  
::: source-code-link https://github.com/handsontable/handsontable/blob/0472af66268f29ceb64d1f046b74a05149cffe8d/../handsontable/src/translations/mapCollections/mapCollection.js#L58

:::

_mapCollection.unregisterAll()_

Unregisters and destroys all collected index map instances.


