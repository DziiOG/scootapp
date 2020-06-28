import 'react-native-gesture-handler';

import {connect} from 'react-redux';

import {
 
} from '../modules/splashscreen';
import SplashScreen from '../components/SplashScreen';

const mapStateToProps = state => ({
 
});

const mapActionsCreators = {
  
};

export default connect(mapStateToProps, mapActionsCreators)(SplashScreen);
