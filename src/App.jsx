import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import Navigation from '@/components/Navigation.jsx';
import Home from '@/pages/Home.jsx';
import Tips from '@/pages/Tips.jsx';
import Profile from '@/pages/Profile.jsx';
import Footer from '@/components/Footer.jsx';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { JournalProvider } from '@/contexts/JournalContext';

function App() {
  return (
    <ThemeProvider>
      <JournalProvider>
        <Router>
          <div className="min-h-screen flex flex-col transition-colors duration-300">
            <Helmet>
              <title>Moy-Den — психо-дневник с душой и шутками</title>
              <meta name="description" content="Ведите дневник настроения, получайте поддержку ИИ и следите за своим эмоциональным состоянием каждый день" />
            </Helmet>
            
            <Navigation />
            
            <main className="pt-16 flex-grow">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/tips" element={<Tips />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </AnimatePresence>
            </main>
            
            <Footer />
            <Toaster />
          </div>
        </Router>
      </JournalProvider>
    </ThemeProvider>
  );
}

export default App;