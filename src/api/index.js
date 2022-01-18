import {format} from 'date-fns';
import rates from '../data/rates.json';

export const api = (fullPath = '') => {
  const [path] = fullPath.split('?');

  if (path.length === 0) {
    return Promise.reject(() => console.log(new Error('Path is required.')));
  }

  if (path !== '/latest') {
    return Promise.reject(() => console.log(new Error('Invalid path.')));
  }

  const baseCurrency = fullPath.split('base=')[1] || 'USD';
  const TODAY = format(new Date(), 'MMM dd, yyyy');

  return new Promise(resolve =>
    setTimeout(
      () =>
        resolve({
          baseCurrency,
          date: TODAY,
          rates: {...rates, [baseCurrency]: 1},
        }),
      0,
    ),
  );
};
