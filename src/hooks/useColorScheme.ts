import { ColorSchemeName, useColorScheme as useRNColorScheme } from 'react-native';

export function useColorScheme(): NonNullable<ColorSchemeName> | null {
  // On web, useColorScheme may return undefined, so we coerce to null
  return useRNColorScheme() ?? null;
}
