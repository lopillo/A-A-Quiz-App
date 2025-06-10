export type MathQuestion = {
  text: string;
  options: string[];
  correctAnswer: number; // index of the correct option
  operation: 'add' | 'subtract' | 'multiply' | 'divide';
};

export type Operation = MathQuestion['operation'];

export const questions: MathQuestion[] = [
  {
    text: 'What is 1 + 1?',
    options: ['1', '2', '3', '4'],
    correctAnswer: 1,
    operation: 'add',
  },
  {
    text: 'What is 3 + 4?',
    options: ['6', '7', '8', '9'],
    correctAnswer: 1, // 7
    operation: 'add',
  },
  {
    text: 'What is 5 - 2?',
    options: ['2', '3', '4', '5'],
    correctAnswer: 1, // 3
    operation: 'subtract',
  },
  {
    text: 'What is 9 - 4?',
    options: ['3', '4', '5', '6'],
    correctAnswer: 2, // 5
    operation: 'subtract',
  },
  {
    text: 'What is 3 × 3?',
    options: ['6', '8', '9', '12'],
    correctAnswer: 2, // 9
    operation: 'multiply',
  },
  {
    text: 'What is 4 × 5?',
    options: ['15', '18', '20', '25'],
    correctAnswer: 2, // 20
    operation: 'multiply',
  },
  {
    text: 'What is 8 ÷ 2?',
    options: ['2', '3', '4', '5'],
    correctAnswer: 2, // 4
    operation: 'divide',
  },
  {
    text: 'What is 10 ÷ 5?',
    options: ['1', '2', '3', '4'],
    correctAnswer: 1, // 2
    operation: 'divide',
  },
];
