/* かんたん更新システム（デモ版）
   editor.html で保存した内容を ?preview 付きURLで反映する。
   納品版では localStorage の代わりに Google スプレッドシート等から
   取得し、全訪問者に反映される。 */
(function () {
  const KEY = 'sample-cms-content';
  let ov = {};
  try { ov = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) {}
  const preview = new URLSearchParams(location.search).has('preview');
  if (!preview) return;

  document.querySelectorAll('[data-cms]').forEach(el => {
    const v = ov[el.getAttribute('data-cms')];
    if (v != null && v !== '') el.textContent = v;
  });

  const bar = document.createElement('a');
  bar.href = 'editor.html';
  bar.textContent = 'プレビュー表示中（この端末のみ）— 編集画面へ戻る';
  bar.style.cssText = 'position:fixed;left:16px;bottom:16px;z-index:200;background:#3D4A3B;color:#fff;padding:10px 18px;font-size:12px;letter-spacing:.06em;border-radius:999px;box-shadow:0 8px 24px rgba(0,0,0,.3);text-decoration:none;font-family:sans-serif';
  const mq = window.matchMedia('(max-width: 960px)');
  const place = () => { bar.style.bottom = mq.matches ? '64px' : '16px'; };
  mq.addEventListener ? mq.addEventListener('change', place) : null;
  place();
  document.body.appendChild(bar);
})();
