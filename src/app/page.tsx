import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureBar from "@/components/FeatureBar";
import ProductDetails from "@/components/ProductDetails";
import FeatureSection from "@/components/FeatureSection";
import VoteSection from "@/components/VoteSection";
import PrelaunchSignup from "@/components/PrelaunchSignup";
import Footer from "@/components/Footer";
import DiscountModal from "@/components/DiscountModal";

export default function Home() {
  return (
    <main className="min-h-screen bg-background selection:bg-brand-copper selection:text-white">
      <Banner />
      <Navbar />
      <Hero />
      <FeatureBar />
      <FeatureSection />
      <VoteSection />
      <ProductDetails />
      <PrelaunchSignup />
      <Footer />
      <DiscountModal />
    </main>
  );
}
