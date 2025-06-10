import AsyncStorage from '@react-native-async-storage/async-storage';
import type { OperationCount } from '../types/score';

const HIGH_SCORE_KEY = 'HIGH_SCORE';

const DEFAULT_SCORES: OperationCount = {
  add: 0,
  subtract: 0,
  multiply: 0,
  divide: 0,
};

export const getHighScore = async (): Promise<OperationCount> => {
  const value = await AsyncStorage.getItem(HIGH_SCORE_KEY);
  if (!value) {
    return { ...DEFAULT_SCORES };
  }
  try {
    return { ...DEFAULT_SCORES, ...JSON.parse(value) } as OperationCount;
  } catch {
    return { ...DEFAULT_SCORES };
  }
};

export const setHighScore = async (scores: OperationCount): Promise<void> => {
  await AsyncStorage.setItem(HIGH_SCORE_KEY, JSON.stringify(scores));
};
