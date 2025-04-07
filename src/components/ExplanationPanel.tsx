// components/ExplanationPanel.tsx
'use client';

import { motion } from 'framer-motion';

type ExplanationPanelProps = {
  explanation: string;
};

export default function ExplanationPanel({ explanation }: ExplanationPanelProps) {
  return (
    <motion.div 
      className="mt-6 p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
        Explicação
      </h3>
      <p className="text-slate-600 dark:text-slate-400">
        {explanation || "Selecione um algoritmo e clique em reproduzir para ver a explicação."}
      </p>
    </motion.div>
  );
}

