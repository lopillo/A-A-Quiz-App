import type { Operation } from '../data/questions';

export type OperationCount = Record<Operation, number>;

export type BadgeLevel = 'gold' | 'silver' | 'bronze' | null;

export type OperationRecord = {
  score: number;
  playerName: string;
  date: string;
  badge: BadgeLevel;
};

export type OperationRecordMap = Record<Operation, OperationRecord>;

export type MedalBoardMap = Record<Operation, OperationRecord[]>;

export type MedalCounts = {
  gold: number;
  silver: number;
  bronze: number;
  none: number;
};
