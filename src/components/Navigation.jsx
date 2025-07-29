import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Lightbulb, User, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

const Navigation = () => {
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  const navItems = [
    { path: '/', icon: Home, label: 'Главная' },
    { path: '/tips', icon: Lightbulb, label: 'Советы' },
    { path: '/profile', icon: User, label: 'Профиль' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05, rotate: -2 }}
              className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"
            >
              Moy-Den
            </motion.div>
            <span className="hidden sm:inline text-sm text-muted-foreground">психо-дневник с душой и шутками</span>
          </Link>

          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="relative"
                  >
                    <Icon className={`w-4 h-4 mr-2 transition-colors ${isActive ? 'text-primary' : ''}`} />
                    <span className={`hidden md:inline transition-colors ${isActive ? 'text-primary font-semibold' : ''}`}>{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Button>
                </Link>
              );
            })}
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="ml-2 w-9 h-9"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isDark ? "moon" : "sun"}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </motion.div>
              </AnimatePresence>
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;