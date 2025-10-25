import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ArrowRight, Zap } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function CTASection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative overflow-hidden rounded-2xl border-2 border-transparent p-12"
            style={{
              backgroundImage: 'linear-gradient(#000, #000), linear-gradient(135deg, #a855f7, #06b6d4, #a855f7)',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box'
            }}
          >
            {/* Background Image Overlay */}
            <div className="absolute inset-0">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1644088379091-d574269d422f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHRlY2hub2xvZ3klMjBuZXR3b3JrfGVufDF8fHx8MTc2MTE2NzEwNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Technology Network"
                className="w-full h-full object-cover opacity-10"
              />
            </div>

            {/* Background decoration */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e520_1px,transparent_1px),linear-gradient(to_bottom,#4f46e520_1px,transparent_1px)] bg-[size:2rem_2rem]" />
            
            <div className="relative z-10 text-center">
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-transparent bg-black backdrop-blur-sm mb-6"
                whileHover={{ scale: 1.05 }}
                style={{
                  backgroundImage: 'linear-gradient(#000, #000), linear-gradient(90deg, #a855f7, #06b6d4)',
                  backgroundOrigin: 'border-box',
                  backgroundClip: 'padding-box, border-box'
                }}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Zap className="w-4 h-4 text-purple-300" />
                </motion.div>
                <span className="text-sm text-white">Limited Time Offer</span>
              </motion.div>

              <h2 className="mb-4 text-white">
                Ready to Grow Your Business?
              </h2>
              <p className="text-white mb-8 max-w-2xl mx-auto">
                Get a free consultation and discover how AI-powered marketing can elevate your brand.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-black border-2 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-500"
                />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white whitespace-nowrap group border-2 border-purple-400/50 shadow-lg shadow-purple-500/50">
                    Get Started
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              </div>

              <p className="text-sm text-white mt-4">
                No credit card required • Free consultation
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}