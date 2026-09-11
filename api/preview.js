module.exports = async (req, res) => {
  let { u = '', t = '', i = '', d = '' } = req.query;
  let image = decodeURIComponent(i || '');
  const dest = decodeURIComponent(u || 'https://shopee.com.br');
  const title = decodeURIComponent(t || 'Oferta Imperdível');
  const desc = decodeURIComponent(d || 'Desconto especial');

  if (!image) {
    try {
      const r = await fetch(dest, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      const html = await r.text();
      const m = html.match(/<meta property="og:image" content="([^"]+)"/);
      if (m) image = m[1];
    } catch {}
  }
  if (!image) image = 'https://cf.shopee.com.br/file/br-11134207-7r98o-lx5h5g8e5j8e3c';

  res.setHeader('Content-Type', 'text/html');
  return res.send(`<!doctype html><html><head>
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:image" content="${image}">
<meta property="og:image:width" content="800">
<meta property="og:image:height" content="800">
<meta property="og:url" content="${dest}">
<meta http-equiv="refresh" content="0;url=${dest}">
</head><body><script>window.location="${dest}"</script></body></html>`);
}
