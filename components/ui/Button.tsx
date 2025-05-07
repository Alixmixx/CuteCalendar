import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { AppTheme } from "@/constants/Theme";

// Define the props for the Button component
interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
  fullWidth = false,
}) => {

  // Determine styles based on variant, size, and disabled/loading state
  const getButtonStyles = () => {
    const baseContainerStyle: ViewStyle = {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: "transparent", // Default, overridden by variants
      opacity: disabled || loading ? 0.7 : 1,
      alignSelf: fullWidth ? "stretch" : "flex-start",
    };

    const baseTextStyle: TextStyle = {
      fontWeight: "600", // Corresponds to AppTheme.typography.fontFamily.medium or bold
      fontFamily: AppTheme.typography.fontFamily.medium,
    };

    // Size-specific styles
    let sizeContainerStyle: ViewStyle = {};
    let sizeTextStyle: TextStyle = {};
    let iconSize = AppTheme.typography.fontSize.md; // Default icon size

    switch (size) {
      case "sm":
        sizeContainerStyle = {
          paddingVertical: AppTheme.spacing.xs,
          paddingHorizontal: AppTheme.spacing.sm,
          borderRadius: AppTheme.borderRadius.lg, // Slightly smaller radius for smaller buttons
        };
        sizeTextStyle = {
          fontSize: AppTheme.typography.fontSize.sm,
        };
        iconSize = AppTheme.typography.fontSize.sm;
        break;
      case "md":
        sizeContainerStyle = {
          paddingVertical: AppTheme.spacing.sm + 2, // Adjusted for better visual balance like images
          paddingHorizontal: AppTheme.spacing.lg,
          borderRadius: AppTheme.borderRadius.xl, // Pill-like as in images
        };
        sizeTextStyle = {
          fontSize: AppTheme.typography.fontSize.md, // Images suggest button text is slightly larger
        };
        iconSize = AppTheme.typography.fontSize.lg;
        break;
      case "lg":
        sizeContainerStyle = {
          paddingVertical: AppTheme.spacing.md,
          paddingHorizontal: AppTheme.spacing.xl,
          borderRadius: AppTheme.borderRadius.pill,
        };
        sizeTextStyle = {
          fontSize: AppTheme.typography.fontSize.lg,
        };
        iconSize = AppTheme.typography.fontSize.xl;
        break;
    }

    // Variant-specific styles
    let variantContainerStyle: ViewStyle = {};
    let variantTextStyle: TextStyle = {};

    switch (variant) {
      case "primary":
        variantContainerStyle = {
          backgroundColor: AppTheme.colors.primary,
          borderColor: AppTheme.colors.primary,
          ...AppTheme.shadows.md, // Add shadow for primary buttons
        };
        variantTextStyle = {
          color: AppTheme.colors.primaryText,
        };
        break;
      case "secondary":
        variantContainerStyle = {
          backgroundColor: AppTheme.colors.secondary,
          borderColor: AppTheme.colors.secondary,
          ...AppTheme.shadows.sm, // Lighter shadow for secondary
        };
        variantTextStyle = {
          color: AppTheme.colors.secondaryText,
        };
        break;
      case "outline":
        variantContainerStyle = {
          backgroundColor: "transparent",
          borderColor: AppTheme.colors.primary, // Use primary color for outline border
        };
        variantTextStyle = {
          color: AppTheme.colors.primary, // Text color matches border
        };
        break;
      case "ghost": // No background, no border, just text
        variantContainerStyle = {
          backgroundColor: "transparent",
          borderColor: "transparent",
        };
        variantTextStyle = {
          color: AppTheme.colors.primary, // Text color often primary for ghost buttons
        };
        break;
    }

    if (disabled) {
      variantContainerStyle.backgroundColor = AppTheme.colors.disabled;
      variantContainerStyle.borderColor = AppTheme.colors.disabled;
      variantTextStyle.color = AppTheme.colors.disabledText;
    }

    return {
      container: StyleSheet.flatten([
        baseContainerStyle,
        sizeContainerStyle,
        variantContainerStyle,
        style, // Apply custom container styles last
      ]),
      text: StyleSheet.flatten([
        baseTextStyle,
        sizeTextStyle,
        variantTextStyle,
        textStyle, // Apply custom text styles last
      ]),
      iconSize,
    };
  };

  const { container, text, iconSize: currentIconSize } = getButtonStyles();

  // Helper to render icons with appropriate color and size
  const renderIcon = (iconNode: React.ReactNode) => {
    if (!iconNode) return null;
    if (React.isValidElement(iconNode) && typeof iconNode.type !== "string") {
      // Use a more flexible type that allows for any prop
      return React.cloneElement(iconNode as React.ReactElement, {
        // This is necessary because different icon libraries use different prop names
        size: currentIconSize,
        ...(text.color ? { color: text.color } : {})
      } as any);
    }
    return iconNode; // Return as is if it's a primitive or already styled
  };

  return (
    <TouchableOpacity
      style={container}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8} // Standard active opacity
    >
      {loading ? (
        <ActivityIndicator size="small" color={text.color} />
      ) : (
        <>
          {leftIcon && (
            <View style={{ marginRight: title ? AppTheme.spacing.sm : 0 }}>
              {renderIcon(leftIcon)}
            </View>
          )}
          <Text style={text}>{title}</Text>
          {rightIcon && (
            <View style={{ marginLeft: title ? AppTheme.spacing.sm : 0 }}>
              {renderIcon(rightIcon)}
            </View>
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;
