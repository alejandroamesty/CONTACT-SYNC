import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet, Keyboard } from 'react-native';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const VerificationInput = ({ onChange }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputs = useRef([]);
  const animations = useRef(Array(6).fill(null).map(() => useSharedValue(1)));

  useEffect(() => {
    onChange(code.join(''));
  }, [code]);

  const handleChangeText = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text.length === 1) {
      // Trigger animation on input
      animations.current[index].value = withTiming(1.2, { duration: 150, easing: Easing.bounce }, () => {
        animations.current[index].value = withTiming(1, { duration: 150 });
      });

      if (index < inputs.current.length - 1) {
        inputs.current[index + 1].focus();
      } else {
        inputs.current[index].blur();
        Keyboard.dismiss();
      }
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (code[index] !== '') {
        handleChangeText('', index);

        // Trigger animation on input
        animations.current[index].value = withTiming(0.8, { duration: 150, easing: Easing.bounce }, () => {
          animations.current[index].value = withTiming(1, { duration: 150 });
        });
      } else if (index > 0) {
        inputs.current[index - 1].focus();
        handleChangeText('', index - 1);

        // Trigger animation on previous input
        animations.current[index - 1].value = withTiming(0.8, { duration: 150, easing: Easing.bounce }, () => {
          animations.current[index - 1].value = withTiming(1, { duration: 150 });
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      {code.map((digit, index) => {
        const animatedStyle = useAnimatedStyle(() => ({
          transform: [{ scale: animations.current[index].value }]
        }));

        return (
          <Animated.View key={index} style={[styles.inputContainer, animatedStyle]}>
            <TextInput
              style={styles.input}
              value={digit}
              onChangeText={(text) => handleChangeText(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="numeric"
              maxLength={1}
              ref={(ref) => inputs.current[index] = ref}
            />
          </Animated.View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
  },
  inputContainer: {
    width: 50.71,
    height: 50.71,
    marginHorizontal: 5,
  },
  input: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1E264D',
    borderColor: 'rgba(255, 255, 255, 0.17)',
    borderWidth: 1,
    borderRadius: 20,
    textAlign: 'center',
    fontFamily: 'BROmnyMedium',
    fontSize: 20,
    lineHeight: 26,
    color: '#FFFFFF',
  },
});

export default VerificationInput;
