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
import {format} from 'date-fns';
import styles from './Home.styles';
import FeatherIcon from 'react-native-vector-icons/Feather';
import routes from '../../navigation/routes';
import {useConversion} from '../../context';
import {api} from '../../api';

const logoBackground = require('../../assets/images/background.png');
const logoIcon = require('../../assets/images/logo.png');

const TODAY = format(new Date(), 'MMM dd, yyyy');

const Home = ({navigation}) => {
  const [baseCurrencyValue, setBaseCurrencyValue] = useState('100');
  const contentScrollView = useRef(null);
  const baseCurrencyInputLayout = useRef(null);
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const {
    state: {baseCurrency, quoteCurrency, conversionRate},
    dispatch,
  } = useConversion();
  const convertedValue = parseFloat(baseCurrencyValue * conversionRate).toFixed(
    2,
  );

  useEffect(() => {
    api('/latest?base=USD')
      .then(res => console.log({res}))
      .catch(err => console.log({err}));
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
            onChangeText={text => setBaseCurrencyValue(text)}
            keyboardType="numeric"
            onLayout={event =>
              (baseCurrencyInputLayout.current = event.nativeEvent.layout)
            }
            placeholder="Base Currency Value"
          />
          <TouchableOpacity
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
            onPress={() => dispatch({type: 'swapCurrencies'})}>
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
            editable={false}
            placeholder="Quote Currency Value"
          />
          <Text style={styles.resultText}>
            {`1 ${baseCurrency} = ${conversionRate} ${quoteCurrency} as of ${TODAY}.`}
          </Text>
        </View>
        <KeyboardSpacer onToggle={visible => setScrollEnabled(visible)} />
      </ScrollView>
    </View>
  );
};

export default Home;
