## 简介

### 什么是 Vue.js

- Vue.js 是目前最火的框架，React 是最流行的框架（React 除了可以开发网站，还可以开发手机 App）
- Vue.js 是前端的**主流框架**之一，和 Angularjs、React.js 并成为三大主流框架
- Vue.js 是一套构建用户界面的框架，只关注**视图层**，易于上手，便于整合


### 为什么要学习流行框架

- 开发效率高
- 增加就业竞争力


### 框架和库的区别

- 框架：是一套完整的解决方案；对项目的侵入性较大，项目如果需要更换框架，则需要重新架构整个项目。
  - express
  - vue
  - angular

- 库（插件）：提供小型功能，对项目的侵入性较小，如果某个库无法完成某些指定需求，可以很容易切换其他库。
  - JQuery
  - BootStrap
  - Layer

## Node（后端）中 MVC 与前端中 MVVM 的区别

- MVC 是后端分层开发概念

  - V
    - view
      - 视图层
      - 当用户操作界面，如果需要进行业务处理，就会通过网络请求，去请求后端的服务器。此时，该请求就会被后端的 app.js 监听

  - V -> C （中转）
    - app.js
      - 项目的入口模块。一切请求从这里进行处理。
      - app.js 并没有分发路由的功能，分发路由需要调用 route.js 模块进行处理

  - C
    - router.js
      - 路由分发处理模块。
      - 为了保证路由模块的职能单一，router.js 只负责分发路由，不负责具体业务逻辑的处理
      - 如果涉及到业务逻辑的处理，router.js 只能调用 controller 模块进行业务逻辑处理
    - controller
      - 业务逻辑处理模块
      - 封装了一些具体业务逻辑代码
      - 为了保证职能单一，此模块只负责处理业务，不负责处理数据 CRUD
      - 如果涉及到数据的 CRUD， 需要调用 Model 层

  - M
    - model
    - 处理数据的 CURD
    - 为了保证职能单一，只负责操作数据库，执行对应的 SQL


- MVVM 是前端视图层开发概念
  - M
    - 页面的单独数据
  - V
    - 页面 HTML 结构
  - VM（核心）
    - M 和 V 之间的调度者
    - 提供数据双向绑定

## 什么是路由

- 后端路由：对于普通网站，所有的超链接都是 URL 地址，所有的 URL 地址都是对应服务器上对应的资源；
- 前端路由：对于单页面应用程序来说，主要通过 URL 中的 hash(#号) 来实现不同页面之间的切换，同时，hash 有一个特点：HTTP 请求中不会包含 hash 相关的内容，所以，单页面程序中的页面的跳转主要用 hash 实现

### 前端路由的特点

- 同页面的锚点跳转
    - 代表网页中的位置，其右边的字符就是位置的标识符。
    - step1: 设置一个锚点 `<a href='#print'> 定位到 print 位置</a>`
    - step2: 在页面需要定位的内容加上 id 。如 `<div id='print'></div>`

- 不发送 HTTP 请求
  - 比如访问 `http://www.baidu.com#key`
    - 浏览器实际的请求是 `http://www.baidu.com`
    - 即使是从 `http://www.baidu.com#key` 页面跳转到 `http://www.baidu.com#value` 请求也只有 `http://www.baidu.com` 不会有 # 之后的部分

- 浏览器历史记录
  - 每次 # 改变，都会在浏览器历史记录中增加一条数据，方便使用【后退】和【前进】操作。
  - 这对于 ajax 应用程序特别有用，可以用不同的 # 值表示不同的访问状态

### 前端路由的抓取

- window.location.hash 读取 # 的值
  - 该属性可读可写。
  - 该属性可以用来判断网页状态是否改变
  - 该属性写入时会在不重新加载网页的前提下创造一天访问记录

- Google 抓取机制
  - 默认情况，Google 会忽视 # 后的部分
  - Google 规定，如果希望 Ajax 生成的内容被浏览器引擎读取，那么 URL 中可以用 #! 
  - Google 会自动将 #! 之后的内容转成查询字符串 _escaped_fragment_ 的值

- onhashchange 事件
  - 当 # 的值发生变化时，就会触发这个事件

### 前端路由的坑

- 十六进制颜色
  - 前端路由会忽略 URL 中 # 后面的部分。如果 URL 想指定一个十六进制的颜色作为参数。如 `http://www.baidu.com/?color=#FFF`
    - 此时，浏览器实际发出的只是 `http://www.baidu.com/?color=` 而忽略了 # 之后的部分
    - 这种情况下，应该将 # 转码为 %23 也就是说，应该发送 `http://www.baidu.com/?color=%23FFF`

### `nrm` 的安装使用

  - `npm i -g nrm`  全局安装
  - `nrm ls` 查看镜像列表
  - `nrm use npm` 切换不同的镜像地址

  > nrm 只是单纯的提供几个常用的 url 地址，方便切换，但每次安装包的工具依然是 npm。不支持 node v8.0 及以下


### 模块的导入和导出

- ES 6
  - 导入模块
    - `import 模块名称 from '模块标识符'`
    - `import '标识路径'`
  - 导出模块
    - `export default {}`   
      - import 自定义模块名称 from 模块名
      - 一个模块中只允许一次
    - `export var 变量名 = 变量内容`
      - import {变量名} from 模块名
      - import {变量名1 as 自定义名称, 变量名2} from 模块名
      - 一个模块中允许有多个
- Node
  - 导入模块
    - `const 名称 = require('模块标识符')`
  - 导出模块
    - `module.exports = {}`
    - `exports`

### 建议组合

- Mint-UI
  - 基于 Vue.js 的移动端组件库

- MUI
  - 配套代码片段。类似于 BootStrap ，任何项目都可以使用。
    - 不能使用 npm 下载