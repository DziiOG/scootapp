import update from 'react-addons-update';
import constants from "./actionConstants";
import { Dimensions } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import RNGooglePlaces from "react-native-google-places";
import AsyncStorage from '@react-native-community/async-storage';


//constants
const { 
    GET_CURRENT_LOCATION, 
    GET_INPUT, 
    TOGGLE_SEARCH_RESULT, 
    GET_ADDRESS_PREDICTIONS,
    GET_SELECTED_ADDRESS,
    GET_USER_TOKEN,
    SAVE_USER_TOKEN,
    GET_FARE    
} = constants;

const { width, height } = Dimensions.get('window');

const ASPECT_RATION = width / height;

const LATITUDE_DELTA = 0.0922;

const LONGITUDE_DELTA = ASPECT_RATION * LATITUDE_DELTA;



//ACTIONS
 export function getUserToken(token){
    return((dispatch => {
        dispatch({
            type: GET_USER_TOKEN,
            payload: token
        })
    }))
}




export function getFare(fare){
    return((dispatch => {
        dispatch({
            type: GET_FARE,
            payload: fare
        })
    }))
}

export function getCurrentLocation(){
	return(dispatch)=>{
		Geolocation.getCurrentPosition(
			(position)=>{
				dispatch({
					type:GET_CURRENT_LOCATION,
					payload:position
				});
			},
			(error)=> console.log(error.message),
			{enableHighAccuracy: true, timeout: 2000000, maximumAge:1000}
		);
	}
}

//GET_INPUT OF USER

export function getInputData(payload){
    return({
        type: GET_INPUT,
        payload
        }
    )
}

//Toggle search result model
export function toggleSearchResultModal(payload){
	return({
        type: TOGGLE_SEARCH_RESULT,
        payload
        }
    )
}

//GET ADDRESSES FROM GOOGLE PLACE MA NIGGA
export function getAddressPredictions(userInput){
    return(dispatch)=>{
        //let userInput = home.inputData.CurrentLocation ? home.inputData.CurrentLocation : home.inputData.DestinationLocation;
        RNGooglePlaces.getAutocompletePredictions(userInput,
            {
				country:"GH"
			} 
        )
        .then((results)=>
        dispatch({
            type: GET_ADDRESS_PREDICTIONS,
            payload: results
        })
        )
        .catch((error) => console.log(error.message))

    };
}

//get selected Address

export function getSelectedAddress(harm){
    return(dispatch, store)=>{
        RNGooglePlaces.lookUpPlaceByID(harm)
        .then((results)=>{
            dispatch({
                type: GET_SELECTED_ADDRESS,
                payload: results
            })
        })
        .catch((error)=>{console.log(error.message)})
    }
}




//ACTION HANDLERS
function handleGetUserToken(state, action){
    
    return update(state, {
        userToken: {
            $set: action.payload
        }
    })
}

function handleGetCurrentLocation(state, action){
    return update(state, {
        region: {
            latitude: {
                $set: action.payload.coords.latitude
            },
            longitude: {
                $set: action.payload.coords.longitude
            },
            latitudeDelta: {
                $set: LATITUDE_DELTA
            },
            longitudeDelta: {
                $set: LONGITUDE_DELTA
            }

        }
    })
}

function handleGetInputData(state, action){
    const { key, value} = action.payload;
    return update(state, {
        inputData: {
            [key]: {
                $set: value
            }
        }
    });
        
}

function handleToggleSearchResult(state, action){
    if (action.payload === "CurrentLocation"){
        return update(state, {
            resultTypes: {
                CurrentLocation: {
                    $set: true,
                },
                DestinationLocation: {
                    $set: false
                }
                
            },
            predictions: {
                $set: {}
            }
        });
    }
    
    if (action.payload === "DestinationLocation"){
        return update(state, {
            resultTypes: {
                CurrentLocation: {
                    $set: false,
                },
                DestinationLocation: {
                    $set: true
                }
                
            },
            predictions: {
                $set: {}
            }
        });
    }
        
}


function handleGetAddressPredictions(state, action){
    return update(state, {
        predictions: {
            $set: action.payload
        }
    })
}

function handleGetFare(state, action) {
    return update(state, {
        fare: {
            $set: action.payload
        }
    })
}

function handleGetSelectedAddress(state, action){
    let selectedTitle =  "selectedDestinationLocation"
    return update(state, {
        selectedAddress: 
            {

                $set: action.payload
            }
        
    })
}




const ACTION_HANDLERS = {
   GET_CURRENT_LOCATION: handleGetCurrentLocation,
   GET_INPUT: handleGetInputData,
   TOGGLE_SEARCH_RESULT: handleToggleSearchResult,
   GET_ADDRESS_PREDICTIONS: handleGetAddressPredictions,
   GET_SELECTED_ADDRESS: handleGetSelectedAddress,
   GET_USER_TOKEN: handleGetUserToken,
   GET_FARE : handleGetFare


}

const initialState = {
    region: {},
    inputData: {},
    resultTypes: {},
    predictions: [],
    selectedAddress: {},
    userToken: {},
    fare: {}
    
};


export function HomeReducer( state = initialState, action){
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}