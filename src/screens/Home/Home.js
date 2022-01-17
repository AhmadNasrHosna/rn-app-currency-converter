import React, {useCallback, useEffect, useRef, useState} from 'react';
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
import routes from '../../navigation/routes';

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
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [quoteCurrency, setQuoteCurrency] = useState('GBP');
  const contentScrollView = useRef(null);
  const baseCurrencyInputLayout = useRef(null);
  const [scrollEnabled, setScrollEnabled] = useState(false);

  const swapCurrencies = () => {
    setBaseCurrency(quoteCurrency);
    setQuoteCurrency(baseCurrency);
  };

  const scrollToBaseCurrencyInput = () => {
    contentScrollView.current.scrollTo({
      y: baseCurrencyInputLayout.current?.x + 100,
      animated: true,
    });
  };
  const navigateToCurrencyListModal = (options = {}) => {
    navigation.push(routes.CURRENCY_LIST_SCREEN, options);
  };

  useEffect(() => {
    if (scrollEnabled) {
      scrollToBaseCurrencyInput();
    }
  }, [scrollEnabled]);

  useEffect(() => {
    console.log({baseCurrency, quoteCurrency});
  }, [baseCurrency, quoteCurrency]);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.primary.main}
      />
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.push(routes.OPTIONS_SCREEN)}>
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
            text={baseCurrency}
            value="123"
            onButtonPress={() =>
              navigateToCurrencyListModal({
                title: 'Base Currency',
                activeCurrency: baseCurrency,
              })
            }
            keyboardType="numeric"
            onChangeText={text => console.log('text', text)}
            onLayout={event =>
              (baseCurrencyInputLayout.current = event.nativeEvent.layout)
            }
          />
          <ConversionInput
            text={quoteCurrency}
            value="123"
            onButtonPress={() =>
              navigateToCurrencyListModal({
                title: 'Quote Currency',
                activeCurrency: quoteCurrency,
              })
            }
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
            onPress={() => swapCurrencies()}
          />
        </View>
        <KeyboardSpacer onToggle={visible => setScrollEnabled(visible)} />
      </ScrollView>
    </View>
  );
};

export default Home;
