import React from "react";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import Features from "../components/Features";
import FeaturedCategories from "../components/FeaturedCategories";
import SpecialOffers from "../components/SpecialOffers";
import Breadcrumb from "../components/Breadcrumb";

export default function HomePage() {
  const breadcrumbItems = [{ name: "Home", href: "/", current: true }];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Breadcrumb items={breadcrumbItems} />
      <Hero />
      <FeaturedCategories />
      <SpecialOffers />
      <Features />
    </motion.div>
  );
}
