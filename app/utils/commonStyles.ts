import { colors } from "./colors";

export const commonStyles = {
  onboardingContainer: {
    display: "flex",
    justifyContent: "flex-start",
    backgroundColor: colors.themeBackground,
    height: "100%",
    // paddingTop: 50,
  },
} as const;
