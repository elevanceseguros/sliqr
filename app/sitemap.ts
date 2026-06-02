import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://sliqr.com.br'

  const posts = [
    { slug: 'como-criar-carrossel-instagram-que-vende',         date: '2025-06-08' },
    { slug: 'frequencia-postagem-instagram-pequenos-negocios',  date: '2025-06-07' },
    { slug: 'legendas-cta-carrossel-instagram',                 date: '2025-06-06' },
    { slug: 'ideias-carrossel-instagram-por-nicho',             date: '2025-06-05' },
    { slug: 'instagram-para-mei-guia-completo',                 date: '2025-06-04' },
    { slug: 'erros-carrossel-instagram-que-afastam-seguidores', date: '2025-06-03' },
    { slug: 'como-usar-ia-para-criar-conteudo-instagram',       date: '2025-06-02' },
  ]

  return [
    { url: base,               lastModified: new Date(), changeFrequency: 'weekly',  priority: 1 },
    { url: `${base}/landing`,  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/blog`,     lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/planos`,   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    ...posts.map(p => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
