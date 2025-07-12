import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../src/components/HomeScreen';
import { LanguageProvider } from '../src/i18n/LanguageContext';
import { setLocale, t } from '../src/i18n';

jest.mock('../src/storage/highScore', () => ({
  getHighScore: jest.fn(() =>
    Promise.resolve({
      add: { score: 0, playerName: '', date: '' },
      subtract: { score: 0, playerName: '', date: '' },
      multiply: { score: 0, playerName: '', date: '' },
      divide: { score: 0, playerName: '', date: '' },
    })
  ),
}));

jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');
  return {
    ...actual,
    useFocusEffect: (cb: () => void) => cb(),
  };
});

describe('HomeScreen', () => {
  it('navigates to Selection after entering name in dialog', () => {
    const navigate = jest.fn();
    setLocale('en');
    const { getByText, getByTestId } = render(
      <LanguageProvider>
        <HomeScreen navigation={{ navigate } as any} route={{ key: '0', name: 'Home' } as any} />
      </LanguageProvider>
    );

    fireEvent.press(getByText(t('startQuiz')));
    fireEvent.changeText(getByTestId('playerNameInput'), 'Alice');
    fireEvent.press(getByText(t('continue')));
    expect(navigate).toHaveBeenCalledWith('Selection', { playerName: 'Alice' });
  });
});
