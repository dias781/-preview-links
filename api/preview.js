module.exports = async (req, res) => {
  const { u = '', t = '', i = '', d = '' } = req.query;

  const safe = (str) => String(str || '').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  let image = decodeURIComponent(i || '');
  const dest = decodeURIComponent(u || 'https://shopee.com.br');
  const title = safe(decodeURIComponent(t) || 'Oferta Imperdível Shopee');
  const desc = safe(decodeURIComponent(d) || 'Clique e garanta com desconto');

  // Se não veio imagem, tenta pegar da Shopee automaticamente
  if (!image || image.length < 10) {
    try {
      const r = await fetch(dest, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      const html = await r.text();
      const m = html.match(/<meta property="og:image" content="([^"]+)"/);
      if (m && m[1]) image = m[1];
    } catch (e) {}
  }

  if (!image) image = 'https://down-br.img.susercontent.com/file/br-11134207-7r98o-lx5h5g8e5j8e3c';

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-store');

  return res.send(`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>${title}</title>
<meta property="og:type" content="website">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:image" content="${image}">
<meta property="og:image:secure_url" content="${image}">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="800">
<meta property="og:image:height" content="800">
<meta property="og:url" content="${safe(dest)}">
<meta property="og:site_name" content="Shopee">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${image}">
<meta http-equiv="refresh" content="0;url=${safe(dest)}">
</head>
<body>
<img src="${image}" style="display:none">
<script>location.href="${safe(dest)}"</script>
</body>
</html>`);
}
