import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Operation, OperationRecord, BadgeLevel } from '../types/score';
import type { MedalBoardMap, OperationCount, MedalCounts } from '../types/score';

const MEDAL_BOARD_KEY = 'MEDAL_BOARD';

const DEFAULT_BOARD: MedalBoardMap = {
  add: [],
  subtract: [],
  multiply: [],
  divide: [],
};

export const getMedalBoard = async (): Promise<MedalBoardMap> => {
  const value = await AsyncStorage.getItem(MEDAL_BOARD_KEY);
  if (!value) {
    return { ...DEFAULT_BOARD };
  }
  try {
    const parsed = JSON.parse(value) as Partial<MedalBoardMap>;
    const result: MedalBoardMap = { ...DEFAULT_BOARD };
    (Object.keys(DEFAULT_BOARD) as Operation[]).forEach((op) => {
      const arr = parsed[op];
      result[op] = Array.isArray(arr) ? (arr as OperationRecord[]) : [];
    });
    return result;
  } catch {
    return { ...DEFAULT_BOARD };
  }
};

export const setMedalBoard = async (
  board: MedalBoardMap
): Promise<void> => {
  await AsyncStorage.setItem(MEDAL_BOARD_KEY, JSON.stringify(board));
};

export const updateMedalBoard = async (
  scores: OperationCount,
  totals: OperationCount,
  playerName: string
): Promise<void> => {
  const board = await getMedalBoard();
  let changed = false;
  (Object.keys(scores) as Operation[]).forEach((op) => {
    const score = scores[op];
    if (score > 0) {
      const total = totals[op];
      const pct = total ? score / total : 0;
      let badge: BadgeLevel = null;
      if (pct === 1) badge = 'gold';
      else if (pct >= 0.8) badge = 'silver';
      else if (pct >= 0.5) badge = 'bronze';
      const record: OperationRecord = {
        score,
        playerName,
        date: new Date().toISOString(),
        badge,
      };
      const arr = [...board[op], record];
      arr.sort((a, b) => b.score - a.score);
      board[op] = arr.slice(0, 3);
      changed = true;
    }
  });
  if (changed) {
    await setMedalBoard(board);
  }
};

export const getMedalCounts = async (): Promise<MedalCounts> => {
  const board = await getMedalBoard();
  let gold = 0;
  let silver = 0;
  let bronze = 0;
  (Object.keys(board) as Operation[]).forEach((op) => {
    board[op].forEach((rec) => {
      if (rec.badge === 'gold') gold += 1;
      else if (rec.badge === 'silver') silver += 1;
      else if (rec.badge === 'bronze') bronze += 1;
    });
  });
  const total = 40;
  const none = Math.max(0, total - gold - silver - bronze);
  return { gold, silver, bronze, none };
};
