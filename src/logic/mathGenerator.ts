import type { ProblemStats } from './storage';

export type Operator = '+' | '-' | '×' | '÷';

export interface MathProblem {
  type: 'math';
  num1: number;
  num2: number;
  operator: Operator;
  answer: number;
  options: number[]; // 4 варианта ответа
}

/**
 * Генерирует математическую задачу в зависимости от уровня и статистики
 */
export function generateProblem(level: number, problemStats?: ProblemStats): MathProblem {
  let num1 = 0;
  let num2 = 0;
  let operator: Operator = '+';
  let answer = 0;

  let isDifficultPulled = false;

  // 1. Попытка вытянуть сложный пример (шанс 35%)
  if (problemStats && Math.random() < 0.35) {
    // Сложным считаем пример, где (wrong > 0 И wrong >= correct * 0.5) ИЛИ (wrong >= 2)
    const difficultKeys = Object.entries(problemStats)
      .filter(([_, data]) => data.wrong > 0 && (data.wrong >= data.correct * 0.5 || data.wrong >= 2))
      .map(([key]) => key);

    if (difficultKeys.length > 0) {
      const selectedKey = difficultKeys[Math.floor(Math.random() * difficultKeys.length)];
      const parts = selectedKey.split(' ');
      if (parts.length === 3) {
        num1 = parseInt(parts[0], 10);
        operator = parts[1] as Operator;
        num2 = parseInt(parts[2], 10);
        
        if (operator === '+') answer = num1 + num2;
        if (operator === '-') answer = num1 - num2;
        if (operator === '×') answer = num1 * num2;
        if (operator === '÷') answer = num1 / num2;
        
        isDifficultPulled = true;
      }
    }
  }

  // 2. Если сложный пример не выбран, генерируем новый со сбросом слишком простых
  if (!isDifficultPulled) {
    const availableOps: Operator[] = ['+'];
    if (level >= 2) availableOps.push('-');
    if (level >= 3) availableOps.push('×');
    if (level >= 4) availableOps.push('÷');

    let attempts = 0;
    while (attempts < 4) {
      operator = availableOps[Math.floor(Math.random() * availableOps.length)];

      if (operator === '+') {
        const max = level === 1 ? 10 : level === 2 ? 15 : level === 3 ? 20 : level <= 5 ? 50 : 100;
        answer = Math.floor(Math.random() * (max - 2)) + 2; 
        num1 = Math.floor(Math.random() * (answer - 1)) + 1;
        num2 = answer - num1;
      } 
      else if (operator === '-') {
        const max = level <= 2 ? 15 : level === 3 ? 20 : level <= 5 ? 50 : 100;
        num1 = Math.floor(Math.random() * (max - 2)) + 2; 
        num2 = Math.floor(Math.random() * (num1 - 1)) + 1; 
        answer = num1 - num2;
      }
      else if (operator === '×') {
        const maxMultiplier = level === 3 ? 5 : level <= 5 ? 9 : 12;
        num1 = Math.floor(Math.random() * (maxMultiplier - 1)) + 2; 
        num2 = Math.floor(Math.random() * (maxMultiplier - 1)) + 2; 
        answer = num1 * num2;
      }
      else if (operator === '÷') {
        const maxMultiplier = level === 4 ? 5 : level <= 5 ? 9 : 12;
        const a = Math.floor(Math.random() * (maxMultiplier - 1)) + 2;
        const b = Math.floor(Math.random() * (maxMultiplier - 1)) + 2;
        answer = a; 
        num1 = a * b; 
        num2 = b;     
      }

      const problemKey = `${num1} ${operator} ${num2}`;
      const stat = problemStats?.[problemKey];
      
      // Игнорируем пример (считаем "заученным"), если правильных ответов много, а ошибок нет или мало
      const isTooEasy = stat && ((stat.correct >= 3 && stat.wrong === 0) || (stat.correct >= 10 && stat.wrong <= 1));

      if (!isTooEasy) {
        break; // Устраивает
      }
      attempts++;
    }
  }

  // Генерация 3 неверных вариантов
  const optionsSet = new Set<number>();
  optionsSet.add(answer);

  while (optionsSet.size < 4) {
    let offset = 0;
    
    if (operator === '×' || operator === '÷') {
      // Для умножения/деления ошибки часто связаны со смещением на нужный множитель
      if (Math.random() > 0.5) {
        offset = (Math.random() > 0.5 ? 1 : -1) * num2; // Ошибка на 1 шаг таблицы умножения
        if (offset === 0) offset = 2;
      } else {
        offset = Math.floor(Math.random() * 11) - 5; // Просто случайный разброс
        if (offset === 0) offset = 1;
      }
    } else {
      // Для сложения/вычитания
      offset = Math.floor(Math.random() * 11) - 5;
      if (offset === 0) offset = 1;
      if (Math.random() > 0.8) {
        offset = Math.random() > 0.5 ? 10 : -10; // Ошибка в десяток
      }
    }

    let wrongAnswer = answer + offset;
    // Исключаем отрицательные и нулевые ответы для простоты детской игры
    if (wrongAnswer <= 0) wrongAnswer = Math.abs(wrongAnswer) + 2; 
    optionsSet.add(wrongAnswer);
  }

  // Перемешивание вариантов ответа
  const options = Array.from(optionsSet).sort(() => Math.random() - 0.5);

  return { type: 'math', num1, num2, operator, answer, options };
}
