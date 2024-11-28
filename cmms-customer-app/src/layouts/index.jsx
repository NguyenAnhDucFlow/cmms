import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import StoreSelector from "../components/StoreSelector";
import useStoreLocation from "../stores/useStoreLocation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ChatbotButton from "../components/Chatbot/ChatbotButton";

const MainLayout = () => {
  const { selectedStore } = useStoreLocation();

  useEffect(() => {
    if (!selectedStore) {
      setShowStoreSelector(true);
    }
  }, [selectedStore]);

  const [showStoreSelector, setShowStoreSelector] = React.useState(
    !selectedStore
  );

  return (
    <>
      <div className="min-h-screen bg-white">
        <Navbar onStoreSelect={() => setShowStoreSelector(true)} />
        <Outlet />
        <Footer />
        <ChatbotButton />
        <StoreSelector
          isOpen={showStoreSelector}
          onClose={() => {
            if (selectedStore) {
              setShowStoreSelector(false);
            }
          }}
        />
      </div>
    </>
  );
};

export default MainLayout;
