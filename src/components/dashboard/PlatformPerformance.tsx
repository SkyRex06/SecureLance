import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
const data = [
  { name: 'Jan', contracts: 30, value: 5000 },
  { name: 'Feb', contracts: 45, value: 7500 },
  { name: 'Mar', contracts: 60, value: 11000 },
  { name: 'Apr', contracts: 55, value: 9500 },
  { name: 'May', contracts: 70, value: 14000 },
  { name: 'Jun', contracts: 85, value: 16500 },
];
export const PlatformPerformance = () => {
  return (
    <section className="w-full max-w-6xl">
      <motion.h2 
        className="text-3xl md:text-4xl font-bold mb-8 text-center text-foreground"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        Platform Growth
      </motion.h2>
      <motion.div
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0}}
         viewport={{ once: true, amount: 0.3 }}
         transition={{ duration: 0.6 }}
      >
        <Card className="bg-card/40 backdrop-blur-md border border-white/10 rounded-xl shadow-xl overflow-hidden p-6">
          <CardHeader className="p-0 pb-4">
             <CardTitle className="text-xl font-semibold text-foreground">Monthly Contracts & Value</CardTitle>
          </CardHeader>
          <CardContent className="p-0 h-[350px]"> {}
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                <XAxis dataKey="name" stroke="rgba(255, 255, 255, 0.5)" fontSize={12} />
                <YAxis yAxisId="left" stroke="rgba(155, 135, 245, 0.8)" fontSize={12} />
                <YAxis yAxisId="right" orientation="right" stroke="rgba(96, 165, 250, 0.8)" fontSize={12} />
                <Tooltip 
                   contentStyle={{ 
                      backgroundColor: 'rgba(17, 24, 39, 0.8)', 
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px'
                   }}
                   itemStyle={{ color: '#d1d5db' }} 
                   labelStyle={{ color: '#ffffff' }} 
                 />
                <Line yAxisId="left" type="monotone" dataKey="value" name="Value (USD)" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, fill: 'hsl(var(--primary))' }} activeDot={{ r: 6 }} />
                <Line yAxisId="right" type="monotone" dataKey="contracts" name="Contracts" stroke="#60A5FA" strokeWidth={2} dot={{ r: 4, fill: '#60A5FA' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
};
