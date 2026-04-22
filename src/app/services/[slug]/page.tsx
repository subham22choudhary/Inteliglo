import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getServiceBySlug, getAllSlugs } from '@/lib/servicesData'
import ServicePageClient from '@/components/sections/ServicePageClient'

// Generate all 14 static routes at build time
export async function generateStaticParams() {
    return getAllSlugs().map((slug) => ({ slug }))
}

// Dynamic SEO metadata per service
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params
    const service = getServiceBySlug(slug)
    if (!service) return { title: 'Service Not Found' }

    return {
        title: `${service.name} — Inteliglo`,
        description: service.shortDesc,
        openGraph: {
            title: `${service.name} — Inteliglo`,
            description: service.shortDesc,
        },
    }
}

export default async function ServicePage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const service = getServiceBySlug(slug)
    if (!service) notFound()

    return <ServicePageClient service={service!} />
}