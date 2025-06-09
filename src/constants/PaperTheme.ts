import { MD3LightTheme } from 'react-native-paper';
import { Colors } from './Colors';

export const paperTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#0066cc',
    secondary: '#ff6600',
    background: Colors.light.background,
    surface: '#ffffff',
    onSurface: Colors.light.text,
  },
};
