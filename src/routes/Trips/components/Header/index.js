import React from 'react';

import { Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { Header, Left, Body, Right, Button} from "native-base";

import Icon from "react-native-vector-icons/FontAwesome"

import styles from "./HeaderStyles";

export const HeaderForTrips = () => {
    return (
        <Header style={{backgroundColor: "#fff"}}>
        
            <Left>
                <Button transparent onPress={() => Actions.home()}>
                    <Icon name="arrow-left" style={styles.icon}></Icon>
                
                </Button>
                
            </Left>
            <Body>
                <Text style={styles.headerText}>      Trips</Text>
            </Body>

        </Header>
    )
}

export default HeaderForTrips;