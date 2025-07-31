import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import QuizScreen from '../src/components/QuizScreen';
import { generateQuestions } from '../src/constants/questions';
import { setLocale } from '../src/i18n';
import { LanguageProvider } from '../src/i18n/LanguageContext';
import type { OperationCount } from '../src/types/score';

const questions = generateQuestions();
const TOTALS: OperationCount = questions.reduce<OperationCount>(
  (acc, q) => ({ ...acc, [q.operation]: acc[q.operation] + 1 }),
  { add: 0, subtract: 0, multiply: 0, divide: 0 }
);

jest.mock('../src/storage/highScore', () => ({
  getHighScore: jest.fn(() =>
    Promise.resolve({
      add: { score: 0, playerName: '', date: '', badge: null },
      subtract: { score: 0, playerName: '', date: '', badge: null },
      multiply: { score: 0, playerName: '', date: '', badge: null },
      divide: { score: 0, playerName: '', date: '', badge: null },
    })
  ),
  setHighScore: jest.fn(() => Promise.resolve()),
}));


describe('QuizScreen', () => {
  it('navigates to Result with score after correct answers', async () => {
    const navigate = jest.fn();
    setLocale('en');
    const { getByText } = render(
      <LanguageProvider>
        <QuizScreen navigation={{ navigate } as any} route={{ key: '1', name: 'Quiz', params: { playerName: 'Bob' } } as any} />
      </LanguageProvider>
    );

    for (const q of questions) {
      fireEvent.press(getByText(q.options[q.correctAnswer]));
    }

    await waitFor(() =>
      expect(navigate).toHaveBeenCalledWith('Result', {
        scores: TOTALS,
        totals: TOTALS,
        playerName: 'Bob',
      })
    );
    const { setHighScore } = require('../src/storage/highScore');
    expect(setHighScore).toHaveBeenCalledWith(
      expect.objectContaining({
        add: expect.objectContaining({ playerName: 'Bob' }),
      })
    );
  });
  it('ends the quiz when a cycle contains mistakes', async () => {
    const navigate = jest.fn();
    setLocale('en');
    const { getByText } = render(
      <LanguageProvider>
        <QuizScreen navigation={{ navigate } as any} route={{ key: '2', name: 'Quiz', params: { playerName: 'Bob' } } as any} />
      </LanguageProvider>
    );

    const cycleTotals: OperationCount = questions.slice(0, 10).reduce<OperationCount>(
      (acc, q) => ({ ...acc, [q.operation]: acc[q.operation] + 1 }),
      { add: 0, subtract: 0, multiply: 0, divide: 0 }
    );
    const cycleScores: OperationCount = { ...cycleTotals };
    cycleScores[questions[0].operation] -= 1;

    const wrongIndex = (questions[0].correctAnswer + 1) % questions[0].options.length;
    fireEvent.press(getByText(questions[0].options[wrongIndex]));
    for (let i = 1; i < 10; i++) {
      fireEvent.press(getByText(questions[i].options[questions[i].correctAnswer]));
    }

    const roundQuestions = questions.slice(0, 10);
    const results = [false, ...Array(9).fill(true)];
    const score = Object.values(cycleScores).reduce((a, b) => a + b, 0);

    await waitFor(() =>
      expect(navigate).toHaveBeenCalledWith('RoundSummary', {
        questions: roundQuestions,
        results,
        allCorrect: false,
        playerName: 'Bob',
        score,
        totals: cycleTotals,
        scores: cycleScores,
      })
    );
  });

  it('shows progress for the current cycle', () => {
    const { getByText, getByTestId } = render(
      <LanguageProvider>
        <QuizScreen navigation={{} as any} route={{ key: '3', name: 'Quiz', params: { playerName: 'Bob' } } as any} />
      </LanguageProvider>
    );

    const progressBar = getByTestId('progressBar');
    expect(progressBar.props.progress).toBe(0);

    fireEvent.press(getByText(questions[0].options[questions[0].correctAnswer]));
    expect(getByTestId('progressBar').props.progress).toBeCloseTo(0.1);
  });
});
