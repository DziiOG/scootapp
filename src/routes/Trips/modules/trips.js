import update from "react-addons-update";
import constants from './actionConstants';

const { GET_USERNAME } = constants;

export function getUsername(userId){
    return(dispatch)=>{
        dispatch({
            type: GET_USERNAME,
            payload: userId
        })
    }
}


//Action handler
function handleGetUsername(state, action){
    axios
    .post('https://us-central1-halo-84fb8.cloudfunctions.net/api/user', {
        userId: action.payload
    })
    .then(results => {
        
        return update(state, {
            username: {
                $set: results.data
            }
        })
   
    
    
    })
    .catch(err => {
    console.log(err);
    });

}


const initialState = {
    username: {}
};

const ACTION_HANDLERS = {
    GET_USERNAME : handleGetUsername
 
 }

export function tripsReducer (state = initialState, action){
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;

}