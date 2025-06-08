import { ColorSchemeName, useColorScheme as useNativeColorScheme } from 'react-native';

/**
 * A wrapper around React Native's `useColorScheme` that always returns a non-null value.
 */
export function useColorScheme(): NonNullable<ColorSchemeName> {
  return (useNativeColorScheme() ?? 'light') as NonNullable<ColorSchemeName>;
}
