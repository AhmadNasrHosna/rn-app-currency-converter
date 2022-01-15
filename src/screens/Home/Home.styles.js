import {StyleSheet} from 'react-native';
import {screen} from '../../constants/ui';
import {colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary.main,
  },
  content: {paddingTop: 120},
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  logoBackground: {width: screen.width * 0.45, height: screen.width * 0.45},
  logoIcon: {
    position: 'absolute',
    width: screen.width * 0.25,
    height: screen.width * 0.25,
  },
  formWrapper: {
    paddingHorizontal: 20,
  },
  formHeading: {
    fontSize: 27,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  resultText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 15,
  },
  reverseIcon: {
    width: 26,
    height: 26,
  },
});
