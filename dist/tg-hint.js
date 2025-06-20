<!-- tg-hint.js  –  paste straight into <head> or load from a CDN -->
(function () {
  /* ──── 1. ENVIRONMENT DETECTION ──── */
  const isTG =
        window.Telegram?.WebApp ||                     // Mini App SDK
        window.TelegramWebviewProxy  || window.TelegramWebview ||  // legacy
        /(Telegram-Android|Telegram\/|TDesktop|TWeb)/i.test(navigator.userAgent);

  if (!isTG) return;          // we’re in a regular browser – do nothing

  /* ──── 2. LOCALISATION SET-UP ──── */
  const dict = {
    /* ─── English (fallback) ─── */
    en: {
      title       : 'Open this page in your browser',
      body        : 'Tap <b>⋯</b> in the top-right corner of Telegram and choose <i>“Open in browser”</i>.',
      disable     : 'Disable the in-app browser',
      disable_ios : '<b>iOS</b><br>Settings → Data and Storage → Other → <i>Open Links In</i> → Safari',
      disable_and : '<b>Android</b><br>☰ Menu → Settings → Chat Settings → <i>In-App Browser</i> → Off',
      ok          : 'Got it'
    },

    /* ─── Russian ─── */
    ru: {
      title       : 'Откройте ссылку во внешнем браузере',
      body        : 'Нажмите <b>⋯</b> в правом-верхнем углу и выберите <i>«Открыть в браузере»</i>.',
      disable     : 'Как навсегда отключить встроенный браузер',
      disable_ios : '<b>iOS</b><br>Настройки → Данные и память → Другое → <i>Открывать ссылки в</i> → Safari',
      disable_and : '<b>Android</b><br>☰ Меню → Настройки → Настройки чатов → <i>Встроенный браузер</i> → Выкл',
      ok          : 'Понятно'
    },

    /* ─── Spanish ─── */
    es: {
      title       : 'Abre esta página en tu navegador',
      body        : 'Toca <b>⋯</b> en la esquina superior derecha de Telegram y elige <i>“Abrir en el navegador”</i>.',
      disable     : 'Desactivar el navegador integrado',
      disable_ios : '<b>iOS</b><br>Ajustes → Datos y almacenamiento → Otros → <i>Abrir enlaces en</i> → Safari',
      disable_and : '<b>Android</b><br>☰ Menú → Ajustes → Ajustes de chat → <i>Navegador integrado</i> → Desactivado',
      ok          : 'Entendido'
    },

    /* ─── Portuguese ─── */
    pt: {
      title       : 'Abra esta página no seu navegador',
      body        : 'Toque em <b>⋯</b> no canto superior direito do Telegram e escolha <i>“Abrir no navegador”</i>.',
      disable     : 'Desativar navegador interno',
      disable_ios : '<b>iOS</b><br>Definições → Dados e Armazenamento → Outros → <i>Abrir ligações em</i> → Safari',
      disable_and : '<b>Android</b><br>☰ Menu → Definições → Definições de chat → <i>Navegador interno</i> → Desligado',
      ok          : 'OK'
    },

    /* ─── French ─── */
    fr: {
      title       : 'Ouvrez cette page dans votre navigateur',
      body        : 'Appuyez sur <b>⋯</b> en haut à droite de Telegram puis choisissez <i>“Ouvrir dans le navigateur”</i>.',
      disable     : 'Désactiver le navigateur intégré',
      disable_ios : '<b>iOS</b><br>Réglages → Données et stockage → Autres → <i>Ouvrir les liens dans</i> → Safari',
      disable_and : '<b>Android</b><br>☰ Menu → Paramètres → Paramètres de discussion → <i>Navigateur intégré</i> → Désactivé',
      ok          : 'Compris'
    },

    /* ─── German ─── */
    de: {
      title       : 'Diese Seite im Browser öffnen',
      body        : 'Tippe oben rechts in Telegram auf <b>⋯</b> und wähle <i>„Im Browser öffnen“</i>.',
      disable     : 'In-App-Browser deaktivieren',
      disable_ios : '<b>iOS</b><br>Einstellungen → Daten & Speicher → Andere → <i>Links öffnen in</i> → Safari',
      disable_and : '<b>Android</b><br>☰ Menü → Einstellungen → Chat-Einstellungen → <i>In-App-Browser</i> → Aus',
      ok          : 'OK'
    },

    /* ─── Arabic (RTL) ─── */
    ar: {
      title       : 'افتح هذه الصفحة في متصفحك',
      body        : 'اضغط على <b>⋯</b> في أعلى يمين تيليجرام واختر <i>«فتح في المتصفح»</i>.',
      disable     : 'تعطيل المتصفح المدمج',
      disable_ios : '<b>‏iOS‏</b><br>الإعدادات ← البيانات والتخزين ← أخرى ← <i>فتح الروابط في</i> ← Safari',
      disable_and : '<b>‏Android‏</b><br>☰ القائمة ← الإعدادات ← إعدادات الدردشة ← <i>المتصفح المدمج</i> ← إيقاف',
      ok          : 'حسناً',
      dir         : 'rtl'        // <-- optional: let your renderer add dir="rtl"
    },

    /* ─── Chinese (Simplified) ─── */
    zh: {
      title       : '在浏览器中打开此页面',
      body        : '点击 Telegram 右上角的 <b>⋯</b> ，选择 <i>“在浏览器中打开”</i>。',
      disable     : '关闭内置浏览器',
      disable_ios : '<b>iOS</b><br>设置 → 数据与存储 → 其他 → <i>在以下位置打开链接</i> → Safari',
      disable_and : '<b>Android</b><br>☰ 菜单 → 设置 → 聊天设置 → <i>内置浏览器</i> → 关闭',
      ok          : '知道了'
    },

    /* ─── Hindi ─── */
    hi: {
      title       : 'इस पेज को अपने ब्राउज़र में खोलें',
      body        : 'Telegram के ऊपर-दाएँ कोने में <b>⋯</b> टैप करें और <i>“ब्राउज़र में खोलें”</i> चुनें।',
      disable     : 'इन-ऐप ब्राउज़र बंद करें',
      disable_ios : '<b>iOS</b><br>सेटिंग्स → डेटा और स्टोरेज → अन्य → <i>Open Links In</i> → Safari',
      disable_and : '<b>Android</b><br>☰ मेनू → सेटिंग्स → चैट सेटिंग्स → <i>इन-ऐप ब्राउज़र</i> → बंद',
      ok          : 'ठीक है'
    },

    /* ─── Indonesian ─── */
    id: {
      title       : 'Buka halaman ini di browser Anda',
      body        : 'Ketuk <b>⋯</b> di pojok kanan atas Telegram lalu pilih <i>“Buka di browser”</i>.',
      disable     : 'Matikan browser bawaan',
      disable_ios : '<b>iOS</b><br>Pengaturan → Data dan Penyimpanan → Lainnya → <i>Buka tautan di</i> → Safari',
      disable_and : '<b>Android</b><br>☰ Menu → Pengaturan → Pengaturan obrolan → <i>Browser bawaan</i> → Mati',
      ok          : 'Oke'
    }
  };

  const fallback = 'en';
  const langKey   = (navigator.language || '').slice(0,2).toLowerCase();
  const lang      = dict[langKey] ? langKey : fallback;

  /* ──── 3. BUILD OVERLAY ──── */
  const html = (t)=>`
  <div id="tgHint" style="position:fixed;inset:0;background:#0006;
       backdrop-filter:blur(5px);display:flex;justify-content:center;
       align-items:center;z-index:2147483647;font:16px/1.4 system-ui;">
    <div style="background:#fff;border-radius:14px;padding:26px 24px;max-width:360px;width:90%;">
      <select id="tgLang" style="float:right;margin:-6px 0 6px 0;">
        ${Object.keys(dict).map(k=>`<option value="${k}">${k.toUpperCase()}</option>`).join('')}
      </select>
      <h3 style="margin:0 0 12px">${t.title}</h3>
      <p>${t.body}</p>
      <details style="margin:12px 0">
        <summary>${t.disable}</summary>
        <p style="margin:6px 0 0">${t.disable_ios}</p>
        <p style="margin:6px 0 0">${t.disable_and}</p>
      </details>
      <button id="tgOk" style="margin-top:14px;padding:6px 12px;border:none;
          background:#0088cc;color:#fff;border-radius:6px;cursor:pointer">${t.ok}</button>
    </div>
  </div>`;

  let div;                     // overlay root

  const render = (k)=>{
    if (div) div.remove();
    const t = dict[k];
    document.body.insertAdjacentHTML('afterbegin', html(t));
    div = document.getElementById('tgHint');
    div.querySelector('#tgLang').value = k;
    div.querySelector('#tgLang').onchange = e => render(e.target.value);
    div.querySelector('#tgOk').onclick   = ()=> div.remove();
  };

  /* 4. LAUNCH right away */
  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', ()=>render(lang));
  else
    render(lang);
})();