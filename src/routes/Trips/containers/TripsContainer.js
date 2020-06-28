import { connect } from 'react-redux';
import Trips from "../components/Trips";
import {getUsername } from "../modules/trips";

const mapStateToProps = (state) => ({
    userID: state.signup.userID || {} || state.signin.userID,
    username: state.trips.username || {}
});

const mapActionsCreators = {
    getUsername
};

export default connect(mapStateToProps, mapActionsCreators)(Trips);