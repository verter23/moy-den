import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useJournal } from '@/contexts/JournalContext';
import { Card } from '@/components/ui/card';

const MoodChart = () => {
  const { getLastWeekEntries } = useJournal();
  const entries = getLastWeekEntries();

  const chartData = entries
    .slice(0, 7)
    .reverse()
    .map((entry, index) => ({
      day: new Date(entry.date).toLocaleDateString('ru-RU', { 
        weekday: 'short',
        day: 'numeric',
        month: 'short'
      }),
      mood: entry.mood[0],
      energy: entry.energy[0]
    }));

  if (chartData.length === 0) {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground">
          Пока недостаточно данных для отображения графика. 
          Продолжай вести дневник! 📊
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">График настроения за неделю</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="day" 
              className="text-xs"
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              domain={[1, 10]}
              className="text-xs"
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                color: 'hsl(var(--card-foreground))'
              }}
              labelStyle={{ color: 'hsl(var(--muted-foreground))' }}
            />
            <Line 
              type="monotone" 
              dataKey="mood" 
              stroke="hsl(var(--primary))" 
              strokeWidth={3}
              dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
              name="Настроение"
            />
            <Line 
              type="monotone" 
              dataKey="energy" 
              stroke="hsl(var(--secondary-foreground))" 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: 'hsl(var(--secondary-foreground))', strokeWidth: 2, r: 3 }}
              name="Энергия"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center space-x-6 mt-4 text-sm">
        <div className="flex items-center">
          <div className="w-4 h-0.5 bg-primary mr-2"></div>
          <span>Настроение</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-0.5 bg-secondary-foreground mr-2 border-dashed border-t-2"></div>
          <span>Энергия</span>
        </div>
      </div>
    </Card>
  );
};

export default MoodChart;