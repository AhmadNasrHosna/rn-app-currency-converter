import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Home, Options, CurrencyList} from '../screens';
import routes from './routes';
import CustomHeader from './components/CustomHeader/CustomHeader';

const MainStack = createStackNavigator();
const ModalStack = createStackNavigator();

const MainStackScreen = () => (
  <MainStack.Navigator
    initialRouteName={routes.HOME_SCREEN}
    screenOptions={{
      presentation: 'screen',
      header: props => <CustomHeader {...props} />,
    }}>
    <MainStack.Screen
      name={routes.HOME_SCREEN}
      component={Home}
      options={{headerShown: false}}
    />
    <MainStack.Screen
      name={routes.OPTIONS_SCREEN}
      component={Options}
      options={{headerConfig: {title: 'Options'}}}
    />
  </MainStack.Navigator>
);

const ModalStackScreen = () => (
  <ModalStack.Navigator
    screenOptions={{
      header: props => <CustomHeader {...props} />,
      presentation: 'modal',
    }}>
    <ModalStack.Screen
      name={routes.MAIN_STACK}
      component={MainStackScreen}
      options={{headerShown: false}}
    />
    <MainStack.Screen
      name={routes.CURRENCY_LIST_SCREEN}
      component={CurrencyList}
      options={({route}) => ({
        headerConfig: {title: route.params.title},
      })}
    />
  </ModalStack.Navigator>
);

export default () => (
  <NavigationContainer>
    <ModalStackScreen />
  </NavigationContainer>
);
