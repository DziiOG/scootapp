import React from 'react';
import {connect} from 'react-redux'


import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';


import {View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    
    TouchableRipple,
    Switch
} from 'react-native-paper';

import {Text} from 'native-base'

import { NavigationContainer } from '@react-navigation/native';


import { ProductConsumer } from '../context';
import { signUserOut } from '../routes/SignIn/modules/signinscreen';

import { signUserOut as signout } from '../routes/SignUp/modules/signupscreen'
import HomeContainer from '../routes/Home/containers/HomeContainer';
import HelpContainer from '../routes/Help/containers/HelpContainer';
import PaymentContainer from '../routes/Payment/containers/PaymentContainer';
import TripsContainer from '../routes/Trips/containers/TripsContainer';
import RootStackScreen from './RootStackNavigator';





const Drawers = createDrawerNavigator();
//const Tab = createBottomTabNavigator();

















function MyDrawer({userToken, signUserOut, signout, username, }) {
  return (
    <ProductConsumer >
      {
        (value)=>(
            (userToken.token) ?
          <NavigationContainer >
            <Drawers.Navigator  initialRouteName="Home"  drawerContent={(props)=> <CustomDrawerContent {...props} signUserOut={signUserOut} signout={signout} ></CustomDrawerContent>}>
              <Drawers.Screen name="Home"  component={HomeContainer} />
              <Drawers.Screen name="Help" component={HelpContainer} />
              <Drawers.Screen name="Payment" component={PaymentContainer} />
              <Drawers.Screen name="Trips" component={TripsContainer} />
            </Drawers.Navigator>
            {
                
                value.getUserName(userToken.userId)
              }
             
          </NavigationContainer>:
          <NavigationContainer>
              <RootStackScreen></RootStackScreen>
          </NavigationContainer>
        )
      }
    </ProductConsumer>
  );
}




function CustomDrawerContent(props) {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);  
      const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
}

  return (
    <ProductConsumer>
      {
        (value)=>(

    <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection: 'row', marginTop: 15}}>
                            <Avatar.Image source={{
                                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSPMPR8kZTIDExkEf15iSImqhGt3R-I6Tp_gwOcQKHkRtIQVI1G&usqp=CAU'
                            }}
                            size={50}
                            >

                            </Avatar.Image>
                            <View style={{marginLeft: 15, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                                <Text  style={styles.title}>{value.username}</Text>
                                
                            </View>
                        </View>

                        
                    </View> 
                    <Drawer.Section style={styles.drawerContent}>
                        <DrawerItem icon={({size}) => (
                                <Icon
                                    name="home-outline"
                                    color="#5cccee"
                                    size={size}
                                    >

                                </Icon>
                                
                                )} 
                                label="Home"
                                
                                onPress={()=> {props.navigation.navigate('Home')}}
                                >
                        </DrawerItem>
                        <DrawerItem  icon={({color, size}) => (
                                <Icon
                                    name="clock-outline"
                                    color="#5cccee"
                                    size={size}
                                    >

                                </Icon>
                                )} 
                                label="Trips"
                                onPress={()=> {props.navigation.navigate('Trips')}}
                                >
                        </DrawerItem>
                      
                        <DrawerItem style={{marginBottom: 50}} icon={({color, size}) => (
                                <Icon
                                    name="wechat"
                                    color="#5cccee"
                                    size={size}
                                    >

                                </Icon>
                                )} 
                                label="Help"
                                onPress={()=> {props.navigation.navigate('Help')}}
                                >
                        </DrawerItem>
                      
                    </Drawer.Section>
                    <Drawer.Section title="Preferences">
                            <TouchableRipple onPress={() => {toggleTheme()}}>
                                <View style={styles.preference}>
                                    <Text>Dark Theme</Text>
                                    <View pointerEvents="none">
                                        <Switch value={isDarkTheme}></Switch>
                                    </View>
                                </View>
                            </TouchableRipple>
                    </Drawer.Section>

                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem icon={({color, size}) => (
                    <Icon
                    name="exit-to-app"
                    color="#5cccee"
                    size={size}
                    >

                    </Icon>
                )} label="Sign Out"
                onPress={()=> {props.signUserOut();  props.signout()}}
                >

                </DrawerItem>
            </Drawer.Section>
        </View>
        )
      }
    </ProductConsumer>
  );
}

/*

function MyTabs() {
    return (
      <Tab.Navigator
        initialRouteName="Feed"
        activeColor="#e91e63"
        style={{ backgroundColor: 'tomato' }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Measurements"
          component={Measurements}
          options={{
            tabBarLabel: 'Updates',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="bell" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Orders"
          component={Orders}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    )
  };

*/







const styles = StyleSheet.create({
  drawerContent: {
      flex: 1,
      marginBottom:50
  },
  userInfoSection: {
      paddingLeft: 20,
  },
  title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
  },
  caption: {
      fontSize: 14,
      lineHeight: 14,
  },
  row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
  },
  section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
  },
  paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
  },
  drawerSection: {
      marginTop: 15,
  },
  bottomDrawerSection: {
      marginBottom: 15,
      borderTopColor: 'grey',
      borderTopWidth: 1,
      
  },
  preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 15,
  
  }
})



const mapStateToProps = state => ({
  userID: state.signin.userID || "" || state.signup.userID,
  userToken: state.signin.userToken || "" || state.signup.userToken,
  username:  state.signin.username || "" 
  
});
const mapActionsCreators = {
  signUserOut,
  signout,
 
};

export default connect(
  mapStateToProps,
  mapActionsCreators,
)(MyDrawer);