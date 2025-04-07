// components/AlgorithmVisualizer.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AlgorithmSelector from './AlgorithmSelector';
import ControlPanel from './ControlPanel';
import SortingVisualizer from './visualizers/SortingVisualizer';
import PathfindingVisualizer from './visualizers/PathfindingVisualizer';
import SearchVisualizer from './visualizers/SearchVisualizer';
import ExplanationPanel from './ExplanationPanel';

type Algorithm = 'bubble' | 'quick' | 'merge' | 'insertion' | 'selection' | 
                 'binarySearch' | 'linearSearch' | 
                 'dijkstra' | 'aStar' | 'bfs' | 'dfs';

export default function AlgorithmVisualizer() {
  const [algorithm, setAlgorithm] = useState<Algorithm>('bubble');
  const [speed, setSpeed] = useState<number>(50);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [explanation, setExplanation] = useState<string>('');
  const [step, setStep] = useState<number>(0);
  const [arraySize, setArraySize] = useState<number>(25);
  const [array, setArray] = useState<number[]>([]);
  
  // Generate random array for algorithms
  useEffect(() => {
    generateRandomArray();
  }, [arraySize]);
  
  const generateRandomArray = () => {
    const newArray = Array.from({ length: arraySize }, () => 
      Math.floor(Math.random() * 100) + 5
    );
    setArray(newArray);
    setStep(0);
    setIsPlaying(false);
  };
  
  const handleAlgorithmChange = (algo: Algorithm) => {
    setAlgorithm(algo);
    setStep(0);
    setIsPlaying(false);
    
    // Set default explanation based on selected algorithm
    const explanations = {
      bubble: 'O Bubble Sort compara pares adjacentes e troca elementos fora de ordem.',
      quick: 'O Quick Sort usa a técnica "dividir para conquistar" com um elemento pivô.',
      merge: 'O Merge Sort divide o array recursivamente e mescla as partes ordenadas.',
      insertion: 'O Insertion Sort constrói um array ordenado um elemento por vez.',
      selection: 'O Selection Sort encontra o menor elemento e o move para a posição correta.',
      binarySearch: 'A Busca Binária encontra um elemento em um array ordenado dividindo-o pela metade.',
      linearSearch: 'A Busca Linear verifica cada elemento sequencialmente até encontrar o alvo.',
      dijkstra: 'O algoritmo de Dijkstra encontra o caminho mais curto em um grafo ponderado.',
      aStar: 'O A* é um algoritmo de busca informada que usa heurísticas para encontrar caminhos.',
      bfs: 'A Busca em Largura explora todos os vizinhos no nível atual antes de avançar.',
      dfs: 'A Busca em Profundidade explora um ramo até o fim antes de retroceder.'
    };
    
    setExplanation(explanations[algo]);
  };
  
  const renderVisualizer = () => {
    if (['bubble', 'quick', 'merge', 'insertion', 'selection'].includes(algorithm)) {
      return <SortingVisualizer 
        algorithm={algorithm} 
        array={array} 
        step={step}
        setStep={setStep}
        isPlaying={isPlaying}
        speed={speed}
        setExplanation={setExplanation}
      />;
    } else if (['binarySearch', 'linearSearch'].includes(algorithm)) {
      return <SearchVisualizer 
        algorithm={algorithm} 
        array={array} 
        step={step}
        setStep={setStep}
        isPlaying={isPlaying}
        speed={speed}
        setExplanation={setExplanation}
      />;
    } else {
      return <PathfindingVisualizer 
        algorithm={algorithm} 
        step={step}
        setStep={setStep}
        isPlaying={isPlaying}
        speed={speed}
        setExplanation={setExplanation}
      />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <AlgorithmSelector 
          currentAlgorithm={algorithm} 
          onChange={handleAlgorithmChange} 
        />
        
        <motion.div 
          className="mt-8 border border-slate-200 dark:border-slate-700 rounded-lg p-4 min-h-[400px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {renderVisualizer()}
        </motion.div>
        
        <ControlPanel
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          speed={speed}
          setSpeed={setSpeed}
          onReset={generateRandomArray}
          step={step}
          setStep={setStep}
          arraySize={arraySize}
          setArraySize={setArraySize}
          algorithm={algorithm}
        />
        
        <ExplanationPanel explanation={explanation} />
      </div>
    </div>
  );
}

