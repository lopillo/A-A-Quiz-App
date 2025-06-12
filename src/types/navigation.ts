export type RootStackParamList = {
  Home: undefined;
  Quiz: { operation?: import('./score').Operation | 'all' } | undefined;
  Result: {
    scores: import('./score').OperationCount;
    totals: import('./score').OperationCount;
  };
};
