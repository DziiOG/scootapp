import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Image, Content} from 'native-base';
import {Grid, Row, Col} from 'react-native-easy-grid';

export const CustomCalloutView = ({Duration, Distance, selectedAddress,}) => {

    
        return(
            <View>
                {
                    Duration? 
                    (

                    <Grid style={{height: 30, width: 140, backgroundColor:"#fff", borderWidth:0.8, borderColor: "#5cccee"}}>
                        <Col style={{width: 10, backgroundColor: '#5cccee', flex:1, alignItems: "center"}}>
                            <Text style={{color: '#fff', fontSize: 15, }}>
                            {Duration}
                                <Text style={{fontSize: 10}}> mins</Text>
                            </Text>
                        </Col>
                        <Col style={{width: 90, }}>
                            <Text style={{color: '#5cccee',left:6, top:2, fontSize: 10}}>
                                  {selectedAddress.name}
                            </Text>
                        </Col>
                    </Grid>
                    ) : (
                        <Grid style={{height: 30, width: 140, backgroundColor:"#fff", borderWidth:0.8, borderColor: "#5cccee"}}>
                            <Col style={{width: 10, backgroundColor: '#5cccee', flex:1, alignItems: "center"}}>
                               
                            </Col>
                            <Col style={{width: 90, }}>
                                <Text style={{color: '#5cccee',left:6, top:2, fontSize: 10}}>
                                    {selectedAddress.name}
                                </Text>
                            </Col>
                    </Grid>
                    )
                }
                
            </View>
        )
    
}

export default CustomCalloutView;