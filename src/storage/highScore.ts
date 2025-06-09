import AsyncStorage from '@react-native-async-storage/async-storage';

const HIGH_SCORE_KEY = 'HIGH_SCORE';

export const getHighScore = async (): Promise<number> => {
  const value = await AsyncStorage.getItem(HIGH_SCORE_KEY);
  return value ? Number(value) : 0;
};

export const setHighScore = async (score: number): Promise<void> => {
  await AsyncStorage.setItem(HIGH_SCORE_KEY, score.toString());
};
