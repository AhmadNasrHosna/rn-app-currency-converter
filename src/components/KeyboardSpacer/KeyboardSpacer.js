import React, {useEffect, useState} from 'react';
import {View, Keyboard, Platform} from 'react-native';
import styles from './KeyboardSpacer.styles';
import {screen} from '../../constants/ui';

const KeyboardSpacer = ({style, onToggle}) => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const updateKeyboardSpace = event => {
      if (!event.endCoordinates) {
        return;
      }

      const screenHeight = screen.height;
      const endY = event.endCoordinates.screenY;
      const currentKeyboardHeight = screenHeight - endY + 200;

      setKeyboardHeight(currentKeyboardHeight);
      onToggle(true);
    };

    const resetKeyboardHeight = () => {
      setKeyboardHeight(0);
      onToggle(false);
    };

    const showEvt =
      Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow';
    const showListener = Keyboard.addListener(showEvt, updateKeyboardSpace);

    const hideEvt =
      Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide';
    const hideListener = Keyboard.addListener(hideEvt, resetKeyboardHeight);

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  return (
    <View style={[styles.keyboardSpacer, {height: keyboardHeight}, style]} />
  );
};

export default KeyboardSpacer;
