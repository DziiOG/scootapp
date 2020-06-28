import 'react-native-gesture-handler';

import {connect} from 'react-redux';

import {
 getUserID,
 getUserToken, 
 getUserName,
 signUserOut
} from '../modules/signinscreen';
import SignInScreen from '../components/SignInScreen';

const mapStateToProps = state => ({

 userToken: state.signin.userToken || "",
 username: state.signin.username || ""
});

const mapActionsCreators = {
  getUserID,
  getUserToken,
  getUserName,
  signUserOut
};

export default connect(mapStateToProps, mapActionsCreators)(SignInScreen);
