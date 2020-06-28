import { combineReducers } from "redux";
//combine reducers makes all reducers into one function
//combines all functions from different routes and then turns it into  a single reducing function
import { HomeReducer as home } from "../routes/Home/modules/home";


import { tripsReducer as trips} from "../routes/Trips/modules/trips";

import { helpReducer as help} from "../routes/Help/modules/help";
import { paymentReducer as payment} from "../routes/Payment/modules/payment";
import { signinscreenReducer as signin } from "../routes/SignIn/modules/signinscreen";
import { splashscreenReducer as splash } from "../routes/Splash/modules/splashscreen";
import { signupscreenReducer as signup } from "../routes/SignUp/modules/signupscreen";



export const makeRootReducer = () => {
    return combineReducers({
        home,
        trips,
        help,
        payment,
        signup,
        signin,
        splash,
    })
}

export default makeRootReducer;     