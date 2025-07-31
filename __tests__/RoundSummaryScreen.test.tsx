import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import RoundSummaryScreen from '../src/components/RoundSummaryScreen';
import { generateQuestions } from '../src/constants/questions';
import { setLocale, t } from '../src/i18n';
import { LanguageProvider } from '../src/i18n/LanguageContext';

jest.mock('../src/components/LottieWrapper', () => 'LottieView');

jest.mock('../src/storage/highScore', () => ({
  updateHighScoreIfNeeded: jest.fn(() => Promise.resolve()),
}));

jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');
  return {
    ...actual,
    useFocusEffect: (cb: () => void) => cb(),
  };
});

const question = generateQuestions()[0];

describe('RoundSummaryScreen', () => {
  beforeEach(() => setLocale('en'));

  it('updates high score when returning to selection', async () => {
    const replace = jest.fn();
    const { getByText } = render(
      <LanguageProvider>
        <RoundSummaryScreen
          navigation={{ replace } as any}
          route={{
            key: 'r',
            name: 'RoundSummary',
            params: {
              questions: [question],
              results: [false],
              allCorrect: false,
              playerName: 'Bob',
              score: 1,
              totals: { add: 1, subtract: 0, multiply: 0, divide: 0 },
              scores: { add: 0, subtract: 0, multiply: 0, divide: 0 },
            },
          } as any}
        />
      </LanguageProvider>
    );

    fireEvent.press(getByText(t('backToSelection')));
    await waitFor(() =>
      expect(replace).toHaveBeenCalledWith('Selection', { playerName: 'Bob', score: 1 })
    );
    const { updateHighScoreIfNeeded } = require('../src/storage/highScore');
    expect(updateHighScoreIfNeeded).toHaveBeenCalledWith(
      { add: 0, subtract: 0, multiply: 0, divide: 0 },
      { add: 1, subtract: 0, multiply: 0, divide: 0 },
      'Bob'
    );
  });

  it('allows navigating back to selection after a perfect round', async () => {
    const replace = jest.fn();
    const { getByText } = render(
      <LanguageProvider>
        <RoundSummaryScreen
          navigation={{ replace } as any}
          route={{
            key: 'r2',
            name: 'RoundSummary',
            params: {
              questions: [question],
              results: [true],
              allCorrect: true,
              playerName: 'Bob',
              score: 1,
            },
          } as any}
        />
      </LanguageProvider>
    );

    fireEvent.press(getByText(t('backToSelection')));
    await waitFor(() =>
      expect(replace).toHaveBeenCalledWith('Selection', { playerName: 'Bob', score: 1 })
    );
  });
});
