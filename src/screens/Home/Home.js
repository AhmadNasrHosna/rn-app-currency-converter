import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StatusBar,
  Image,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../../theme';
import {Button, ConversionInput, KeyboardSpacer} from '../../components';
import {format} from 'date-fns';
import styles from './Home.styles';
import FeatherIcon from 'react-native-vector-icons/Feather';

const logoBackground = require('../../assets/images/background.png');
const logoIcon = require('../../assets/images/logo.png');
const reverseIcon = require('../../assets/images/reverse.png');

const CURRENCIES = {
  USD: 'USD',
  GBP: 'GBP',
};

const CONVERSION_RATE = 0.89824;

const TODAY = format(new Date(), 'MMM dd, yyyy');

const Home = ({navigation}) => {
  const contentScrollView = useRef(null);
  const usdInput = useRef(null);
  const [scrollEnabled, setScrollEnabled] = useState(false);

  const scrollToUsdInput = () => {
    contentScrollView.current.scrollTo({
      y: usdInput.current?.x + 100,
      animated: true,
    });
  };

  useEffect(() => {
    if (scrollEnabled) {
      scrollToUsdInput();
    }
  }, [scrollEnabled]);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.primary.main}
      />
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.push('Options')}>
            <FeatherIcon name="settings" color="#fff" size={20} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <ScrollView
        style={styles.content}
        ref={contentScrollView}
        scrollEnabled={scrollEnabled}>
        <View style={styles.logoContainer}>
          <Image
            source={logoBackground}
            style={styles.logoBackground}
            resizeMode="contain"
          />
          <Image
            source={logoIcon}
            style={styles.logoIcon}
            resizeMode="contain"
          />
        </View>
        <View style={styles.formWrapper}>
          <Text style={styles.formHeading}>Currency Converter</Text>
          <ConversionInput
            text="USD"
            value="123"
            onButtonPress={() => navigation.push('Currency List')}
            keyboardType="numeric"
            onChangeText={text => console.log('text', text)}
            onLayout={event => (usdInput.current = event.nativeEvent.layout)}
          />
          <ConversionInput
            text="GBP"
            value="123"
            onButtonPress={() => navigation.push('Currency List')}
            editable={false}
          />
          <Text style={styles.resultText}>
            {`1 ${CURRENCIES.USD} = ${CONVERSION_RATE} ${CURRENCIES.GBP} as of ${TODAY}.`}
          </Text>
          <Button
            text="Reverse Currencies "
            iconLeft={
              <Image
                source={reverseIcon}
                resizeMode="contain"
                style={styles.reverseIcon}
              />
            }
            onPress={() => navigation.push('Currency List')}
          />
        </View>
        <KeyboardSpacer onToggle={visible => setScrollEnabled(visible)} />
      </ScrollView>
    </View>
  );
};

export default Home;
