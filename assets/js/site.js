(function () {
  function cssVar(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function drawIcon(ctx, type, w, h) {
    var s = Math.min(w, h) * 1.05;
    ctx.save();
    ctx.translate(w, h);
    ctx.strokeStyle = 'rgba(255,255,255,0.92)';
    ctx.fillStyle = 'rgba(255,255,255,0.16)';
    ctx.lineWidth = Math.max(1.2, s * 0.018);
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.globalAlpha = 0.92;

    if (type === 'cartridge') {
      var cw = s * 0.62, ch = s * 0.78, x = -cw * 0.55, y = -ch * 0.95;
      roundRect(ctx, x, y, cw, ch, s * 0.05); ctx.fill(); ctx.stroke();
      roundRect(ctx, x + cw * 0.18, y - s * 0.07, cw * 0.3, s * 0.1, s * 0.02); ctx.fill();
      ctx.globalAlpha = 0.5;
      roundRect(ctx, x + cw * 0.14, y + ch * 0.22, cw * 0.72, ch * 0.32, s * 0.02); ctx.fill();
      ctx.globalAlpha = 0.3;
      for (var i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(x + cw * 0.16, y + ch * 0.66 + i * ch * 0.09);
        ctx.lineTo(x + cw * 0.84, y + ch * 0.66 + i * ch * 0.09);
        ctx.stroke();
      }
    } else if (type === 'tv') {
      var tw = s * 0.85, th = s * 0.62, tx = -tw * 0.6, ty = -th * 1.05;
      roundRect(ctx, tx, ty, tw, th, s * 0.06); ctx.fill(); ctx.stroke();
      ctx.globalAlpha = 0.7;
      ctx.beginPath();
      ctx.moveTo(tx + tw * 0.35, ty); ctx.lineTo(tx + tw * 0.15, ty - th * 0.35);
      ctx.moveTo(tx + tw * 0.65, ty); ctx.lineTo(tx + tw * 0.85, ty - th * 0.35);
      ctx.stroke();
      ctx.globalAlpha = 0.9;
      var wy = ty + th * 0.55, amp = th * 0.12;
      ctx.beginPath();
      ctx.moveTo(tx + tw * 0.12, wy);
      ctx.bezierCurveTo(tx + tw * 0.3, wy - amp, tx + tw * 0.4, wy + amp, tx + tw * 0.58, wy);
      ctx.bezierCurveTo(tx + tw * 0.76, wy - amp, tx + tw * 0.82, wy + amp, tx + tw * 0.9, wy);
      ctx.stroke();
    } else if (type === 'ticket') {
      var kw = s * 0.85, kh = s * 0.5, kx = -kw * 0.6, ky = -kh * 0.95;
      roundRect(ctx, kx, ky, kw, kh, s * 0.04); ctx.fill(); ctx.stroke();
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath(); ctx.arc(kx + kw * 0.32, ky, s * 0.05, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(kx + kw * 0.32, ky + kh, s * 0.05, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
      ctx.setLineDash([s * 0.02, s * 0.02]);
      ctx.globalAlpha = 0.6;
      ctx.beginPath(); ctx.moveTo(kx + kw * 0.32, ky + s * 0.06); ctx.lineTo(kx + kw * 0.32, ky + kh - s * 0.06); ctx.stroke();
      ctx.setLineDash([]);
    } else if (type === 'plant') {
      var pw = s * 0.5, ph = s * 0.4, px = -pw * 0.6, py = -ph * 0.5;
      ctx.beginPath();
      ctx.moveTo(px, py); ctx.lineTo(px + pw, py);
      ctx.lineTo(px + pw * 0.82, py + ph); ctx.lineTo(px + pw * 0.18, py + ph);
      ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.globalAlpha = 0.8;
      for (var j = 0; j < 3; j++) {
        var lx = px + pw * (0.25 + j * 0.25);
        ctx.beginPath();
        ctx.moveTo(lx, py);
        ctx.quadraticCurveTo(lx - pw * 0.18, py - ph * 1.1, lx, py - ph * 1.6);
        ctx.quadraticCurveTo(lx + pw * 0.18, py - ph * 1.1, lx, py);
        ctx.fill();
      }
    } else if (type === 'controller') {
      var gw = s * 0.9, gh = s * 0.45, gx = -gw * 0.6, gy = -gh * 1.0;
      ctx.beginPath();
      ctx.moveTo(gx + gw * 0.15, gy);
      ctx.quadraticCurveTo(gx, gy, gx, gy + gh * 0.5);
      ctx.quadraticCurveTo(gx, gy + gh * 1.15, gx + gw * 0.22, gy + gh * 1.1);
      ctx.quadraticCurveTo(gx + gw * 0.35, gy + gh * 0.85, gx + gw * 0.65, gy + gh * 0.85);
      ctx.quadraticCurveTo(gx + gw * 0.78, gy + gh * 1.1, gx + gw, gy + gh * 1.05);
      ctx.quadraticCurveTo(gx + gw, gy + gh * 0.5, gx + gw * 0.85, gy);
      ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.arc(gx + gw * 0.75, gy + gh * 0.35, s * 0.03, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(gx + gw * 0.85, gy + gh * 0.5, s * 0.03, 0, Math.PI * 2); ctx.fill();
      ctx.fillRect(gx + gw * 0.18, gy + gh * 0.3, s * 0.09, s * 0.03);
      ctx.fillRect(gx + gw * 0.213, gy + gh * 0.25, s * 0.03, s * 0.13);
    } else if (type === 'hourglass') {
      var hw = s * 0.4, hh = s * 0.6, hx = -hw * 0.5, hy = -hh * 0.9;
      ctx.beginPath();
      ctx.moveTo(hx, hy); ctx.lineTo(hx + hw, hy);
      ctx.lineTo(hx + hw * 0.5, hy + hh * 0.5);
      ctx.lineTo(hx + hw, hy + hh); ctx.lineTo(hx, hy + hh);
      ctx.lineTo(hx + hw * 0.5, hy + hh * 0.5);
      ctx.closePath(); ctx.fill(); ctx.stroke();
    } else if (type === 'book') {
      var bw = s * 0.62, bh = s * 0.5, bx = -bw * 0.55, by = -bh * 0.95;
      ctx.beginPath();
      ctx.moveTo(bx + bw * 0.5, by + bh * 0.1);
      ctx.lineTo(bx, by);
      ctx.lineTo(bx, by + bh);
      ctx.lineTo(bx + bw * 0.5, by + bh * 0.9);
      ctx.lineTo(bx + bw, by + bh);
      ctx.lineTo(bx + bw, by);
      ctx.closePath();
      ctx.fill(); ctx.stroke();
      ctx.globalAlpha = 0.7;
      ctx.beginPath();
      ctx.moveTo(bx + bw * 0.5, by + bh * 0.1); ctx.lineTo(bx + bw * 0.5, by + bh * 0.9);
      ctx.stroke();
      for (var k = 0; k < 2; k++) {
        ctx.beginPath();
        ctx.moveTo(bx + bw * 0.15, by + bh * (0.35 + k * 0.18));
        ctx.lineTo(bx + bw * 0.38, by + bh * (0.4 + k * 0.18));
        ctx.moveTo(bx + bw * 0.62, by + bh * (0.4 + k * 0.18));
        ctx.lineTo(bx + bw * 0.85, by + bh * (0.35 + k * 0.18));
        ctx.stroke();
      }
    } else if (type === 'calendar') {
      var aw = s * 0.6, ah = s * 0.6, ax = -aw * 0.55, ay = -ah * 0.95;
      roundRect(ctx, ax, ay, aw, ah, s * 0.04); ctx.fill(); ctx.stroke();
      ctx.globalAlpha = 0.5; ctx.fillRect(ax, ay, aw, ah * 0.22); ctx.globalAlpha = 0.9;
      ctx.beginPath();
      ctx.moveTo(ax + aw * 0.22, ay - s * 0.05); ctx.lineTo(ax + aw * 0.22, ay + s * 0.05);
      ctx.moveTo(ax + aw * 0.78, ay - s * 0.05); ctx.lineTo(ax + aw * 0.78, ay + s * 0.05);
      ctx.stroke();
      for (var r = 0; r < 3; r++) {
        for (var c = 0; c < 4; c++) {
          ctx.beginPath();
          ctx.arc(ax + aw * (0.18 + c * 0.22), ay + ah * (0.45 + r * 0.22), s * 0.018, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
    ctx.restore();
  }

  var photoCache = {};

  function applyTexture(ctx, w, h) {
    var spacing = Math.max(12, w / 34);
    for (var y = spacing / 2, row = 0; y < h; y += spacing, row++) {
      var offset = row % 2 ? spacing / 2 : 0;
      for (var x = spacing / 2 + offset; x < w; x += spacing) {
        var t = 1 - (x / w) * 0.6 - (y / h) * 0.4;
        var rr = Math.max(0, spacing * 0.1 * t);
        if (rr <= 0.2) continue;
        ctx.beginPath();
        ctx.arc(x, y, rr, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.16)';
        ctx.fill();
      }
    }
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    for (var sy = 0; sy < h; sy += 4) ctx.fillRect(0, sy, w, 1.4);
  }

  function drawPhotoCover(ctx, img, w, h) {
    var ir = img.width / img.height, cr = w / h;
    var sx = 0, sy = 0, sw = img.width, sh = img.height;
    if (ir > cr) { sw = img.height * cr; sx = (img.width - sw) / 2; }
    else { sh = img.width / cr; sy = (img.height - sh) / 2; }
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
  }

  function paintPhotoPanel(canvas, ctx, w, h, img) {
    // shown as-is: no duotone, no grain, no filtering of any kind
    drawPhotoCover(ctx, img, w, h);
  }

  function paintIllustration(canvas, ctx, w, h) {
    var from = cssVar(canvas.dataset.from) || canvas.dataset.from;
    var to = cssVar(canvas.dataset.to) || canvas.dataset.to;
    var grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, from);
    grad.addColorStop(1, to);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
    applyTexture(ctx, w, h);
    drawIcon(ctx, canvas.dataset.icon, w, h);
  }

  function paint(canvas) {
    var ctx = canvas.getContext('2d');
    var rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    var dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var w = rect.width, h = rect.height;

    var src = canvas.dataset.photo;
    if (src) {
      var cached = photoCache[src];
      if (cached && cached.complete && !cached.__failed) {
        paintPhotoPanel(canvas, ctx, w, h, cached);
      } else if (cached && cached.__failed) {
        // Already tried and failed for this src - don't hammer a dead
        // request forever, just show the gradient placeholder.
        paintIllustration(canvas, ctx, w, h);
      } else {
        var img = cached;
        if (!img) {
          // First canvas to ask for this src creates and loads the image.
          img = new Image();
          photoCache[src] = img;
          img.addEventListener('error', function onErr() {
            // A dropped connection or flaky network blip used to mean the
            // real photo never showed up at all, just the placeholder
            // forever with no second attempt. Retry once before giving up.
            if (img.__retried) {
              img.__failed = true;
              paintAll();
              return;
            }
            img.__retried = true;
            setTimeout(function () { img.src = src; }, 1500);
          });
          img.src = src;
        }
        // addEventListener, not img.onload = ..., because more than one
        // canvas can share the same src (a hero and its duplicate grid
        // card, say) - a plain property assignment only keeps the last
        // canvas's callback and silently drops every earlier one, which
        // used to leave whichever canvas asked first stuck on the
        // placeholder forever even though the image loaded fine.
        img.addEventListener('load', function () { paint(canvas); });
        paintIllustration(canvas, ctx, w, h);
      }
      return;
    }
    paintIllustration(canvas, ctx, w, h);
  }

  function paintAll() {
    document.querySelectorAll('canvas.retro-art').forEach(paint);
  }

  paintAll();
  window.addEventListener('resize', function () {
    clearTimeout(window.__retroResizeT);
    window.__retroResizeT = setTimeout(paintAll, 120);
  });
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', paintAll);
  }

  var navToggle = document.querySelector('.nav-toggle');
  var siteNav = document.getElementById('site-nav');
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function () {
      var open = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!open));
      siteNav.classList.toggle('is-open', !open);
    });
    siteNav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        navToggle.setAttribute('aria-expanded', 'false');
        siteNav.classList.remove('is-open');
      }
    });
  }
})();
