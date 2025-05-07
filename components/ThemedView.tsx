import { View, type ViewProps } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';

export type ThemedViewProps = ViewProps & {
  variant?: 'primary' | 'secondary' | 'surface' | 'default';
};

export function ThemedView({ 
  style, 
  variant = 'default',
  ...otherProps 
}: ThemedViewProps) {
  const theme = useAppTheme();
  
  // Get the background color based on the variant
  const getBackgroundColor = () => {
    switch (variant) {
      case 'primary':
        return theme.colors.primary;
      case 'secondary':
        return theme.colors.secondary;
      case 'surface':
        return theme.colors.surface;
      case 'default':
      default:
        return theme.colors.background;
    }
  };

  return (
    <View 
      style={[
        { backgroundColor: getBackgroundColor() },
        style
      ]} 
      {...otherProps} 
    />
  );
}
