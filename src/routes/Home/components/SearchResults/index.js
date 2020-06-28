import React from 'react';
import { Text, FlatList, View } from 'react-native';
//import { Icon, ListItem } from 'react-native-elements';
import { Left, Body, ListItem, List, Content, Button, Footer } from 'native-base';
import RNGooglePlaces from "react-native-google-places";

import Icon from "react-native-vector-icons/MaterialIcons";

import styles from "./SearchResultsStyles";


/*
const DATA = [
    {
        id:'ab',
        title:'hope',
    },
    {
        id:'abc',
        title:'Second item',
    },
    {
        id:'abcd',
        title:'third item'
    }
]

function Item({ title }){
    return (
        <View style={styles.item}>
           
                <Left style={styles.leftContainer}> 
                        <Icon name="room" style={styles.leftIcon}></Icon>
                </Left>
                    <Body>
                        <Text style={styles.primaryText}>{title}</Text>
                        
                    </Body>

             
        </View>
    );
}

*/


export const SearchResults = ({predictions, handlePredictedText, getSelectedAddress})=>{
    //console.log(predictions);
    var ArrayP = Object.values(predictions);
    
    function handleSelectedAddress(placeID){
        getSelectedAddress(placeID);
        

        
    }

  
    return (
        
        <View style={styles.container}>
        <View style={styles.searchResultsWrapper}>
            
				<List 
                    dataArray={ArrayP}
                    keyboardShouldPersistTaps="always"
					renderRow={(item)=>
						
                            <ListItem 
                            keyboardShouldPersistTaps="always"
                            onPress={()=>{handleSelectedAddress(item.placeID)}}
                             button avatar>
								<Left style={styles.leftContainer}>
									<Icon style={styles.leftIcon} name="location-on" />
								</Left>
								<Body>
									<Text style={styles.primaryText}>{item.primaryText}</Text>
									<Text style={styles.secondaryText}>{item.secondaryText}</Text>
								</Body>
                                
							</ListItem>
						
                    }
                    keyExtractor={item => item.placeID}
				/>
                
			</View>
        
    </View>
    );
};  

export default SearchResults;