import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SelectionScreen from '../src/components/SelectionScreen';
import { LanguageProvider } from '../src/i18n/LanguageContext';
import { setLocale, t } from '../src/i18n';

describe('SelectionScreen', () => {
  beforeEach(() => setLocale('en'));

  it('buttons navigate to Quiz with operation', () => {
    const navigate = jest.fn();
    const { getByText } = render(
      <LanguageProvider>
        <SelectionScreen navigation={{ navigate } as any} route={{ key: '1', name: 'Selection', params: { playerName: 'Bob' } } as any} />
      </LanguageProvider>
    );

    fireEvent.press(getByText(t('addition')));
    expect(navigate).toHaveBeenCalledWith('Quiz', { operation: 'add', playerName: 'Bob' });
    fireEvent.press(getByText(t('subtraction')));
    expect(navigate).toHaveBeenCalledWith('Quiz', { operation: 'subtract', playerName: 'Bob' });
    fireEvent.press(getByText(t('multiplication')));
    expect(navigate).toHaveBeenCalledWith('Quiz', { operation: 'multiply', playerName: 'Bob' });
    fireEvent.press(getByText(t('division')));
    expect(navigate).toHaveBeenCalledWith('Quiz', { operation: 'divide', playerName: 'Bob' });
  });

  it('record button navigates to HighScoreScreen', () => {
    const navigate = jest.fn();
    const { getByText } = render(
      <LanguageProvider>
        <SelectionScreen navigation={{ navigate } as any} route={{ key: '2', name: 'Selection', params: { playerName: 'Bob' } } as any} />
      </LanguageProvider>
    );

    fireEvent.press(getByText(t('viewRecords')));
    expect(navigate).toHaveBeenCalledWith('HighScore');
  });
});
