import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {RowSeparator} from '../components';
import {colors} from '../theme';
import {openURL} from '../utils';

const OptionListItem = ({text, iconRight, onPress}) => {
  return (
    <TouchableOpacity style={styles.optionListItem} onPress={onPress}>
      <Text style={styles.optionListItemText}>{text}</Text>
      <View style={styles.rightIconWrapper}>{iconRight}</View>
    </TouchableOpacity>
  );
};

const Options = () => {
  return (
    <View style={styles.optionsListWrapper}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Text style={styles.optionListHeading}>List</Text>
      <ScrollView>
        <OptionListItem
          text="Themes"
          iconRight={
            <FeatherIcon name="chevron-right" size={16} color="#fff" />
          }
          onPress={() => openURL('https://learn.reactnativeschool.com')}
        />
        <RowSeparator />
        <OptionListItem
          text="React Native Basics"
          iconRight={
            <FeatherIcon name="external-link" size={16} color="#fff" />
          }
          onPress={() => openURL('xhttps://lesarn.reactnativeschool.com')}
        />
        <RowSeparator />
        <OptionListItem
          text="React Native by Example"
          iconRight={
            <FeatherIcon name="external-link" size={16} color="#fff" />
          }
          onPress={() => openURL('https://learn.reactnativeschool.com')}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  optionsListWrapper: {
    flex: 1,
    paddingVertical: 20,
  },
  optionListHeading: {
    fontSize: 24,
    fontWeight: '700',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  optionListItem: {
    borderRadius: 8,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginHorizontal: 20,
    marginVertical: 8,
  },
  optionListItemText: {
    fontSize: 17,
    color: colors.text.main,
  },
  rightIconWrapper: {
    backgroundColor: colors.primary.main,
    width: 32,
    height: 32,
    borderRadius: 32 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Options;
