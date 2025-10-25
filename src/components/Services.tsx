import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  Globe, 
  Share2, 
  Search, 
  DollarSign, 
  Palette, 
  Mail, 
  FileText, 
  BarChart3, 
  Bot, 
  Star,
  ShoppingCart,
  Video,
  Languages,
  CheckCircle2,
  TrendingUp,
  Zap
} from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const serviceCategories = [
  {
    id: "web",
    icon: Globe,
    title: "Website & Technology Services",
    description: "Build a powerful online presence with cutting-edge web solutions powered by the latest technologies and AI integrations.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc2MTE5MTg1Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    stats: { projects: "200+", satisfaction: "99%" },
    highlights: ["Mobile-First Design", "AI Chatbot Ready", "24/7 Support"],
    services: [
      "Website Design & Development (Static / Dynamic / E-commerce)",
      "Website Maintenance & Management",
      "Landing Page Design (for campaigns)",
      "Web Hosting, Domain & Email Setup",
      "App Development (Android / iOS / Web Apps)",
      "Chatbot Integration (WhatsApp, Messenger, Website)"
    ]
  },
  {
    id: "social",
    icon: Share2,
    title: "Social Media Marketing (SMM)",
    description: "Engage your audience across all platforms with data-driven strategies that turn followers into loyal customers.",
    image: "https://images.unsplash.com/photo-1542744094-f77e9f7a10b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nJTIwd29ya3NwYWNlfGVufDF8fHx8MTc2MTIwODY2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    stats: { reach: "10M+", growth: "300%" },
    highlights: ["Viral Content Creation", "Influencer Network", "Real-time Analytics"],
    services: [
      "Social Media Strategy & Planning",
      "Account Setup & Optimization (FB, Insta, LinkedIn, etc.)",
      "Content Creation (Posts, Reels, Stories, Videos)",
      "Page Management & Engagement",
      "Influencer Marketing",
      "Social Media Analytics & Reporting"
    ]
  },
  {
    id: "seo",
    icon: Search,
    title: "Search Engine Optimization (SEO)",
    description: "Dominate search rankings with our proven SEO strategies that combine technical excellence with content optimization.",
    image: "https://images.unsplash.com/photo-1644088379091-d574269d422f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHRlY2hub2xvZ3klMjBuZXR3b3JrfGVufDF8fHx8MTc2MTE2NzEwNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    stats: { ranking: "Top 3", traffic: "+250%" },
    highlights: ["White-Hat SEO", "AI Content Optimization", "Local SEO Experts"],
    services: [
      "On-Page SEO (Meta Tags, Keywords, Content Optimization)",
      "Off-Page SEO (Backlinks, Guest Posts, Citations)",
      "Technical SEO (Site Speed, Mobile Optimization, Schema)",
      "Local SEO (Google Business Profile Optimization)",
      "E-commerce SEO (Product Optimization, Structured Data)",
      "SEO Audit Reports"
    ]
  },
  {
    id: "paid",
    icon: DollarSign,
    title: "Paid Marketing / PPC Advertising",
    description: "Maximize ROI with AI-optimized ad campaigns that target the right audience at the right time across all major platforms.",
    image: "https://images.unsplash.com/photo-1655393001768-d946c97d6fd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMHRlY2hub2xvZ3klMjBmdXR1cmlzdGljfGVufDF8fHx8MTc2MTE0NjYwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    stats: { roi: "400%", ctr: "8.5%" },
    highlights: ["AI Bid Optimization", "A/B Testing", "Budget Management"],
    services: [
      "Google Ads (Search, Display, Shopping, YouTube, PMax)",
      "Meta Ads (Facebook & Instagram)",
      "LinkedIn Ads",
      "YouTube Video Campaigns",
      "Remarketing & Retargeting Campaigns",
      "App Install Campaigns",
      "Conversion Rate Optimization (CRO)"
    ]
  },
  {
    id: "design",
    icon: Palette,
    title: "Branding & Creative Design",
    description: "Create a memorable brand identity that resonates with your audience through stunning visuals and cohesive design.",
    image: "https://images.unsplash.com/photo-1758691737535-57edd2a11d73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB0ZWFtfGVufDF8fHx8MTc2MTE0Mjk0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    stats: { designs: "500+", awards: "15" },
    highlights: ["Custom Designs", "Brand Guidelines", "Print & Digital"],
    services: [
      "Logo Design & Brand Identity",
      "Brochures, Flyers, Business Cards",
      "Social Media Creatives",
      "Motion Graphics & Explainer Videos",
      "Product Photography / Videography",
      "Packaging Design"
    ]
  },
  {
    id: "email",
    icon: Mail,
    title: "Email & WhatsApp Marketing",
    description: "Build lasting customer relationships with personalized messaging campaigns that deliver results and drive conversions.",
    image: "https://images.unsplash.com/photo-1566918621183-ff90d3e0553f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbWFpbCUyMG1hcmtldGluZyUyMGF1dG9tYXRpb258ZW58MXx8fHwxNzYxMjI5ODI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    stats: { openRate: "45%", conversion: "12%" },
    highlights: ["Automation Ready", "Segmentation", "WhatsApp API"],
    services: [
      "Newsletter Campaigns",
      "Automated Email Flows (Welcome, Abandoned Cart, Re-engagement)",
      "WhatsApp Broadcast Campaigns",
      "Chatbot Automation (WhatsApp / Messenger)",
      "Email Template Design"
    ]
  },
  {
    id: "content",
    icon: FileText,
    title: "Content Marketing",
    description: "Create high-quality content that drives engagement and builds brand authority.",
    image: "https://images.unsplash.com/photo-1681230745734-4e59736c3660?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW50JTIwd3JpdGluZyUyMGNyZWF0aXZlfGVufDF8fHx8MTc2MTIwNTgxNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    stats: { articles: "1000+", engagement: "85%" },
    highlights: ["SEO Optimized", "Bilingual Writing", "AI-Enhanced"],
    services: [
      "Blog Writing & SEO Articles",
      "Website Copywriting (Landing Pages, Product Descriptions)",
      "Social Media Content Creation",
      "E-books, Case Studies, and Whitepapers",
      "Content Strategy & Planning",
      "Content Calendar Management"
    ]
  },
  {
    id: "analytics",
    icon: BarChart3,
    title: "Analytics, Reporting & Strategy",
    description: "Make data-driven decisions with comprehensive analytics and strategic insights that fuel business growth.",
    image: "https://images.unsplash.com/photo-1748609160056-7b95f30041f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGFuYWx5dGljcyUyMGNoYXJ0fGVufDF8fHx8MTc2MTIwODA0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    stats: { insights: "500+", accuracy: "96%" },
    highlights: ["Real-time Dashboards", "AI Predictions", "Custom Reports"],
    services: [
      "Competitor & Market Research",
      "Google Analytics, Tag Manager & Pixel Setup",
      "Monthly Performance Reports",
      "ROI Tracking & Optimization",
      "Growth Strategy Consulting"
    ]
  },
  {
    id: "automation",
    icon: Bot,
    title: "Marketing Automation & CRM",
    description: "Automate workflows and manage customer relationships efficiently with smart CRM solutions.",
    image: "https://images.unsplash.com/photo-1625314887424-9f190599bd56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwcm9ib3R8ZW58MXx8fHwxNzYxMTUwNDI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    stats: { automated: "80%", efficiency: "+350%" },
    highlights: ["AI-Powered", "Multi-Platform", "Smart Workflows"],
    services: [
      "CRM Setup & Configuration (HubSpot, Zoho, Salesforce)",
      "Lead Scoring & Tracking Systems",
      "Automated Email & SMS Workflows",
      "Customer Journey Mapping",
      "Integration of Website, Ads & CRM Platforms",
      "Workflow Automation & Optimization"
    ]
  },
  {
    id: "reputation",
    icon: Star,
    title: "Online Reputation & PR Management",
    description: "Build and protect your brand's reputation with proactive monitoring and strategic public relations management.",
    image: "https://images.unsplash.com/photo-1745674684468-b9fc392fda3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjByZXB1dGF0aW9uJTIwcmV2aWV3c3xlbnwxfHx8fDE3NjEyMjk4Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    stats: { reviews: "4.8★", response: "< 2hrs" },
    highlights: ["24/7 Monitoring", "Crisis Management", "Review Generation"],
    services: [
      "Google Review Management",
      "Social Listening & Brand Monitoring",
      "Press Release Distribution",
      "Crisis Communication Handling"
    ]
  },
  {
    id: "ecommerce",
    icon: ShoppingCart,
    title: "E-commerce Marketing",
    description: "Accelerate your online store growth with specialized e-commerce strategies that drive sales across all platforms.",
    image: "https://images.unsplash.com/photo-1649694902788-9ccda3aa1d78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBzaG9wcGluZyUyMG9ubGluZXxlbnwxfHx8fDE3NjExNDU4NzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    stats: { sales: "+420%", cart: "25% recovery" },
    highlights: ["Marketplace Expert", "Cart Recovery", "Sales Automation"],
    services: [
      "Product Listing Optimization (Amazon, Flipkart, Meesho, etc.)",
      "Marketplace Ads (Amazon Ads, Flipkart Ads)",
      "Shopify / WooCommerce Marketing",
      "Abandoned Cart Recovery",
      "Upsell / Cross-sell Automation"
    ]
  },
  {
    id: "video",
    icon: Video,
    title: "Video & Influencer Marketing",
    description: "Amplify your brand with engaging video content and strategic influencer partnerships.",
    image: "https://images.unsplash.com/photo-1639701386739-449a0e789367?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMHByb2R1Y3Rpb24lMjBjYW1lcmF8ZW58MXx8fHwxNzYxMjE4OTM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    stats: { views: "50M+", engagement: "18%" },
    highlights: ["Professional Studio", "Influencer Network", "Viral Strategy"],
    services: [
      "YouTube Channel Setup & Management",
      "Short-form Video Content (Reels, Shorts, TikTok)",
      "Video Ad Campaigns (YouTube, Facebook, Instagram)",
      "Influencer Outreach & Collaboration",
      "Scriptwriting & Professional Video Editing",
      "Product Demo & Explainer Videos"
    ]
  },
  {
    id: "bilingual",
    icon: Languages,
    title: "Handcrafted & Bilingual Content Services",
    description: "Bridge cultures and connect with Indian audiences through expertly crafted bilingual content that resonates locally.",
    image: "https://images.unsplash.com/photo-1673515335152-f2589ba8bb7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaWxpbmd1YWwlMjB0cmFuc2xhdGlvbiUyMGxhbmd1YWdlfGVufDF8fHx8MTc2MTIyOTgzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    stats: { languages: "2", reach: "1B+" },
    highlights: ["Native Writers", "Cultural Expert", "Hindi + English"],
    services: [
      "Bilingual Content Creation – Social media posts, blogs, website copy, aur ad captions dono languages (Hindi + English) mein",
      "Human + AI Writing – Human creativity ke saath AI tools ka use for research, grammar, aur optimization",
      "Cultural Storytelling – India-focused, festival aur regional tone wale campaigns (Hinglish scripts & local flavor)",
      "Visual & Voice Adaptation – Videos, reels, aur ads ke liye bilingual subtitles, voiceovers, aur translations",
      "Brand Language Strategy – Consistent Hindi-English tone, tagline guide, aur dual-language content calendar"
    ]
  }
];

export function Services() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black/50 backdrop-blur-sm border-2 border-transparent relative mb-6"
            whileHover={{ scale: 1.05 }}
            style={{
              backgroundImage: 'linear-gradient(#000, #000), linear-gradient(90deg, #a855f7, #06b6d4)',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box'
            }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Bot className="w-5 h-5 text-purple-400" />
            </motion.div>
            <span className="text-white">13 Comprehensive Services</span>
          </motion.div>
          <h2 className="mb-4 text-white">
            Complete Digital Marketing Solutions
          </h2>
          <p className="text-white max-w-2xl mx-auto">
            Professional services covering all aspects of digital marketing. AI-enhanced strategies designed to deliver measurable results.
          </p>
        </motion.div>

        {/* All Services in Grid Sections */}
        <div className="grid gap-8">
          {serviceCategories.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.03 }}
              >
                <Card className="bg-black backdrop-blur-sm border-2 border-transparent p-0 overflow-hidden relative group hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500"
                  style={{
                    backgroundImage: 'linear-gradient(#000, #000), linear-gradient(135deg, #a855f7, #06b6d4, #a855f7)',
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'padding-box, border-box'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-cyan-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative">
                    {/* Image Section - Full Width on Mobile, Side by Side on Desktop */}
                    <div className="grid lg:grid-cols-3 gap-6">
                      {/* Image */}
                      <div className="lg:col-span-1">
                        <div className="relative h-64 lg:h-full min-h-[300px] overflow-hidden border-2 border-transparent"
                          style={{
                            backgroundImage: 'linear-gradient(#000, #000), linear-gradient(135deg, #a855f7, #06b6d4)',
                            backgroundOrigin: 'border-box',
                            backgroundClip: 'padding-box, border-box'
                          }}
                        >
                          <ImageWithFallback
                            src={category.image}
                            alt={category.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          {/* Overlay with Stats */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent p-6 flex flex-col justify-end">
                            <motion.div 
                              className="flex gap-3"
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.2 }}
                            >
                              {Object.entries(category.stats).map(([key, value], idx) => (
                                <motion.div 
                                  key={idx} 
                                  className="px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-sm border border-purple-500/30"
                                  whileHover={{ scale: 1.05, borderColor: "rgba(168, 85, 247, 0.6)" }}
                                >
                                  <div className="flex items-center gap-1.5">
                                    <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
                                    <span className="text-xs text-white">{key}: <span className="text-purple-300">{value}</span></span>
                                  </div>
                                </motion.div>
                              ))}
                            </motion.div>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="lg:col-span-2 p-6 lg:p-8">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <motion.div 
                              className="p-3 rounded-lg bg-gradient-to-br from-purple-600/30 to-cyan-600/30 border-2 border-transparent backdrop-blur-sm"
                              whileHover={{ rotate: 360, scale: 1.1 }}
                              transition={{ duration: 0.5 }}
                              style={{
                                backgroundImage: 'linear-gradient(#000, #000), linear-gradient(135deg, #a855f7, #06b6d4)',
                                backgroundOrigin: 'border-box',
                                backgroundClip: 'padding-box, border-box'
                              }}
                            >
                              <Icon className="w-7 h-7 text-purple-400" />
                            </motion.div>
                            <div>
                              <h3 className="text-white mb-1">{category.title}</h3>
                              <p className="text-white text-sm opacity-90">{category.description}</p>
                            </div>
                          </div>
                        </div>

                        {/* Highlights */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {category.highlights.map((highlight, idx) => (
                            <Badge key={idx} variant="outline" className="border-purple-500/30 bg-purple-500/10 text-white px-3 py-1">
                              <Zap className="w-3 h-3 mr-1" />
                              {highlight}
                            </Badge>
                          ))}
                        </div>

                        {/* Services List */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="h-px flex-1 bg-gradient-to-r from-purple-500/50 to-transparent" />
                            <span className="text-sm text-white">What We Offer</span>
                            <div className="h-px flex-1 bg-gradient-to-l from-purple-500/50 to-transparent" />
                          </div>
                          <ul className="grid md:grid-cols-2 gap-3">
                            {category.services.map((service, serviceIndex) => (
                              <li 
                                key={serviceIndex}
                                className="flex items-start gap-3 text-white group/item"
                              >
                                <CheckCircle2 className="w-4 h-4 mt-0.5 text-purple-400 flex-shrink-0 group-hover/item:text-cyan-400 transition-colors" />
                                <span className="text-sm leading-relaxed">{service}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-block p-8 rounded-2xl border-2 border-transparent bg-black backdrop-blur-sm"
            style={{
              backgroundImage: 'linear-gradient(#000, #000), linear-gradient(135deg, #a855f7, #06b6d4)',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box'
            }}
          >
            <h3 className="text-white mb-2">Need a Custom Solution?</h3>
            <p className="text-white mb-4">Combine multiple services for a tailored marketing strategy</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white border-0 px-4 py-2">
                <Bot className="w-4 h-4 mr-2" />
                AI-Powered
              </Badge>
              <Badge className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white border-0 px-4 py-2">
                <Languages className="w-4 h-4 mr-2" />
                Bilingual Support
              </Badge>
              <Badge className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white border-0 px-4 py-2">
                <TrendingUp className="w-4 h-4 mr-2" />
                Result Driven
              </Badge>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
