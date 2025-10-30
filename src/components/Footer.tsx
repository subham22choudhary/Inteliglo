import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t-2 border-transparent relative bg-black"
      style={{
        borderImage: 'linear-gradient(90deg, #a855f7, #06b6d4, #a855f7) 1'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="mb-4 text-white">
              Inteliglo
            </h3>
            <p className="text-white mb-4">
              AI-powered digital marketing solutions for Future businesses.
            </p>
            <div className="flex gap-3">
              <a href="https://www.facebook.com/profile.php?id=61582880315474" className="p-2 rounded-lg bg-black border-2 border-transparent hover:scale-110 transition-transform text-white"
                style={{
                  backgroundImage: 'linear-gradient(#000, #000), linear-gradient(135deg, #a855f7, #06b6d4)',
                  backgroundOrigin: 'border-box',
                  backgroundClip: 'padding-box, border-box'
                }}
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/inteliglo/" className="p-2 rounded-lg bg-black border-2 border-transparent hover:scale-110 transition-transform text-white"
                style={{
                  backgroundImage: 'linear-gradient(#000, #000), linear-gradient(135deg, #a855f7, #06b6d4)',
                  backgroundOrigin: 'border-box',
                  backgroundClip: 'padding-box, border-box'
                }}
              >
                <Instagram className="w-5 h-5" />
              </a>
              {/* <a href="#" className="p-2 rounded-lg bg-black border-2 border-transparent hover:scale-110 transition-transform text-white"
                style={{
                  backgroundImage: 'linear-gradient(#000, #000), linear-gradient(135deg, #a855f7, #06b6d4)',
                  backgroundOrigin: 'border-box',
                  backgroundClip: 'padding-box, border-box'
                }}
              >
                <Linkedin className="w-5 h-5" />
              </a> */}
              <a href="https://x.com/inteliglo" className="p-2 rounded-lg bg-black border-2 border-transparent hover:scale-110 transition-transform text-white"
                style={{
                  backgroundImage: 'linear-gradient(#000, #000), linear-gradient(135deg, #a855f7, #06b6d4)',
                  backgroundOrigin: 'border-box',
                  backgroundClip: 'padding-box, border-box'
                }}
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white hover:text-purple-400 transition-colors">Website Development</a></li>
              <li><a href="#" className="text-white hover:text-purple-400 transition-colors">Social Media Marketing</a></li>
              <li><a href="#" className="text-white hover:text-purple-400 transition-colors">SEO Services</a></li>
              <li><a href="#" className="text-white hover:text-purple-400 transition-colors">Paid Advertising</a></li>
              <li><a href="#" className="text-white hover:text-purple-400 transition-colors">Content Marketing</a></li>
            </ul>
          </div>

          {/* Company */}
          {/* <div>
            <h4 className="text-white mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white hover:text-purple-400 transition-colors">About Us</a></li>
              <li><a href="#" className="text-white hover:text-purple-400 transition-colors">Our Work</a></li>
              <li><a href="#" className="text-white hover:text-purple-400 transition-colors">Careers</a></li>
              <li><a href="#" className="text-white hover:text-purple-400 transition-colors">Blog</a></li>
              <li><a href="#" className="text-white hover:text-purple-400 transition-colors">Contact</a></li>
            </ul>
          </div> */}

          {/* Contact */}
          <div>
            <h4 className="text-white mb-4">Get in Touch</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-white">
                <Mail className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <span>hello@inteliglo.com</span>
              </li>
              {/* <li className="flex items-start gap-3 text-white">
                <Phone className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <span>+91 99994 26869</span>
              </li> */}
              <li className="flex items-start gap-3 text-white">
                <MapPin className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <span>India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t-2 border-transparent flex flex-col md:flex-row justify-center items-center gap-4"
          style={{
            borderImage: 'linear-gradient(90deg, #a855f7, #06b6d4) 1'
          }}
        >
          <p className="text-white text-sm">
            © 2025 Inteliglo. All rights reserved.
          </p>
          {/* <div className="flex gap-6 text-sm">
            <a href="#" className="text-white hover:text-purple-400 transition-colors">Privacy Policy</a>
            <a href="#" className="text-white hover:text-purple-400 transition-colors">Terms of Service</a>
            <a href="#" className="text-white hover:text-purple-400 transition-colors">Cookie Policy</a>
          </div> */}
        </div>
      </div>
    </footer>
  );
}