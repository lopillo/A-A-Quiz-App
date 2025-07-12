export type Operation = 'add' | 'subtract' | 'multiply' | 'divide';

export type MathQuestion = {
  textKey: 'addQuestion' | 'subtractQuestion' | 'multiplyQuestion' | 'divideQuestion';
  a: number;
  b: number;
  options: string[];
  correctAnswer: number; // index of the correct option
  operation: Operation;
};

import { shuffleArray } from '../utils/shuffle';

export type GenerateOptions = {
  shuffleQuestions?: boolean;
  shuffleOptions?: boolean;
};

export function generateQuestions(options?: GenerateOptions): MathQuestion[] {
  const { shuffleQuestions = true, shuffleOptions = true } = options || {};
  const questions: MathQuestion[] = [];

  for (let a = 1; a <= 10; a++) {
    for (let b = 1; b <= 10; b++) {
      // Addition
      const addResult = a + b;
      {
        const opts = [
          String(addResult - 1),
          String(addResult),
          String(addResult + 1),
          String(addResult + 2),
        ];
        const optionsArr = shuffleOptions ? shuffleArray(opts) : opts;
        questions.push({
          textKey: 'addQuestion',
          a,
          b,
          options: optionsArr,
          correctAnswer: optionsArr.indexOf(String(addResult)),
          operation: 'add',
        });
      }

      // Subtraction (ensure non-negative by making minuend >= subtrahend)
      const minuend = a >= b ? a : b;
      const subtrahend = a >= b ? b : a;
      const subResult = minuend - subtrahend;
      {
        const opts = [
          String(subResult - 1),
          String(subResult),
          String(subResult + 1),
          String(subResult + 2),
        ];
        const optionsArr = shuffleOptions ? shuffleArray(opts) : opts;
        questions.push({
          textKey: 'subtractQuestion',
          a: minuend,
          b: subtrahend,
          options: optionsArr,
          correctAnswer: optionsArr.indexOf(String(subResult)),
          operation: 'subtract',
        });
      }

      // Multiplication
      const mulResult = a * b;
      {
        const opts = [
          String(mulResult - 1),
          String(mulResult),
          String(mulResult + 1),
          String(mulResult + 2),
        ];
        const optionsArr = shuffleOptions ? shuffleArray(opts) : opts;
        questions.push({
          textKey: 'multiplyQuestion',
          a,
          b,
          options: optionsArr,
          correctAnswer: optionsArr.indexOf(String(mulResult)),
          operation: 'multiply',
        });
      }

      // Division (use a*b ÷ b = a)
      const dividend = a * b;
      const divResult = a;
      {
        const opts = [
          String(divResult - 1),
          String(divResult),
          String(divResult + 1),
          String(divResult + 2),
        ];
        const optionsArr = shuffleOptions ? shuffleArray(opts) : opts;
        questions.push({
          textKey: 'divideQuestion',
          a: dividend,
          b,
          options: optionsArr,
          correctAnswer: optionsArr.indexOf(String(divResult)),
          operation: 'divide',
        });
      }
    }
  }

  return shuffleQuestions ? shuffleArray(questions) : questions;
}
