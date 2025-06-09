export type Question = {
  text: string;
  options: string[];
  correctAnswer: number; // index of the correct option
};

export const questions: Question[] = [
  {
    text: 'What is 2 + 2?',
    options: ['3', '4', '5', '6'],
    correctAnswer: 1,
  },
  {
    text: 'Which planet is known as the Red Planet?',
    options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
    correctAnswer: 1,
  },
  {
    text: 'What is the capital of France?',
    options: ['Berlin', 'London', 'Paris', 'Rome'],
    correctAnswer: 2,
  },
];
