import React from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import styles from './CustomHeader.style';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../../theme';

const CustomHeader = ({options}) => {
  const {title = ''} = options?.headerConfig || {};
  const {goBack} = useNavigation();

  return (
    <SafeAreaView style={styles.header}>
      <TouchableOpacity onPress={goBack}>
        <FeatherIcon name="arrow-left" color={colors.primary.main} size={22} />
      </TouchableOpacity>
      <Text style={styles.headerTitle} numberOfLines={1}>
        {title}
      </Text>
      <View />
    </SafeAreaView>
  );
};

export default CustomHeader;
