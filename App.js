import React, {useEffect} from 'react';
import GlobalFont from 'react-native-global-font';
import Navigation from './src/navigation';
import {ConversionProvider} from './src/context';

const App = () => {
  // Set font globally
  useEffect(() => {
    let fontName = 'BeVietnamPro-Regular';
    GlobalFont.applyGlobal(fontName);
  }, []);

  return (
    <ConversionProvider>
      <Navigation />
    </ConversionProvider>
  );
};

export default App;
