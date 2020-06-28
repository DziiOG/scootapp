import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Container, Button, H1, H2, H3, Content } from 'native-base';


class Help extends React.Component{
    render(){
        return(
            <ScrollView>
                <Container>
                    
                    <Content>
                        
                        <H3 style={{color: '#5cccee', marginTop: '4%'}}>    User Manual</H3>
                        <View style={{justifyContent: 'center', alignItems: 'center',  marginTop: '1%'}}>
                            <Button style={{width: '95%', backgroundColor: '#DCDCDC'}}>
                                <Text style={{color: '#5cccee'}}>     Unlocking </Text>
                            </Button>
                        </View>
                        <View style={{justifyContent: 'center', alignItems: 'center', marginTop: '1%'}}>
                            <Button style={{width: '95%', backgroundColor: '#DCDCDC'}}>
                                <Text style={{color: '#5cccee'}}>     Adjusting and Starting </Text>
                            </Button>
                        </View>
                        <View style={{justifyContent: 'center', alignItems: 'center', marginTop: '1%'}}>
                            <Button style={{width: '95%', backgroundColor: '#DCDCDC'}}>
                                <Text style={{color: '#5cccee'}}>     Parking </Text>
                            </Button>
                        </View>
                        <H3 style={{color: '#5cccee', marginTop: '4%'}}>   Pricing and Payment</H3>
                        <View style={{justifyContent: 'center', alignItems: 'center',  marginTop: '1%'}}>
                            <Button style={{width: '95%', backgroundColor: '#DCDCDC'}}>
                                <Text style={{color: '#5cccee'}}>     How much does Scoot cost? </Text>
                            </Button>
                        </View>
                        <View style={{justifyContent: 'center', alignItems: 'center', marginTop: '1%'}}>
                            <Button style={{width: '95%', backgroundColor: '#DCDCDC'}}>
                                <Text style={{color: '#5cccee'}}>     How to pay for your trip </Text>
                            </Button>
                        </View>
                        <View style={{justifyContent: 'center', alignItems: 'center', marginTop: '1%'}}>
                            <Button style={{width: '95%', backgroundColor: '#DCDCDC'}}>
                                <Text style={{color: '#5cccee'}}>     I was charged incorrectly </Text>
                            </Button>
                        </View>
                        <H3 style={{color: '#5cccee', marginTop: '4%'}}>   Encountering Issues using your Scoot</H3>
                        <View style={{justifyContent: 'center', alignItems: 'center',  marginTop: '1%'}}>
                            <Button style={{width: '95%', backgroundColor: '#DCDCDC'}}>
                                <Text style={{color: '#5cccee'}}>     Why am I still incurring charges after locking Scooter?  </Text>
                            </Button>
                        </View>
                        <View style={{justifyContent: 'center', alignItems: 'center', marginTop: '1%'}}>
                            <Button style={{width: '95%', backgroundColor: '#DCDCDC'}}>
                                <Text style={{color: '#5cccee'}}>     Emergency </Text>
                            </Button>
                        </View>
                        <View style={{justifyContent: 'center', alignItems: 'center', marginTop: '1%'}}>
                            <Button style={{width: '95%', backgroundColor: '#DCDCDC'}}>
                                <Text style={{color: '#5cccee'}}>     Why can't I unlock my Scooter? </Text>
                            </Button>
                        </View>
                        <H3 style={{color: '#5cccee', marginTop: '4%'}}>   Scoot Terms and Conditions</H3>
                        <View style={{justifyContent: 'center', alignItems: 'center',  marginTop: '1%'}}>
                            <Button style={{width: '95%', backgroundColor: '#DCDCDC'}}>
                                <Text style={{color: '#5cccee'}}>     User Agreement and Terms of Service </Text>
                            </Button>
                        </View>
                        <View style={{justifyContent: 'center', alignItems: 'center', marginTop: '1%'}}>
                            <Button style={{width: '95%', backgroundColor: '#DCDCDC'}}>
                                <Text style={{color: '#5cccee'}}>     Privacy Policy </Text>
                            </Button>
                        </View>
                    </Content>
                </Container>
            </ScrollView>
        );
    }
}

export default Help;