import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './OptionListItem.styles';

const OptionListItem = ({
  text,
  iconRight,
  onPress = () => null,
  activeItemStyle = {},
}) => {
  return (
    <TouchableOpacity
      style={[styles.optionListItem, activeItemStyle.wrapper]}
      onPress={onPress}>
      <Text style={[styles.optionListItemText, activeItemStyle.text]}>
        {text}
      </Text>
      {iconRight ? (
        <View style={styles.rightIconWrapper}>{iconRight}</View>
      ) : null}
    </TouchableOpacity>
  );
};

export default OptionListItem;
