export default function handler(req, res) {
  const u = decodeURIComponent(req.query.u || 'https://shopee.com.br');
  const t = decodeURIComponent(req.query.t || 'Oferta Shopee');
  const d = decodeURIComponent(req.query.d || 'Desconto especial');
  let i = decodeURIComponent(req.query.i || '');

  // Se a imagem vier quebrada, usa uma padrão que o WhatsApp aceita
  if (!i.startsWith('http')) {
    i = 'https://cf.shopee.com.br/file/br-11134207-7qukw-ll5f2o2q9j2c9c_tn';
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600');

  res.send(`<!DOCTYPE html>
<html><head>
<meta charset="utf-8">
<meta property="og:title" content="${t.replace(/"/g, '')}">
<meta property="og:description" content="${d.replace(/"/g, '')}">
<meta property="og:image" content="${i}">
<meta property="og:image:width" content="600">
<meta property="og:image:height" content="600">
<meta property="og:url" content="${u}">
<meta property="og:type" content="website">
<meta http-equiv="refresh" content="0;url=${u}">
</head><body><script>window.location="${u}"</script></body></html>`);
}
