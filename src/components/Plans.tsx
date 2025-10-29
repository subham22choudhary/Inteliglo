import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Check,
  Sparkles,
  Rocket,
  Briefcase,
  Brain,
  Calendar,
  Globe,
  Search,
  Bot,
  Share2,
  DollarSign,
  BarChart3,
  Headphones,
  Target,
  Zap,
  ArrowRight,
  Palette,
  TrendingUp,
  Settings
} from "lucide-react";
import { motion } from "motion/react";

const pricingPlans = [
  {
    id: "free",
    name: "Free Starter Plan",
    icon: Sparkles,
    color: "from-slate-600 to-slate-800",
    borderColor: "from-slate-500 to-slate-700",
    price: "Free",
    duration: "1 Month (Trial)",
    description: "Perfect for startups & small businesses testing digital marketing",
    features: [
      { name: "Consultation Meetings", value: "4 Meetings (1 Hr Each)", icon: Calendar },
      { name: "Website Audit & Recommendations", value: "✅ Included", icon: Globe },
      { name: "Web Design Fixes (UI/UX)", value: "Basic Fixes (Homepage & 1 Inner Page)", icon: Palette },
      { name: "Web Development Support", value: "Guidance & Bug Fixes", icon: Settings },
      { name: "SEO Setup", value: "Basic SEO Setup (Titles, Meta, Sitemap)", icon: Search },
      { name: "AI Consultation", value: "AI Tools Suggestion", icon: Bot },
      { name: "Social Media", value: "1 Platform Audit", icon: Share2 },
      { name: "Google Ads / Meta Ads", value: "Strategy Guidance", icon: DollarSign },
      { name: "Monthly Reporting", value: "Basic Report", icon: BarChart3 },
      { name: "Support", value: "Email Support + Weekly Calls", icon: Headphones }
    ],
    cta: "Start Free Trial",
    popular: false
  },
  {
    id: "growth",
    name: "Growth Plan",
    icon: Rocket,
    color: "from-purple-600 to-purple-800",
    borderColor: "from-purple-500 to-purple-700",
    price: "$499",
    duration: "3 Months",
    description: "Ideal for growing businesses ready to scale",
    features: [
      { name: "Consultation Meetings", value: "6 Meetings", icon: Calendar },
      { name: "Website Audit & Recommendations", value: "✅ Deep Audit", icon: Globe },
      { name: "Web Design Fixes (UI/UX)", value: "Up to 5 Pages", icon: Palette },
      { name: "Web Development Support", value: "Minor Development Tasks", icon: Settings },
      { name: "SEO Setup", value: "On-Page Optimization", icon: Search },
      { name: "AI Consultation", value: "AI Chatbot / Content Ideas", icon: Bot },
      { name: "Social Media", value: "2 Platforms Management", icon: Share2 },
      { name: "Google Ads / Meta Ads", value: "Campaign Setup", icon: DollarSign },
      { name: "Monthly Reporting", value: "Detailed Report", icon: BarChart3 },
      { name: "Support", value: "Priority Support", icon: Headphones }
    ],
    cta: "Get Started",
    popular: true
  },
  {
    id: "pro",
    name: "Pro Plan",
    icon: Briefcase,
    color: "from-cyan-600 to-cyan-800",
    borderColor: "from-cyan-500 to-cyan-700",
    price: "$999",
    duration: "6 Months",
    description: "Perfect for established brands seeking excellence",
    features: [
      { name: "Consultation Meetings", value: "12 Meetings", icon: Calendar },
      { name: "Website Audit & Recommendations", value: "✅ Full Technical + UX Audit", icon: Globe },
      { name: "Web Design Fixes (UI/UX)", value: "Full Website Revamp", icon: Palette },
      { name: "Web Development Support", value: "Full Stack Enhancement", icon: Settings },
      { name: "SEO Setup", value: "On-Page + Off-Page + Technical SEO", icon: Search },
      { name: "AI Consultation", value: "AI Automation Integration", icon: Bot },
      { name: "Social Media", value: "3 Platforms + Paid Ad Strategy", icon: Share2 },
      { name: "Google Ads / Meta Ads", value: "Ongoing Optimization", icon: DollarSign },
      { name: "Monthly Reporting", value: "In-Depth Analytics Dashboard", icon: BarChart3 },
      { name: "Support", value: "Dedicated Account Manager", icon: Headphones }
    ],
    cta: "Choose Pro",
    popular: false
  },
  {
    id: "enterprise",
    name: "Enterprise / Custom Plan",
    icon: Brain,
    color: "from-purple-600 to-cyan-600",
    borderColor: "from-purple-500 to-cyan-500",
    price: "Custom",
    duration: "Custom Duration",
    description: "For enterprises & global clients with unique needs",
    features: [
      { name: "Consultation Meetings", value: "Unlimited (As Needed)", icon: Calendar },
      { name: "Website Audit & Recommendations", value: "✅ Custom Strategy", icon: Globe },
      { name: "Web Design Fixes (UI/UX)", value: "Custom Scope", icon: Palette },
      { name: "Web Development Support", value: "Custom Integration", icon: Settings },
      { name: "SEO Setup", value: "Enterprise SEO Strategy", icon: Search },
      { name: "AI Consultation", value: "Full AI-Powered Marketing Suite", icon: Bot },
      { name: "Social Media", value: "Fully Managed (All Platforms)", icon: Share2 },
      { name: "Google Ads / Meta Ads", value: "Performance-Based Scaling", icon: DollarSign },
      { name: "Monthly Reporting", value: "Custom KPI Dashboard", icon: BarChart3 },
      { name: "Support", value: "Dedicated Team + SLA Support", icon: Headphones }
    ],
    cta: "Contact Sales",
    popular: false
  }
];

const addOnServices = [
  { name: "Web Design / Redesign", icon: Palette },
  { name: "Website Development", icon: Globe },
  { name: "SEO (On-Page / Off-Page / Technical)", icon: Search },
  { name: "AI Chatbots / Automation", icon: Bot },
  { name: "Social Media Management", icon: Share2 },
  { name: "Paid Ads (Google / Meta / LinkedIn)", icon: DollarSign },
  { name: "Branding & Creative", icon: Sparkles },
  { name: "Analytics & Conversion Optimization", icon: TrendingUp }
];

export function Plans() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black backdrop-blur-sm border-2 border-transparent relative mb-6"
            whileHover={{ scale: 1.05 }}
            style={{
              backgroundImage: 'linear-gradient(#000, #000), linear-gradient(90deg, #a855f7, #06b6d4)',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box'
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Target className="w-5 h-5 text-purple-400" />
            </motion.div>
            <span className="text-white">Flexible Pricing Plans</span>
          </motion.div>
          <h2 className="mb-4 text-white">
            Choose Your Growth Path
          </h2>
          <p className="text-white max-w-2xl mx-auto">
            Plans designed for businesses at every stage. Start free and scale as you grow.
          </p>
        </motion.div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pricingPlans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <Badge className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white border-0 px-4 py-1 shadow-lg">
                      <Zap className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <Card
                  className={`h-full bg-black backdrop-blur-sm border-2 border-transparent p-6 hover:shadow-2xl transition-all duration-500 ${plan.popular ? 'scale-105 lg:scale-110' : 'hover:scale-105'
                    }`}
                  style={{
                    backgroundImage: `linear-gradient(#000, #000), linear-gradient(135deg, ${plan.borderColor.replace('from-', '#').replace(' to-', ', #')})`,
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'padding-box, border-box'
                  }}
                >
                  {/* Plan Header */}
                  <div className="text-center mb-6">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${plan.color} mb-4`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-white mb-2">{plan.name}</h3>
                    <p className="text-white text-sm mb-4">{plan.description}</p>

                    <div className="mb-4">
                      <div className="text-white mb-1">
                        {plan.price === "Free" ? (
                          <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                            {plan.price}
                          </span>
                        ) : plan.price === "Custom" ? (
                          <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                            {plan.price} Quote
                          </span>
                        ) : (
                          <>
                            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">{plan.price}</span>
                            <span className="text-white text-lg">/month</span>
                          </>
                        )}
                      </div>
                      <p className="text-sm text-white">{plan.duration}</p>
                    </div>

                    {/* <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button 
                        className={`w-full ${
                          plan.popular 
                            ? 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-2 border-purple-400/50 shadow-lg shadow-purple-500/50' 
                            : 'bg-gray-900 hover:bg-gray-800 text-white border-2 border-purple-500/30'
                        }`}
                      >
                        {plan.cta}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </motion.div> */}
                  </div>

                  {/* Features List */}
                  <div className="space-y-3">
                    {plan.features.map((feature, idx) => {
                      const FeatureIcon = feature.icon;
                      return (
                        <div key={idx} className="flex items-start gap-2 text-sm">
                          <FeatureIcon className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="text-white text-xs opacity-70">{feature.name}</div>
                            <div className="text-white">{feature.value}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Add-On / Custom Plan Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <Card className="bg-black backdrop-blur-sm border-2 border-transparent p-8"
            style={{
              backgroundImage: 'linear-gradient(#000, #000), linear-gradient(135deg, #a855f7, #06b6d4, #a855f7)',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box'
            }}
          >
            <div className="text-center mb-8">
              <motion.div
                className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-600 mb-4"
                whileHover={{ rotate: 180, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <Settings className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-white mb-2">Custom Solutions</h3>
              <p className="text-white">
                Build your own plan with services tailored to your goals
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {addOnServices.map((service, idx) => {
                const ServiceIcon = service.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center gap-3 p-4 rounded-lg bg-black border-2 border-transparent hover:scale-105 transition-all cursor-pointer"
                    style={{
                      backgroundImage: 'linear-gradient(#000, #000), linear-gradient(135deg, #a855f7, #06b6d4)',
                      backgroundOrigin: 'border-box',
                      backgroundClip: 'padding-box, border-box'
                    }}
                  >
                    <motion.div
                      className="p-2 rounded-lg bg-gradient-to-br from-purple-600/30 to-cyan-600/30"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <ServiceIcon className="w-5 h-5 text-purple-400" />
                    </motion.div>
                    <span className="text-white text-sm">{service.name}</span>
                  </motion.div>
                );
              })}
            </div>

            {/* <div className="text-center p-6 rounded-xl bg-black border-2 border-purple-500/30">
              <p className="text-white mb-4">
                Custom pricing based on your specific requirements
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-2 border-purple-400/50 shadow-lg shadow-purple-500/50">
                  Request Custom Quote
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </motion.div>
            </div> */}
          </Card>
        </motion.div>

        {/* About Free Plan Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-black backdrop-blur-sm border-2 border-transparent p-8"
            style={{
              backgroundImage: 'linear-gradient(#000, #000), linear-gradient(135deg, #a855f7, #06b6d4)',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box'
            }}
          >
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 mb-4">
                  <Sparkles className="w-4 h-4 text-purple-300 animate-pulse" />
                  <span className="text-sm text-white">Free Starter Plan</span>
                </div>
                <h3 className="text-white mb-4">About the Free Starter Plan</h3>
                <p className="text-white mb-6">
                  One month free trial to build your digital foundation. Perfect for startups testing digital marketing.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-purple-600/20 border border-purple-500/30">
                      <Check className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-white mb-1">4 Strategy Consultations</h4>
                      <p className="text-white text-sm">Weekly one-hour sessions to align your goals</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-purple-600/20 border border-purple-500/30">
                      <Check className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-white mb-1">Website Optimization</h4>
                      <p className="text-white text-sm">Critical fixes and basic SEO setup</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-purple-600/20 border border-purple-500/30">
                      <Check className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-white mb-1">Strategy Foundation</h4>
                      <p className="text-white text-sm">Digital marketing foundation setup</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-2xl blur-2xl" />
                <div className="relative p-8 rounded-2xl border-2 border-transparent bg-black backdrop-blur-sm"
                  style={{
                    backgroundImage: 'linear-gradient(#000, #000), linear-gradient(135deg, #a855f7, #06b6d4)',
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'padding-box, border-box'
                  }}
                >
                  <div className="text-center">
                    <motion.div
                      className="inline-flex p-6 rounded-full bg-gradient-to-br from-purple-600 to-cyan-600 mb-4"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Rocket className="w-12 h-12 text-white" />
                    </motion.div>
                    <h4 className="text-white mb-2">Ready to Get Started?</h4>
                    <p className="text-white mb-6">
                      No credit card required. Start free today.
                    </p>
                    {/* <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button size="lg" className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-2 border-purple-400/50 shadow-lg shadow-purple-500/50">
                        Claim Your Free Trial
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </motion.div> */}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
