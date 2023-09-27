import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  horizontalSpaceBetween: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  verticalSpaceBetween: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  }
});
