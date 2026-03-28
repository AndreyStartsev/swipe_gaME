export type Operator = '+' | '-' | '×' | '÷';

export interface MathProblem {
  num1: number;
  num2: number;
  operator: Operator;
  answer: number;
  options: number[]; // 4 варианта ответа
}

/**
 * Генерирует математическую задачу в зависимости от уровня
 * Уровень повышается каждые 50 очков
 */
export function generateProblem(level: number): MathProblem {
  let num1 = 0;
  let num2 = 0;
  let operator: Operator = '+';
  let answer = 0;

  // Формируем пул доступных операций в зависимости от уровня
  const availableOps: Operator[] = ['+'];
  if (level >= 2) availableOps.push('-');
  if (level >= 3) availableOps.push('×');
  if (level >= 4) availableOps.push('÷');

  // Случайный выбор операции из доступных
  operator = availableOps[Math.floor(Math.random() * availableOps.length)];

  if (operator === '+') {
    const max = level === 1 ? 10 : level <= 3 ? 20 : 50;
    answer = Math.floor(Math.random() * (max - 2)) + 2; 
    num1 = Math.floor(Math.random() * (answer - 1)) + 1;
    num2 = answer - num1;
  } 
  else if (operator === '-') {
    const max = level <= 3 ? 20 : 50;
    num1 = Math.floor(Math.random() * (max - 2)) + 2; 
    num2 = Math.floor(Math.random() * (num1 - 1)) + 1; 
    answer = num1 - num2;
  }
  else if (operator === '×') {
    // Таблица умножения от 2 до 9 (для старших уровней можно усложнить)
    const maxMultiplier = level >= 5 ? 12 : 9;
    num1 = Math.floor(Math.random() * (maxMultiplier - 1)) + 2; // 2..max
    num2 = Math.floor(Math.random() * (maxMultiplier - 1)) + 2; // 2..max
    answer = num1 * num2;
  }
  else if (operator === '÷') {
    // Целочисленное деление: генерируем как умножение
    const maxMultiplier = level >= 5 ? 12 : 9;
    const a = Math.floor(Math.random() * (maxMultiplier - 1)) + 2;
    const b = Math.floor(Math.random() * (maxMultiplier - 1)) + 2;
    answer = a; // Результат деления
    num1 = a * b; // Делимое
    num2 = b;     // Делитель
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

  return { num1, num2, operator, answer, options };
}
