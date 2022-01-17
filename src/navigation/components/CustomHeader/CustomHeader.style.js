import {StyleSheet} from 'react-native';
import {colors} from '../../../theme';

export const getStyles = ({isModal}) => {
  const headerHorizontalPadding = 20;
  const headerVerticalPadding = isModal ? 10 : 20;
  const minHeight = isModal ? 70 : 100;
  const backActionButtonSize = 36;

  return StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderBottomWidth: 1,
      borderBottomColor: colors.primary[200],
      paddingStart: headerHorizontalPadding,
      paddingEnd: headerHorizontalPadding,
      paddingVertical: headerVerticalPadding,
      minHeight,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.primary[800],
    },
    headerBackButton: {
      width: backActionButtonSize,
      height: backActionButtonSize,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: backActionButtonSize / 2,
      transform: [{translateX: -8}],
    },
    headerLeft: {width: backActionButtonSize},
    headerCloseModalButton: {
      backgroundColor: colors.primary[100],
      width: backActionButtonSize,
      height: backActionButtonSize,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: backActionButtonSize / 2,
    },
  });
};
