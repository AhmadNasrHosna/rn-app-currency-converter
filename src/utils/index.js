import {Alert, Linking} from 'react-native';

export const openURL = url =>
  Linking.openURL(url).catch(() =>
    Alert.alert('Sorry, Something went wrong.', 'Please try again later.'),
  );
