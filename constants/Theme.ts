/**
 * Global theme configuration for the application (Light Theme Only)
 */
export const AppTheme = {
  colors: {
    // Core Palette from Images
    primary: "#FFC0CB", // Soft Pink for main interactive elements (Save button, + Add button bg)
    primaryText: "#8B4513", // Warm, dark brown for text on primary buttons

    secondary: "#FFF0F5", // Very pale pink or off-white for secondary buttons (Cancel) or highlights
    secondaryText: "#D2691E", // Lighter brown/dark orange for text on secondary elements

    background: "#FFF8F0", // Overall app background - a very light, warm cream/off-white
    surface: "#FFFFFF", // For cards, list items, input fields - typically pure white

    text: "#5D4037", // Main text color (e.g., "Calendar", "Contacts", field labels)
    textSecondary: "#A1887F", // For placeholder text or less important info

    accent: "#FFB6C1", // Could be a slightly brighter pink for icons or highlights

    // Status & Notifications
    error: "#FF6B6B",
    success: "#2EC4B6",
    warning: "#FF9F1C",
    info: "#9381FF",
    notification: "#FF6B6B", // Often same as error or a dedicated color

    // UI Elements
    border: "#F5E0E0", // Subtle border color for input fields or list item separators
    disabled: "#D3D3D3", // Standard disabled color
    disabledText: "#A9A9A9", // Text color for disabled elements

    // Specific to your UI examples from images
    icon: "#D2691E", // Color for icons like the ">" in "Contact Emily"
    avatarBackground: "#FFE4E1", // Background for the circular contact avatars
    dateHighlightBackground: "#FFDAB9", // Background for the "April 12" highlight in Calendar
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    xs: 2, // For very subtle rounding
    sm: 4, // Small elements
    md: 12, // Default for cards, input fields
    lg: 20, // Larger buttons, elements
    xl: 30, // Almost pill-shaped buttons like "Save", "Cancel", "+ Add"
    pill: 500, // For fully circular elements (like the "+" FAB background)
    circular: 9999, // Forcing circular shape for avatars
  },
  typography: {
    fontFamily: {
      regular: "System", // For body text, labels
      medium: "System", // For slightly more emphasis, button text (iOS uses semibold for "System" medium weight)
      bold: "System", // For titles like "Calendar", "Add Appointment"
      // mono: 'SpaceMono', // Uncomment if you have SpaceMono font configured for Expo
    },
    fontSize: {
      xs: 12, // Small print
      sm: 14, // Secondary text, placeholders
      md: 16, // Default body text, input text
      lg: 18, // Button text, list item primary text
      xl: 24, // Sub-headings or important text
      xxl: 28, // Main page titles (e.g., "Calendar", "Contacts")
      xxxl: 36, // Larger display text if any
    },
    lineHeight: {
      xs: 16,
      sm: 20,
      md: 24,
      lg: 28,
      xl: 32,
      xxl: 38, // Adjusted for better readability with larger font size
      xxxl: 48,
    },
    // Optional: Define specific text styles for common elements
    // title: {
    //   fontFamily: 'System', // or fontFamily.bold
    //   fontSize: 28, // or fontSize.xxl
    //   fontWeight: 'bold', // if not using fontFamily.bold directly
    //   color: '#5D4037', // or colors.text
    // },
    // body: {
    //   fontFamily: 'System', // or fontFamily.regular
    //   fontSize: 16, // or fontSize.md
    //   color: '#5D4037', // or colors.text
    // },
    // button: {
    //   fontFamily: 'System', // or fontFamily.medium
    //   fontSize: 18, // or fontSize.lg
    //   fontWeight: '500', // or '600'
    // }
  },
  shadows: {
    none: {
      shadowColor: "transparent",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
    xs: {
      // For very subtle lifts, like active list items or subtle borders
      shadowColor: "#D2B48C", // A brownish shadow color to match the warm theme
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.08, // Softer
      shadowRadius: 0.8,
      elevation: 1,
    },
    sm: {
      // For cards, input fields, list items
      shadowColor: "#D2B48C",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.12, // Softer
      shadowRadius: 1.8,
      elevation: 2,
    },
    md: {
      // For buttons or elements needing more prominence
      shadowColor: "#D2B48C",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.18, // Softer
      shadowRadius: 3.5,
      elevation: 4,
    },
    lg: {
      // For modals or floating action buttons (if needed)
      shadowColor: "#D2B48C",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.22, // Softer
      shadowRadius: 5.5,
      elevation: 8,
    },
  },
  // You can add other categories as needed, for example:
  // iconography: {
  //   sizeSmall: 18,
  //   sizeMedium: 24,
  //   sizeLarge: 30,
  //   color: '#D2691E', // Same as colors.icon
  // },
  // components: { // For default styling of common components
  //   button: {
  //     borderRadius: 30, // or borderRadius.xl
  //     paddingVertical: 16, // or spacing.md
  //     paddingHorizontal: 24, // or spacing.lg
  //   },
  //   card: {
  //     borderRadius: 12, // or borderRadius.md
  //     padding: 16, // or spacing.md
  //     backgroundColor: '#FFFFFF', // or colors.surface
  //   }
  // }
};

// Helper type for accessing theme values in a type-safe way
export type AppThemeType = typeof AppTheme;
