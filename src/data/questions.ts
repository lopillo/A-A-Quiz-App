export type Operation = 'add' | 'subtract' | 'multiply' | 'divide';

export type MathQuestion = {
  textKey: 'addQuestion' | 'subtractQuestion' | 'multiplyQuestion' | 'divideQuestion';
  a: number;
  b: number;
  options: string[];
  correctAnswer: number; // index of the correct option
  operation: Operation;
};

export function generateQuestions(): MathQuestion[] {
  const questions: MathQuestion[] = [];

  for (let a = 1; a <= 10; a++) {
    for (let b = 1; b <= 10; b++) {
      // Addition
      const addResult = a + b;
      questions.push({
        textKey: 'addQuestion',
        a,
        b,
        options: [String(addResult - 1), String(addResult), String(addResult + 1), String(addResult + 2)],
        correctAnswer: 1,
        operation: 'add',
      });

      // Subtraction (ensure non-negative by making minuend >= subtrahend)
      const minuend = a >= b ? a : b;
      const subtrahend = a >= b ? b : a;
      const subResult = minuend - subtrahend;
      questions.push({
        textKey: 'subtractQuestion',
        a: minuend,
        b: subtrahend,
        options: [String(subResult - 1), String(subResult), String(subResult + 1), String(subResult + 2)],
        correctAnswer: 1,
        operation: 'subtract',
      });

      // Multiplication
      const mulResult = a * b;
      questions.push({
        textKey: 'multiplyQuestion',
        a,
        b,
        options: [String(mulResult - 1), String(mulResult), String(mulResult + 1), String(mulResult + 2)],
        correctAnswer: 1,
        operation: 'multiply',
      });

      // Division (use a*b ÷ b = a)
      const dividend = a * b;
      const divResult = a;
      questions.push({
        textKey: 'divideQuestion',
        a: dividend,
        b,
        options: [String(divResult - 1), String(divResult), String(divResult + 1), String(divResult + 2)],
        correctAnswer: 1,
        operation: 'divide',
      });
    }
  }

  return questions;
}
