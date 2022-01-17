import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Home, Options, CurrencyList} from '../screens';
import routes from './routes';
import CustomHeader from './components/CustomHeader/CustomHeader';

const Stack = createStackNavigator();

const StackScreen = () => (
  <Stack.Navigator
    initialRouteName={routes.HOME_SCREEN}
    screenOptions={{
      header: props => <CustomHeader {...props} />,
    }}>
    <Stack.Screen
      name={routes.HOME_SCREEN}
      component={Home}
      options={{headerShown: false, title: 'Home'}}
    />
    <Stack.Screen
      name={routes.OPTIONS_SCREEN}
      component={Options}
      options={{headerConfig: {title: 'Options'}}}
    />
    <Stack.Screen
      name={routes.CURRENCY_LIST_SCREEN}
      component={CurrencyList}
      options={({route}) => ({
        headerConfig: {title: route.params.title},
      })}
    />
  </Stack.Navigator>
);

export default () => (
  <NavigationContainer>
    <StackScreen />
  </NavigationContainer>
);
