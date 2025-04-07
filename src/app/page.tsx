// Estrutura de diretórios e arquivos principais

// app/page.tsx
import AlgorithmVisualizer from '@/components/AlgorithmVisualizer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AlgoViz - Visualizador Interativo de Algoritmos',
  description: 'Visualize e aprenda sobre algoritmos com animações interativas',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-slate-800 dark:text-white">
        AlgoViz <span className="text-indigo-600 dark:text-indigo-400">Visualizador</span>
      </h1>
      <p className="text-center text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10">
        Uma ferramenta interativa para visualizar algoritmos em ação, 
        perfeita para estudantes e entusiastas de ciência da computação.
      </p>
      <AlgorithmVisualizer />
    </main>
  );
}

