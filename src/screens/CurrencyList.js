import React, {useCallback} from 'react';
import {View, StatusBar, FlatList, StyleSheet} from 'react-native';
import currencies from '../data/currencies.json';
import {OptionListItem, RowSeparator} from '../components';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {colors} from '../theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useConversion} from '../context';

const getCurrenciesAndExcludeTheSelectedOne = activeCurrency => {
  return currencies.filter(currency => activeCurrency !== currency);
};

const CurrencyList = ({navigation, route}) => {
  const insets = useSafeAreaInsets();
  const {isBaseCurrency} = route?.params || {};
  const {
    state: {baseCurrency, quoteCurrency, rates},
    dispatch,
    setBaseCurrency,
  } = useConversion();
  const activeCurrency = isBaseCurrency ? baseCurrency : quoteCurrency;

  const handleOnPress = item => {
    if (isBaseCurrency) {
      setBaseCurrency(item);
    } else {
      dispatch({
        type: 'setQuoteCurrency',
        payload: {currency: item},
      });
    }

    navigation.pop();
  };

  const isSelected = useCallback(
    item => activeCurrency === item,
    [activeCurrency],
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <FlatList
        style={styles.flatList}
        data={[
          activeCurrency,
          ...getCurrenciesAndExcludeTheSelectedOne(activeCurrency),
        ]}
        renderItem={({item}) => (
          <OptionListItem
            text={item}
            onPress={() => handleOnPress(item)}
            {...(isSelected(item) && {
              iconRight: <FeatherIcon name="check" size={20} color="#fff" />,
              activeItemStyle: {
                wrapper: {borderWidth: 1, borderColor: colors.primary.main},
                text: {fontWeight: '600'},
              },
            })}
          />
        )}
        keyExtractor={item => item}
        ItemSeparatorComponent={() => <RowSeparator />}
        ListFooterComponent={() => (
          <View style={{paddingBottom: insets.bottom}} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {backgroundColor: '#fff'},
  flatList: {paddingTop: 20},
  optionListItem: {
    borderRadius: 8,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginHorizontal: 20,
    marginVertical: 8,
  },
  optionListItemText: {
    fontSize: 17,
    color: colors.text.main,
  },
  rightIconWrapper: {
    backgroundColor: colors.primary.main,
    width: 32,
    height: 32,
    borderRadius: 32 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CurrencyList;
