import React, {Component} from 'react';
import MyDrawer from '../navigators/DrawerNavigator';

import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import { ProductProvider } from '../context.js';
import { PersistGate } from 'redux-persist/integration/react'
import { ActivityIndicator } from 'react-native';
import { Root, View } from 'native-base';


export default class AppContainer extends Component {
  render() {
    return (
      <Provider store={this.props.store}> 
      <PersistGate loading={ <View style={{
          color: "#5cccee",
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1
      }}>
          <ActivityIndicator size="large"></ActivityIndicator>
      </View>} persistor={this.props.persistor}>
          <ProductProvider>
              
                      <MyDrawer></MyDrawer>
              
          </ProductProvider>
      </PersistGate>
     
  </Provider>
    );
  }
}

AppContainer.propTypes = {
  store: PropTypes.object.isRequired,
};
