<!-- ## vue-cli-plugin-basis -->
<h2 align="center">vue-cli-plugin-basis</h2>
<p align="center">
  <h4 align="center">Vue-CLI 3.x plugin for YM.</h4>
  <h4 align="center">Quickly build basic development templates.</h4>
</p>

<p align="center">
  <a href="https://github.com/vasttian/vue-cli-plugin-basis/tags">
    <img src="https://img.shields.io/github/tag-date/vasttian/vue-cli-plugin-basis.svg" alt="TAGS">
  </a>
  <a href="https://github.com/vasttian/vue-cli-plugin-basis/releases">
    <img src="https://img.shields.io/github/release/vasttian/vue-cli-plugin-basis.svg" alt="RELEASE">
  </a>
  <a href="https://www.npmjs.com/package/vue-cli-plugin-basis">
    <img src="https://img.shields.io/npm/v/vue-cli-plugin-basis.svg" alt="NPM">
  </a>
  <a href="https://github.com/vasttian/vue-cli-plugin-basis/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/mashape/apistatus.svg" alt="LICENSE">
  </a>
</p>

<!-- [![npm](https://img.shields.io/npm/v/vue-cli-plugin-basis.svg)](https://www.npmjs.com/package/vue-cli-plugin-basis) -->

---

### :page_with_curl: Index
* [:warning: Heads up](#warning-heads-up)
* [:book: Intro](#book-intro)
* [:rocket: Getting Started](#rocket-getting-started)
* [:arrow_down: Install](#arrow_down-install)
* [:white_check_mark: TODO](#white_check_mark-todo)
* [:exclamation: Issues](#exclamation-issues)
* [:copyright: License](#copyright-license)

### :warning: Heads up

Currently this is just a **beta version**.

**If you switch from partial import to full import UI framework,
You need to rerun the service.**

### :book: Intro

`basis` plugin to add:
1. [Element](https://github.com/ElemeFE/element)  :heavy_check_mark:
2. [Vuetify](https://github.com/vuetifyjs/vuetify) :heavy_check_mark:
3. [Vue Hamlet](https://github.com/yimian/vue-hamlet)  :heavy_check_mark:
4. [Vue I18n](https://github.com/kazupon/vue-i18n)  :heavy_check_mark:
5. [Moment](https://github.com/moment/moment)  :heavy_check_mark:
6. [Vue-ECharts](https://github.com/ecomfe/vue-echarts)  :heavy_check_mark:

to your Vue Project.

This plugin will provide login and homepage.

### :rocket: Getting Started

### :arrow_down: Install:

:warning: Make sure you have Vue-CLI 3.x:

```
vue --version
```

If you haven't yet installed Vue-CLI 3.x,

first follow the install instructions here: https://github.com/vuejs/vue-cli

Create your new project with Vue-CLI 3.x:

~~**Tip**: suggest you use the matching preset~~

~~```~~
vue create --preset vasttian/vue-cli-plugin-basis my-app
~~```~~

~~or~~

```bash
vue create my-app
```

Before installing the `basis` plugin, make sure to commit or stash your changes in case you need to revert.

Navigate to the newly created project folder,
Then, to install the `basis` plugin:

```bash
cd my-app
vue add basis
```

Finally, serve your project which will be available at http://localhost:8090

Start your app:

```bash
npm run serve
```

:tada: Open http://localhost:8090 to see the demo.

If [hot reload](https://vue-loader.vuejs.org/guide/hot-reload.html#state-preservation-rules) fails,
modify your `vue.config.js`
```
module.exports = {
  chainWebpack: config => {
    config.resolve
      .symlinks(true)
  }
}
```
or replace `cnpm` with `npm`

`npm config set registry https://registry.npm.taobao.org`

### :white_check_mark: TODO
- [x] add: `Element`.
- [x] add: `Vuetify`.
- [x] add: `Vue Hamlet`.
- [x] add: `Vue I18n`.
- [x] add: `Moment`.
- [x] mod: Change `Vue Resource` to `Axios`.
- [ ] ~~add: [ECharts](https://github.com/apache/incubator-echarts)~~
- [x] add: [Vue-ECharts](https://github.com/ecomfe/vue-echarts).
- [x] add: Query locale.
- [x] add: Remote Presets.
- [x] mod: API process.
- [x] refactor: project structure.
- [ ] add: fabfile script.
- [ ] mod: Styles folder.
- [ ] ......
- [ ] ......

### :exclamation: Issues

If you run into any issues, you can contact me at [issues](https://github.com/vasttian/vue-cli-plugin-basis/issues)

### :memo: Changelog

Detailed changes for each release are documented in the [release notes](https://github.com/vasttian/vue-admin-vuetify/releases).

### :copyright: License

Under the MIT license. See [LICENSE](http://opensource.org/licenses/MIT) file for more details.
