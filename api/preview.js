export default function handler(req, res) {
  const { u, t, i } = req.query;
  const url = u? decodeURIComponent(u) : "https://shopee.com.br";
  const title = t? decodeURIComponent(t) : "Oferta Shopee";
  const img = i? decodeURIComponent(i) : "";

  // Foto proxy que o WhatsApp aceita
  const thumb = img? `https://wsrv.nl/?url=${encodeURIComponent(img)}&w=500&h=500&fit=cover` : "";

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(`
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>${title}</title>
<meta property="og:title" content="${title}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${thumb}">
<meta property="og:type" content="website">
<meta property="og:description" content="Oferta por tempo limitado">
<meta http-equiv="refresh" content="0; url=${url}">
</head>
<body>
<a href="${url}">${title}</a>
<script>window.location.href="${url}"</script>
</body>
</html>
  `);
}
