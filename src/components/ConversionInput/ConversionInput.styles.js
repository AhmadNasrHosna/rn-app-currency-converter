import {StyleSheet} from 'react-native';
import {colors, spacing} from '../../theme';

export const getStyles = (props = {}) =>
  StyleSheet.create({
    container: {
      marginBottom: 20,
      borderRadius: 5,
      flexDirection: 'row',
      alignItems: 'center',
      overflow: 'hidden',
      height: 48,
      backgroundColor: '#fff',
    },
    label: {
      borderRightColor: colors.border,
      borderRightWidth: 1,
      backgroundColor: '#fff',
      height: '100%',
      minWidth: 64,
      alignItems: 'center',
      justifyContent: 'center',
    },
    labelText: {
      color: colors.primary.main,
      fontWeight: '600',
      fontSize: 17,
    },
    input: {
      flex: 1,
      padding: spacing.inputPadding,
      fontSize: 16,
      color: colors.text.light,
      height: '100%',
      backgroundColor: props.editable === false ? colors.primary[200] : '#fff',
    },
  });
