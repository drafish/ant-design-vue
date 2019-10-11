---
category: Components
type: Navigation
title: PageHeader
cols: 1
subtitle:
---

The header can be used to declare the page topic, display important information about the page that the user is interested in, and carry the action items related to the current page (including page-level operations, inter-page navigation, etc.)

## When To Use

It can also be used as inter-page navigation when it is needed to make the user quickly understand what the current page is and to facilitate the user to use the page function.

## API

| Param | Description | Type | Default value |
| --- | --- | --- | --- |
| title | custom title text | string\|slot | - |
| subTitle | custom subTitle text | string\|slot | - |
| avatar | Avatar next to the title bar | [avatar props](/components/avatar/) | - |
| backIcon | custom back icon, if false the back icon will not be displayed | string\|slot | `<Icon type="arrow-left" />` |
| tags | Tag list next to title | [Tag](https://ant.design/components/tag-cn/)[] \| [Tag](https://ant.design/components/tag-cn/) | - |
| extra | Operating area, at the end of the line of the title line | string\|slot | - |
| breadcrumb | breadcrumb config | [breadcrumb](https://ant.design/components/breadcrumb-cn/) | - |
| footer | PageHeader's footer, generally used to render TabBar | string\|slot | - |

### Events

| Events Name | Description | Arguments |
| ------------- | -------------------------------------- | ----------------- |
| back | back icon click event | function(e) |
