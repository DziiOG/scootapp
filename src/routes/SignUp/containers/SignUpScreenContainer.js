import 'react-native-gesture-handler';

import {connect} from 'react-redux';

import {
 getUserID,
 getUserToken,
 getUserName,
 signUserOut
} from '../modules/signupscreen';
import SignUpScreen from '../components/SignUpScreen';

const mapStateToProps = state => ({
 userID: state.signup.userID || "",
 userToken: state.signup.userToken || "",
 username: state.signup.username || ""
});

const mapActionsCreators = {
  getUserID,
  getUserToken,
  getUserName,
  signUserOut
};

export default connect(mapStateToProps, mapActionsCreators)(SignUpScreen);
