import 'react-native-gesture-handler';

import {connect} from 'react-redux';
import Home from '../components/Home';
import {
  getSelectedAddress,
  getCurrentLocation,
  getInputData,
  toggleSearchResultModal,
  getAddressPredictions,
  getUserToken,
  getFare
} from '../modules/home';

const mapStateToProps = state => ({
  region: state.home.region,
  inputData: state.home.inputData || {},
  resultTypes: state.home.resultTypes || {},
  predictions: state.home.predictions || [],
  selectedAddress: state.home.selectedAddress || {},
  userToken: state.signup.userToken || ""|| state.signin.userToken,
  userID: state.signup.userID || "" || state.signin.userID,
  fare: state.home.fare || {}
});

const mapActionsCreators = {
  getCurrentLocation,
  getInputData,
  toggleSearchResultModal,
  getAddressPredictions,
  getSelectedAddress,
  getUserToken,
  getFare
};

export default connect(mapStateToProps, mapActionsCreators)(Home);
