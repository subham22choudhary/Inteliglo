import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { Plans } from "./components/Plans";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <div id="home">
        <Hero />
      </div>
      <div id="services">
        <Services />
      </div>
      <div id="plans">
        <Plans />
      </div>
      {/* <div id="contact">
        <CTASection />
      </div> */}
      <Footer />
    </div>
  );
}