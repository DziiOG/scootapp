import React from "react";
import createStore from "./store/createStore";
import AppContainer from "./AppContainer";


export default class Root extends React.Component{
    renderApp(){
        const initialState = window.__INTITIAL_STATE__;
        const store = createStore(initialState);

        return (
                <AppContainer store={store.store}  persistor={store.persistor}></AppContainer> 
        );
    }

    render(){
        return this.renderApp();
    }
}

 