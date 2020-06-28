import 'react-native-gesture-handler';

import React from 'react';
import {View, Text, Platform, Animated, Modal, Dimensions, TouchableOpacity, Alert, ActivityIndicator} from "react-native";
import MapContainer from './MapContainer';
import { Container, Footer, Button, Thumbnail, InputGroup } from "native-base"

import { Row, Col, Grid} from 'react-native-easy-grid'
import Geolocation from '@react-native-community/geolocation';
import Icon from "react-native-vector-icons/FontAwesome";
import axios from 'axios';
import haversine from "haversine";

import RNGooglePlaces from "react-native-google-places";
import Geocoder from 'react-native-geocoding';
import QRCodeScanner from 'react-native-qrcode-scanner';

import * as Animatable from 'react-native-animatable';

import Icon2 from "react-native-vector-icons/EvilIcons";

var test
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
const LATITUDE =  6.674839348115709;
const LONGITUDE =  -1.5717857144773006;
const URL = "https://previews.123rf.com/images/makc76/makc761907/makc76190700140/127781843-scooter-icon-on-white-background-vector-illustration.jpg";




class Home extends React.Component{
    interval = null;
    
    
    //initial states
   

    constructor(props){
        super(props);
       
        this.state = {
        
            region: {   latitude: LATITUDE,
                        longitude: LONGITUDE,
                        latitudeDelta: 0.009202,
                        longitudeDelta: 0.004201
                    },
            UserRegion: {},        
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: 0.00920255321115171,
            longitudeDelta: 0.005388222634792328, 
            lat1: LATITUDE,
            long1: LONGITUDE,
            lat: LATITUDE,
            long: LONGITUDE,
            outOfFavour: false,
            ModalBoolean: false,
            PredictedText: " ",
            selectedAddressA: {} && "",
            CurrentLocationName: " ",
            ConfirmedLatitude: 0.000,
            ConfirmedLongitude: 0.000,
            ConfirmedBookingBoolean: false,
            theLAT: LATITUDE,
            longLONG: LONGITUDE,
            ConfirmedScooterLatitude: LATITUDE,
            ConfirmedScooterLongitude: LONGITUDE,
            SearchBoxBoolean: false,
            FABBoolean: false,
            ConfirmTripBoolean: false,
            showRouteToScooter: false,
            showRouteToDestination: false,
            CalloutBoolean: false,
            unlockScooterBoolean: false,
            scooterFoundBoolean: false,
            HelloCallout: true,
            username: "",
            greet: "",
            scooters: [],
            trackerMarker: false,
            userLocationButton: true,
            UserConfirmedLocation: {},
            loading: false,
            onButton: true,
            userBoolean: false,
            endTripMakePaymentBoolean: false,
            gpsloader: false
            
            
           
        }
    }

    //ACTIONS

    greetingVisitorfunction = () => {
        var myDate = new Date();
        var hours = myDate.getHours();

        if (hours < 12){
            this.setState({
                greet: "Good Morning"
            })
        } else if( hours >= 12 && hours <= 17){
            this.setState({
                greet: "Good Afternoon"
            })
        } else if(hours >= 17 && hours <= 24 ){
            this.setState({
                greet: "Good Evening"
            })
        }
    }


    endTripMakePayment = () => {
        this.setState({
            SearchBoxBoolean: false,
            FABBoolean: false,
            ConfirmTripBoolean: false,
            showRouteToScooter: false,
            showRouteToDestination: false,
            CalloutBoolean: false,
            unlockScooterBoolean: false,
            scooterFoundBoolean: false,
            HelloCallout: true,
            PredictedText: " ",
            selectedAddressA: {} && "",
            trackerMarker: false,
            userLocationButton: true,
            UserConfirmedLocation: {},
            loading: false,
            onButton: true,
            userBoolean: false,
            endTripMakePaymentBoolean: false
        })

        Alert.alert("You've ended trip successfully")
    }

    unlockingScooter = () => {
        this.setState({
            unlockScooterBoolean: true
        })
    }
    confirmedTrip= () => {
        this.setState({
            loading: true,
            onButton: false
           
        })
        axios.post('https://us-central1-halo-84fb8.cloudfunctions.net/api/user/trips', {
            
            CompletedTrip: true,
            
            desLat: this.state.ConfirmedLatitude,
            desLong: this.state.ConfirmedLongitude,
            userLat: this.state.theLAT,
            userLong: this.state.longLONG,
            username: this.state.username
           })
           .then((response)=> {
               console.log(response)
           })
           .then(() => {
            this.setState({
                showRouteToScooter:true,
                showRouteToDestination: false,
                ConfirmTripBoolean: false,
                CalloutBoolean: true,
                userLocationButton: true,
                trackerMarker: true, 
                loading: false,
                onButton: true
               
            })
           })
           .catch((error)=> {
               console.log(error)
           })

      
           
        

       
    }
    scanQRCodeComplete=()=>{
        this.setState({
            userBoolean: false,
            showRouteToDestination: true,
            showRouteToScooter: false,
            unlockScooterBoolean: false,
            scooterFoundBoolean: false,
            endTripMakePaymentBoolean: true
        })
    }

    checkUnlockingScooter = () => {
        if(haversine({latitude: this.state.theLAT, longitude: this.state.longLONG}, {latitude: this.state.ConfirmedScooterLatitude, longitude: this.state.ConfirmedScooterLongitude}) <= 0.050){
            this.setState({
               
                
                showRouteToScooter:false,
                scooterFoundBoolean: true
            })
        }
    }


    handleConfirmedTrip=()=> {
        this.confirmedTrip();
    }

     bookingFunction= () => {
         if(this.state.selectedAddressA.length !== 0){

             
                          this.setState({
                              userBoolean: true,
                              outOfFavour: false,
                              ModalBoolean: false,
                              ConfirmedBookingBoolean: true,
                              HelloCallout: false,
                              FABBoolean: false,
                              ConfirmTripBoolean: true,
                              showRouteToDestination: true,
                              showRouteToScooter: false,
                              userLocationButton: false
                 
                          })
                 /*
                         const Scooter1 = {
                             latitude: this.state.lat,
                             longitude: this.state.long
                         }
                         const Scooter2 = {
                             latitude: this.state.lat1,
                             longitude: this.state.long1
                         }
                 */
                         //let ArrayP = [Scooter1, Scooter2];
                         var ArrayC = [];
                         this.state.scooters.forEach(element => {
                             
                             ArrayC.push(haversine({latitude: this.state.latitude, longitude: this.state.longitude}, {latitude: element.latitude, longitude: element.longitude}))
                             
                         });
                 
                         Array.min = function( array ){
                             return Math.min.apply( Math, array);
                         }
                 
                         var minimunDistance = Array.min(ArrayC);

                         this.state.scooters.forEach(element => {
                             
                             if(haversine({latitude: this.state.latitude, longitude: this.state.longitude}, {latitude: element.latitude, longitude: element.longitude}) == minimunDistance){
                                 this.setState({
                                    ConfirmedScooterLatitude: element.latitude,
                                    ConfirmedScooterLongitude: element.longitude
                                 })
                             }
                         })
                 
                         /*
                         if(haversine({latitude: this.state.latitude, longitude: this.state.longitude}, Scooter1) == minimunDistance){
                             this.setState({
                                 ConfirmedScooterLatitude: this.state.lat,
                                 ConfirmedScooterLongitude: this.state.long
                             })
                         }
                 
                         if(haversine({latitude: this.state.latitude, longitude: this.state.longitude}, Scooter2) == minimunDistance){
                             this.setState({
                                 ConfirmedScooterLatitude: this.state.lat1,
                                 ConfirmedScooterLongitude: this.state.long1
                             })
                         }
                 */


                 //CONFIRMED USER LOCATION IS TO BE SAVED
                 const ConfirmedUserLatitude = this.getMapRegion2().latitude;
                 const ConfirmedUserLongitude = this.getMapRegion2().longitude;
                 this.setState({
                     UserConfirmedLocation: {
                         latitude: ConfirmedUserLatitude,
                         longitude: ConfirmedUserLongitude,
                     }
                 })


                          console.log(this.getConfirmedLocation());
                          console.log(this.getMapRegion());
         }else{
             Alert.alert("Type and Select a Location before Booking or Press back to exit");
         }
         
     }

     handleBookingFunction = () => {
         this.bookingFunction();
     }

     cancelBooking= () => {
         this.setState({
            ConfirmedBookingBoolean: false,
            HelloCallout: true,
            FABBoolean: true,
            ConfirmTripBoolean: false,
            selectedAddressA: {}  && "",
            showRouteToScooter: false,
            showRouteToDestination: false,
            userLocationButton: true,
            userBoolean: false
         })

         
     }

     

    getSelectedAddressA = (load) => {
        RNGooglePlaces.lookUpPlaceByID(load)
        .then((results)=>{
            //console.log(results)
            this.setState({
                selectedAddressA: results,
                ConfirmedLatitude: results.location.latitude,
                ConfirmedLongitude: results.location.longitude
            })

            console.log(this.state.selectedAddressA)
        })
    }
    //handlePredictedText
    handlePredictedText = (text) => {
        this.setState({
            PredictedText: text
        })
    }

    //ModalForBookingRide

   handleModalBoolean = () => {
       
       this.setState({
           ModalBoolean: true,
           outOfFavour: true,
           FABBoolean: false
       })
       
   }

   ModalBooleanHandler = () => {
       this.handleModalBoolean();
   }
    
    //handleComponent Search Results
    TurnModalOff = () => {
        this.setState({
            ModalBoolean: false,
            outOfFavour: false,
            FABBoolean: true,
            selectedAddressA: {} && "",
            userLocationButton: true
        })
    } 

    handleTurnModalOFF = () => {
        this.TurnModalOff();
    }

    handleResultComponentBoolean = () => {
        if(this.state.outOfFavour == true){

            this.setState({
                outOfFavour: false
            })
        }
        else{
            this.setState({
                outOfFavour: true
            })
        }
        
    }
    handleResultComponent = () => {
        this.handleResultComponentBoolean();
    }

    //Second Handle for Search Result Component
    onfocusBoolean = () => {
       
        if(this.state.outOfFavour == false){
            this.setState({
                outOfFavour: true
            })
        }
    }

    handleOnFocusBoolean = () => {
        this.onfocusBoolean();
        //console.log(this.state.outOfFavour)
    }
  
    // function to get coordinate from firebase
    getFromFirebase = () => {

        const URL3 = `https://us-central1-halo-84fb8.cloudfunctions.net/api/scooters`
        axios.get(URL3).then((response)=> {
            
            this.setState({
                scooters: response.data
            })

            console.log(this.state.scooters)
            
        })    
    }

    

 
  componentDidMount() {

        axios
        .post('https://us-central1-halo-84fb8.cloudfunctions.net/api/user', {
            userId: this.props.userToken.userId
        })
        .then(results => {
            console.log(results.data)
        this.setState({
            username: results.data
        })
        
        
        })
        .catch(err => {
        console.log(err);
        });

        

        this.greetingVisitorfunction();
       // this.props.getUserToken()
       // console.log(this.props.userToken)
        

       //this.props.getCurrentLocation(); // this was a props action receive from redux for getting current position
        
       //the new way of getting user Location coordinates
        this.getLocation();

        //Setting interval for performing the function getFromFirebase every 15 seconds coordinates are fetched
        this.interval = setInterval(this.getFromFirebase, 60000);
        
        
        //redundant function call
        this.getFromFirebase();

        //TRYING MARKER MOVEMENT FOR THE USER

        this.watchID = Geolocation.watchPosition(
            position => {
              //const { routeCoordinates, distanceTravelled } = this.state;
              const { latitude, longitude } = position.coords;
      
              const newCoordinate = {
                latitude,
                longitude
              };
      
              console.log(newCoordinate);
              this.setState({
                theLAT: newCoordinate.latitude,
                longLONG: newCoordinate.longitude
              })     
            },
            error => console.log(error),
            {
              enableHighAccuracy: false,
              timeout: 20000,
              maximumAge: 1000,
              distanceFilter: 10
            }
          );

            
   }

   onRegionChangeComplete = (region) => {
    this.setState({region});
   }

   referenceMarker = () => {
    {map => {
        this.map = map;
     }}
   }
  
  
 
 
   componentWillUnmount(){
       clearInterval(this.interval);
       
       Geolocation.clearWatch(this.watchID);
       
   }
 

   //ACTION HANDLERS
   calcDistance = newLatLng => {
       const { prevLatLng } = this.state;
       return haversine(prevLatLng, newLatLng) || 0;
   };

  getLocation(){
      this.setState({
          gpsloader: true
      })
    Geolocation.getCurrentPosition((position) => {
        this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            gpsloader: false
        }, () => {
            Geocoder.init("AIzaSyAjL_doMA-BBX1S-Lx_BJXrPAjQCFh3UrM");
            //this.getFromFirebase();
            Geocoder.from(this.state.latitude, this.state.longitude)
            .then(json => {
                var addressComponent = json.results[0].address_components[0];
                this.setState({
                    CurrentLocationName: addressComponent.long_name
                })
                console.log(this.state.CurrentLocationName);
            })
            .catch(error => console.warn(error))
           
            
        });
    }, (error) => {
        //Handling Error
        console.log(error);
        this.setState({
            gpsloader: false
        })
    }, 
    { enableHighAccuracy: false, timeout: 200000, maximumAge: 10},
    );
   }

  
    getConfirmedLocation = () => ({
        latitude: this.state.ConfirmedLatitude,
        longitude: this.state.ConfirmedLongitude,
        latitudeDelta: 0.009202,
        longitudeDelta: 0.004201,
    })
   //User Location Handlerr
   getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: 0.09,
    longitudeDelta: 0.04
  });

  getMapRegion2 = () => ({
    latitude: this.state.theLAT,
    longitude: this.state.longLONG,
    latitudeDelta: 0.09,
    longitudeDelta: 0.04
  });

  //First Scooter Location
 
  confirmedScooterLocation = () => ({
    latitude: this.state.ConfirmedScooterLatitude,
    longitude: this.state.ConfirmedScooterLongitude,
    latitudeDelta: 0.009202,
    longitudeDelta: 0.004201
  })



    render(){
        //A region constant for testing
        // not being used at the moment
       

        return(
            
            this.state.gpsloader == false ?
        <Container>
       
            
       
            { 
            <MapContainer 
            region={this.getMapRegion()} 
            user={this.state.UserConfirmedLocation}
            checkUnlockingScooter={this.checkUnlockingScooter}
            onRegionChangeComplete={this.onRegionChangeComplete}
            getInputData={this.props.getInputData} 
            toggleSearchResultModal={this.props.toggleSearchResultModal} 
            getAddressPredictions={this.props.getAddressPredictions}
            resultTypes={this.props.resultTypes}
            predictions={this.props.predictions}
            //scooterRegion={this.getScootLocation()}
            //scooterRegion2={this.getScootLocation2()} 
            outOfFavour={this.state.outOfFavour}
            CalloutBoolean={this.state.CalloutBoolean}
            scooterFoundBoolean={this.state.scooterFoundBoolean}
            ModalBoolean={this.state.ModalBoolean}
            handleModalBoolean={this.ModalBooleanHandler}
            handleTurnModalOFF={this.handleTurnModalOFF}
            unlockingScooter={this.unlockingScooter}
            scooters={this.state.scooters}
            getSelectedAddress={this.getSelectedAddressA}
            selectedAddress={this.state.selectedAddressA}
            CurrentLocationName={this.state.CurrentLocationName}
            ConfirmedLocation={this.getConfirmedLocation()}
            ConfirmedBookingBoolean={this.state.ConfirmedBookingBoolean}
            handleBookingFunction={this.handleBookingFunction}
            ConfirmedScooterLocation={this.confirmedScooterLocation()}
            trackerMarker={this.state.trackerMarker}
            userLocationButton={this.state.userLocationButton}    
            SearchBoxBoolean={this.state.SearchBoxBoolean}
            userBoolean={this.state.userBoolean}
            showRouteToScooter={this.state.showRouteToScooter}
            showRouteToDestination={this.state.showRouteToDestination}
            fare={this.props.getFare}
           
            >
                
            </MapContainer>
            }   
                
           
            {   
                (this.state.unlockScooterBoolean) &&
               <Modal>
                    <QRCodeScanner containerStyle={{width: width, height: height, }} cameraStyle={{width: width, height: height,}} onRead={() =>{this.scanQRCodeComplete()}}>

                    </QRCodeScanner>
               </Modal>
                
            }
            {
             (this.state.ConfirmTripBoolean) &&  
            <Footer style={{height: height*0.3, backgroundColor: "#fff"}}>
                <View style={{ backgroundColor: "#fff", height: height*0.3, width: width, paddingRight:20}}>
                  
                        
                        <Text style={{fontSize: 25, color: '#5cccee', textAlign: "center",paddingTop: 20}}>Confirm Your Trip</Text>
                        <Thumbnail circle medium source={{uri: URL }} style={{left: 140, height: 60}}>

                        </Thumbnail>
                        <Grid >
                            <Col><Text style={{color: "#5cccee", paddingHorizontal: 182}}>
                                GHc{(typeof this.props.fare === 'number')? (this.props.fare * 2) : " "}
                            </Text></Col>
                        </Grid>

                        {this.state.loading && (
                             <ActivityIndicator size="large" color="#5cccee" />
                        )}
                        {
                            (this.state.onButton) &&
                                <Button style={{height: 50, width: 200, left:50, marginTop: 30, backgroundColor:"#5cccee"}} onPress={()=> {this.handleConfirmedTrip()}}>
                                    <Text style={{color: "#fff", flex: 1, textAlign: "center"}}>CONFIRM</Text>
                                </Button>
                        }
                        
                        <TouchableOpacity style={{height: 50, width: 50, backgroundColor:"#5cccee", borderRadius: 50, marginLeft: 270, top:-49 }} onPress={() => {this.cancelBooking()}}>
                            <Icon name="remove" size={30} color="#fff" style={{marginTop:10, marginLeft: 13}}></Icon>
                        </TouchableOpacity>
                   

                </View>
            </Footer>
            }
            {(this.state.HelloCallout) &&
                <Animatable.View animation="slideInUp" iterationCount={1}>
                <View
                style={{
                  height: 130,
                  backgroundColor: '#fff',
                  borderBottomColor: 'transparent'
                  
                }}
                >
                  <Animatable.View
                  
                  style={{
                    opacity:1,
                    alignItems: 'center',
                    paddingHorizontal: 25, 
                    marginTop: 10,
                    borderBottomColor: "#f2f2f2",
                    borderTopColor: "#fff",
                    borderLeftColor: "#fff",
                    borderRightColor: "#fff",
                    borderWidth: 1
                    
                  }}
                  >
                    <Text 
                    style={
                      {
                        fontSize: 15,
                        color: "#5cccee",
                        marginBottom: 10
                      }
                    }>
                      {this.state.greet}, {this.state.username}
                    </Text>
                  </Animatable.View>
                    <TouchableOpacity>
                        <View
                        style={{
                          marginTop: 25,
                          paddingHorizontal: 25,
                          flexDirection: 'row',
                          
                          
                        }}
                        >
                          
                          <View
                          style={{
                            flexDirection: 'row',
                            flex: 1
                          }}
                          >
                            <TouchableOpacity
                            style={{
                              height: 50,
                              borderRadius: 50,
                              backgroundColor: "#f2f2f2",
                              width: 330,
                              borderColor: 'transparent',
                              alignItems: 'flex-start',
                              borderWidth: 1,
                              right: 10
                            }}
                            onPress={()=> {this.handleModalBoolean();}}
                            >
                                <InputGroup>
                                    <Icon2 name="search" color="#5cccee" size={30} style={{marginTop: 8}}></Icon2>
                                    <Text style={{
                                        color: "#5cccee",
                                        marginTop: 8,
                                        fontSize: 20
                                    }}> Where to ? </Text>
                                </InputGroup>
                            </TouchableOpacity>
                          </View>
                        </View>
                  </TouchableOpacity>
                </View>
                <View
                style={{
                  height: 10,
                  backgroundColor: '#fff',
                  alignItems: 'flex-start',
                  borderTopColor: 'transparent',
                  justifyContent: 'center',
                  borderWidth: 0,
                  paddingHorizontal: 25
                }}
                >
                  
                </View>
               
              </Animatable.View>
            }

            {
                (this.state.scooterFoundBoolean) &&
                 <TouchableOpacity style={{backgroundColor: "#5cccee", width: width, height: 50, borderRadius: 50,}} title="I have found the Scooter">
                    <Text style={{textAlign: 'center', color:'#fff', paddingTop:14}} onPress={()=>{this.unlockingScooter()}}>Unlock the Scooter</Text>
                </TouchableOpacity>
            
            }
            {(this.state.endTripMakePaymentBoolean) &&
                <Animatable.View animation="slideInUp" iterationCount={1}>
                <View
                style={{
                  height: 80,
                  backgroundColor: '#fff',
                  
                }}
                >
                    <TouchableOpacity>
                        <View
                        style={{
                          marginTop: 25,              
                          flexDirection: 'row',
                        }}
                        >
                          
                          <View
                          style={{
                            flexDirection: 'row',
                            flex: 1
                          }}
                          >
                            <TouchableOpacity
                            style={{
                              height: 50,
                              borderRadius: 50,
                              left: 20,
                              backgroundColor: "#5cccee",
                              width: 330,
                              borderColor: '#f2f2f2',
                              alignItems: 'center',
                              borderWidth: 1
                            }}
                            onPress={() => {this.endTripMakePayment(); this.props.navigation.navigate("Payment")}}
                            >
                                <InputGroup>
                                    
                                    <Text style={{
                                        color: "#fff",
                                        marginTop: 8,
                                        fontSize: 20
                                    }}> End Trip and Make Payment </Text>
                                </InputGroup>
                            </TouchableOpacity>
                          </View>
                        </View>
                  </TouchableOpacity>
                </View>
                <View
                style={{
                  height: 10,
                  backgroundColor: '#fff',
                  alignItems: 'flex-start',
                  borderTopColor: '#e8e8ec',
                  justifyContent: 'center',
                  borderWidth: 1,
                  paddingHorizontal: 25
                }}
                >
                 
                </View>
               
              </Animatable.View>
            }
        </Container> : 
        <View>
            <ActivityIndicator color="#5cccee" size="large"></ActivityIndicator>
        </View>
        );
    }
}
export default Home;