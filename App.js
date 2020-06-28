/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Root from './src/main';
import axios from 'axios';


const App = () => {
  return (
    <>
      <View style={styles.container}>
        <Root {...this.props} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

 
});

export default App;


axios.defaults.baseURL = 'https://us-central1-halo-84fb8.cloudfunctions.net/api';