// Implementação do visualizador de algoritmos de ordenação
// components/visualizers/SortingVisualizer.tsx
'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

type SortingVisualizerProps = {
  algorithm: string;
  array: number[];
  step: number;
  setStep: (step: number) => void;
  isPlaying: boolean;
  speed: number;
  setExplanation: (text: string) => void;
};

export default function SortingVisualizer({
  algorithm,
  array,
  step,
  setStep,
  isPlaying,
  speed,
  setExplanation,
}: SortingVisualizerProps) {
  const animationFrameRef = useRef<number | null>(null);
  const lastStepTimeRef = useRef<number>(0);
  
  // Dados para a simulação de algoritmos de ordenação
  const sortingSteps = useRef<{
    array: number[];
    comparing: number[];
    swapping: number[];
    explanation: string;
  }[]>([]);
  
  // Recalcular os passos de ordenação quando o array ou algoritmo mudar
  useEffect(() => {
    // Implementação simplificada para gerar passos de visualização
    // Em um projeto real, você implementaria cada algoritmo corretamente
    
    const tempArray = [...array];
    const steps = [];
    
    if (algorithm === 'bubble') {
      // Simulação do Bubble Sort
      for (let i = 0; i < tempArray.length; i++) {
        for (let j = 0; j < tempArray.length - i - 1; j++) {
          // Passo de comparação
          steps.push({
            array: [...tempArray],
            comparing: [j, j + 1],
            swapping: [],
            explanation: `Comparando elementos nas posições ${j} e ${j + 1}`
          });
          
          if (tempArray[j] > tempArray[j + 1]) {
            // Passo de troca
            steps.push({
              array: [...tempArray],
              comparing: [],
              swapping: [j, j + 1],
              explanation: `Trocando elementos nas posições ${j} e ${j + 1} pois ${tempArray[j]} > ${tempArray[j + 1]}`
            });
            
            // Realizar a troca
            [tempArray[j], tempArray[j + 1]] = [tempArray[j + 1], tempArray[j]];
            
            // Mostrar array após a troca
            steps.push({
              array: [...tempArray],
              comparing: [],
              swapping: [],
              explanation: `Array após a troca: [${tempArray.join(', ')}]`
            });
          }
        }
      }
    } else if (algorithm === 'insertion') {
      // Simulação simplificada do Insertion Sort
      for (let i = 1; i < tempArray.length; i++) {
        let current = tempArray[i];
        let j = i - 1;
        
        steps.push({
          array: [...tempArray],
          comparing: [i],
          swapping: [],
          explanation: `Selecionando o elemento ${current} na posição ${i} para inserção`
        });
        
        while (j >= 0 && tempArray[j] > current) {
          steps.push({
            array: [...tempArray],
            comparing: [j, j + 1],
            swapping: [],
            explanation: `Comparando ${tempArray[j]} > ${current}`
          });
          
          tempArray[j + 1] = tempArray[j];
          
          steps.push({
            array: [...tempArray],
            comparing: [],
            swapping: [j, j + 1],
            explanation: `Movendo ${tempArray[j]} uma posição para a direita`
          });
          
          j--;
        }
        
        tempArray[j + 1] = current;
        
        steps.push({
          array: [...tempArray],
          comparing: [],
          swapping: [],
          explanation: `Inserindo ${current} na posição ${j + 1}`
        });
      }
    } else {
      // Para outros algoritmos, podemos gerar passos simulados
      // Em um projeto real, você implementaria cada algoritmo
      for (let i = 0; i < 15; i++) {
        const randomIndex1 = Math.floor(Math.random() * tempArray.length);
        const randomIndex2 = Math.floor(Math.random() * tempArray.length);
        
        steps.push({
          array: [...tempArray],
          comparing: [randomIndex1, randomIndex2],
          swapping: [],
          explanation: `Comparando elementos nas posições ${randomIndex1} e ${randomIndex2}`
        });
        
        if (tempArray[randomIndex1] > tempArray[randomIndex2]) {
          steps.push({
            array: [...tempArray],
            comparing: [],
            swapping: [randomIndex1, randomIndex2],
            explanation: `Trocando elementos pois ${tempArray[randomIndex1]} > ${tempArray[randomIndex2]}`
          });
          
          [tempArray[randomIndex1], tempArray[randomIndex2]] = 
            [tempArray[randomIndex2], tempArray[randomIndex1]];
          
          steps.push({
            array: [...tempArray],
            comparing: [],
            swapping: [],
            explanation: `Array após a troca`
          });
        }
      }
      
      // Adicionar um passo final com o array ordenado
      tempArray.sort((a, b) => a - b);
      steps.push({
        array: [...tempArray],
        comparing: [],
        swapping: [],
        explanation: `Array ordenado com o algoritmo ${algorithm}`
      });
    }
    
    sortingSteps.current = steps;
    setStep(0);
  }, [array, algorithm]);
  
  // Efeito para animação quando estiver em reprodução
  useEffect(() => {
    if (isPlaying) {
      const animate = (timestamp: number) => {
        if (timestamp - lastStepTimeRef.current > (2000 - speed * 19)) {
          if (step < sortingSteps.current.length - 1) {
            setStep(step + 1);
            
            // Atualizar a explicação
            if (sortingSteps.current[step + 1]) {
              setExplanation(sortingSteps.current[step + 1].explanation);
            }
            
            lastStepTimeRef.current = timestamp;
          } else {
            // Parar a animação no final
            setIsPlaying(false);
          }
        }
        
        animationFrameRef.current = requestAnimationFrame(animate);
      };
      
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, step, speed]);
  
  // Atualizar a explicação quando o passo mudar
  useEffect(() => {
    if (sortingSteps.current[step]) {
      setExplanation(sortingSteps.current[step].explanation);
    }
  }, [step]);
  
  // Renderização dos elementos do array como barras
  const currentStep = sortingSteps.current[step] || { 
    array: array, 
    comparing: [], 
    swapping: [] 
  };
  
  const maxValue = Math.max(...array);
  
  return (
    <div className="flex flex-col items-center">
      <div className="w-full h-64 flex items-end justify-center gap-1 mt-4">
        {currentStep.array.map((value, index) => {
          const isComparing = currentStep.comparing.includes(index);
          const isSwapping = currentStep.swapping.includes(index);
          
          return (
            <motion.div
              key={index}
              className={`w-full max-w-8 rounded-t-md ${
                isComparing 
                  ? 'bg-yellow-500 dark:bg-yellow-600' 
                  : isSwapping 
                  ? 'bg-green-500 dark:bg-green-600' 
                  : 'bg-indigo-500 dark:bg-indigo-600'
              }`}
              style={{
                height: `${(value / maxValue) * 100}%`,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                scale: isComparing || isSwapping ? 1.1 : 1
              }}
              transition={{ duration: 0.3 }}
            />
          );
        })}
      </div>
      
      <div className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
        Passo {step + 1} de {sortingSteps.current.length}
      </div>
    </div>
  );
}