import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Heart, Cloud, Sun, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { useJournal } from '@/contexts/JournalContext';
import MoodChart from '@/components/MoodChart.jsx';
import AIResponse from '@/components/AIResponse.jsx';
import LoginModal from '@/components/LoginModal.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Home = () => {
  const { currentUser, addEntry } = useJournal();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState({
    mood: [5],
    anxiety: '',
    joy: '',
    thought: '',
    energy: 'средняя'
  });
  const [aiData, setAiData] = useState({ response: '', advice: '', emoji: '' });
  const [showResults, setShowResults] = useState(false);

  const quotes = [
    "Даже самый тёмный час длится всего 60 минут.",
    "Твои чувства — это как погода. Они приходят и уходят.",
    "Не забывай поливать свои мечты. И себя тоже.",
    "Если сомневаешься, просто сделай следующий маленький шаг.",
    "Ты сильнее, чем твой самый сильный эспрессо."
  ];
  const [quote, setQuote] = useState('');

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  const questions = [
    { id: 'mood', title: 'Оцени настроение по шкале от 1 до 10', type: 'slider', min: 1, max: 10, labels: ['Так себе', 'Великолепно'], icon: Heart },
    { id: 'anxiety', title: 'Что тебя тревожит?', type: 'textarea', placeholder: 'Можно быть откровенным, это только для тебя...', icon: Cloud },
    { id: 'joy', title: 'Что порадовало сегодня?', type: 'textarea', placeholder: 'Даже мелочи имеют значение...', icon: Sun },
    { id: 'thought', title: 'Мысль дня', type: 'textarea', placeholder: 'Какая идея не выходила из головы?', icon: Zap },
    { id: 'energy', title: 'Твоя энергия сегодня', type: 'tabs', options: ['низкая', 'средняя', 'высокая'], icon: Zap }
  ];

  useEffect(() => {
    if (!currentUser) {
      setShowLoginModal(true);
    }
  }, [currentUser]);

  const handleInputChange = (questionId, value) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
  };

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const generateAIStuff = (responses) => {
    const { mood: [mood], anxiety, joy, energy } = responses;
    let ai_response = '';
    let advice = '';
    let emoji = '😐';

    if (mood >= 8) {
      ai_response = 'Ого, да ты сегодня просто ходячий праздник! Если бы твоё настроение было акцией, я бы всё вложил в тебя. Так держать!';
      advice = 'Поделись своей энергией с кем-нибудь, это вернётся сторицей. Или просто купи себе что-то вкусное, ты заслужил!';
      emoji = '🎉';
    } else if (mood >= 6) {
      ai_response = 'Отличный день! Не идеально, но кто вообще идеален? Ты на верном пути, продолжай в том же духе.';
      advice = 'Вечером посмотри любимый фильм или сериал. Немного отдыха — то, что доктор прописал.';
      emoji = '😊';
    } else if (mood >= 4) {
      ai_response = 'Так, день был не из лёгких, но ты справился. Это как в спортзале: без нагрузки нет роста. Ты сегодня подкачался!';
      advice = 'Попробуй лечь спать пораньше. Завтра новый день и новые силы.';
      emoji = '🤔';
    } else {
      ai_response = 'Понимаю, сегодня было тяжело. Помни, даже у самых крутых супергероев бывают плохие дни. Главное — ты здесь, и это уже победа.';
      advice = 'Завари себе вкусный чай и обними подушку. Позволь себе быть слабым сегодня.';
      emoji = '😔';
    }

    if (joy.length > 5) {
      ai_response += ' А ещё и радость была! Ты просто молодец, что замечаешь хорошее.';
    }
    if (anxiety.length > 5) {
      ai_response += ' Тревоги — это нормально. Ты выговорился, и это уже полдела.';
    }
    if (energy === 'низкая') {
      advice = 'Твоя батарейка почти на нуле. Срочно на подзарядку! Отдых — это не роскошь, а необходимость.';
    }

    setAiData({ response: ai_response, advice, emoji });
  };

  const handleSubmit = () => {
    if (!currentUser) {
      toast({ title: "Ошибка", description: "Пожалуйста, войдите в систему", variant: "destructive" });
      return;
    }
    addEntry(responses);
    generateAIStuff(responses);
    setShowResults(true);
    toast({ title: "День сохранён! 🎉", description: "Твои записи добавлены в дневник" });
  };

  const resetForm = () => {
    setCurrentStep(0);
    setResponses({ mood: [5], anxiety: '', joy: '', thought: '', energy: 'средняя' });
    setShowResults(false);
    setAiData({ response: '', advice: '', emoji: '' });
  };

  const getMoodClass = () => (responses.mood[0] <= 3 ? 'mood-sad' : '');

  if (showResults) {
    return (
      <div className={`min-h-full ${getMoodClass()}`}>
        <Helmet><title>Результаты дня - Moy-Den</title></Helmet>
        <div className="floating-clouds">{[...Array(5)].map((_, i) => <div key={i} className="cloud" style={{ width: `${60 + Math.random() * 40}px`, height: `${30 + Math.random() * 20}px`, top: `${Math.random() * 60}%`, animationDelay: `${Math.random() * 20}s`, animationDuration: `${15 + Math.random() * 10}s` }} />)}</div>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="text-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }} className="text-6xl mb-4">{aiData.emoji}</motion.div>
              <h1 className="text-3xl font-bold mb-4">Спасибо, что поделился!</h1>
              <p className="text-muted-foreground">Вот что я думаю о твоём дне:</p>
            </div>
            <AIResponse response={aiData.response} advice={aiData.advice} />
            <MoodChart />
            <div className="text-center"><Button onClick={resetForm} size="lg" className="rounded-full">Записать новый день</Button></div>
          </motion.div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentStep];
  const Icon = currentQuestion.icon;

  return (
    <div className={`min-h-full ${getMoodClass()}`}>
      <Helmet><title>Как ты сегодня? - Moy-Den</title></Helmet>
      <div className="floating-clouds">{[...Array(5)].map((_, i) => <div key={i} className="cloud" style={{ width: `${60 + Math.random() * 40}px`, height: `${30 + Math.random() * 20}px`, top: `${Math.random() * 60}%`, animationDelay: `${Math.random() * 20}s`, animationDuration: `${15 + Math.random() * 10}s` }} />)}</div>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">Как ты сегодня?</h1>
            <p className="text-muted-foreground italic">"{quote}"</p>
          </div>
          <div className="w-full bg-secondary rounded-full h-2.5"><motion.div className="bg-primary h-2.5 rounded-full" initial={{ width: 0 }} animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }} transition={{ duration: 0.5, ease: "easeInOut" }} /></div>
          <AnimatePresence mode="wait">
            <motion.div key={currentStep} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
              <Card className="p-8 glass-effect rounded-2xl">
                <div className="text-center mb-8">
                  <Icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h2 className="text-2xl font-semibold">{currentQuestion.title}</h2>
                </div>
                {currentQuestion.type === 'slider' && (
                  <div className="space-y-4">
                    <Slider value={responses[currentQuestion.id]} onValueChange={(v) => handleInputChange(currentQuestion.id, v)} max={currentQuestion.max} min={currentQuestion.min} step={1} />
                    <div className="flex justify-between text-sm text-muted-foreground"><span>{currentQuestion.labels[0]}</span><span className="font-semibold text-lg text-primary">{responses[currentQuestion.id][0]}</span><span>{currentQuestion.labels[1]}</span></div>
                  </div>
                )}
                {currentQuestion.type === 'textarea' && <Textarea value={responses[currentQuestion.id]} onChange={(e) => handleInputChange(currentQuestion.id, e.target.value)} placeholder={currentQuestion.placeholder} className="min-h-[120px] resize-none rounded-xl" />}
                {currentQuestion.type === 'tabs' && (
                  <Tabs value={responses[currentQuestion.id]} onValueChange={(v) => handleInputChange(currentQuestion.id, v)} className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      {currentQuestion.options.map(opt => <TabsTrigger key={opt} value={opt} className="capitalize">{opt}</TabsTrigger>)}
                    </TabsList>
                  </Tabs>
                )}
              </Card>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-between">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === 0} className="rounded-full">Назад</Button>
            <Button onClick={nextStep} className="rounded-full">{currentStep === questions.length - 1 ? 'Сохранить день' : 'Далее'}</Button>
          </div>
        </motion.div>
      </div>
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  );
};

export default Home;