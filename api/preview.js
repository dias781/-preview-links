module.exports = async (req, res) => {
  const { u = '', t = '', i = '', d = '' } = req.query;

  const safe = (str) => String(str || '').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  const title = safe(decodeURIComponent(t) || 'Oferta Imperdível');
  const desc = safe(decodeURIComponent(d) || 'Clique e garanta com desconto');
  const image = decodeURIComponent(i) || 'https://via.placeholder.com/800x800.png?text=Oferta';
  const dest = decodeURIComponent(u) || 'https://shopee.com.br';
  const cleanImage = image.split('?')[0]? image : image;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache');

  return res.send(`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>${title}</title>
<meta property="og:type" content="product">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:image" content="${cleanImage}">
<meta property="og:image:width" content="800">
<meta property="og:image:height" content="800">
<meta property="og:url" content="${safe(dest)}">
<meta property="og:site_name" content="Shopee Achados">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${desc}">
<meta name="twitter:image" content="${cleanImage}">
<meta http-equiv="refresh" content="1;url=${safe(dest)}">
</head>
<body>
<p>Redirecionando para <a href="${safe(dest)}">${title}</a>...</p>
<script>window.location.href="${safe(dest)}";</script>
</body>
</html>`);
}
