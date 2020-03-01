import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './src/screens/Login';
import RegisterScreen from './src/screens/Register'
import HomeScreen from './src/screens/Home';
import ForgetPasswordScreen from './src/screens/ForgetPassword';
import DetailScreen from './src/screens/Detail';


const AppNavigator = createStackNavigator({
  Login: {screen: LoginScreen},
  Register: {screen: RegisterScreen},
  Home:{screen: HomeScreen},
  ForgetPassword:{screen: ForgetPasswordScreen},
  Detail:{screen: DetailScreen},
  },
  {
    initialRouteName: 'Login',
    headerMode:'none'
  }
);

export default createAppContainer(AppNavigator);
