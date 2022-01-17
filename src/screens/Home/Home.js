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
  const [baseCurrencyValue, setBaseCurrencyValue] = useState('100');
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

  // Description
  useEffect(() => {
    console.log({baseCurrencyValue});
  }, [baseCurrencyValue]);

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
            value={baseCurrencyValue}
            onButtonPress={() =>
              navigateToCurrencyListModal({
                title: 'Base Currency',
                activeCurrency: baseCurrency,
              })
            }
            onChangeText={text => setBaseCurrencyValue(text)}
            keyboardType="numeric"
            onLayout={event =>
              (baseCurrencyInputLayout.current = event.nativeEvent.layout)
            }
            placeholder="Base Currency Value"
          />
          <ConversionInput
            text={quoteCurrency}
            value={
              baseCurrencyValue
                ? `${parseFloat(baseCurrencyValue * CONVERSION_RATE).toFixed(
                    2,
                  )}`
                : ''
            }
            onButtonPress={() =>
              navigateToCurrencyListModal({
                title: 'Quote Currency',
                activeCurrency: quoteCurrency,
              })
            }
            editable={false}
            placeholder="Quote Currency Value"
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
