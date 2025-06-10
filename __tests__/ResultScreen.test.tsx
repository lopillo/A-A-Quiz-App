import React from 'react';
import { render } from '@testing-library/react-native';
import ResultScreen from '../src/components/ResultScreen';

const renderScreen = (score: number, total: number = 5) =>
  render(
    <ResultScreen
      navigation={{ navigate: jest.fn() } as any}
      route={{ key: 'result', name: 'Result', params: { score, totalQuestions: total } } as any}
    />
  );

describe('ResultScreen badges', () => {
  it('awards gold badge for perfect score', () => {
    const { getByText } = renderScreen(5, 5);
    expect(getByText('Gold Badge')).toBeTruthy();
  });

  it('awards silver badge for >=80% score', () => {
    const { getByText } = renderScreen(4, 5);
    expect(getByText('Silver Badge')).toBeTruthy();
  });

  it('awards bronze badge for >=50% score', () => {
    const { getByText } = renderScreen(3, 5);
    expect(getByText('Bronze Badge')).toBeTruthy();
  });

  it('awards no badge below 50%', () => {
    const { queryByText } = renderScreen(2, 5);
    expect(queryByText('Badges Earned:')).toBeNull();
  });
});
