import type { MathQuestion } from '../data/questions';

export type Operation = MathQuestion['operation'];

export type OperationCount = Record<Operation, number>;
