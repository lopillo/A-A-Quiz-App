import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import QuizScreen from '../src/components/QuizScreen';
import { questions } from '../src/data/questions';
import { Alert } from 'react-native';

jest.mock('../src/storage/highScore', () => ({
  getHighScore: jest.fn(() => Promise.resolve(0)),
  setHighScore: jest.fn(() => Promise.resolve()),
}));

jest.spyOn(Alert, 'alert').mockImplementation((title, message, buttons) => {
  if (buttons && buttons[0] && typeof buttons[0].onPress === 'function') {
    buttons[0].onPress();
  }
});

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
  it('repeats incorrect questions until answered correctly and shows summary', async () => {
    const navigate = jest.fn();
    const alertSpy = jest.spyOn(Alert, 'alert');
    const { getByText } = render(
      <QuizScreen navigation={{ navigate } as any} route={{ key: '2', name: 'Quiz' } as any} />
    );

    // Answer first question incorrectly
    fireEvent.press(getByText(questions[0].options[0]));
    // Answer remaining questions correctly
    for (let i = 1; i < questions.length; i++) {
      fireEvent.press(getByText(questions[i].options[questions[i].correctAnswer]));
    }

    // Review of question 0 should start
    // First repeat incorrectly
    fireEvent.press(getByText(questions[0].options[0]));
    // Now answer correctly
    fireEvent.press(getByText(questions[0].options[questions[0].correctAnswer]));

    await waitFor(() => expect(alertSpy).toHaveBeenCalled());
    await waitFor(() =>
      expect(navigate).toHaveBeenCalledWith('Result', {
        score: questions.length,
        totalQuestions: questions.length,
      })
    );
  });
});
