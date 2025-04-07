// components/AlgorithmSelector.tsx
'use client';

import { Tab } from '@headlessui/react';
import { motion } from 'framer-motion';

type AlgorithmProps = {
  currentAlgorithm: string;
  onChange: (algorithm: any) => void;
};

export default function AlgorithmSelector({ currentAlgorithm, onChange }: AlgorithmProps) {
  const categories = [
    {
      name: 'Ordenação',
      algorithms: [
        { id: 'bubble', name: 'Bubble Sort' },
        { id: 'quick', name: 'Quick Sort' },
        { id: 'merge', name: 'Merge Sort' },
        { id: 'insertion', name: 'Insertion Sort' },
        { id: 'selection', name: 'Selection Sort' },
      ],
    },
    {
      name: 'Busca',
      algorithms: [
        { id: 'binarySearch', name: 'Busca Binária' },
        { id: 'linearSearch', name: 'Busca Linear' },
      ],
    },
    {
      name: 'Grafos',
      algorithms: [
        { id: 'dijkstra', name: 'Dijkstra' },
        { id: 'aStar', name: 'A*' },
        { id: 'bfs', name: 'Busca em Largura' },
        { id: 'dfs', name: 'Busca em Profundidade' },
      ],
    },
  ];

  return (
    <div className="w-full">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-slate-100 dark:bg-slate-700 p-1">
          {categories.map((category) => (
            <Tab
              key={category.name}
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                 ${
                   selected
                     ? 'bg-indigo-600 text-white shadow'
                     : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                 }`
              }
            >
              {category.name}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {categories.map((category, idx) => (
            <Tab.Panel
              key={idx}
              className="rounded-xl bg-white dark:bg-slate-800 p-3"
            >
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
                {category.algorithms.map((algorithm) => (
                  <motion.button
                    key={algorithm.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onChange(algorithm.id)}
                    className={`rounded-lg py-2 px-4 text-sm ${
                      currentAlgorithm === algorithm.id
                        ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 font-medium'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {algorithm.name}
                  </motion.button>
                ))}
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}