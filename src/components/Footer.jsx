import React from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Heart } from 'lucide-react';

const Footer = () => {
  const handleSupportClick = () => {
    toast({
      title: 'Спасибо за твою поддержку! ❤️',
      description: '🚧 Эта функция пока не реализована, но мы ценим твой интерес! 🚀',
    });
  };

  return (
    <footer className="bg-background/80 backdrop-blur-md border-t border-border/50 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground mb-2 sm:mb-0">
            © {new Date().getFullYear()} Moy-Den. Сделано с ❤️ для твоего спокойствия.
          </p>
          <Button variant="outline" size="sm" className="rounded-full" onClick={handleSupportClick}>
            <Heart className="w-4 h-4 mr-2 fill-red-500 text-red-500" />
            Поддержать проект
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;