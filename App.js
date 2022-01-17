import React, {useEffect} from 'react';
import GlobalFont from 'react-native-global-font';
import Navigation from './src/navigation';

const App = () => {
  // Set font globally
  useEffect(() => {
    let fontName = 'BeVietnamPro-Regular';
    GlobalFont.applyGlobal(fontName);
  }, []);

  return <Navigation />;
};

export default App;
