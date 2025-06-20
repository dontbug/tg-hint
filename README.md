# Telegram In-App Browser Helper

[![Demo](https://img.shields.io/static/v1?label=Live&message=Demo&color=0088cc)](https://dontbug.github.io/tg-hint/)
[![npm](https://img.shields.io/npm/v/tg-hint?color=cb3837&logo=npm)](https://www.npmjs.com/package/tg-hint)


This 3 kB script detects when your page is opened *inside* Telegram and
pops up a short instruction telling the user how to open it in their
regular browser (⋯ → **Open in browser**).

* **Auto-detects** Mini App, legacy `TelegramWebviewProxy`, and UA strings
* **Multilingual** – picks the device language, plus a language switcher
* **One-click dismiss**
* Built-in guide for turning the Telegram WebView off (iOS & Android)

---

## Quick look

<p align="center">
  <img src="docs/img/overlay1.jpg"  width="46%" alt="iOS overlay">
  &nbsp;
  <img src="docs/img/overlay2.jpg"  width="46%" alt="Android overlay">
</p>

*(Try it live on the [demo page »](https://dontbug.github.io/tg-hint/))*

## Install

```html
<!-- Production — jsDelivr CDN -->
<script src="https://cdn.jsdelivr.net/gh/dontbug/tg-hint/dist/tg-hint.min.js"></script>
```
or with npm / pnpm:
```bash
npm i tg-hint
# then in your code
import 'tg-hint';
```

---

## ☕ Support

If this project saved you a couple of hours, you can **buy me a coffee** – thank you!

[![Buy Me A Coffee](https://img.shields.io/badge/-buy&nbsp;me&nbsp;a&nbsp;coffee-FFDD00?logo=buy-me-a-coffee&logoColor=black&style=for-the-badge)](https://www.buymeacoffee.com/dontbug)

