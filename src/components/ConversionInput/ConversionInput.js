import React, {forwardRef} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import {getStyles} from './ConversionInput.styles';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {colors} from '../../theme';

const ConversionInput = forwardRef(
  ({text, onButtonPress, isLoading, ...props}, ref) => {
    const styles = getStyles(props);

    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={onButtonPress}
          style={styles.label}
          disabled={isLoading}>
          {isLoading ? (
            <SkeletonPlaceholder
              backgroundColor={colors.primary[200]}
              highlightColor={colors.primary[400]}
              speed={1200}>
              <View style={{width: 40, height: 16, borderRadius: 10}} />
            </SkeletonPlaceholder>
          ) : (
            <Text style={styles.labelText}>{text}</Text>
          )}
        </TouchableOpacity>
        {isLoading ? (
          <View
            style={{
              flex: 1,
              padding: 14,
            }}>
            <SkeletonPlaceholder
              backgroundColor={colors.primary[200]}
              highlightColor={colors.primary[400]}
              speed={1200}>
              <View
                style={{
                  width: '30%',
                  height: 14,
                  borderRadius: 10,
                }}
              />
            </SkeletonPlaceholder>
          </View>
        ) : (
          <TextInput style={styles.input} {...props} />
        )}
      </View>
    );
  },
);

export default ConversionInput;
