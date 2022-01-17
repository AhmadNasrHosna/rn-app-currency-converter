import {StyleSheet} from 'react-native';
import {colors} from '../../theme';

export default StyleSheet.create({
  flatListContainer: {paddingTop: 20},
  optionListItem: {
    borderRadius: 8,
    backgroundColor: colors.primary[100],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 13,
    marginHorizontal: 20,
    marginVertical: 8,
  },
  optionListItemText: {
    fontSize: 17,
    color: colors.primary[800],
    fontWeight: '500',
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
