import * as React from 'react';

const ConversionContext = React.createContext();

function conversionReducer(state, action) {
  switch (action.type) {
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
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const initialState = {
  baseCurrency: 'USD',
  quoteCurrency: 'GBP',
  conversionRate: 0.89824,
};

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
  if (context === undefined) {
    throw new Error('useConversion must be used within a ConversionProvider');
  }
  return context;
}

export {ConversionProvider, useConversion};
