import React from 'react';
import SignInScreenContainer from '../routes/SignIn/containers/SignInScreenContainer'
import SignUpScreenContainer from '../routes/SignUp/containers/SignUpScreenContainer'
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreenContainer from '../routes/Splash/containers/SplashScreenContainer';



const RootStack = createStackNavigator();


const RootStackScreen = ({navigation}) => {
    return (

    <RootStack.Navigator headerMode="none">
        <RootStack.Screen name="SplashScreen" component={SplashScreenContainer}></RootStack.Screen>
        <RootStack.Screen name="SignInScreen" component={SignInScreenContainer}></RootStack.Screen>
        <RootStack.Screen name="SignUpScreen" component={SignUpScreenContainer}></RootStack.Screen>
    </RootStack.Navigator>
    )
}
export default RootStackScreen;