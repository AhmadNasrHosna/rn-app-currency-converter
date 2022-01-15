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
    },
    label: {
      borderRightColor: colors.border,
      borderRightWidth: 1,
      backgroundColor: '#fff',
    },
    labelText: {
      color: colors.primary.main,
      fontWeight: '600',
      alignItems: 'center',
      padding: spacing.inputPadding,
      fontSize: 18,
    },
    input: {
      flex: 1,
      padding: spacing.inputPadding,
      fontSize: 16,
      color: colors.text.light,
      height: '100%',
      backgroundColor: '#fff',
      ...(props.editable === false && {opacity: 0.85}),
    },
  });
