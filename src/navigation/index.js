import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Home, Options} from '../screens';

const Stack = createStackNavigator();

const StackScreen = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
    <Stack.Screen name="Options" component={Options} />
  </Stack.Navigator>
);

export default () => (
  <NavigationContainer>
    <StackScreen />
  </NavigationContainer>
);
