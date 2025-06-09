import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../src/components/HomeScreen';

jest.mock('../src/storage/highScore', () => ({
  getHighScore: jest.fn(() => Promise.resolve(0)),
}));

jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');
  return {
    ...actual,
    useFocusEffect: (cb: () => void) => cb(),
  };
});

describe('HomeScreen', () => {
  it('navigates to Quiz on button press', () => {
    const navigate = jest.fn();
    const { getByText } = render(
      <HomeScreen navigation={{ navigate } as any} route={{ key: '0', name: 'Home' } as any} />
    );

    fireEvent.press(getByText('Starte dein Quiz!'));
    expect(navigate).toHaveBeenCalledWith('Quiz');
  });
});
