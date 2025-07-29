import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import { useJournal } from '@/contexts/JournalContext';

const LoginModal = ({ isOpen, onClose }) => {
  const { login } = useJournal();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполни все поля",
        variant: "destructive"
      });
      return;
    }

    if (!isLogin && !formData.name) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, введи своё имя",
        variant: "destructive"
      });
      return;
    }

    const userData = {
      id: Date.now(),
      name: formData.name || formData.email.split('@')[0],
      email: formData.email,
      joinDate: new Date().toISOString()
    };

    login(userData);
    
    toast({
      title: isLogin ? "Добро пожаловать! 🎉" : "Регистрация успешна! 🎉",
      description: `Привет, ${userData.name}! Готов начать вести дневник?`
    });

    onClose();
    
    setFormData({ name: '', email: '', password: '' });
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '' });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {isLogin ? 'Добро пожаловать!' : 'Создать аккаунт'}
          </DialogTitle>
          <DialogDescription className="text-center">
            {isLogin 
              ? 'Войди в свой аккаунт, чтобы продолжить ведение дневника'
              : 'Создай аккаунт, чтобы начать вести свой психо-дневник'
            }
          </DialogDescription>
        </DialogHeader>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {!isLogin && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Имя</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Твоё имя"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder="твой@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Пароль</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            {isLogin ? 'Войти' : 'Создать аккаунт'}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={toggleMode}
              className="text-sm text-primary hover:underline"
            >
              {isLogin 
                ? 'Нет аккаунта? Создать новый'
                : 'Уже есть аккаунт? Войти'
              }
            </button>
          </div>
        </motion.form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;