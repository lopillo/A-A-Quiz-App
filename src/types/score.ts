import type { Operation } from '../data/questions';

export type OperationCount = Record<Operation, number>;

export type OperationRecord = {
  score: number;
  playerName: string;
  date: string;
};

export type OperationRecordMap = Record<Operation, OperationRecord>;
