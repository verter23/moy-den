import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { User, Calendar, TrendingUp, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { toast } from '@/components/ui/use-toast';
import { useJournal } from '@/contexts/JournalContext';
import MoodChart from '@/components/MoodChart.jsx';
import LoginModal from '@/components/LoginModal.jsx';

const Profile = () => {
  const { currentUser, getUserEntries, logout } = useJournal();
  const [showLoginModal, setShowLoginModal] = useState(false);

  if (!currentUser) {
    return (
      <div className="min-h-full bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <Helmet>
          <title>Профиль - Moy-Den</title>
        </Helmet>
        
        <div className="max-w-2xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Card className="p-8 glass-effect rounded-2xl">
              <User className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h1 className="text-2xl font-bold mb-4">Добро пожаловать!</h1>
              <p className="text-muted-foreground mb-6">
                Войди в систему, чтобы увидеть свой профиль и статистику
              </p>
              <Button onClick={() => setShowLoginModal(true)} className="rounded-full">
                Войти в систему
              </Button>
            </Card>
          </motion.div>
        </div>

        <LoginModal 
          isOpen={showLoginModal} 
          onClose={() => setShowLoginModal(false)} 
        />
      </div>
    );
  }

  const userEntries = getUserEntries();
  const totalEntries = userEntries.length;
  const averageMood = totalEntries > 0 
    ? (userEntries.reduce((sum, entry) => sum + entry.mood[0], 0) / totalEntries).toFixed(1)
    : 0;

  const handleLogout = () => {
    logout();
    toast({
      title: "До свидания! 👋",
      description: "Ты успешно вышел из системы"
    });
  };

  const handleFeatureClick = (feature) => {
    toast({
      title: "🚧 Эта функция пока не реализована",
      description: "Но не волнуйся! Ты можешь запросить её в следующем сообщении! 🚀"
    });
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <Helmet>
        <title>Профиль - Moy-Den</title>
        <meta name="description" content="Твой личный профиль и статистика ведения дневника настроения" />
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              Твой профиль
            </h1>
            <p className="text-muted-foreground">
              Отслеживай свой прогресс и эмоциональное состояние
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Card className="p-6 glass-effect rounded-2xl">
                <div className="text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <div className="w-full h-full bg-gradient-to-r from-purple-400 to-blue-400 flex items-center justify-center text-white text-4xl font-bold">
                      {currentUser.name.charAt(0).toUpperCase()}
                    </div>
                  </Avatar>
                  <h2 className="text-2xl font-bold mb-2">{currentUser.name}</h2>
                  <p className="text-muted-foreground mb-4">{currentUser.email}</p>
                  
                  <div className="space-y-2 mb-6 text-left">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Записей в дневнике:</span>
                      <span className="font-semibold">{totalEntries}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Среднее настроение:</span>
                      <span className="font-semibold">{averageMood}/10</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Дней с нами:</span>
                      <span className="font-semibold">
                        {Math.ceil((new Date() - new Date(currentUser.joinDate)) / (1000 * 60 * 60 * 24))}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full rounded-full"
                      onClick={() => handleFeatureClick('settings')}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Настройки
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={handleLogout}
                      className="w-full rounded-full"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Выйти
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6 glass-effect rounded-2xl">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  График настроения
                </h3>
                <MoodChart />
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 glass-effect rounded-2xl">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Последние записи
                  </h3>
                  <div className="space-y-3">
                    {userEntries.slice(0, 3).map((entry) => (
                      <div key={entry.id} className="border-l-4 border-primary pl-4 py-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            {new Date(entry.date).toLocaleDateString('ru-RU')}
                          </span>
                          <span className="font-semibold">
                            Настроение: {entry.mood[0]}/10
                          </span>
                        </div>
                        {entry.thought && (
                          <p className="text-sm mt-1 truncate">
                            {entry.thought.substring(0, 50)}...
                          </p>
                        )}
                      </div>
                    ))}
                    {userEntries.length === 0 && (
                      <p className="text-muted-foreground text-center py-4">
                        Пока нет записей в дневнике
                      </p>
                    )}
                  </div>
                </Card>

                <Card className="p-6 glass-effect rounded-2xl">
                  <h3 className="text-lg font-semibold mb-4">Достижения 🏆</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">Первая запись</p>
                        <p className="text-sm text-muted-foreground">Сделал первую запись</p>
                      </div>
                      <span className="text-2xl">✨</span>
                    </div>
                    
                    {totalEntries >= 7 ? (
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-medium">Неделя записей</p>
                          <p className="text-sm text-muted-foreground">7 дней подряд</p>
                        </div>
                        <span className="text-2xl">🔥</span>
                      </div>
                    ) : (
                       <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg opacity-50">
                        <div>
                          <p className="font-medium">Неделя записей</p>
                          <p className="text-sm text-muted-foreground">7 дней подряд</p>
                        </div>
                        <span className="text-2xl">🔒</span>
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;