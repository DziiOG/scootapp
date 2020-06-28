import React from "react";
import { Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { Header, Left, Body, Right, Button} from "native-base";

import Icon from "react-native-vector-icons/FontAwesome"

import styles from "./HeaderComponentStyles";

export const HeaderComponent = () => {
    return (
        <Header style={{backgroundColor: "#4863A0"}} >
            <Left>
                 <Button transparent>
                    <Icon name="bars" style={styles.icon} />
                 </Button>
            </Left>
            <Body>
                <Text style={styles.headerText}>                    Scoot</Text>
            </Body>
            <Right>
                <Button transparent>
                    <Icon name="map-marker" style={styles.icon} />
                </Button>
            </Right>
        </Header>    
    );
}
export default HeaderComponent;

