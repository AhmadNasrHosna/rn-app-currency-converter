import React from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {getStyles} from './CustomHeader.style';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../../theme';

const CustomHeader = ({options}) => {
  const {headerConfig: {title = ''} = {}, presentation = ''} = options || {};
  const isModal = presentation === 'modal';
  const {goBack} = useNavigation();
  const styles = getStyles({isModal});

  return (
    <SafeAreaView style={styles.header}>
      {!isModal ? (
        <TouchableOpacity onPress={goBack} style={styles.headerBackButton}>
          <FeatherIcon
            name="arrow-left"
            color={colors.primary.main}
            size={22}
          />
        </TouchableOpacity>
      ) : null}
      <Text style={styles.headerTitle} numberOfLines={1}>
        {title}
      </Text>
      {isModal ? (
        <TouchableOpacity
          onPress={goBack}
          style={styles.headerCloseModalButton}>
          <FeatherIcon name="x" color={colors.primary.main} size={22} />
        </TouchableOpacity>
      ) : (
        <View style={styles.headerLeft} />
      )}
    </SafeAreaView>
  );
};

export default CustomHeader;
