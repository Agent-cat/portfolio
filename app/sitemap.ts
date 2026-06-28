import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'

const BASE_URL = 'https://vishnumandaladev.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/work`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/resume`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]

  // Blog posts with all slides
  const blogPostEntries: MetadataRoute.Sitemap = posts.flatMap((post) => {
    const postEntries: MetadataRoute.Sitemap = []

    // Add each slide as a separate URL
    for (let i = 1; i <= post.slideCount; i++) {
      postEntries.push({
        url: `${BASE_URL}/blog/${post.slug}/${i}`,
        lastModified: new Date(post.date.split('.').reverse().join('-')),
        changeFrequency: 'weekly',
        priority: i === 1 ? 0.9 : 0.7, // First slide gets higher priority
      })
    }

    return postEntries
  })

  return [...staticPages, ...blogPostEntries]
}