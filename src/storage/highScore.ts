import AsyncStorage from '@react-native-async-storage/async-storage';
import type { OperationRecordMap, Operation, OperationRecord } from '../types/score';

const HIGH_SCORE_KEY = 'HIGH_SCORE';

const DEFAULT_SCORES: OperationRecordMap = {
  add: { score: 0, playerName: '', date: '', badge: null },
  subtract: { score: 0, playerName: '', date: '', badge: null },
  multiply: { score: 0, playerName: '', date: '', badge: null },
  divide: { score: 0, playerName: '', date: '', badge: null },
};

export const getHighScore = async (): Promise<OperationRecordMap> => {
  const value = await AsyncStorage.getItem(HIGH_SCORE_KEY);
  if (!value) {
    return { ...DEFAULT_SCORES };
  }
  try {
    const parsed = JSON.parse(value) as Partial<OperationRecordMap>;
    const result: OperationRecordMap = { ...DEFAULT_SCORES };
    (Object.keys(DEFAULT_SCORES) as Operation[]).forEach((op) => {
      result[op] = { ...DEFAULT_SCORES[op], ...(parsed[op] as Partial<OperationRecord>) };
    });
    return result;
  } catch {
    return { ...DEFAULT_SCORES };
  }
};

export const setHighScore = async (scores: OperationRecordMap): Promise<void> => {
  await AsyncStorage.setItem(HIGH_SCORE_KEY, JSON.stringify(scores));
};
