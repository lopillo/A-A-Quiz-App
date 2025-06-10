import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavigator from './src/navigation/AppNavigator';
import { paperTheme } from './src/constants/PaperTheme';
import { LanguageProvider } from './src/i18n/LanguageContext';

export default function App() {
  return (
    <PaperProvider theme={paperTheme}>
      <LanguageProvider>
        <AppNavigator />
      </LanguageProvider>
    </PaperProvider>
  );
}

