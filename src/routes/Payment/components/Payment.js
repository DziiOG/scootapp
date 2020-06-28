import React from 'react';
import {View, Text} from 'react-native';
import {Container} from 'native-base';

import { WebView } from 'react-native-webview';

class Payment extends React.Component {
  render() {
    return (
      
        <WebView source={{ uri: 'https://paystack.com/pay/scoot' }} />
      
    );
  }
}

export default Payment;
