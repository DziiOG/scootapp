import React from "react";
import { Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

import {Footer, FooterTab, Button} from "native-base";

import Icon from "react-native-vector-icons/FontAwesome"

import styles from "./FooterComponentStyles";

export const FooterComponent = () => {
    return (
        <Footer>
            <FooterTab style={styles.footerContainer}>
                <Button  onPress={() => Actions.home()}>
                    <Icon size={20} name="home" style={{color: "#4863A0"}}></Icon>
                   
                </Button>
                <Button  onPress={() => Actions.Trips()}>
                    <Icon size={20} name="database" style={{color: "#4863A0"}}></Icon>
                   
                </Button>
                <Button  onPress={() => Actions.Payment()}>
                    <Icon size={20} name="paypal" style={{color: "#4863A0"}}></Icon>
                   
                </Button>
                <Button  onPress={() => Actions.FreeRides()}>
                    <Icon size={20} name="star" style={{color: "#4863A0"}}></Icon>
                   
                </Button>
                <Button  onPress={() => Actions.Help()}>
                    <Icon size={20} name="grav" style={{color: "#4863A0"}}></Icon>
                   
                </Button>
                <Button  onPress={() => Actions.Settings()}>
                    <Icon size={20} name="cog" style={{color: "#4863A0"}}></Icon>
                   
                </Button>
                
            </FooterTab>   
        </Footer> 
    );
}
export default FooterComponent;
