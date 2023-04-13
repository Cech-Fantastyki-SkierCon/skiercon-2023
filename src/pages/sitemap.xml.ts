import type { APIRoute } from 'astro'
import type { UrlsetDto } from 'src/__gen-api'
import { api } from 'src/api'

function wrapInUrlset(content: string) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${content}
</urlset>`
}

function createUrlset(page: UrlsetDto) {
  return `  <url>
    <loc>${page.url}</loc>
    <priority>${page.priority}</priority>
  </url>`
}

export const get: APIRoute = async () => {
  const pages = await api.sitemap.get().then(res => {
    return res.data.map(createUrlset).join('\n')
  })

  return new Response(wrapInUrlset(pages), {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
