export type RootStackParamList = {
  Home: undefined;
  Selection: { playerName: string; score?: number };
  HighScore: undefined;
  Quiz: {
    operation?: import('./score').Operation | 'all';
    playerName: string;
  };
  Result: {
    scores: import('./score').OperationCount;
    totals: import('./score').OperationCount;
    playerName: string;
  };
  RoundSummary: {
    questions: import('../data/questions').MathQuestion[];
    results: boolean[];
    allCorrect: boolean;
    playerName: string;
    score: number;
    totals?: import('./score').OperationCount;
    scores?: import('./score').OperationCount;
  };
};
