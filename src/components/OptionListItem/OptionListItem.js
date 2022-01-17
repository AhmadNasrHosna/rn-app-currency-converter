import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './OptionListItem.styles';

const OptionListItem = ({
  text,
  iconRight,
  onPress = () => null,
  activeItemStyle,
  onLayout,
}) => {
  return (
    <TouchableOpacity
      style={[styles.optionListItem, activeItemStyle]}
      onPress={onPress}
      onLayout={onLayout}>
      <Text style={styles.optionListItemText}>{text}</Text>
      {iconRight ? (
        <View style={styles.rightIconWrapper}>{iconRight}</View>
      ) : null}
    </TouchableOpacity>
  );
};

export default OptionListItem;
