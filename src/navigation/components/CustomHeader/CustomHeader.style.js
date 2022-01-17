import {StyleSheet} from 'react-native';
import {colors} from '../../../theme';

export default StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: colors.primary[200],
    paddingStart: 20,
    paddingEnd: 20,
    paddingVertical: 20,
    minHeight: 100,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text.main,
  },
});
