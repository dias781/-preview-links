export default function handler(req, res) {
  const { u, t, i, d } = req.query;
  if (!u) return res.status(400).send('Falta ?u=LINK');
  const url = decodeURIComponent(u);
  const title = decodeURIComponent(t || 'Oferta Imperdível 🔥');
  const image = decodeURIComponent(i || '');
  const desc = decodeURIComponent(d || 'Clique para ver o preço atualizado');
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 's-maxage=86400');
  return res.send(`
<!DOCTYPE html>
<html><head>
<meta charset="utf-8">
<meta property="og:title" content="${title.replace(/"/g,'')}" />
<meta property="og:description" content="${desc.replace(/"/g,'')}" />
<meta property="og:image" content="${image}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
<meta http-equiv="refresh" content="0; url=${url}" />
<title>${title}</title>
</head>
<body>
<script>window.location.href="${url}"</script>
<a href="${url}">Redirecionando...</a>
</body></html>
  `);
}
