// components/visualizers/PathfindingVisualizer.tsx
'use client';

export default function PathfindingVisualizer({
  algorithm,
  step,
  isPlaying,
  speed,
  setExplanation,
}) {
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <p className="text-slate-600 dark:text-slate-300">
        Visualizador de algoritmos de grafos: {algorithm}
      </p>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
        Implementação completa em um projeto real
      </p>
    </div>
  );
}