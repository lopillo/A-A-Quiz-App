export type RootStackParamList = {
  Home: undefined;
  Selection: { playerName: string };
  HighScore: undefined;
  Quiz: {
    operation?: import('./score').Operation | 'all';
    playerName: string;
  };
  Result: {
    scores: import('./score').OperationCount;
    totals: import('./score').OperationCount;
  };
};
