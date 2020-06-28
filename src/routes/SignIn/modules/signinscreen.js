import update from "react-addons-update";
import constants from './actionConstants';

const { 
    GET_USER_ID, GET_USER_TOKEN, GET_USER_NAME, SIGN_USER_OUT } = constants;

//ACTIONS
export function getUserID(userId){
    return(dispatch)=>{
        dispatch({
            type: GET_USER_ID,
            payload: userId
        })
    }
}

export function getUserToken(token){
    return((dispatch)=>{
        dispatch({
            type: GET_USER_TOKEN,
            payload: token
        })
    })
}

export function getUserName(id){
    axios
    .post('https://us-central1-closefriend-1333a.cloudfunctions.net/api/user', {
        userId: id
    })
    .then(results => {
        return((dispatch)=>{
            dispatch({
                type: GET_USER_NAME,
                payload: results.data
            })
        })
        
    
    })
    .catch(err => {
    console.log(err);
    });
}

export function signUserOut(){
    return((dispatch)=>{
        dispatch({
            type: SIGN_USER_OUT,
            payload: ""
        })
    })
}




//Action handler
function handleGetUserID(state, action){
    return update(state, {
        userID: {
            $set: action.payload
        }
    })
}

function handleGetUserToken(state, action){
    return update(state, {
        userToken: {
            $set: action.payload
        } 
    })
}

function handleGetUserName(state, action){
    return update(state, {
        username: {
            $set: action.payload
        }
    })
}

function handleSignUserOut(state, action){
return update(state, {
        userToken: {
            $set: action.payload
        }
    })
}

const initialState = {
    
    userToken: "",
    username: ""
};

const ACTION_HANDLERS = {
    GET_USER_ID : handleGetUserID,
    GET_USER_TOKEN: handleGetUserToken,
    GET_USER_NAME: handleGetUserName,
    SIGN_USER_OUT: handleSignUserOut
 
 }

export function signinscreenReducer (state = initialState, action){
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;

}