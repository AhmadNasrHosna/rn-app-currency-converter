import * as React from 'react';
import {api} from '../api';
import {useCallback, useEffect} from 'react';
import {format} from 'date-fns';

const ConversionContext = React.createContext();
const TODAY = format(new Date(), 'MMM dd, yyyy');

const initialState = {
  baseCurrency: 'USD',
  quoteCurrency: 'GBP',
  conversionRate: 0,
  date: TODAY,
  rates: null,
};

function conversionReducer(state, action) {
  switch (action.type) {
    case 'setIsLoading': {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case 'setBaseCurrency': {
      return {...state, baseCurrency: action.payload.currency};
    }
    case 'setQuoteCurrency': {
      return {...state, quoteCurrency: action.payload.currency};
    }
    case 'swapCurrencies': {
      return {
        ...state,
        baseCurrency: state.quoteCurrency,
        quoteCurrency: state.baseCurrency,
      };
    }
    case 'setDate': {
      return {
        ...state,
        date: action.payload.date,
      };
    }
    case 'setRates': {
      return {
        ...state,
        rates: action.payload.rates,
      };
    }
    case 'setConversionRate': {
      return {
        ...state,
        conversionRate: action.payload.conversionRate,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function ConversionProvider({children}) {
  const [state, dispatch] = React.useReducer(conversionReducer, initialState);
  const value = {state, dispatch};

  return (
    <ConversionContext.Provider value={value}>
      {children}
    </ConversionContext.Provider>
  );
}

function useConversion() {
  const context = React.useContext(ConversionContext);
  const {state, dispatch} = context || {};

  if (context === undefined) {
    throw new Error('useConversion must be used within a ConversionProvider');
  }

  const setBaseCurrency = useCallback(
    baseCurrency => {
      dispatch({type: 'setIsLoading', payload: true});

      return api(`/latest?base=${baseCurrency || initialState.baseCurrency}`)
        .then(res => {
          dispatch({
            type: 'setBaseCurrency',
            payload: {currency: res.baseCurrency},
          });
          dispatch({
            type: 'setDate',
            payload: {date: res.date},
          });
          dispatch({
            type: 'setRates',
            payload: {rates: res.rates},
          });
        })
        .catch(err => console.log({err}))
        .finally(() => dispatch({type: 'setIsLoading', payload: false}));
    },
    [state],
  );

  const swapCurrencies = useCallback(() => {
    setBaseCurrency(state.quoteCurrency).then(() => {
      dispatch({
        type: 'setQuoteCurrency',
        payload: {currency: state.baseCurrency},
      });
    });
  }, [state]);

  return {...context, setBaseCurrency, swapCurrencies};
}

export {ConversionProvider, useConversion};
