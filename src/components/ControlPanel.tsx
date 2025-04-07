
// components/ControlPanel.tsx
'use client';

import { Pause, Play, RotateCcw, SkipBack, SkipForward } from 'lucide-react';
import { motion } from 'framer-motion';

type ControlPanelProps = {
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  speed: number;
  setSpeed: (speed: number) => void;
  onReset: () => void;
  step: number;
  setStep: (step: number) => void;
  arraySize: number;
  setArraySize: (size: number) => void;
  algorithm: string;
};

export default function ControlPanel({
  isPlaying,
  setIsPlaying,
  speed,
  setSpeed,
  onReset,
  step,
  setStep,
  arraySize,
  setArraySize,
  algorithm,
}: ControlPanelProps) {
  return (
    <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
      <div className="flex flex-wrap gap-4 justify-center items-center">
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setStep(Math.max(0, step - 1))}
            className="p-2 rounded-full bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-200"
            aria-label="Passo anterior"
          >
            <SkipBack size={20} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-full bg-indigo-600 text-white"
            aria-label={isPlaying ? "Pausar" : "Reproduzir"}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setStep(step + 1)}
            className="p-2 rounded-full bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-200"
            aria-label="Próximo passo"
          >
            <SkipForward size={20} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onReset}
            className="p-2 rounded-full bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-200"
            aria-label="Reiniciar"
          >
            <RotateCcw size={20} />
          </motion.button>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600 dark:text-slate-300">Velocidade:</span>
          <input
            type="range"
            min="1"
            max="100"
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value))}
            className="w-32"
          />
        </div>
        
        {(['bubble', 'quick', 'merge', 'insertion', 'selection'].includes(algorithm)) && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-600 dark:text-slate-300">Tamanho do array:</span>
            <input
              type="range"
              min="5"
              max="50"
              value={arraySize}
              onChange={(e) => setArraySize(parseInt(e.target.value))}
              className="w-32"
              disabled={isPlaying}
            />
            <span className="text-sm text-slate-600 dark:text-slate-300">{arraySize}</span>
          </div>
        )}
      </div>
    </div>
  );
}