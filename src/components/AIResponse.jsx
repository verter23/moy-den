import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Lightbulb } from 'lucide-react';
import { Card } from '@/components/ui/card';

const AIResponse = ({ response, advice }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 glass-effect rounded-2xl border-primary/20">
        <div className="flex items-start space-x-4 mb-4">
          <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2 text-primary">
              Реакция ИИ
            </h3>
            <p className="text-foreground leading-relaxed">
              {response}
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-4 border-t border-border/50 pt-4">
          <div className="p-3 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2 text-amber-500">
              Совет на завтра
            </h3>
            <p className="text-foreground leading-relaxed">
              {advice}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default AIResponse;