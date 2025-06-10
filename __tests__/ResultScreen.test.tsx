import React from 'react';
import { render } from '@testing-library/react-native';
import ResultScreen from '../src/components/ResultScreen';
import { questions } from '../src/data/questions';

const TOTAL = questions.length;

const renderScreen = (score: number, total: number = TOTAL) =>
  render(
    <ResultScreen
      navigation={{ navigate: jest.fn() } as any}
      route={{ key: 'result', name: 'Result', params: { score, totalQuestions: total } } as any}
    />
  );

describe('ResultScreen badges', () => {
  it('awards gold badge for perfect score', () => {
    const { getByText } = renderScreen(TOTAL, TOTAL);
    expect(getByText('Gold Badge')).toBeTruthy();
  });

  it('awards silver badge for >=80% score', () => {
    const silverScore = Math.ceil(TOTAL * 0.8);
    const { getByText } = renderScreen(silverScore, TOTAL);
    expect(getByText('Silver Badge')).toBeTruthy();
  });

  it('awards bronze badge for >=50% score', () => {
    const bronzeScore = Math.ceil(TOTAL * 0.5);
    const { getByText } = renderScreen(bronzeScore, TOTAL);
    expect(getByText('Bronze Badge')).toBeTruthy();
  });

  it('awards no badge below 50%', () => {
    const belowBronze = Math.floor(TOTAL * 0.5) - 1;
    const { queryByText } = renderScreen(belowBronze, TOTAL);
    expect(queryByText('Badges Earned:')).toBeNull();
  });
});
