// SaveButton.js

import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const SaveButton = ({ onPress, title, disabled, style }) => {
  return (
    <TouchableOpacity
      style={[styles.container, style, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: 350,
    height: 55,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontFamily: "BROmnySemiBold",
    fontWeight: "600",
    fontSize: 18,
    lineHeight: 24,
    textAlign: "center",
    color: "#030B38",
  },
});

export default SaveButton;
