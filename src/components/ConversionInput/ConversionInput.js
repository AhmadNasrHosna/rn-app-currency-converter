import React, {forwardRef} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import {getStyles} from './ConversionInput.styles';

const ConversionInput = forwardRef(({text, onButtonPress, ...props}, ref) => {
  const styles = getStyles(props);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onButtonPress} style={styles.label}>
        <Text style={styles.labelText}>{text}</Text>
      </TouchableOpacity>
      <TextInput style={styles.input} {...props} />
    </View>
  );
});

export default ConversionInput;
