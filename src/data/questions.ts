export type MathQuestion = {
  textKey: string;
  options: string[];
  correctAnswer: number; // index of the correct option
  operation: 'add' | 'subtract' | 'multiply' | 'divide';
};

export type Operation = MathQuestion['operation'];

export const questions: MathQuestion[] = [
  {
    textKey: 'q1',
    options: ['1', '2', '3', '4'],
    correctAnswer: 1,
    operation: 'add',
  },
  {
    textKey: 'q2',
    options: ['6', '7', '8', '9'],
    correctAnswer: 1, // 7
    operation: 'add',
  },
  {
    textKey: 'q3',
    options: ['2', '3', '4', '5'],
    correctAnswer: 1, // 3
    operation: 'subtract',
  },
  {
    textKey: 'q4',
    options: ['3', '4', '5', '6'],
    correctAnswer: 2, // 5
    operation: 'subtract',
  },
  {
    textKey: 'q5',
    options: ['6', '8', '9', '12'],
    correctAnswer: 2, // 9
    operation: 'multiply',
  },
  {
    textKey: 'q6',
    options: ['15', '18', '20', '25'],
    correctAnswer: 2, // 20
    operation: 'multiply',
  },
  {
    textKey: 'q7',
    options: ['2', '3', '4', '5'],
    correctAnswer: 2, // 4
    operation: 'divide',
  },
  {
    textKey: 'q8',
    options: ['1', '2', '3', '4'],
    correctAnswer: 1, // 2
    operation: 'divide',
  },
];
