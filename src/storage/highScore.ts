import AsyncStorage from '@react-native-async-storage/async-storage';
import type { OperationRecordMap } from '../types/score';

const HIGH_SCORE_KEY = 'HIGH_SCORE';

const DEFAULT_SCORES: OperationRecordMap = {
  add: { score: 0, playerName: '', date: '' },
  subtract: { score: 0, playerName: '', date: '' },
  multiply: { score: 0, playerName: '', date: '' },
  divide: { score: 0, playerName: '', date: '' },
};

export const getHighScore = async (): Promise<OperationRecordMap> => {
  const value = await AsyncStorage.getItem(HIGH_SCORE_KEY);
  if (!value) {
    return { ...DEFAULT_SCORES };
  }
  try {
    return { ...DEFAULT_SCORES, ...JSON.parse(value) } as OperationRecordMap;
  } catch {
    return { ...DEFAULT_SCORES };
  }
};

export const setHighScore = async (scores: OperationRecordMap): Promise<void> => {
  await AsyncStorage.setItem(HIGH_SCORE_KEY, JSON.stringify(scores));
};
