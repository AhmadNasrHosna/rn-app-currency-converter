import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './OptionListItem.styles';

const OptionListItem = ({text, iconRight, onPress = () => null}) => {
  return (
    <TouchableOpacity style={styles.optionListItem} onPress={onPress}>
      <Text style={styles.optionListItemText}>{text}</Text>
      {iconRight ? (
        <View style={styles.rightIconWrapper}>{iconRight}</View>
      ) : null}
    </TouchableOpacity>
  );
};

export default OptionListItem;
