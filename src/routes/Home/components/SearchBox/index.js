import React from 'react';
import { Text, Animated, Modal } from 'react-native';
import  {View, InputGroup, Input, Container } from 'native-base';
import RNGooglePlaces from "react-native-google-places";
import * as Animatable from 'react-native-animatable';
import { Row, Col, Grid} from 'react-native-easy-grid'


import Icon from "react-native-vector-icons/EvilIcons";

import styles from "./SearchBoxStyles";
import SearchResults from '../SearchResults';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;


export const SearchBox = ({handleModalBoolean})=>{
    
    return (
            <View style={styles.searchBox}>
                    <View style={styles.secondInputWrapper}>
                       <TouchableOpacity style={{height: 60, paddingTop: 10, }}>
                           <InputGroup>
                                <Icon name="search" color="#5cccee" size={30}></Icon>
                                <Text onPress={handleModalBoolean} style={{...styles.inputSearch, color: "#5cccee", paddingTop: 5, height: 40}}>Where To?</Text>
                           
                           </InputGroup>
                       </TouchableOpacity>
                    </View>
            </View>
        
    );
};  

export default SearchBox;