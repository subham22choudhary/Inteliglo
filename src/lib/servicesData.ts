export type ServiceData = {
    slug: string
    num: string
    name: string
    tag: string
    tagline: string
    shortDesc: string
    overview: string
    features: { title: string; desc: string }[]
    process: { step: string; title: string; desc: string }[]
    results: { num: string; label: string }[]
    techStack?: string[]
    faqs: { q: string; a: string }[]
}

export const services: ServiceData[] = [
    // ─── 01 ───
    {
        slug: 'website-development',
        num: '01',
        name: 'Website Development',
        tag: 'Core Service',
        tagline: 'Engineered for Speed. Built to Convert.',
        shortDesc: 'Custom, responsive websites and web apps built with Next.js, React, and modern stacks.',
        overview:
            'We build websites that are more than digital brochures — they are precision-engineered growth machines. From lightning-fast landing pages to complex multi-tenant SaaS platforms, every line of code we write is driven by performance, accessibility, and conversion. Our stack is modern, our process is agile, and our outputs are pixel-perfect.',
        features: [
            { title: 'Next.js & React Development', desc: 'Server-side rendering, static generation, and edge functions for the fastest possible load times and SEO scores.' },
            { title: 'Responsive UI/UX Design', desc: 'Mobile-first, fluid layouts that look flawless on every screen — from 320px to 4K.' },
            { title: 'CMS Integration', desc: 'Headless CMS setups with Sanity, Contentful, or Strapi so your team can update content without touching code.' },
            { title: 'E-commerce Development', desc: 'Shopify, WooCommerce, or fully custom storefronts with seamless payment gateway integration.' },
            { title: 'API & Third-party Integration', desc: 'Connect your website to any CRM, ERP, payment system, or analytics platform via REST or GraphQL.' },
            { title: 'Performance Optimization', desc: 'Core Web Vitals tuning, lazy loading, image optimization, and CDN setup for sub-2s load times.' },
        ],
        process: [
            { step: '01', title: 'Discovery Call', desc: 'We understand your business goals, target audience, competitors, and technical requirements.' },
            { step: '02', title: 'Wireframing & Design', desc: 'Figma prototypes with your brand colors and typography, iterated until perfect.' },
            { step: '03', title: 'Development Sprint', desc: 'Agile 2-week sprints with daily standups and staging previews after each sprint.' },
            { step: '04', title: 'QA & Testing', desc: 'Cross-browser, cross-device testing, accessibility audit, and performance benchmarking.' },
            { step: '05', title: 'Launch & Handover', desc: 'Deployment, DNS setup, monitoring configuration, and full documentation handover.' },
        ],
        results: [
            { num: '2.1s', label: 'Avg Load Time' },
            { num: '98+', label: 'Lighthouse Score' },
            { num: '3.4×', label: 'Conv. Rate Lift' },
            { num: '100%', label: 'Mobile Responsive' },
        ],
        techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Vercel', 'Figma', 'Shopify'],
        faqs: [
            { q: 'How long does a website take to build?', a: 'A standard 5-page business website takes 2–3 weeks. Complex web apps or e-commerce stores take 6–12 weeks depending on scope.' },
            { q: 'Do you provide website maintenance after launch?', a: 'Yes. We offer monthly maintenance retainers covering updates, security patches, uptime monitoring, and content edits.' },
            { q: 'Can you redesign my existing website?', a: 'Absolutely. We handle full redesigns while preserving your existing SEO rankings and content structure.' },
        ],
    },
    // ─── 02 ───
    {
        slug: 'graphic-design-branding',
        num: '02',
        name: 'Graphic Design & Branding',
        tag: 'Creative',
        tagline: 'Your Brand Is the First Impression. Make It Unforgettable.',
        shortDesc: 'Brand identity systems, visual design, UI/UX, and creatives that make your brand impossible to ignore.',
        overview:
            'A great brand isn\'t just a logo — it\'s a complete visual language that communicates your values before a word is read. We craft cohesive brand identity systems, design stunning marketing creatives, and build UI/UX designs that are both beautiful and functional. From your first brand guidelines to your thousandth social post, every pixel is intentional.',
        features: [
            { title: 'Brand Identity Design', desc: 'Logo design, color systems, typography, and brand guidelines that create a consistent, memorable identity.' },
            { title: 'Marketing Creatives', desc: 'Social media graphics, ad creatives, banners, and promotional materials for every platform and format.' },
            { title: 'UI/UX Design', desc: 'User interface design for websites and apps — wireframes, prototypes, and final Figma designs.' },
            { title: 'Pitch Decks & Presentations', desc: 'Investor-grade pitch decks and client presentations that communicate your story with visual impact.' },
            { title: 'Print & Packaging Design', desc: 'Business cards, brochures, packaging, signage, and all offline brand touchpoints.' },
            { title: 'Brand Refresh', desc: 'Evolving an existing brand — modernizing without losing recognition — for companies at a growth inflection point.' },
        ],
        process: [
            { step: '01', title: 'Brand Discovery', desc: 'Deep workshop on your values, audience, competitors, and visual preferences.' },
            { step: '02', title: 'Concept Development', desc: '3 distinct creative directions presented for feedback and direction selection.' },
            { step: '03', title: 'Design Refinement', desc: 'Chosen concept refined across 2 revision rounds until perfect.' },
            { step: '04', title: 'Brand Guidelines', desc: 'Full brand manual covering usage rules, color codes, typography, and do\'s/don\'ts.' },
            { step: '05', title: 'Asset Delivery', desc: 'Final files in all formats: SVG, PNG, PDF, Figma source, and print-ready.' },
        ],
        results: [
            { num: '3', label: 'Initial Concepts' },
            { num: '14d', label: 'Brand Identity Turnaround' },
            { num: '∞', label: 'File Formats Delivered' },
            { num: '100%', label: 'Brand Consistency' },
        ],
        faqs: [
            { q: 'What files will I receive at the end?', a: 'You receive all source files (Figma, AI, PSD), plus export-ready formats: SVG, PNG, PDF, and JPEG in all required sizes.' },
            { q: 'Can you design just a logo without a full brand package?', a: 'Yes. We offer standalone logo design, though we always recommend at least a basic brand guidelines document to ensure consistent usage.' },
            { q: 'How many revision rounds are included?', a: 'Two full revision rounds are included in every project. Additional revisions are billed at an hourly rate.' },
        ],
    },
    // ─── 03 ───
    {
        slug: 'video-creation',
        num: '03',
        name: 'Video Creation',
        tag: 'Media',
        tagline: 'Stories That Stop Thumbs and Start Conversations.',
        shortDesc: 'Brand films, product demos, reels, explainers, and motion graphics that command attention and drive action.',
        overview:
            'Video is the highest-engagement format on every platform — and it\'s only getting more dominant. We produce videos that serve a purpose: brand films that make investors want to fund you, product demos that make customers want to buy, reels that make the algorithm want to amplify you, and explainers that make complex ideas feel simple. Every frame is intentional.',
        features: [
            { title: 'Brand Films & Corporate Videos', desc: 'High-production brand stories that communicate your values, culture, and vision to customers and investors.' },
            { title: 'Product Demo Videos', desc: 'Walkthrough videos that show exactly how your product works and why it\'s the best choice.' },
            { title: 'Reels & Short-Form Video', desc: 'Instagram Reels, YouTube Shorts, and TikToks crafted for maximum reach and virality.' },
            { title: 'Explainer & Whiteboard Animation', desc: '2D animated explainers that simplify complex products, services, or concepts in 60–90 seconds.' },
            { title: 'Motion Graphics & Intros', desc: 'Logo animations, lower thirds, transitions, and branded motion templates for consistent video output.' },
            { title: 'Testimonial & UGC Video', desc: 'Customer testimonial videos and user-generated content campaigns that build social proof at scale.' },
        ],
        process: [
            { step: '01', title: 'Creative Brief', desc: 'Define objective, audience, tone, platform, and key message for every video.' },
            { step: '02', title: 'Script & Storyboard', desc: 'Written script and visual storyboard approved before any production begins.' },
            { step: '03', title: 'Production', desc: 'Filming, voiceover recording, animation, and motion graphics creation.' },
            { step: '04', title: 'Post-production', desc: 'Editing, color grading, sound design, and motion graphics assembly.' },
            { step: '05', title: 'Delivery & Optimization', desc: 'Exported in all platform-optimized formats with captions and thumbnail design.' },
        ],
        results: [
            { num: '12×', label: 'More Shares Than Static' },
            { num: '80%', label: 'Message Retention' },
            { num: '48h', label: 'Reel Turnaround' },
            { num: '4K', label: 'Max Resolution' },
        ],
        faqs: [
            { q: 'Do you handle filming or just editing?', a: 'Both. We can shoot on-location or remotely direct your team for self-shot footage. We also do fully animated explainers that require no filming.' },
            { q: 'What formats do you deliver videos in?', a: 'MP4 (H.264/H.265) optimized for each platform — Instagram (9:16), YouTube (16:9), LinkedIn (1:1), and web-optimized versions.' },
            { q: 'How long does a brand video take?', a: 'A 60–90 second brand film typically takes 3–4 weeks from brief to final delivery. Reels and short-form content can be turned around in 48–72 hours.' },
        ],
    },
    // ─── 04 ───
    {
        slug: 'social-media-marketing',
        num: '04',
        name: 'Social Media Marketing',
        tag: 'Growth',
        tagline: 'Every Platform. Every Post. Maximum Impact.',
        shortDesc: 'End-to-end management across Instagram, Facebook, LinkedIn, X, YouTube, and more.',
        overview:
            'Social media is where brands are built and communities are formed. We manage your entire social presence — from strategy and content creation to scheduling, community management, and growth analytics. We don\'t post for the sake of posting; every piece of content is designed with a goal: reach, engagement, or conversion.',
        features: [
            { title: 'Multi-Platform Management', desc: 'Instagram, Facebook, LinkedIn, X (Twitter), YouTube, Pinterest, and Threads — one team, all platforms.' },
            { title: 'Content Calendar & Strategy', desc: 'Monthly content plans aligned with your brand voice, audience behavior, and trending topics.' },
            { title: 'Creative Content Production', desc: 'Reels, carousels, stories, infographics, and short-form videos designed in-house by our creative team.' },
            { title: 'Community Management', desc: 'Responding to comments, DMs, and mentions within hours to build genuine audience relationships.' },
            { title: 'Growth Hacking', desc: 'Hashtag research, collaboration strategies, and algorithm-optimized posting schedules for organic reach.' },
            { title: 'Analytics & Reporting', desc: 'Monthly reports covering reach, engagement, follower growth, top content, and actionable insights.' },
        ],
        process: [
            { step: '01', title: 'Brand Audit', desc: 'We audit your existing profiles, competitor positioning, and audience demographics.' },
            { step: '02', title: 'Strategy Development', desc: 'Platform-specific strategies with content pillars, tone of voice, and KPI targets.' },
            { step: '03', title: 'Content Production', desc: 'Monthly batch creation of all visual and written content for your approval.' },
            { step: '04', title: 'Scheduling & Publishing', desc: 'Optimized publishing times per platform using data-backed scheduling tools.' },
            { step: '05', title: 'Monitor & Optimize', desc: 'Weekly performance checks and monthly strategy reviews to continually improve results.' },
        ],
        results: [
            { num: '4.2×', label: 'Avg Reach Growth' },
            { num: '68%', label: 'Engagement Rate Lift' },
            { num: '30d', label: 'First Results' },
            { num: '6', label: 'Platforms Covered' },
        ],
        faqs: [
            { q: 'How many posts per week do you create?', a: 'Depending on your plan: 3–5 posts per week per platform. Reels and stories are additional deliverables.' },
            { q: 'Do you handle paid social campaigns too?', a: 'Organic SMM and paid ads are separate services. We offer both and recommend combining them for best results.' },
            { q: 'Can I review content before it goes live?', a: 'Yes. All content is submitted for your approval at least 3 days before the scheduled publish date.' },
        ],
    },
    // ─── 05 ───
    {
        slug: 'sales-channel-building',
        num: '05',
        name: 'Sales Channel Building',
        tag: 'Revenue',
        tagline: 'Build the Pipeline. Automate the Revenue.',
        shortDesc: 'E-commerce stores, marketplace setups, CRM integration, and automated sales pipelines built end-to-end.',
        overview:
            'A great product with a broken sales channel is a wasted opportunity. We architect the complete revenue infrastructure for your business — from storefront to checkout to CRM to follow-up automation. Whether you\'re selling D2C, B2B, or through marketplaces, we build the systems that fill your pipeline and close deals while you sleep.',
        features: [
            { title: 'E-commerce Store Setup', desc: 'Shopify, WooCommerce, or custom storefronts configured for maximum conversion with optimized checkout flows.' },
            { title: 'Marketplace Integration', desc: 'Amazon, Flipkart, Meesho, and other marketplace onboarding with catalog management and order sync.' },
            { title: 'CRM Setup & Integration', desc: 'HubSpot, Zoho, or Salesforce configuration with custom pipelines, automation rules, and reporting.' },
            { title: 'Lead Generation Funnels', desc: 'Landing pages + lead magnets + email sequences that fill your CRM with qualified prospects automatically.' },
            { title: 'Payment Gateway Integration', desc: 'Razorpay, Stripe, PayU, and other payment gateways integrated with subscription and one-time payment support.' },
            { title: 'Sales Automation', desc: 'Automated follow-ups, drip sequences, deal stage triggers, and task assignments to keep deals moving.' },
        ],
        process: [
            { step: '01', title: 'Revenue Mapping', desc: 'Map your current and ideal sales flow from first touch to closed deal.' },
            { step: '02', title: 'Platform Selection', desc: 'Choose the right stack for your business model, team size, and growth stage.' },
            { step: '03', title: 'Build & Integrate', desc: 'Set up every tool, integrate them together, and test end-to-end transaction flows.' },
            { step: '04', title: 'Automation Setup', desc: 'Configure all automated workflows, triggers, and follow-up sequences.' },
            { step: '05', title: 'Team Training', desc: 'Hands-on training for your sales and ops team on every tool in the new stack.' },
        ],
        results: [
            { num: '62%', label: 'Pipeline Growth' },
            { num: '3×', label: 'Follow-up Speed' },
            { num: '21d', label: 'Full Setup Time' },
            { num: '24/7', label: 'Automated Selling' },
        ],
        faqs: [
            { q: 'Which CRM do you recommend?', a: 'For most SMBs we recommend HubSpot (free tier is excellent). For larger teams with complex pipelines, we evaluate Salesforce or Zoho based on specific needs.' },
            { q: 'Can you migrate our existing data to a new CRM?', a: 'Yes. We handle full CRM migrations including contacts, deals, notes, and activity history with zero data loss.' },
            { q: 'Do you also train our sales team?', a: 'Yes. Every project includes a training session. We also create Loom walkthroughs and documentation for onboarding new team members.' },
        ],
    },
    // ─── 06 ───
    {
        slug: 'ai-chatbot-development',
        num: '06',
        name: 'AI Chatbot Development',
        tag: 'AI',
        tagline: 'Your Best Sales Rep. Never Sleeps. Never Has a Bad Day.',
        shortDesc: 'Custom AI chatbots trained on your business data to automate support, qualify leads, and drive engagement 24/7.',
        overview:
            'AI chatbots are no longer gimmicks — they\'re mission-critical infrastructure for businesses that want to scale without scaling headcount. We build custom AI chatbots trained on your specific business data, integrated into your website, WhatsApp, and CRM, capable of handling support queries, qualifying leads, booking appointments, and answering product questions with human-level accuracy.',
        features: [
            { title: 'RAG-Powered Custom Chatbots', desc: 'Retrieval-Augmented Generation bots trained on your docs, FAQs, pricing, and product data for accurate, contextual answers.' },
            { title: 'Lead Qualification Bots', desc: 'Conversational flows that qualify visitors, collect contact info, and route hot leads directly to your sales team.' },
            { title: 'WhatsApp & Omnichannel Bots', desc: 'Deploy your AI assistant on WhatsApp Business, website widget, and Facebook Messenger simultaneously.' },
            { title: 'Appointment Booking Integration', desc: 'Calendar-connected bots that handle scheduling, reminders, and rescheduling without human intervention.' },
            { title: 'Multilingual Support', desc: 'Bots that can converse fluently in English, Hindi, and other regional languages based on user preference.' },
            { title: 'CRM & Helpdesk Integration', desc: 'Seamless handoff to human agents with full conversation context pushed to your CRM or support platform.' },
        ],
        process: [
            { step: '01', title: 'Use Case Definition', desc: 'Define exactly what your bot needs to handle — support, sales, booking, or hybrid.' },
            { step: '02', title: 'Knowledge Base Build', desc: 'Collect and structure all your docs, FAQs, and data into the bot\'s knowledge system.' },
            { step: '03', title: 'Bot Development', desc: 'Build, train, and test the bot across dozens of real conversation scenarios.' },
            { step: '04', title: 'Integration & Deployment', desc: 'Deploy to your website, WhatsApp, or other channels with full CRM integration.' },
            { step: '05', title: 'Monitor & Improve', desc: 'Monthly review of conversation logs to identify gaps and continuously improve accuracy.' },
        ],
        results: [
            { num: '80%', label: 'Queries Automated' },
            { num: '24/7', label: 'Availability' },
            { num: '3s', label: 'Avg Response Time' },
            { num: '4.8★', label: 'User Satisfaction' },
        ],
        faqs: [
            { q: 'Which AI model do you use?', a: 'We primarily build on GPT-4o and Claude, depending on the use case. All models are accessed via API — your data is never used for training.' },
            { q: 'Can the bot handle multiple languages?', a: 'Yes. We can configure multilingual bots that auto-detect language and respond accordingly — English, Hindi, and more.' },
            { q: 'What happens when the bot can\'t answer something?', a: 'We build graceful fallback flows — the bot acknowledges the limit, collects the user\'s question, and routes it to a human agent or ticketing system.' },
        ],
    },
    // ─── 07 ───
    {
        slug: 'whatsapp-marketing',
        num: '07',
        name: 'WhatsApp Marketing',
        tag: 'Engagement',
        tagline: '98% Open Rate. Zero Guesswork. Direct to Pocket.',
        shortDesc: 'Broadcast campaigns, automated drips, and conversational marketing on WhatsApp — the channel your audience actually reads.',
        overview:
            'WhatsApp has a 98% message open rate — nothing else comes close. We build end-to-end WhatsApp marketing systems for businesses: from bulk broadcast campaigns and drip sequences to interactive chatbot flows and transactional notifications. Using the official WhatsApp Business API, we help you reach customers where they are most responsive, most personal, and most likely to convert.',
        features: [
            { title: 'WhatsApp Business API Setup', desc: 'Official Meta-approved API integration with your phone number, verified business profile, and message templates.' },
            { title: 'Broadcast Campaign Management', desc: 'Segmented bulk messaging campaigns to opted-in contacts with rich media — images, videos, PDFs, and CTAs.' },
            { title: 'Drip & Nurture Sequences', desc: 'Time-triggered or behavior-triggered automated message flows that warm up leads and guide them to purchase.' },
            { title: 'Transactional Notifications', desc: 'Order confirmations, shipping updates, appointment reminders, and OTPs delivered via WhatsApp for higher open rates.' },
            { title: 'Click-to-WhatsApp Ads', desc: 'Meta ad campaigns that drive users directly into a WhatsApp conversation — no landing page friction.' },
            { title: 'Analytics & Opt-out Management', desc: 'Delivery, read, and reply rate tracking with compliant opt-out management to maintain list health.' },
        ],
        process: [
            { step: '01', title: 'API Setup & Verification', desc: 'Register your WhatsApp Business API number and get Meta-approved message templates.' },
            { step: '02', title: 'List Building Strategy', desc: 'Design opt-in flows across your website, social media, and ads to grow a compliant contact list.' },
            { step: '03', title: 'Campaign Design', desc: 'Write message sequences, create rich media assets, and map automation trigger logic.' },
            { step: '04', title: 'Launch & Monitor', desc: 'Send campaigns, monitor delivery and reply rates, and handle responses promptly.' },
            { step: '05', title: 'Optimize & Scale', desc: 'A/B test message copy, sending times, and CTAs to continuously lift conversion rates.' },
        ],
        results: [
            { num: '98%', label: 'Avg Open Rate' },
            { num: '45%', label: 'Click-Through Rate' },
            { num: '3×', label: 'vs Email Conversion' },
            { num: '24h', label: 'Campaign Launch' },
        ],
        faqs: [
            { q: 'Is this the official WhatsApp API or a grey-market tool?', a: 'We only use the official Meta WhatsApp Business API. Grey-market bulk senders risk permanent number bans. We keep you compliant and safe.' },
            { q: 'Can we send to any number or only opted-in contacts?', a: 'Only opted-in contacts. WhatsApp requires explicit opt-in consent. We help you build compliant opt-in flows across all your channels.' },
            { q: 'What types of messages can we send?', a: 'Two categories: Template Messages (pre-approved for outbound broadcasts) and Session Messages (free-form replies within a 24-hour window after user interaction).' },
        ],
    },
    // ─── 08 ───
    {
        slug: 'ai-automated-sales-team',
        num: '08',
        name: 'AI Automated Sales Team',
        tag: 'AI Sales',
        tagline: 'A Full Sales Team. Zero Payroll. 25% Conversion Rate.',
        shortDesc: 'AI-powered sales automation that prospects, qualifies, follows up, and closes — with zero human dependency and a proven 25% conversion rate.',
        overview:
            'Hiring, training, and managing a sales team is expensive, slow, and unpredictable. Our AI Automated Sales Team replaces the entire top-to-mid funnel with intelligent automation: AI agents that prospect leads, send hyper-personalized outreach, handle objections via conversational flows, follow up relentlessly across channels, and hand off only the hottest, sales-ready leads to a human closer — or close them autonomously. Proven 25% conversion rate on qualified leads.',
        features: [
            { title: 'AI Lead Prospecting', desc: 'Automated prospect identification and enrichment using AI — pulling firmographic, technographic, and behavioral signals to build targeted lead lists without manual research.' },
            { title: 'Hyper-Personalized Outreach', desc: 'AI-generated personalized emails, WhatsApp messages, and LinkedIn DMs at scale — each tailored to the prospect\'s company, role, and pain points.' },
            { title: 'Multi-Channel Follow-up Sequences', desc: 'Automated follow-up across email, WhatsApp, and SMS with intelligent timing — the AI knows when to push, when to pause, and when to pivot the message.' },
            { title: 'Objection Handling Flows', desc: 'Conversational AI trained on your sales playbook handles common objections — pricing, timing, competitor comparisons — and keeps the conversation moving forward.' },
            { title: 'Lead Scoring & Hot-Lead Routing', desc: 'Real-time lead scoring based on engagement signals. Hot leads are instantly routed to human closers or booked directly into calendars.' },
            { title: 'CRM Sync & Pipeline Automation', desc: 'Every interaction is logged, every deal stage is updated automatically — your CRM stays current without any manual data entry.' },
        ],
        process: [
            { step: '01', title: 'Sales Process Mapping', desc: 'Document your ideal customer profile, sales stages, objections, and current conversion benchmarks.' },
            { step: '02', title: 'AI Agent Training', desc: 'Train the AI on your product, pricing, case studies, objection responses, and brand voice.' },
            { step: '03', title: 'Sequence & Flow Build', desc: 'Build all outreach sequences, follow-up flows, and objection-handling branches.' },
            { step: '04', title: 'CRM Integration & Testing', desc: 'Connect to your CRM, run end-to-end test cycles, and validate lead routing and data accuracy.' },
            { step: '05', title: 'Launch & Optimize', desc: 'Go live, monitor conversion rates at each stage, and iterate on messaging for continuous improvement.' },
        ],
        results: [
            { num: '25%', label: 'Conversion Rate' },
            { num: '0', label: 'Human Dependency' },
            { num: '10×', label: 'Outreach Volume' },
            { num: '24/7', label: 'Always Prospecting' },
        ],
        techStack: ['GPT-4o', 'Make.com', 'HubSpot', 'Apollo.io', 'WhatsApp API', 'Instantly', 'Clay'],
        faqs: [
            { q: 'Does this completely replace a human sales team?', a: 'It replaces the top and mid funnel entirely — prospecting, outreach, follow-up, and qualification. For complex enterprise deals, it hands off to a human closer with full context. Many clients eliminate 3–5 SDR roles.' },
            { q: 'How is the 25% conversion rate measured?', a: 'That\'s conversion from qualified lead to booked discovery call. It\'s measured on opt-in leads who match your ICP — not cold scrapes. Your ICP definition and offer quality directly affect this number.' },
            { q: 'How long does setup take?', a: 'Full system setup, training, and testing takes 3–4 weeks. We run parallel test campaigns before going fully live to validate message quality and conversion rates.' },
        ],
    },
    // ─── 09 ───
    {
        slug: 'ai-automated-customer-support',
        num: '09',
        name: 'AI Automated Customer Support',
        tag: 'AI Support',
        tagline: 'Instant Answers. Zero Wait Time. No Human Required.',
        shortDesc: 'AI-powered customer support that resolves tickets, answers queries, and delights customers — autonomously, at any scale.',
        overview:
            'Customer support is a cost center that never sleeps — unless you automate it. Our AI Automated Customer Support system handles the full spectrum of support interactions: answering product questions, processing refunds, tracking orders, troubleshooting issues, and escalating complex cases — all without a single human agent involved. We train the AI on your complete knowledge base, policies, and support history so it responds with accuracy, empathy, and brand consistency at any volume.',
        features: [
            { title: 'Full Knowledge Base AI Training', desc: 'The AI is trained on your entire product documentation, FAQs, policies, past tickets, and support playbooks for accurate, contextual responses.' },
            { title: 'Omnichannel Support Deployment', desc: 'Deploy the AI support agent on website chat, WhatsApp, email, Instagram DMs, and Telegram — one brain, everywhere.' },
            { title: 'Ticket Auto-Resolution', desc: 'Classifies, prioritizes, and resolves support tickets autonomously — refunds, order status, password resets, and policy queries handled end-to-end.' },
            { title: 'Smart Human Escalation', desc: 'The AI recognizes complex, sensitive, or high-value tickets and escalates with full context and conversation history to a human agent instantly.' },
            { title: 'Sentiment Analysis & CSAT Tracking', desc: 'Real-time sentiment monitoring across all conversations with automatic CSAT surveys and satisfaction trend reporting.' },
            { title: 'Continuous Self-Learning', desc: 'Every unresolved query and human escalation feeds back into the AI\'s training, making it smarter and more capable over time.' },
        ],
        process: [
            { step: '01', title: 'Support Audit', desc: 'Analyze your top 100 support tickets to identify the highest-volume query categories.' },
            { step: '02', title: 'Knowledge Base Build', desc: 'Ingest all your docs, FAQs, product data, and policies into the AI\'s knowledge system.' },
            { step: '03', title: 'Response Flow Design', desc: 'Build response templates, escalation triggers, and tone guidelines aligned with your brand voice.' },
            { step: '04', title: 'Integration & Testing', desc: 'Connect to your helpdesk (Freshdesk, Zendesk, Intercom) and run 200+ test conversations.' },
            { step: '05', title: 'Launch & Retrain', desc: 'Go live with monitoring, then monthly retraining sessions to keep the AI sharp.' },
        ],
        results: [
            { num: '85%', label: 'Tickets Auto-Resolved' },
            { num: '<3s', label: 'First Response Time' },
            { num: '0', label: 'Human Agents Required' },
            { num: '4.9★', label: 'Avg CSAT Score' },
        ],
        techStack: ['Claude API', 'GPT-4o', 'Zendesk', 'Freshdesk', 'Intercom', 'WhatsApp API', 'Pinecone'],
        faqs: [
            { q: 'What happens when a customer asks something the AI doesn\'t know?', a: 'The AI gracefully acknowledges the gap, collects the question, and escalates to a human with full conversation context. This also triggers a retraining flag for that knowledge gap.' },
            { q: 'Can this integrate with our existing helpdesk?', a: 'Yes. We integrate with Zendesk, Freshdesk, Intercom, Gorgias, and most major helpdesk platforms. We can also build a lightweight custom helpdesk if needed.' },
            { q: 'How accurate is the AI on the first day?', a: 'Typically 75–80% accuracy on day one after knowledge base training. This improves to 90%+ within the first 4 weeks as the AI learns from real interactions.' },
        ],
    },
    // ─── 10 ───
    {
        slug: 'ai-calling',
        num: '10',
        name: 'AI Calling',
        tag: 'Voice AI',
        tagline: 'Calls That Sound Human. Scale That Isn\'t.',
        shortDesc: 'AI voice agents that make and receive calls for sales, support, reminders, and follow-ups — indistinguishable from a human rep.',
        overview:
            'Phone calls convert at 8× the rate of emails — but hiring and managing a calling team is expensive and unpredictable. Our AI Calling solution deploys voice AI agents that handle outbound prospecting calls, inbound customer support, appointment reminders, payment follow-ups, and post-purchase check-ins. These agents speak naturally, handle objections, understand intent, adapt their tone in real time, and seamlessly transfer to a human when needed. All calls are recorded, transcribed, and synced to your CRM automatically.',
        features: [
            { title: 'Outbound AI Sales Calls', desc: 'AI agents that cold-call or warm-call your prospect lists, deliver personalized pitches, handle objections, and book discovery calls autonomously.' },
            { title: 'Inbound AI Support Calls', desc: 'AI receives inbound calls, answers product and support questions, processes requests, and escalates complex issues — no hold music, no queues.' },
            { title: 'Appointment Reminders & Confirmations', desc: 'Automated reminder calls that reduce no-shows by 60% — AI confirms, reschedules, or cancels appointments conversationally.' },
            { title: 'Payment Follow-up Calls', desc: 'Polite, persistent AI calls for overdue invoice follow-ups and payment reminders that recover revenue without awkward human conversations.' },
            { title: 'Post-Purchase Check-in Calls', desc: 'Automated satisfaction check-in calls after purchase that gather feedback, upsell relevant products, and flag churn risks.' },
            { title: 'Full Call Recording, Transcription & CRM Sync', desc: 'Every call is recorded, transcribed with speaker separation, summarized by AI, and pushed to your CRM with outcome tags and next-step tasks.' },
        ],
        process: [
            { step: '01', title: 'Use Case Definition', desc: 'Define call type (inbound/outbound), target audience, objectives, and success metrics.' },
            { step: '02', title: 'Script & Persona Design', desc: 'Write call scripts, objection trees, and design the AI agent\'s voice, name, and personality.' },
            { step: '03', title: 'Voice Agent Build & Training', desc: 'Train the AI on your scripts, product knowledge, and brand tone using our voice AI platform.' },
            { step: '04', title: 'Phone Number Setup & CRM Integration', desc: 'Configure dedicated numbers, connect to your CRM, and set up call routing rules.' },
            { step: '05', title: 'Test Calls & Go Live', desc: 'Run 50+ internal test calls across scenarios, then launch with live monitoring for the first week.' },
        ],
        results: [
            { num: '8×', label: 'vs Email Conversion' },
            { num: '60%', label: 'Fewer No-Shows' },
            { num: '∞', label: 'Concurrent Calls' },
            { num: '100%', label: 'Calls Transcribed' },
        ],
        techStack: ['ElevenLabs', 'Vapi', 'Twilio', 'Retell AI', 'HubSpot', 'Whisper', 'GPT-4o'],
        faqs: [
            { q: 'Can customers tell they\'re speaking to an AI?', a: 'Modern voice AI is nearly indistinguishable from a human in most conversations. We always comply with local disclosure laws — in some regions, the AI introduces itself as an AI assistant at the start of the call.' },
            { q: 'What languages does the AI call agent support?', a: 'English and Hindi are fully supported. We can deploy agents in other Indian regional languages and several international languages depending on the voice AI platform used.' },
            { q: 'How does it handle situations it can\'t resolve?', a: 'The AI detects escalation triggers — high frustration, complex legal/financial queries, or explicit human requests — and transfers the call to a human agent in real time with a full conversation summary.' },
        ],
    },
    // ─── 11 ───
    {
        slug: 'seo-services',
        num: '11',
        name: 'SEO Services',
        tag: 'Visibility',
        tagline: 'Rank Higher. Stay There. Own Your Niche.',
        shortDesc: 'Technical SEO, on-page optimization, link building, and content strategy engineered to dominate search rankings.',
        overview:
            'SEO is not a trick — it\'s a long-term compound investment in your brand\'s visibility. We take a full-stack approach: fixing your technical foundation, optimizing every page for intent, building authoritative backlinks, and producing content that ranks and converts. Our SEO strategies are white-hat, data-driven, and built for sustainable growth.',
        features: [
            { title: 'Technical SEO Audit', desc: 'Full crawl analysis — fixing broken links, improving crawlability, sitemap structure, Core Web Vitals, and schema markup.' },
            { title: 'Keyword Research & Mapping', desc: 'Deep keyword research covering short-tail, long-tail, and semantic keywords mapped to every page of your site.' },
            { title: 'On-Page Optimization', desc: 'Meta titles, descriptions, H-tags, internal linking, content structure, and image alt text optimized for target keywords.' },
            { title: 'Link Building', desc: 'White-hat backlink acquisition through guest posts, digital PR, resource pages, and HARO outreach.' },
            { title: 'Content Strategy & SEO Writing', desc: 'Topic cluster strategies with pillar pages and supporting blogs that build topical authority.' },
            { title: 'Local SEO', desc: 'Google Business Profile optimization, local citations, and geo-targeted content for location-based businesses.' },
        ],
        process: [
            { step: '01', title: 'Technical Audit', desc: 'Full site crawl identifying every technical issue blocking your rankings.' },
            { step: '02', title: 'Keyword Strategy', desc: 'Competitor gap analysis and keyword mapping across your entire site architecture.' },
            { step: '03', title: 'On-Page Fixes', desc: 'Systematic optimization of every page — titles, meta, content, and internal links.' },
            { step: '04', title: 'Content & Links', desc: 'Monthly content production and authoritative backlink building.' },
            { step: '05', title: 'Track & Report', desc: 'Weekly rank tracking with monthly reports covering traffic, positions, and wins.' },
        ],
        results: [
            { num: '3–6mo', label: 'Ranking Timeline' },
            { num: '220%', label: 'Avg Traffic Lift' },
            { num: 'Top 3', label: 'Target Positions' },
            { num: '0', label: 'Black Hat Tactics' },
        ],
        faqs: [
            { q: 'How long does SEO take to show results?', a: 'Typically 3–6 months for meaningful ranking improvements. Technical fixes show impact faster; competitive keywords take longer.' },
            { q: 'Do you guarantee first-page rankings?', a: 'No ethical SEO company can guarantee rankings — Google\'s algorithm is theirs, not ours. We do guarantee a proven process and transparent reporting.' },
            { q: 'Is SEO a one-time thing?', a: 'No. SEO requires ongoing effort — competitors don\'t stop, Google updates its algorithm, and your content needs to stay fresh.' },
        ],
    },
    // ─── 12 ───
    {
        slug: 'paid-advertising',
        num: '12',
        name: 'Paid Advertising',
        tag: 'Performance',
        tagline: 'Every Rupee Accountable. Every Click Intentional.',
        shortDesc: 'High-ROI Meta Ads and Google Ads campaigns with precise targeting and full-funnel optimization.',
        overview:
            'Paid advertising done wrong is just burning money. Done right, it\'s the fastest lever for predictable revenue growth. We manage Meta (Facebook & Instagram) and Google Ads campaigns with a performance mindset — rigorous audience targeting, compelling creative, relentless A/B testing, and conversion-focused landing pages that turn clicks into customers.',
        features: [
            { title: 'Google Search & Display Ads', desc: 'Intent-capture search campaigns and visual display ads targeting users across the Google network.' },
            { title: 'Meta Ads (Facebook & Instagram)', desc: 'Awareness, traffic, lead generation, and conversion campaigns across Facebook and Instagram.' },
            { title: 'Audience Targeting & Segmentation', desc: 'Custom audiences, lookalikes, retargeting, and interest-based segmentation for surgical precision.' },
            { title: 'Ad Creative Production', desc: 'Static images, carousels, video ads, and UGC-style content designed to stop the scroll and drive action.' },
            { title: 'Landing Page Optimization', desc: 'High-converting landing pages aligned with each ad\'s message and audience segment.' },
            { title: 'Budget Management & Scaling', desc: 'Smart bidding strategies and phased budget scaling to maximize ROAS as campaigns mature.' },
        ],
        process: [
            { step: '01', title: 'Account Audit', desc: 'Review of existing ad accounts, pixel setup, conversion tracking, and audience data.' },
            { step: '02', title: 'Campaign Architecture', desc: 'Full-funnel campaign structure: awareness → consideration → conversion.' },
            { step: '03', title: 'Creative Development', desc: 'Ad copy, visuals, and video assets created for each audience segment.' },
            { step: '04', title: 'Launch & Monitor', desc: 'Campaign launch with daily monitoring during the first 2 weeks to catch early signals.' },
            { step: '05', title: 'Optimize & Scale', desc: 'Weekly optimization cycles — pausing losers, scaling winners, testing new creatives.' },
        ],
        results: [
            { num: '3.8×', label: 'Avg ROAS' },
            { num: '42%', label: 'Lower CPA' },
            { num: '14d', label: 'Campaign Launch' },
            { num: '100%', label: 'Conversion Tracked' },
        ],
        faqs: [
            { q: 'What is the minimum ad budget you work with?', a: 'We recommend a minimum of ₹30,000/month in ad spend. Below that, data collection is too slow for meaningful optimization.' },
            { q: 'Do you charge a percentage of ad spend?', a: 'Our management fee is a flat monthly retainer, not a percentage. This keeps our incentives aligned with performance, not spend volume.' },
            { q: 'How soon will I see results?', a: 'Most campaigns start generating leads within the first week. ROAS typically improves significantly after 3–4 weeks of optimization.' },
        ],
    },
    // ─── 13 ───
    {
        slug: 'content-marketing',
        num: '13',
        name: 'Content Marketing',
        tag: 'Authority',
        tagline: 'Build Authority. Attract Buyers. Drive Revenue.',
        shortDesc: 'Blogs, whitepapers, case studies, and multimedia content designed to attract, engage, and convert.',
        overview:
            'Content marketing is the long game that compounds forever. We build content ecosystems — not just blog posts. Topic clusters, pillar pages, case studies, newsletters, and multimedia assets that position your brand as the definitive authority in your space, attract organic traffic, and nurture prospects through the entire buying journey.',
        features: [
            { title: 'Content Strategy & Topic Clusters', desc: 'Research-backed content plans organized into topic clusters that build topical authority on Google.' },
            { title: 'SEO Blog Writing', desc: 'Long-form, expert-level articles optimized for search intent and designed to rank and convert.' },
            { title: 'Case Studies & Whitepapers', desc: 'High-credibility assets that demonstrate proof, build trust, and support B2B sales cycles.' },
            { title: 'Email Newsletter Campaigns', desc: 'Engaging newsletters that keep your audience warm and drive repeat traffic to your site.' },
            { title: 'Infographics & Visual Content', desc: 'Shareable visual assets that communicate complex ideas instantly and generate backlinks.' },
            { title: 'Content Distribution', desc: 'Strategic distribution across owned, earned, and paid channels for maximum content ROI.' },
        ],
        process: [
            { step: '01', title: 'Audience & Intent Research', desc: 'Deep-dive into your ICP\'s questions, pain points, and content consumption habits.' },
            { step: '02', title: 'Content Architecture', desc: 'Build pillar + cluster structure that maps to every stage of your buyer\'s journey.' },
            { step: '03', title: 'Production Pipeline', desc: 'Monthly content calendar with outlines, drafts, revisions, and final delivery.' },
            { step: '04', title: 'Publish & Optimize', desc: 'On-page SEO, internal linking, and CTAs built into every published piece.' },
            { step: '05', title: 'Measure & Iterate', desc: 'Track organic traffic, time-on-page, conversions, and backlinks earned.' },
        ],
        results: [
            { num: '5.2×', label: 'Organic Traffic Lift' },
            { num: '8–12', label: 'Pieces/Month' },
            { num: '6mo', label: 'Authority Build Time' },
            { num: '∞', label: 'Compound Value' },
        ],
        faqs: [
            { q: 'How many articles do you produce per month?', a: 'Standard plans include 8–12 pieces per month including blogs, social content, and one long-form asset like a case study or whitepaper.' },
            { q: 'Do you write the content or do we?', a: 'We handle everything — research, writing, editing, and formatting. You review and approve before publication.' },
            { q: 'Will content marketing work for my industry?', a: 'Yes. We\'ve produced content for SaaS, e-commerce, healthcare, finance, legal, real estate, and more. The approach adapts to your audience.' },
        ],
    },
    // ─── 14 ───
    {
        slug: 'cybersecurity',
        num: '14',
        name: 'Cybersecurity',
        tag: 'Security',
        tagline: 'Protect What You\'ve Built. Before Someone Else Takes It.',
        shortDesc: 'AI-realm cybersecurity for digital products — threat intelligence, vulnerability assessments, and real-time monitoring.',
        overview:
            'In the age of AI-powered products and cloud-native infrastructure, cybersecurity is no longer optional — it\'s existential. We specialize in securing digital products, SaaS platforms, AI applications, and APIs against modern threats. From penetration testing to real-time monitoring and incident response, we make sure your product is hardened before adversaries find the gaps.',
        features: [
            { title: 'Penetration Testing', desc: 'Simulated attacks on your web apps, APIs, and infrastructure to find and fix vulnerabilities before real attackers do.' },
            { title: 'AI Product Security', desc: 'Prompt injection defense, model poisoning prevention, and data pipeline security for AI-powered applications.' },
            { title: 'API Security Audits', desc: 'Authentication, authorization, rate limiting, and data exposure audits for all your API endpoints.' },
            { title: 'VAPT Reports', desc: 'Detailed Vulnerability Assessment and Penetration Testing reports with CVSS scores and remediation roadmaps.' },
            { title: 'Real-time Monitoring & Alerting', desc: 'SIEM setup, log aggregation, and 24/7 alerting for suspicious activity across your infrastructure.' },
            { title: 'Compliance Consulting', desc: 'GDPR, ISO 27001, SOC 2, and DPDP Act guidance to ensure your product meets regulatory requirements.' },
        ],
        process: [
            { step: '01', title: 'Scope Definition', desc: 'Define attack surface — web app, API, mobile, infrastructure, or all of the above.' },
            { step: '02', title: 'Reconnaissance', desc: 'OSINT and passive recon to map your exposure before any active testing begins.' },
            { step: '03', title: 'Active Testing', desc: 'Controlled penetration testing using OWASP and industry-standard methodologies.' },
            { step: '04', title: 'Report & Remediation', desc: 'Detailed report with severity ratings, PoC evidence, and step-by-step fix guidance.' },
            { step: '05', title: 'Retest & Certify', desc: 'Post-remediation retest to confirm all vulnerabilities are properly addressed.' },
        ],
        results: [
            { num: '0', label: 'Breaches Post-Audit' },
            { num: '48h', label: 'Report Delivery' },
            { num: '100%', label: 'OWASP Coverage' },
            { num: '24/7', label: 'Monitoring Option' },
        ],
        faqs: [
            { q: 'Do you do black-box or white-box testing?', a: 'Both. We tailor the approach based on your goals — black-box for realistic attacker simulation, white-box for thorough code-level analysis.' },
            { q: 'Is penetration testing disruptive to our live product?', a: 'No. All testing is conducted in a controlled manner. We coordinate with your team to ensure zero downtime or data loss.' },
            { q: 'Do you help fix the vulnerabilities you find?', a: 'Yes. We don\'t just report problems — we provide developer-friendly remediation guidance and can implement fixes if needed.' },
        ],
    },
    // ─── 15 ───
    {
        slug: 'analytics-reporting',
        num: '15',
        name: 'Analytics & Reporting',
        tag: 'Intelligence',
        tagline: 'Data Without Insight Is Just Numbers. We Give You Both.',
        shortDesc: 'Dashboards, tracking setup, and intelligent reporting that turn raw data into actionable growth decisions.',
        overview:
            'Most businesses are drowning in data but starving for insight. We set up the right tracking infrastructure, build clean dashboards, and deliver monthly reports that cut through the noise to tell you exactly what\'s working, what isn\'t, and what to do next. From GA4 and GTM to custom BI dashboards — we make your data work for you.',
        features: [
            { title: 'GA4 & GTM Setup', desc: 'Proper Google Analytics 4 configuration with Google Tag Manager for accurate, complete event tracking.' },
            { title: 'Conversion Tracking', desc: 'End-to-end conversion funnel tracking across all channels — ads, organic, email, and direct.' },
            { title: 'Custom Dashboard Build', desc: 'Looker Studio or Notion dashboards that show your most important KPIs at a glance, updated in real time.' },
            { title: 'Attribution Modeling', desc: 'Understanding which channels and touchpoints are actually driving revenue — not just last-click.' },
            { title: 'Monthly Performance Reports', desc: 'Plain-language reports with context, analysis, and specific recommendations — not just raw numbers.' },
            { title: 'Data Audit & Clean-up', desc: 'Fixing messy, broken, or duplicate tracking implementations that are giving you bad data.' },
        ],
        process: [
            { step: '01', title: 'Tracking Audit', desc: 'Review your existing analytics setup for gaps, errors, and misconfigurations.' },
            { step: '02', title: 'KPI Definition', desc: 'Align on the metrics that actually matter for your specific business model.' },
            { step: '03', title: 'Implementation', desc: 'Set up or fix all tracking across GA4, GTM, Meta Pixel, LinkedIn Insight Tag, etc.' },
            { step: '04', title: 'Dashboard Build', desc: 'Create live dashboards you can check anytime, connected to all your data sources.' },
            { step: '05', title: 'Monthly Reviews', desc: 'Monthly reporting calls to walk through data, answer questions, and update strategy.' },
        ],
        results: [
            { num: '100%', label: 'Tracking Accuracy' },
            { num: '1', label: 'Dashboard for Everything' },
            { num: '48h', label: 'Setup Time' },
            { num: 'Real-time', label: 'Data Freshness' },
        ],
        faqs: [
            { q: 'We already have Google Analytics — do we need this?', a: 'Having GA4 installed is not the same as having it set up correctly. Most GA4 implementations we audit have significant tracking gaps or errors.' },
            { q: 'What dashboard tool do you use?', a: 'Primarily Looker Studio (free, Google-native) connected to GA4, Google Ads, Search Console, and Meta Ads. We can also build in Notion or custom React dashboards.' },
            { q: 'Can you connect data from multiple platforms?', a: 'Yes. We consolidate data from your website, ads, CRM, email platform, and social media into one unified dashboard.' },
        ],
    },
    // ─── 16 ───
    {
        slug: 'migration-services',
        num: '16',
        name: 'Migration Services',
        tag: 'Infrastructure',
        tagline: 'Move Fast. Break Nothing. Lose Nothing.',
        shortDesc: 'Seamless CMS, e-commerce, and cloud migrations with zero downtime and guaranteed data integrity.',
        overview:
            'Migrations are high-stakes, high-stress operations that most agencies get wrong. We specialize in complex platform migrations — moving websites, stores, databases, and cloud infrastructure with surgical precision. Zero downtime. Zero data loss. Full SEO preservation. Whether you\'re migrating from Wix to Next.js or AWS to GCP, we\'ve done it before and we\'ll do it right.',
        features: [
            { title: 'CMS Migrations', desc: 'WordPress, Webflow, Wix, Squarespace to Next.js or any headless CMS — full content, media, and SEO migration.' },
            { title: 'E-commerce Platform Migration', desc: 'Magento, WooCommerce, BigCommerce to Shopify or custom stack — products, orders, customers, and reviews.' },
            { title: 'Database Migrations', desc: 'MySQL to PostgreSQL, on-premise to cloud, or schema restructuring — with full data validation.' },
            { title: 'Cloud Infrastructure Migration', desc: 'AWS, GCP, Azure migrations with infrastructure-as-code, zero-downtime cutover plans, and rollback procedures.' },
            { title: 'SEO-Safe Migration', desc: 'Redirect mapping, canonical setup, and post-migration monitoring to ensure zero ranking loss during and after migration.' },
            { title: 'Legacy System Modernization', desc: 'Migrating old PHP/jQuery codebases to modern React/Next.js stacks while keeping the business running throughout.' },
        ],
        process: [
            { step: '01', title: 'Migration Audit', desc: 'Full inventory of content, data, URLs, integrations, and dependencies to be migrated.' },
            { step: '02', title: 'Migration Plan', desc: 'Detailed cutover plan with timeline, rollback procedures, and zero-downtime strategy.' },
            { step: '03', title: 'Staging Migration', desc: 'Full migration executed on staging environment first, with comprehensive QA.' },
            { step: '04', title: 'Cutover', desc: 'Production cutover executed during low-traffic window with team on standby.' },
            { step: '05', title: 'Post-migration Monitoring', desc: '2-week monitoring period for any issues, with immediate hotfix response.' },
        ],
        results: [
            { num: '0', label: 'Data Loss Incidents' },
            { num: '0%', label: 'Downtime (Target)' },
            { num: '100%', label: 'SEO Preservation' },
            { num: '50+', label: 'Migrations Completed' },
        ],
        faqs: [
            { q: 'Will we lose our Google rankings during migration?', a: 'Not if done correctly. We implement comprehensive redirect mapping, notify Google via Search Console, and monitor rankings for 30 days post-launch.' },
            { q: 'Can you migrate a live e-commerce store without taking it offline?', a: 'Yes. We run the new platform in parallel, migrate data in batches, and do a rapid DNS cutover with the old platform on standby during the transition.' },
            { q: 'What if something breaks after the migration?', a: 'We include a 2-week post-migration support period with priority response. All migrations also have a rollback plan ready.' },
        ],
    },
    // ─── 17 ───
    {
        slug: 'email-marketing',
        num: '17',
        name: 'Email Marketing',
        tag: 'Retention',
        tagline: 'The Channel That Owns the Audience. Use It Right.',
        shortDesc: 'Automated drip campaigns, newsletters, and lifecycle email sequences that nurture leads and drive repeat revenue.',
        overview:
            'Email marketing delivers ₹36 for every ₹1 spent — the highest ROI of any digital channel. The key is strategy and execution: the right message to the right segment at the right moment. We design, write, build, and automate your entire email marketing operation — from welcome sequences to re-engagement campaigns — on any platform you use.',
        features: [
            { title: 'Email Strategy & Audit', desc: 'Review of your current email performance, list health, and identification of revenue opportunities.' },
            { title: 'Welcome & Onboarding Sequences', desc: 'Automated sequences that turn new subscribers into active customers within their first 30 days.' },
            { title: 'Lead Nurture Drip Campaigns', desc: 'Multi-touch email sequences that educate prospects and move them toward a purchase decision.' },
            { title: 'Promotional Campaigns', desc: 'Launch, sale, and seasonal campaign emails designed to drive immediate revenue spikes.' },
            { title: 'Re-engagement Campaigns', desc: 'Win-back sequences for inactive subscribers that recover revenue from your existing list.' },
            { title: 'A/B Testing & Optimization', desc: 'Subject line, copy, CTA, and send time testing to continuously improve open and click rates.' },
        ],
        process: [
            { step: '01', title: 'List Audit', desc: 'Analyze your current list health, segmentation, and deliverability status.' },
            { step: '02', title: 'Strategy & Segmentation', desc: 'Define audience segments, email types, and automation trigger logic.' },
            { step: '03', title: 'Design & Copy', desc: 'On-brand email templates and conversion-focused copy for every campaign.' },
            { step: '04', title: 'Automation Build', desc: 'Set up all flows in your ESP (Klaviyo, Mailchimp, ActiveCampaign, etc.).' },
            { step: '05', title: 'Test, Send, Report', desc: 'Pre-send testing across email clients, send, and performance analysis.' },
        ],
        results: [
            { num: '42%', label: 'Avg Open Rate' },
            { num: '36×', label: 'Email ROI' },
            { num: '0%', label: 'Spam Rate Target' },
            { num: '7', label: 'Touch Sequences' },
        ],
        faqs: [
            { q: 'Which email platform do you work with?', a: 'We work with Klaviyo, Mailchimp, ActiveCampaign, ConvertKit, Brevo, and most major ESPs. We can also recommend the best platform for your needs.' },
            { q: 'How do you avoid emails landing in spam?', a: 'Through proper SPF/DKIM/DMARC setup, list hygiene, engagement-based sending, and careful monitoring of deliverability metrics.' },
            { q: 'Can you help grow our email list too?', a: 'Yes. We design lead magnets, opt-in forms, and pop-up flows to grow your list, which we pair with email automation to convert subscribers into customers.' },
        ],
    },
    // ─── 18 ───
    {
        slug: 'conversion-rate-optimization',
        num: '18',
        name: 'Conversion Rate Optimization',
        tag: 'Optimization',
        tagline: 'More Revenue. Same Traffic. No Ad Spend Increase.',
        shortDesc: 'Heatmaps, A/B testing, UX audits, and data-driven improvements that turn more visitors into customers.',
        overview:
            'CRO is the most overlooked growth lever in digital marketing. If your website converts at 2% and we improve it to 4%, you\'ve doubled your revenue without spending a single rupee more on traffic. We use behavioral analytics, heatmaps, session recordings, and structured A/B testing to systematically identify and fix the exact points where your visitors are dropping off.',
        features: [
            { title: 'Conversion Audit', desc: 'End-to-end analysis of your funnel — from landing page to checkout — identifying every drop-off point.' },
            { title: 'Heatmap & Session Recording', desc: 'Hotjar and Microsoft Clarity setup to see exactly where users click, scroll, and rage-click.' },
            { title: 'A/B & Multivariate Testing', desc: 'Structured experiments testing headlines, CTAs, layouts, images, and pricing presentations.' },
            { title: 'Landing Page Optimization', desc: 'Rewriting and redesigning landing pages based on behavioral data to maximize conversion rate.' },
            { title: 'Checkout Funnel Optimization', desc: 'Reducing friction, cart abandonment, and payment drop-offs through UX improvements and trust signal additions.' },
            { title: 'Form & Lead Gen Optimization', desc: 'Simplifying forms, testing field counts, and optimizing placement to increase lead capture rates.' },
        ],
        process: [
            { step: '01', title: 'Data Collection', desc: 'Install tracking, collect 2–4 weeks of heatmap and session data to understand baseline behavior.' },
            { step: '02', title: 'Funnel Analysis', desc: 'Map the full conversion funnel and identify the highest-impact optimization opportunities.' },
            { step: '03', title: 'Hypothesis Building', desc: 'Create prioritized list of A/B tests ranked by potential impact and ease of implementation.' },
            { step: '04', title: 'Testing Sprints', desc: 'Run structured A/B tests with sufficient statistical significance before declaring winners.' },
            { step: '05', title: 'Implement & Iterate', desc: 'Roll out winners, document learnings, and continue testing for compounding improvements.' },
        ],
        results: [
            { num: '2.3×', label: 'Avg Conv. Rate Lift' },
            { num: '31%', label: 'Cart Abandonment Drop' },
            { num: '4wk', label: 'First Test Results' },
            { num: '∞', label: 'Compounding Gains' },
        ],
        faqs: [
            { q: 'How much traffic do we need for CRO to work?', a: 'You need enough traffic to reach statistical significance in A/B tests — typically 1,000+ monthly visitors minimum. Below that, we focus on qualitative insights instead.' },
            { q: 'Will CRO changes affect our SEO?', a: 'No. Our CRO changes are focused on UX and conversion elements, not on-page SEO factors. We coordinate with your SEO setup to ensure no conflicts.' },
            { q: 'How long until we see results?', a: 'First meaningful test results in 3–4 weeks. Compounding improvements build over 3–6 months as we run multiple test cycles.' },
        ],
    },
    // ─── 19 ───
    {
        slug: 'cac-customer-retention',
        num: '19',
        name: 'Optimizing CAC & Customer Retention',
        tag: 'Growth Ops',
        tagline: 'Spend Less to Acquire. Keep Them Longer. Win Forever.',
        shortDesc: 'Data-driven strategies to slash your Customer Acquisition Cost and maximize Lifetime Value through retention engineering.',
        overview:
            'The most profitable businesses aren\'t the ones that acquire the most customers — they\'re the ones that acquire them cheaply and keep them forever. We audit your full acquisition funnel to identify exactly where you\'re overspending, which channels deliver the highest LTV customers, and what\'s driving churn. Then we build the systems — loyalty programs, re-engagement flows, onboarding optimization, and channel reallocation — that reduce CAC and dramatically extend customer lifetime.',
        features: [
            { title: 'CAC Audit by Channel', desc: 'Granular analysis of Customer Acquisition Cost broken down by channel, campaign, and cohort — identifying where you\'re overpaying and where you\'re underinvesting.' },
            { title: 'LTV Modeling & Cohort Analysis', desc: 'Build Customer Lifetime Value models by segment, source, and product to identify which customers are worth the most and where to double down.' },
            { title: 'Churn Prediction & Prevention', desc: 'AI-driven churn scoring that identifies at-risk customers before they leave, triggering automated win-back flows and proactive support outreach.' },
            { title: 'Onboarding Optimization', desc: 'Redesign the first 30 days of the customer experience — the single biggest lever for long-term retention in any subscription or repeat-purchase business.' },
            { title: 'Loyalty & Referral Program Design', desc: 'Build loyalty programs and referral mechanics that turn your best customers into your cheapest acquisition channel.' },
            { title: 'Channel Mix Reallocation', desc: 'Shift budget from high-CAC, low-LTV channels to lower-CAC, higher-LTV alternatives based on rigorous cohort performance data.' },
        ],
        process: [
            { step: '01', title: 'Data Audit', desc: 'Pull acquisition costs, retention curves, churn rates, and LTV data across all channels and cohorts.' },
            { step: '02', title: 'Benchmarking', desc: 'Compare your CAC:LTV ratio, payback period, and churn rate against industry benchmarks.' },
            { step: '03', title: 'Opportunity Mapping', desc: 'Identify the top 3–5 highest-leverage interventions — the ones that move the needle fastest.' },
            { step: '04', title: 'Implement Retention Systems', desc: 'Build and deploy onboarding flows, loyalty programs, churn triggers, and win-back sequences.' },
            { step: '05', title: 'Monitor & Report', desc: 'Monthly CAC and retention dashboards with trend analysis and continuous optimization recommendations.' },
        ],
        results: [
            { num: '38%', label: 'Avg CAC Reduction' },
            { num: '2.4×', label: 'LTV Increase' },
            { num: '55%', label: 'Churn Rate Drop' },
            { num: '90d', label: 'Payback Period Cut' },
        ],
        faqs: [
            { q: 'What data do you need to start a CAC/retention engagement?', a: 'At minimum: ad spend by channel, revenue by customer, and sign-up/cancellation dates. More data (support tickets, NPS, product usage) gives us more levers to pull.' },
            { q: 'How is this different from your Analytics service?', a: 'Analytics is about setting up tracking and reporting. CAC/Retention Optimization is a strategic engagement — we use the data to make specific, high-impact interventions to your business model and customer experience.' },
            { q: 'Will this work for a non-subscription business?', a: 'Yes. For e-commerce and transactional businesses, we optimize repeat purchase rate, average order value, and referral rates — the equivalent levers to subscription retention.' },
        ],
    },
    // ─── 20 ───
    {
        slug: 'realtime-pnl-calculation',
        num: '20',
        name: 'Real-Time P&L Calculation',
        tag: 'Finance Ops',
        tagline: 'Know Your Numbers in Real Time. Make Decisions with Certainty.',
        shortDesc: 'Live P&L dashboards that factor in total ad spend, operational costs, and revenue — giving you a single source of financial truth.',
        overview:
            'Most business owners find out how profitable they were last month when their accountant sends a report. That\'s too late. We build real-time Profit & Loss dashboards that pull live data from your ad accounts (Meta, Google), operational cost inputs, sales platforms, and payment gateways to give you a live, accurate picture of your P&L at any moment. You see exactly how much you\'re spending, how much you\'re making, and what your true margin is — updated in real time, accessible anywhere.',
        features: [
            { title: 'Live Ad Spend Integration', desc: 'Real-time sync with Meta Ads, Google Ads, and other paid channels — total spend updated as it happens, not end-of-day.' },
            { title: 'Operational Cost Tracking', desc: 'Input and track all operational costs — salaries, SaaS tools, fulfillment, office, and overheads — categorized and time-stamped.' },
            { title: 'Revenue & Payment Gateway Sync', desc: 'Live revenue data pulled from Shopify, Razorpay, Stripe, WooCommerce, or your custom platform — gross and net revenue by product and channel.' },
            { title: 'Real-Time Gross & Net Margin', desc: 'Automatic calculation of gross margin, net margin, EBITDA, and contribution margin — updated every hour as new data flows in.' },
            { title: 'Campaign-Level P&L', desc: 'Break down profitability by individual ad campaign, product, or sales channel — so you can kill unprofitable campaigns instantly instead of discovering it next month.' },
            { title: 'Alerts & Threshold Notifications', desc: 'Set margin floor alerts — get a WhatsApp or email notification the moment your P&L drops below a defined threshold so you can act in minutes, not weeks.' },
        ],
        process: [
            { step: '01', title: 'Financial Architecture Design', desc: 'Map all your revenue sources, cost categories, and data systems that need to be connected.' },
            { step: '02', title: 'Data Pipeline Build', desc: 'Connect your ad accounts, payment gateways, and operational cost inputs via APIs and automated syncs.' },
            { step: '03', title: 'Dashboard Development', desc: 'Build your real-time P&L dashboard in Looker Studio, Notion, or a custom React interface — designed for how you think.' },
            { step: '04', title: 'Alert Configuration', desc: 'Set up margin thresholds, anomaly detection, and notification rules across WhatsApp and email.' },
            { step: '05', title: 'Training & Handover', desc: 'Walk-through of the dashboard with your team, documentation, and a 30-day support period for any questions.' },
        ],
        results: [
            { num: 'Real-time', label: 'P&L Refresh Rate' },
            { num: '1 view', label: 'All Costs & Revenue' },
            { num: '<1hr', label: 'Alert Response Time' },
            { num: '100%', label: 'Decision Confidence' },
        ],
        techStack: ['Looker Studio', 'Google Sheets API', 'Meta Ads API', 'Google Ads API', 'Razorpay API', 'Stripe API', 'Make.com', 'Supabase'],
        faqs: [
            { q: 'Can this integrate with our existing accounting software?', a: 'Yes. We can integrate with Tally, Zoho Books, QuickBooks, and most accounting platforms via API or CSV sync, so your P&L dashboard stays in sync with your books.' },
            { q: 'How accurate is the real-time data?', a: 'Ad spend data updates every 15–60 minutes depending on the platform\'s API. Revenue data updates within minutes of each transaction. Operational costs are manual or synced from your accounting tool.' },
            { q: 'Do we need a technical team to maintain this?', a: 'No. We build it to be fully self-serve. You update operational costs via a simple Google Sheet or form. Everything else is automated. We also provide a maintenance retainer if you want us to manage it.' },
        ],
    },
]

export function getServiceBySlug(slug: string): ServiceData | undefined {
    return services.find((s) => s.slug === slug)
}

export function getAllSlugs(): string[] {
    return services.map((s) => s.slug)
}
