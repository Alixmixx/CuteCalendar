import { Text, type TextProps } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'heading1' | 'heading2' | 'heading3' | 'body' | 'caption';
  variant?: 'primary' | 'primaryText' | 'secondary' | 'secondaryText' | 'textSecondary' | 'error' | 'success' | 'warning' | 'info' | 'default';
};

export function ThemedText({
  style,
  type = 'default',
  variant = 'default',
  ...rest
}: ThemedTextProps) {
  const theme = useAppTheme();
  
  // Get text color based on variant
  const getTextColor = () => {
    switch (variant) {
      case 'primary':
        return theme.colors.primary;
      case 'primaryText':
        return theme.colors.primaryText;
      case 'secondary':
        return theme.colors.secondary;
      case 'secondaryText':
        return theme.colors.secondaryText;
      case 'textSecondary':
        return theme.colors.textSecondary;
      case 'error':
        return theme.colors.error;
      case 'success':
        return theme.colors.success;
      case 'warning':
        return theme.colors.warning;
      case 'info':
        return theme.colors.info;
      case 'default':
      default:
        return theme.colors.text;
    }
  };
  
  // Get text style based on type
  const getTypeStyle = () => {
    switch (type) {
      case 'title':
        return {
          fontSize: theme.typography.fontSize.xxxl,
          fontWeight: 'bold' as const,
          lineHeight: theme.typography.lineHeight.xxxl,
        };
      case 'heading1':
        return {
          fontSize: theme.typography.fontSize.xxl,
          fontWeight: 'bold' as const,
          lineHeight: theme.typography.lineHeight.xxl,
        };
      case 'heading2':
        return {
          fontSize: theme.typography.fontSize.xl,
          fontWeight: 'bold' as const,
          lineHeight: theme.typography.lineHeight.xl,
        };
      case 'heading3':
      case 'subtitle':
        return {
          fontSize: theme.typography.fontSize.lg,
          fontWeight: 'bold' as const,
          lineHeight: theme.typography.lineHeight.lg,
        };
      case 'defaultSemiBold':
        return {
          fontSize: theme.typography.fontSize.md,
          fontWeight: '600' as const,
          lineHeight: theme.typography.lineHeight.md,
        };
      case 'body':
      case 'default':
        return {
          fontSize: theme.typography.fontSize.md,
          lineHeight: theme.typography.lineHeight.md,
        };
      case 'caption':
        return {
          fontSize: theme.typography.fontSize.sm,
          lineHeight: theme.typography.lineHeight.sm,
        };
      case 'link':
        return {
          fontSize: theme.typography.fontSize.md,
          lineHeight: theme.typography.lineHeight.md,
          color: theme.colors.primary,
          textDecorationLine: 'underline' as const,
        };
      default:
        return {
          fontSize: theme.typography.fontSize.md,
          lineHeight: theme.typography.lineHeight.md,
        };
    }
  };

  return (
    <Text
      style={[
        { color: getTextColor() },
        getTypeStyle(),
        style,
      ]}
      {...rest}
    />
  );
}
