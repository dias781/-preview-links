export default function handler(req, res) {
  const u = req.query.u? decodeURIComponent(req.query.u) : 'https://shopee.com.br';
  const t = req.query.t? decodeURIComponent(req.query.t) : 'Oferta Shopee';
  let i = req.query.i? decodeURIComponent(req.query.i) : 'https://cf.shopee.com.br/file/br-11134207-7qukw-ll5f2o2q9j2c9c';

  if (i.startsWith('http')) {
    i = `https://wsrv.nl/?url=${encodeURIComponent(i)}&w=600&h=600&output=jpg`;
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.send(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>${t}</title><meta property="og:title" content="${t}"><meta property="og:description" content="Frete Grátis 20% OFF"><meta property="og:image" content="${i}"><meta property="og:image:width" content="600"><meta property="og:image:height" content="600"><meta property="og:url" content="${u}"><meta property="og:type" content="website"><meta http-equiv="refresh" content="1;url=${u}"></head><body><a href="${u}">Ver oferta</a><script>setTimeout(()=>location.href="${u}",500)</script></body></html>`);
}
