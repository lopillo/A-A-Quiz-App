import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { paperTheme } from './src/constants/PaperTheme';
import { LanguageProvider } from './src/i18n/LanguageContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <PaperProvider theme={paperTheme}>
      <LanguageProvider>
        <AppNavigator />
      </LanguageProvider>
    </PaperProvider>
  );
}

