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
import {ConversionInput, KeyboardSpacer} from '../../components';
import styles from './Home.styles';
import FeatherIcon from 'react-native-vector-icons/Feather';
import routes from '../../navigation/routes';
import {useConversion} from '../../context';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const logoBackground = require('../../assets/images/background.png');
const logoIcon = require('../../assets/images/logo.png');

const Home = ({navigation}) => {
  const [baseCurrencyValue, setBaseCurrencyValue] = useState('100');
  const contentScrollView = useRef(null);
  const baseCurrencyInputLayout = useRef(null);
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const {
    state: {baseCurrency, quoteCurrency, rates, date, isLoading},
    swapCurrencies,
    setBaseCurrency,
  } = useConversion();

  const convertedValue = parseFloat(
    baseCurrencyValue * (rates?.[quoteCurrency] || 0),
  ).toFixed(2);

  // Set Base currency on App launch
  useEffect(() => {
    setBaseCurrency();
  }, []);

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
                isBaseCurrency: true,
              })
            }
            isLoading={isLoading}
            onChangeText={text => setBaseCurrencyValue(text)}
            keyboardType="numeric"
            onLayout={event =>
              (baseCurrencyInputLayout.current = event.nativeEvent.layout)
            }
            placeholder="Base Currency Value"
          />
          <TouchableOpacity
            disabled={isLoading}
            style={{
              backgroundColor: colors.primary[300],
              width: 40,
              height: 40,
              borderRadius: 40 / 2,
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              top: 103,
              left: 65,
              zIndex: 1,
            }}
            onPress={swapCurrencies}>
            <Image
              source={logoIcon}
              resizeMode="contain"
              style={styles.reverseIcon}
            />
          </TouchableOpacity>
          <ConversionInput
            text={quoteCurrency}
            value={baseCurrencyValue ? `${convertedValue}` : ''}
            onButtonPress={() =>
              navigateToCurrencyListModal({
                title: 'Quote Currency',
                isBaseCurrency: false,
              })
            }
            isLoading={isLoading}
            editable={false}
            placeholder="Quote Currency Value"
          />
          <Text style={styles.resultText}>
            1{' '}
            {isLoading ? (
              <SkeletonPlaceholder
                backgroundColor={colors.primary[100]}
                highlightColor={colors.primary[400]}
                speed={1200}>
                <View style={{width: 50, height: 12, borderRadius: 10}} />
              </SkeletonPlaceholder>
            ) : (
              baseCurrency
            )}{' '}
            ={' '}
            {isLoading ? (
              <SkeletonPlaceholder
                backgroundColor={colors.primary[100]}
                highlightColor={colors.primary[400]}
                speed={1200}>
                <View style={{width: 50, height: 12, borderRadius: 10}} />
              </SkeletonPlaceholder>
            ) : (
              rates?.[quoteCurrency] || 0
            )}{' '}
            {`${quoteCurrency} as of ${date}.`}
          </Text>
        </View>
        <KeyboardSpacer onToggle={visible => setScrollEnabled(visible)} />
      </ScrollView>
    </View>
  );
};

export default Home;
