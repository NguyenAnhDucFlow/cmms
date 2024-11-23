import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';
import StoreSelector from './components/StoreSelector';
import ProductsPage from './components/ProductsPage';

function App() {
  const [showStoreSelector, setShowStoreSelector] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navbar onStoreSelect={() => setShowStoreSelector(true)} />
      <Hero />
      <ProductsPage />
      <Features />
      <Footer />
      
      <StoreSelector
        isOpen={showStoreSelector}
        onClose={() => setShowStoreSelector(false)}
      />
    </div>
  );
}

export default App;