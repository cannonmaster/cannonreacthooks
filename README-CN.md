<h1 align="center" style="border-bottom: 2px solid #ebebeb;">CannonHttpJS</h1>
<div align="center" style="margin-bottom: 10px;">
<img src="https://img.shields.io/badge/license-MIT-green" />
<img src="https://img.shields.io/badge/test_coverage-98%25-cyan" />
</div>

CannonHttpJS 是一个多功能的 HTTP 客户端库，为 Node.js 和浏览器环境提供了一个简单而灵活的接口，用于发起 HTTP 请求。它提供了请求拦截器、响应拦截器、缓存、超时处理等功能。使用 CannonHttpJS，您可以轻松处理 RESTful API，并与服务器进行数据的获取和发送。

<a href="https://cannonmaster.github.io/doc-cannonhttpjs/zh/">使用文档</a>

## 功能特点

- **HTTP 方法**: 执行常见的 GET、POST、PUT、PATCH 和 DELETE 等 HTTP 方法。
- **请求拦截器**: 在发送请求之前拦截并修改请求配置。
- **响应拦截器**: 在接收响应之后拦截并修改响应数据。
- **缓存**: 缓存响应以提高性能并减少重复请求。
- **超时处理**: 设置请求超时时间，确保请求不会耗时过长。
- **基础 URL**: 定义基础 URL，简化请求 URL 的设置。
- **默认请求头**: 设置默认请求头，应用于所有请求。
- **重试机制**: 配置请求失败时的重试次数和延迟时间。

## 安装

```bash
npm install @cannonui/httpjs@latest
```

<h2 style="border-bottom: 2px solid #ebebeb;">License</h2>

CannonHttpJS is open-source software licensed under the [MIT License](https://opensource.org/licenses/MIT).
