import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ArrowRight, Zap, CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabase"; // Apni supabase file import karo

export function CTASection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success', 'error', or null

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email validation
    if (!email || !email.includes('@')) {
      setStatus({ type: 'error', message: 'Please enter a valid email' });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      // Supabase mein data insert karo
      const { data, error } = await supabase
        .from('email_subscribers')
        .insert([{ email: email }])
        .select();

      if (error) {
        // Duplicate email check
        if (error.code === '23505') {
          setStatus({ type: 'error', message: 'This email is already registered!' });
        } else {
          setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
        }
      } else {
        setStatus({ type: 'success', message: 'Successfully subscribed! 🎉' });
        setEmail(''); // Clear input
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
      // Auto-hide message after 5 seconds
      setTimeout(() => setStatus(null), 5000);
    }
  };

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

              <h2 className="mb-4 text-white text-3xl font-bold">
                Ready to Grow Your Business?
              </h2>
              <p className="text-white mb-8 max-w-2xl mx-auto">
                Get a free consultation and discover how AI-powered marketing can elevate your brand.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="bg-black border-2 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-500 disabled:opacity-50"
                />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white whitespace-nowrap group border-2 border-purple-400/50 shadow-lg shadow-purple-500/50 disabled:opacity-50"
                  >
                    {loading ? 'Submitting...' : 'Get Started'}
                    {!loading && <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                  </Button>
                </motion.div>
              </form>

              {/* Success/Error Messages */}
              <AnimatePresence>
                {status && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`mt-4 p-3 rounded-lg flex items-center justify-center gap-2 ${status.type === 'success'
                      ? 'bg-green-500/20 border border-green-500/50 text-green-300'
                      : 'bg-red-500/20 border border-red-500/50 text-red-300'
                      }`}
                  >
                    {status.type === 'success' ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <AlertCircle className="w-5 h-5" />
                    )}
                    <span className="text-sm font-medium text-white">{status.message}</span>
                  </motion.div>
                )}
              </AnimatePresence>

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