import React, { Component } from 'react'
import { Text, View, Dimensions, StyleSheet, Platform, TouchableOpacity, TextInput, StatusBar, ActivityIndicator } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import {Icon} from 'native-base'
import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import { ProductConsumer } from '../../../context';

const isEmail = (email) => {
	const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (email.match(regEx)) return true;
	else return false;
};

export class SignInScreen extends Component {

    state={
        email:'',
        password:'',
        check_textInputChange: false,
        secureTextEntry: true,
        errors: {},
        token: '',
        loading: false,
       
    }

    textInputChange = (val) => {
        if(val.length !== 0 && isEmail(this.state.email)){
            this.setState({
                email: val,
                check_textInputChange: true
            })
        }else {
            this.setState({
                email: val,
                check_textInputChange: false
            })
        }

        //console.log(this.state.email)
    }

    handlePasswordChange = (val) => {
        this.setState({
            password: val,
           
        })
    }

    updateSecureTextEntry = () => {
        this.setState({
            secureTextEntry: !this.state.secureTextEntry
        })
    }

    handleSubmit = () => {
        this.setState({
          loading: true,
        });
    
        axios
          .post('/login', {
            email: this.state.email,
            password: this.state.password,
          })
          .then(results => {
            //console.log(results.data.token);
            this.setState({
              loading: false,
              token: results.data.token,
            });

            this.props.getUserToken(results.data);
            this.props.getUserName(results.data.userId)


            
           

            //console.log(results.data) 
            //console.log(this.props.userToken)
    
          })
          .catch((err) => {
           // console.log(err.response.data);
            
            
            //console.log(this.state.error)

            if(this.state.email === '' || this.state.password === ''){
                this.setState({
                    loading: false,
                   errors: {
                       general: "Email or Password should not be empty"
                   }
                  });
            }else if(isEmail(this.state.email)== false){
                this.setState({
                    loading: false,
                   errors: {
                       general: "Please Enter Valid Email Address"
                   }
                  });
            } else {
                this.setState({
                    loading: false,
                   errors: err.response.data
                  });
            }
           
          });
      };

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor='#009387' barStyle="light-content"></StatusBar>
               <View style={styles.header}>
                   <Text style={styles.text_header}>Welcome!</Text>
               </View>
               <Animatable.View 
               animation="fadeInUpBig"
               style={styles.footer}>
                    <Text style={styles.text_footer}>Email</Text>
                    <View style={styles.action}>
                       <Icon
                       name="ios-person"
                       color="#05375a"
                       style={{
                           color: '#05375a'
                       }}
                       size={20}
                       >

                       </Icon> 
                       <TextInput 
                       placeholder="Your Email" 
                       style={styles.textInput}
                       autoCapitalize="none"
                       onChangeText={(val)=> this.textInputChange(val)}
                       ></TextInput>
                       {
                        this.state.check_textInputChange ?
                        <Animatable.View
                            animation="bounceIn"
                            duration={1500}
                        >
                            <Icon
                            name="ios-checkmark-circle"
                            color="green"
                            style={{
                           color: 'green'
                       }}
                            size={20}
                            ></Icon> 
                        </Animatable.View> : null
                       }
                    </View>
                    {
                        (this.state.errors)? <View>
                            <Text style={{color: '#ff0000'}}>{this.state.errors.general}</Text>
                        </View>: null
                    }
                    <Text style={[styles.text_footer, {
                        marginTop: 35
                    }]}>Password</Text>
                    <View style={styles.action}>
                       <Icon
                       name="lock"
                       color="#05375a"
                       style={{
                           color: '#05375a'
                       }}
                       size={20}
                       >

                       </Icon> 
                       <TextInput 
                       placeholder="Your Password" 
                       secureTextEntry={this.state.secureTextEntry ? true : false}
                       style={styles.textInput}
                       autoCapitalize="none"
                       onChangeText={(val)=> this.handlePasswordChange(val)}
                       ></TextInput>
                       <TouchableOpacity onPress={()=> {this.updateSecureTextEntry()}}>
                       {
                        (this.state.secureTextEntry) ?
                        <Icon
                        name="eye-off"
                        color="grey"
                        style={{
                           color: 'grey'
                       }}
                        size={20}
                        ></Icon> : <Icon
                        name="eye"
                        color="grey"
                        style={{
                           color: 'grey'
                       }}
                        size={20}
                        ></Icon>
                       }
                       </TouchableOpacity>
                    </View>

                       <View style={styles.button}>
                       {
                       (this.state.loading == false)?
                       <TouchableOpacity style={styles.signIn}
                       onPress={()=>{this.handleSubmit()}}
                       >

                           <LinearGradient
                            colors={["#5cccee","rgba(0, 0, 0, .7)"]}
                            style={styles.signIn}
                           >
                               <Text style={[styles.textSign, {
                                   color: '#fff'
                               }]}> Sign In</Text>
                           </LinearGradient>
                       </TouchableOpacity>:
                        <ActivityIndicator size="large"></ActivityIndicator>
                        
                        }
                               
                           <TouchableOpacity
                           onPress={()=> this.props.navigation.navigate('SignUpScreen')}
                           disabled={this.state.loading}
                           style={[styles.signIn], {
                               borderWidth: 1,
                               borderColor: "#5cccee",
                                width: '100%',
                                height: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 10,
                                marginTop: 35
                           }
                           }
                           >
                               <Text styles={[styles.textSign, {
                                   color: '#5cccee',
                                   
                               }]}>
                                   Sign Up
                               </Text>
                           </TouchableOpacity>
                       </View>
               </Animatable.View>
             
            </View>
        )
    }
}

export default SignInScreen;




const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#5cccee'
    },
    header:{
        flex:1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 20
    },
    text_header: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a'
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});




