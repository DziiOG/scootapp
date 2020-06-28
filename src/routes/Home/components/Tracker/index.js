/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  PermissionsAndroid
} from "react-native";
import MapView, {
  Marker,
  AnimatedRegion,
  Polyline,
  PROVIDER_GOOGLE
} from "react-native-maps";
import haversine from "haversine";
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';

//import Location from "./src/main";
import axios from 'axios';
import { Image } from "react-native";

var LATITUDE = 0.0000;
var LONGITUDE = 0.0000;
const LATITUDE_DELTA = 0.009202;
const LONGITUDE_DELTA = 0.004201;
//var LATITUDE; 
//var LONGITUDE; 


class AnimatedMarkers extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      routeCoordinates: [],
      LAT: LATITUDE,
      LONG: LONGITUDE,
      distanceTravelled: 0,
      prevLatLng: {},
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      })
    };
  }

  sendToFirebase = (data) => {
    //console.log(this.state)

    const URL = `https://gpstracker-89342.firebaseio.com/TrackPositions2.json`

    axios({
        method: "POST",
        url: URL,
        data: data
    }).then( response => console.log(response.data))

}

getMapRegion = () => ({
  latitude: this.state.latitude,
  longitude: this.state.longitude,
  latitudeDelta: 0.009202,
  longitudeDelta: 0.004201
});





 getLocation(){
  Geolocation.getCurrentPosition((position) => {

     this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
      }, () => {
          
         
          
          
      });
  }, (error) => {
      //Handling Error
      console.log(error);
  }, 
  { enableHighAccuracy: false, timeout: 200000, maximumAge: 100},
  );
}

  componentDidMount() {
    
  

    this.getLocation();

    const { coordinate } = this.state;

    this.watchID = Geolocation.watchPosition(
      position => {
        const { routeCoordinates, distanceTravelled } = this.state;
        const { latitude, longitude } = position.coords;

        const newCoordinate = {
          latitude,
          longitude
        };

        
        this.setState({
          LAT: newCoordinate.latitude,
          LONG: newCoordinate.longitude
        })

        if (Platform.OS === "android") {
          if (this.marker) {
            this.marker._component.animateMarkerToCoordinate(
              newCoordinate,
              50
            );
          }
        } else {
          coordinate.timing(newCoordinate).start();
        }

        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          routeCoordinates: routeCoordinates.concat([newCoordinate]),
          distanceTravelled:
            distanceTravelled + this.calcDistance(newCoordinate),
          prevLatLng: newCoordinate
        });
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

  componentWillUnmount() {
    Geolocation.clearWatch(this.watchID);
    
    
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    
    
  }

  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  });
  getMapRegion2 = () => ({
    latitude: this.state.LAT,
    longitude: this.state.LONG,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  });

  calcDistance = newLatLng => {
    const { prevLatLng } = this.state;
    return haversine(prevLatLng, newLatLng) || 0;
  };

  render() {
    const region = {
      latitude: 6.655100,
      longitude: -1.646730,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421    
  }
    return (
      
      
          <View>
              <Marker.Animated
                
                ref={marker => {
                  this.marker = marker;
                }}
                coordinate={this.state.coordinate}
                pinColor="#5cccee"
              >
               
              </Marker.Animated>


          </View>
            
            
          
        

    
    );
  }
}


export default AnimatedMarkers;