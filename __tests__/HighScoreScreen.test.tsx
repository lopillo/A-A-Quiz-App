import React from 'react';
import { render } from '@testing-library/react-native';
import HighScoreScreen from '../src/components/HighScoreScreen';
import { LanguageProvider } from '../src/i18n/LanguageContext';
import { setLocale, t } from '../src/i18n';

jest.mock('../src/storage/highScore', () => ({
  getHighScore: jest.fn(() =>
    Promise.resolve({
      add: { score: 2, playerName: 'Bob', date: '2024-01-01', badge: 'gold' },
      subtract: { score: 1, playerName: 'Alice', date: '2024-01-02', badge: 'silver' },
      multiply: { score: 0, playerName: '', date: '', badge: null },
      divide: { score: 0, playerName: '', date: '', badge: null },
    })
  ),
}));

describe('HighScoreScreen', () => {
  beforeEach(() => setLocale('en'));

  it('displays stored name and date', async () => {
    const { findByText } = render(
      <LanguageProvider>
        <HighScoreScreen navigation={{ goBack: jest.fn() } as any} route={{ key: 'h', name: 'HighScore' } as any} />
      </LanguageProvider>
    );
    await findByText(`${t('addition')}: 2 (Bob 2024-01-01) - Gold Badge`);
    await findByText(`${t('subtraction')}: 1 (Alice 2024-01-02) - Silver Badge`);
  });
});
