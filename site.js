/* Builds the top bar and the card grids from catalog.js (shared by mekhatria.github.io, /energy/ and /anatomy/).
   <body data-cat="energy" data-page="hub|category"> tells it which page it is on. */
(function () {
  'use strict';
  const C = window.CATALOG;
  const body = document.body;
  const ROOT = C.base || '';             // '/interactive-chart' on GitHub Pages
  const PAGE = body.dataset.page;
  const params = new URLSearchParams(location.search);
  const viewing = PAGE === 'view' ? C.charts.find(c => c.id === params.get('id')) : null;
  const CUR = body.dataset.cat || (viewing ? viewing.cats[0] : '');

  const cat = id => C.categories.find(c => c.id === id);
  const esc = s => String(s).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
  const abs = h => /^https?:/.test(h) ? h : ROOT + h;
  const chartLink = ch => abs(ch.href);
  const inCat = id => C.charts.filter(ch => ch.cats.includes(id));
  const built = list => list.filter(ch => ch.status !== 'soon');

  /* ---------------- top bar ---------------- */
  function topbar() {
    const nav = document.createElement('nav');
    nav.className = 'topbar';
    nav.setAttribute('aria-label', 'Site');
    const cats = C.categories.map(c =>
      `<a href="${ROOT + c.page}" class="${c.id === CUR ? 'on' : ''}" style="--a:${c.accent}"${c.id === CUR ? ' aria-current="page"' : ''}>
         <span class="d"></span>${esc(c.name)}<span class="n">${built(inCat(c.id)).length}</span></a>`).join('');
    const groups = C.categories.map(c => `<div style="--a:${c.accent}"><h4>${esc(c.name)}</h4>${
      inCat(c.id).map(ch => ch.status === 'soon'
        ? `<span class="soon">${esc(ch.title)} <small>soon</small></span>`
        : `<a href="${chartLink(ch)}">${esc(ch.title)}${ch.status === 'draft' ? '<small>draft</small>' : ''}</a>`).join('')
    }</div>`).join('');
    nav.innerHTML = `
      <a class="brand" href="${ROOT}/"><img src="${ROOT}/assets/logo.svg" alt=""><span>Home</span></a>
      <div class="cats">${cats}</div>
      <div class="all"><button aria-expanded="false" aria-haspopup="true">All charts ▾</button><div class="menu" hidden>${groups}</div></div>`;
    body.prepend(nav);
    const btn = nav.querySelector('.all>button'), menu = nav.querySelector('.menu');
    const set = open => { menu.hidden = !open; btn.setAttribute('aria-expanded', String(open)); };
    btn.addEventListener('click', e => { e.stopPropagation(); set(menu.hidden); });
    document.addEventListener('click', e => { if (!nav.contains(e.target)) set(false); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') set(false); });
  }

  /* ---------------- cards ---------------- */
  function card(ch, here) {
    const main = cat(ch.cats[0]);
    const badges = [];
    if (ch.isNew) badges.push('<span class="b new">New</span>');
    if (ch.status === 'draft') badges.push('<span class="b draft">Draft · local only</span>');
    if (ch.status === 'soon') badges.push('<span class="b soon">Coming soon</span>');
    ch.cats.filter(id => id !== here).forEach(id => {
      const c = cat(id);
      badges.push(`<span class="b cat" style="--a:${c.accent}">${here ? 'Also in ' : ''}${esc(c.name)}</span>`);
    });
    ch.tags.forEach(t => badges.push(`<span class="b">${esc(t)}</span>`));
    const thumb = ch.thumb
      ? `<img src="${abs(ch.thumb)}" alt="" loading="lazy" width="800" height="450">`
      : `<div class="ph"><b>✦</b>Coming soon</div>`;
    const inner = `<div class="thumb" style="--a:${main.accent}">${thumb}</div>
      <div class="body"><div class="badges">${badges.join('')}</div>
      <h2>${esc(ch.title)}</h2><p class="desc">${esc(ch.desc)}</p>
      <span class="open">${ch.status === 'soon' ? 'In the works' : 'Open chart →'}</span></div>`;
    return ch.status === 'soon'
      ? `<div class="card soon">${inner}</div>`
      : `<a class="card" href="${chartLink(ch)}">${inner}</a>`;
  }
  const order = list => [...list].sort((a, b) => ({ live: 0, draft: 1, soon: 2 }[a.status] - { live: 0, draft: 1, soon: 2 }[b.status]));

  function collectionTiles(el, exclude) {
    el.innerHTML = C.categories.filter(c => c.id !== exclude).map(c => {
      const list = inCat(c.id), b = built(list), thumbs = b.filter(ch => ch.thumb).slice(0, 3);
      const pics = [0, 1, 2].map(i => thumbs[i] ? `<img src="${abs(thumbs[i].thumb)}" alt="" loading="lazy">` : `<div class="ph">${i === 0 ? 'Coming soon' : ''}</div>`).join('');
      const live = list.filter(ch => ch.status === 'live').length, draft = list.filter(ch => ch.status === 'draft').length, soon = list.filter(ch => ch.status === 'soon').length;
      const meta = [live && `${live} live`, draft && `${draft} draft`, soon && `${soon} coming soon`].filter(Boolean).join(' · ');
      return `<a class="col" href="${ROOT + c.page}" style="--a:${c.accent}"><div class="mosaic">${pics}</div>
        <div class="cb"><h2>${esc(c.title)}</h2><p>${esc(c.blurb)}</p><div class="meta">${meta} →</div></div></a>`;
    }).join('');
  }

  /* ---------------- pages ---------------- */
  topbar();

  if (PAGE === 'hub') {
    collectionTiles(document.getElementById('collections'));
  }

  if (PAGE === 'hub' && document.getElementById('grid')) {   // optional "all charts" grid (not used on the hub now)
    const grid = document.getElementById('grid'), chips = document.getElementById('chips'), q = document.getElementById('q');
    let filter = 'all';
    chips.innerHTML = `<button class="chip" data-f="all" aria-pressed="true">All <span style="color:var(--muted)">${C.charts.length}</span></button>` +
      C.categories.map(c => `<button class="chip" data-f="${c.id}" style="--a:${c.accent}" aria-pressed="false"><span class="d"></span>${esc(c.name)}</button>`).join('');
    const draw = () => {
      const t = q.value.trim().toLowerCase();
      const list = order(C.charts).filter(ch => (filter === 'all' || ch.cats.includes(filter)) &&
        (!t || (ch.title + ' ' + ch.desc + ' ' + ch.tags.join(' ') + ' ' + ch.cats.join(' ')).toLowerCase().includes(t)));
      grid.innerHTML = list.length ? list.map(ch => card(ch, null)).join('') : '<p class="empty">No chart matches that search.</p>';
    };
    chips.addEventListener('click', e => {
      const b = e.target.closest('.chip'); if (!b) return;
      filter = b.dataset.f;
      chips.querySelectorAll('.chip').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      draw();
    });
    q.addEventListener('input', draw);
    draw();
  }

  if (PAGE === 'category') {
    const c = cat(CUR);
    document.documentElement.style.setProperty('--accent', c.accent);
    document.getElementById('title').textContent = c.title;
    document.getElementById('lede').textContent = c.blurb;
    document.getElementById('grid').innerHTML = order(inCat(CUR)).map(ch => card(ch, CUR)).join('');
    collectionTiles(document.getElementById('others'), CUR);
  }

  if (PAGE === 'view') {
    if (!viewing || !viewing.href) { document.body.insertAdjacentHTML('beforeend', '<p class="empty" style="padding:40px">Chart not found.</p>'); return; }
    document.title = viewing.title;
    const f = document.createElement('iframe');
    f.className = 'viewer';
    f.title = viewing.title;
    f.src = abs(viewing.href);
    document.body.appendChild(f);
  }
})();
