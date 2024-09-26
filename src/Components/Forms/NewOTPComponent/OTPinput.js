import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, Keyboard,Text} from 'react-native';
import {PLACEHOLDERCOLOR3, PUREBLACK } from '../../../Constants/Colors/Colors';

const OtpInput = ({otp,setOtp}) => {


  const otpInputs = useRef([]);

   const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    // Move to the next input field automatically
    if (value && index < otp.length - 1) {
      otpInputs.current[index + 1].focus();
    }else{

    }
  };

  const handleKeyPress = (index, key) => {
    // Handle backspace to move to the previous input field
    if (key === 'Backspace' && index > 0 && !otp[index]) {
      otpInputs.current[index - 1].focus();
    }
  };

  const handleFocus = (index) => {
    // Set the focus on the last digit when it is empty
    if (index === otp.length - 1 && !otp[index]) {
      otpInputs.current[index].focus();
    }
  };

  
  const renderOtpInputs = () => {
    const renderedInputs = [];
    for (let i = 0; i < otp.length; i++) {
      renderedInputs.push(
        <View key={i} style={{}}>
          <TextInput
            ref={(input) => (otpInputs.current[i] = input)}
            style={[styles.input,{top:i===3 ? 12.2:0}]}
            value={otp[i]}
            placeholder='0'
            placeholderTextColor={PLACEHOLDERCOLOR3}
            onChangeText={(value) => handleOtpChange(i, value)}
            onKeyPress={({ nativeEvent: { key } }) => handleKeyPress(i, key)}
            onFocus={() => handleFocus(i)}
            maxLength={1}
            keyboardType="numeric"
          />
          {(i % 3 === 2 && i < 5) || (i === 3&& <Text style={[styles.separator,{}]}>-</Text>)}
        </View>
      );
    }
    return renderedInputs;
  };
  

  return <View style={styles.container}>{renderOtpInputs()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    fontSize: 18,
    textAlign: 'center',
    color:PUREBLACK
  },
  separator: {
    fontSize: 18,
    top:-25,
    color:PLACEHOLDERCOLOR3
  },
});

export default OtpInput;


