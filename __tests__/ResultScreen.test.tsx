import React from 'react';
import { render } from '@testing-library/react-native';
import ResultScreen from '../src/components/ResultScreen';
import { questions } from '../src/data/questions';
import type { OperationCount } from '../src/types/score';
import { LanguageProvider } from '../src/i18n/LanguageContext';
import { setLocale } from '../src/i18n';

const TOTALS: OperationCount = questions.reduce<OperationCount>(
  (acc, q) => ({ ...acc, [q.operation]: acc[q.operation] + 1 }),
  { add: 0, subtract: 0, multiply: 0, divide: 0 }
);

const PERFECT: OperationCount = { ...TOTALS };

const renderScreen = (scores: OperationCount, totals: OperationCount = TOTALS) =>
  render(
    <LanguageProvider>
      <ResultScreen
        navigation={{ navigate: jest.fn() } as any}
        route={{ key: 'result', name: 'Result', params: { scores, totals } } as any }
      />
    </LanguageProvider>
  );

describe('ResultScreen badges', () => {
  beforeEach(() => setLocale('en'));
  it('awards gold badge for perfect score', () => {
    const { getByText } = renderScreen(PERFECT, TOTALS);
    expect(getByText('Gold Badge (Addition)')).toBeTruthy();
    expect(getByText('Gold Badge (Subtraction)')).toBeTruthy();
    expect(getByText('Gold Badge (Multiplication)')).toBeTruthy();
    expect(getByText('Gold Badge (Division)')).toBeTruthy();
  });

  it('awards silver badge for >=80% score', () => {
    const totals = { add: 5, subtract: 5, multiply: 5, divide: 5 };
    const scores = { add: 4, subtract: 4, multiply: 4, divide: 4 };
    const { getByText } = renderScreen(scores, totals);
    expect(getByText('Silver Badge (Addition)')).toBeTruthy();
  });

  it('awards bronze badge for >=50% score', () => {
    const scores = { add: 1, subtract: 1, multiply: 1, divide: 1 };
    const { getByText } = renderScreen(scores, TOTALS);
    expect(getByText('Bronze Badge (Addition)')).toBeTruthy();
  });

  it('awards no badge below 50%', () => {
    const scores = { add: 0, subtract: 0, multiply: 0, divide: 0 };
    const { queryByText } = renderScreen(scores, TOTALS);
    expect(queryByText('Badges Earned:')).toBeNull();
  });
});
