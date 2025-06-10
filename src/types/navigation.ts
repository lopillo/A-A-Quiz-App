export type RootStackParamList = {
  Home: undefined;
  Quiz: undefined;
  Result: {
    scores: import('./score').OperationCount;
    totals: import('./score').OperationCount;
  };
};
