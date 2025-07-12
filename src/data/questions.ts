export type Operation = 'add' | 'subtract' | 'multiply' | 'divide';

export type MathQuestion = {
  textKey: 'addQuestion' | 'subtractQuestion' | 'multiplyQuestion' | 'divideQuestion';
  a: number;
  b: number;
  options: string[];
  correctAnswer: number; // index of the correct option
  operation: Operation;
};

function shuffleArray<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function generateQuestions(): MathQuestion[] {
  const questions: MathQuestion[] = [];

  for (let a = 1; a <= 10; a++) {
    for (let b = 1; b <= 10; b++) {
      // Addition
      const addResult = a + b;
      const addOptions = [
        String(addResult - 1),
        String(addResult),
        String(addResult + 1),
        String(addResult + 2),
      ];
      shuffleArray(addOptions);
      questions.push({
        textKey: 'addQuestion',
        a,
        b,
        options: addOptions,
        correctAnswer: addOptions.indexOf(String(addResult)),
        operation: 'add',
      });

      // Subtraction (ensure non-negative by making minuend >= subtrahend)
      const minuend = a >= b ? a : b;
      const subtrahend = a >= b ? b : a;
      const subResult = minuend - subtrahend;
      const subOptions = [
        String(subResult - 1),
        String(subResult),
        String(subResult + 1),
        String(subResult + 2),
      ];
      shuffleArray(subOptions);
      questions.push({
        textKey: 'subtractQuestion',
        a: minuend,
        b: subtrahend,
        options: subOptions,
        correctAnswer: subOptions.indexOf(String(subResult)),
        operation: 'subtract',
      });

      // Multiplication
      const mulResult = a * b;
      const mulOptions = [
        String(mulResult - 1),
        String(mulResult),
        String(mulResult + 1),
        String(mulResult + 2),
      ];
      shuffleArray(mulOptions);
      questions.push({
        textKey: 'multiplyQuestion',
        a,
        b,
        options: mulOptions,
        correctAnswer: mulOptions.indexOf(String(mulResult)),
        operation: 'multiply',
      });

      // Division (use a*b ÷ b = a)
      const dividend = a * b;
      const divResult = a;
      const divOptions = [
        String(divResult - 1),
        String(divResult),
        String(divResult + 1),
        String(divResult + 2),
      ];
      shuffleArray(divOptions);
      questions.push({
        textKey: 'divideQuestion',
        a: dividend,
        b,
        options: divOptions,
        correctAnswer: divOptions.indexOf(String(divResult)),
        operation: 'divide',
      });
    }
  }

  return shuffleArray(questions);
}
