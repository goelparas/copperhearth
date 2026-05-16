import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureBar from "@/components/FeatureBar";
import ComparisonSection from "@/components/ComparisonSection";
import ProductDetails from "@/components/ProductDetails";
import PrelaunchSignup from "@/components/PrelaunchSignup";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background selection:bg-brand-copper selection:text-white">
      <Banner />
      <Navbar />
      <Hero />
      <FeatureBar />
      <ComparisonSection />
      <ProductDetails />
      <PrelaunchSignup />
      <Footer />
    </main>
  );
}
