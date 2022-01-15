import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './Button.styles';

const Button = ({text, iconLeft, onPress}) => {
  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <View style={styles.buttonIcon}>{iconLeft}</View>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;
