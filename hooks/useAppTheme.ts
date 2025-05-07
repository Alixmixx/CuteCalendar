import { AppTheme, AppThemeType } from '@/constants/Theme';

/**
 * Hook to access the app theme
 * @returns The app theme object
 */
export function useAppTheme(): AppThemeType {
  return AppTheme;
}