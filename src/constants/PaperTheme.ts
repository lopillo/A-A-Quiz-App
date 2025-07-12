import { MD3LightTheme } from 'react-native-paper';
import { Colors } from './Colors';

export const paperTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#1a1a1a',
    secondary: '#5db075',
    background: '#f2f2f2',
    surface: '#ffffff',
    onSurface: '#222222',
  },
};
