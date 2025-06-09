import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import QuizScreen from '../src/components/QuizScreen';
import { questions } from '../src/data/questions';
import { Alert } from 'react-native';

jest.mock('../src/storage/highScore', () => ({
  getHighScore: jest.fn(() => Promise.resolve(0)),
  setHighScore: jest.fn(() => Promise.resolve()),
}));

jest.spyOn(Alert, 'alert').mockImplementation(() => {});

describe('QuizScreen', () => {
  it('navigates to Result with score after correct answers', async () => {
    const navigate = jest.fn();
    const { getByText } = render(
      <QuizScreen navigation={{ navigate } as any} route={{ key: '1', name: 'Quiz' } as any} />
    );

    for (const q of questions) {
      fireEvent.press(getByText(q.options[q.correctAnswer]));
    }

    await waitFor(() =>
      expect(navigate).toHaveBeenCalledWith('Result', {
        score: questions.length,
        totalQuestions: questions.length,
      })
    );
  });
});
