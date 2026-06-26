# 超苦逼冒险者

一个 HTML5 沙盒生存文字游戏。

## 本地运行

不要直接双击打开 `index.html`。这个旧项目依赖浏览器环境加载脚本，建议在项目根目录启动本地 HTTP 服务：

```powershell
py -3 -m http.server 8123
```

然后打开：

```text
http://127.0.0.1:8123/
```

## itch.io 上传包

itch.io 可用上传包：

```text
dist/超苦逼冒险者-v0.33-html5-flat.zip
```

这个包是专门为 itch.io 准备的扁平结构版本：

- ZIP 根目录包含 `index.html`
- 所有脚本、样式和音频都在 ZIP 根目录
- 不包含 `src/`、`build/`、`res/` 等子目录
- `main.js` 已预编译，不依赖浏览器端 `text/babel`

不要上传非 flat 包。2026-06-26 验证时，itch.io 的 HTML 运行地址会对 ZIP 子目录里的文件返回 403，导致页面只显示背景，游戏内容不渲染。

itch.io 页面建议设置：

- Kind of project: `HTML`
- Viewport dimensions: `960 x 600`
- Fullscreen button: enabled
- Mobile friendly: disabled

## 存档

网页存档使用浏览器 `localStorage`。清理浏览器数据、换浏览器或换设备都可能丢失存档，发布页和游戏内菜单应提示玩家定期导出备份。

## ChangeLog

### v0.33

- 修复本地存档功能，新增存档导入和导出。
- 为 itch.io 发布增加扁平结构 HTML5 包。
