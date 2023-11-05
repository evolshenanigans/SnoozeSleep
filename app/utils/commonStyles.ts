import { colors } from "./colors";

export const commonStyles = {
  onboardingContainer: {
    display: "flex",
    justifyContent: "flex-start",
    backgroundColor: colors.themeBackground,
    height: "100%",
    // paddingTop: 50,
  },

  modalPositioning: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    zIndex: 100,
  },

  modalOverlay: {
    position: "fixed",
    left: 0,
    top: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(255,255,255, 0.6)",
    zIndex: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
} as const;
