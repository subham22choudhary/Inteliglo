// src/app/sitemap.ts
import { MetadataRoute } from 'next'
import { getAllSlugs } from '@/lib/servicesData'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.inteliglo.com/'

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
    ]

    // Dynamically generate entries for all 20 service pages
    const servicePages: MetadataRoute.Sitemap = getAllSlugs().map((slug) => ({
        url: `${baseUrl}/services/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
    }))

    return [...staticPages, ...servicePages]
}