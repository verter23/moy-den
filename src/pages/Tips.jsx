import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Wind, TreePine, PenTool, Music, BrainCircuit, Ear } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import useEmblaCarousel from 'embla-carousel-react';

const Tips = () => {
  const tips = [
    {
      id: 1,
      title: 'Дыхание 4-7-8',
      description: 'Вдохни на 4 счёта, задержи на 7, выдохни на 8. Идеально для успокоения перед сном или в момент стресса.',
      icon: Wind,
      color: 'from-blue-400 to-cyan-400',
      duration: '5 минут'
    },
    {
      id: 2,
      title: 'Прогулка без телефона',
      description: 'Оставь гаджеты дома и просто иди. Наблюдай за миром вокруг, слушай звуки, чувствуй ветер. Перезагрузка обеспечена.',
      icon: TreePine,
      color: 'from-green-400 to-emerald-400',
      duration: '15-30 минут'
    },
    {
      id: 3,
      title: 'Медитация на звуки',
      description: 'Сядь удобно, закрой глаза и просто слушай. Какие звуки тебя окружают? Далёкие и близкие. Не оценивай, просто замечай.',
      icon: Ear,
      color: 'from-indigo-400 to-purple-400',
      duration: '10 минут'
    },
    {
      id: 4,
      title: 'Техника 5-4-3-2-1',
      description: 'Назови 5 вещей, которые видишь, 4 — которые можешь потрогать, 3 — которые слышишь, 2 — которые можешь понюхать, и 1 — которую можешь попробовать. Возвращает в "здесь и сейчас".',
      icon: BrainCircuit,
      color: 'from-amber-400 to-orange-400',
      duration: '5 минут'
    },
    {
      id: 5,
      title: 'Музыка для фокуса',
      description: 'Включи плейлист с lo-fi, классической музыкой или звуками природы. Помогает сконцентрироваться и снизить фоновую тревогу.',
      icon: Music,
      color: 'from-rose-400 to-pink-400',
      duration: 'Пока работаешь'
    },
    {
      id: 6,
      title: 'Дневник благодарности',
      description: 'Запиши 3 вещи, за которые ты благодарен сегодня. Это может быть что угодно: от вкусного кофе до улыбки незнакомца.',
      icon: PenTool,
      color: 'from-purple-400 to-violet-400',
      duration: '5 минут'
    }
  ];

  const handleTryTip = (tip) => {
    toast({
      title: "Отличный выбор! 🌟",
      description: `Попробуй "${tip.title}" прямо сейчас. Это займёт всего ${tip.duration}.`
    });
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <Helmet>
        <title>Практики и советы - Moy-Den</title>
        <meta name="description" content="Практические советы и техники для улучшения настроения и эмоционального состояния" />
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            Практики для души и разума
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Простые упражнения, которые помогут тебе найти баланс и спокойствие.
          </p>
        </motion.div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {tips.map((tip) => {
              const Icon = tip.icon;
              return (
                <CarouselItem key={tip.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="h-full glass-effect rounded-2xl overflow-hidden group">
                      <CardContent className="flex flex-col items-center justify-between p-6 h-full">
                        <div className="w-full">
                          <div className="flex items-center mb-4">
                            <div className={`p-3 rounded-full bg-gradient-to-r ${tip.color} text-white mr-4`}>
                              <Icon className="w-6 h-6" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{tip.title}</h3>
                              <span className="text-sm text-muted-foreground">{tip.duration}</span>
                            </div>
                          </div>
                          <p className="text-muted-foreground mb-6 flex-grow">
                            {tip.description}
                          </p>
                        </div>
                        <Button 
                          onClick={() => handleTryTip(tip)}
                          className="w-full rounded-full group-hover:scale-105 transition-transform"
                          variant="outline"
                        >
                          Попробовать сейчас
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Card className="p-8 glass-effect rounded-2xl max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">💡 Помни</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Маленькие шаги каждый день приводят к большим изменениям. 
              Не обязательно делать всё сразу — выбери одну практику и попробуй её сегодня.
              Твоё эмоциональное здоровье важно! 🌟
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Tips;