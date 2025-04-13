import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

const CustomButton = ({
  title,
  onPress,
  buttonStyle = {},
  textStyle = {},
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, buttonStyle]}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 100,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

});

export default CustomButton;