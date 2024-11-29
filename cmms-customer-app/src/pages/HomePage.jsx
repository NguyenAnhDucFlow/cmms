import { useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import Navigation3D from "../components/home/Navigation3D";
import HeroSection from "../components/home/HeroSection";
import FeaturedProducts from "../components/home/FeaturedProducts";
import FeaturedProjects from "../components/home/FeaturedProjects";
import FeaturedCategories from "../components/FeaturedCategories";
import SpecialOffers from "../components/SpecialOffers";
import video from "../assets/856350-hd_1920_1080_30fps.mp4";

export default function HomePage() {
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    // Preload video
    const video = new Image();
    video.src = { video };
  }, []);

  return (
    <div className="relative">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      <Navigation3D />
      <HeroSection />
      <FeaturedCategories />
      <SpecialOffers />
      <FeaturedProducts />
      <FeaturedProjects />
    </div>
  );
}
