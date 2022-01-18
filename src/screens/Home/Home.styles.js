import {StyleSheet} from 'react-native';
import {screen} from '../../constants/ui';
import {colors} from '../../theme';

const CONTAINER_PADDING = 20;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary.main,
  },
  content: {paddingTop: screen.height * 0.1},
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  logoBackground: {
    width: screen.width * 0.45,
    height: screen.width * 0.45,
  },
  logoIcon: {
    position: 'absolute',
    width: screen.width * 0.25,
    height: screen.width * 0.25,
  },
  formWrapper: {
    paddingHorizontal: CONTAINER_PADDING,
  },
  formHeading: {
    fontSize: 28,
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
    fontFamily: 'BeVietnamPro-Bold',
    letterSpacing: -0.5,
  },
  resultText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 15,
  },
  reverseIcon: {
    width: 22,
    height: 22,
  },
  header: {
    paddingTop: CONTAINER_PADDING / 2,
    paddingHorizontal: CONTAINER_PADDING,
    alignItems: 'flex-end',
  },
});
