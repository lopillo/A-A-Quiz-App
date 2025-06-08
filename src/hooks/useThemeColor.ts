import { Colors } from '../constants/Colors';
import { useColorScheme } from './useColorScheme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light
) {
  const theme = useColorScheme();
  const colorFromProps = theme === 'light' ? props.light : props.dark;

  if (colorFromProps) {
    return colorFromProps;
  }

  return Colors[theme][colorName];
}
