import React, {useState, useEffect} from 'react';
import {Modal, Dimensions, Text, Image, Platform, ActivityIndicator} from 'react-native';
import {View, Button, Content, Header, H1} from 'native-base';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import {Grid, Col, Row} from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/FontAwesome';
import Scooter from './assets/icons8-kick-scooter-96.png';
import DestinationIcon from './assets/icons8-select-90.png';
import Geolocation from '@react-native-community/geolocation';
import styles from './MapContainerStyles';
import SearchBox from '../SearchBox';
import SearchResults from '../SearchResults';
import MapViewDirections from 'react-native-maps-directions';
import {TouchableOpacity, TextInput} from 'react-native-gesture-handler';
import AnimatedMarkers from '../Tracker';
import Geocoder from 'react-native-geocoding';
import CustomCalloutView from '../CustomCallout';
import { ProductConsumer } from '../../../../context';
const LATITUDE = 0.0;
const LONGITUDE = 0.0;
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

var Duration;
var Distance;
const URL3 =
  'https://previews.123rf.com/images/makc76/makc761907/makc76190700140/127781843-scooter-icon-on-white-background-vector-illustration.jpg';

export const MapContainer = ({
  showRouteToScooter,
  showRouteToDestination,
  CalloutBoolean,
  SearchBoxBoolean,
  onRegionChangeComplete,
  scooterFoundBoolean,
  ConfirmedScooterLocation,
  ConfirmedBookingBoolean,
  handleBookingFunction,
  ConfirmedLocation,
  CurrentLocationName,
  selectedAddress,
  getSelectedAddress,
  unlockingScooter,
  handleTurnModalOFF,
  handleModalBoolean,
  ModalBoolean,
  checkUnlockingScooter,
  outOfFavour,
  scooters,
  region,
  getInputData,
  userLocationButton,
  trackerMarker,
  getAddressPredictions,
  user,
  predictions,
  fare,
  userBoolean
  //scooterRegion,
  //scooterRegion2,
}) => {
  var map;
  var marker;
  var markerA;
  var markerB;

  var val = [];
  function handleInput(key, val) {
    getInputData({
      key,
      value: val,
    });

    getAddressPredictions(val);
    //handlePredictedText(val);
    //console.log(val);

    //console.log(PredictedText)
  }

  mapStyle = [
    {
      elementType: 'geometry',
      stylers: [
        {
          color: '#e7e9ec',
        },
        {
          visibility: 'on',
        },
      ],
    },
    {
      elementType: 'labels',
      stylers: [
        {
          color: '#979797',
        },
      ],
    },
    {
      elementType: 'labels.icon',
      stylers: [
        {
          color: '#979797',
        },
        {
          visibility: 'simplified',
        },
      ],
    },
    {
      elementType: 'labels.text',
      stylers: [
        {
          color: '#677a9f',
        },
        {
          visibility: 'on',
        },
      ],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#677a9f',
        },
        {
          visibility: 'on',
        },
      ],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#ffffff',
        },
        {
          visibility: 'on',
        },
      ],
    },
    {
      featureType: 'administrative',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#e7e9ec',
        },
        {
          visibility: 'on',
        },
      ],
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#bdbdbd',
        },
      ],
    },
    {
      featureType: 'landscape',
      elementType: 'geometry',
      stylers: [
        {
          color: '#e7e9ec',
        },
        {
          visibility: 'on',
        },
      ],
    },
    {
      featureType: 'landscape.natural.terrain',
      stylers: [
        {
          visibility: 'on',
        },
      ],
    },
    {
      featureType: 'landscape.natural.terrain',
      elementType: 'geometry',
      stylers: [
        {
          color: '#a7dfb6',
        },
        {
          visibility: 'on',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text',
      stylers: [
        {
          color: '#677a9f',
        },
        {
          visibility: 'on',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#677a9f',
        },
        {
          visibility: 'on',
        },
        {
          weight: 3.5,
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#ffffff',
        },
        {
          visibility: 'on',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'road.arterial',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [
        {
          color: '#a7b5db',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161',
        },
      ],
    },
    {
      featureType: 'road.local',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e',
        },
      ],
    },
    {
      featureType: 'transit.line',
      elementType: 'geometry',
      stylers: [
        {
          color: '#e5e5e5',
        },
      ],
    },
    {
      featureType: 'transit.station',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'transit.station',
      elementType: 'geometry',
      stylers: [
        {
          color: '#eeeeee',
        },
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'water',
      stylers: [
        {
          color: '#76d6ff',
        },
        {
          visibility: 'on',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#76d6ff',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#abd5f4',
        },
        {
          visibility: 'on',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e',
        },
      ],
    },
  ];

  return (
    <ProductConsumer>
      {
        (value)=> (
          (value.loading == true) ? (<View style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1
          }}>
            <ActivityIndicator size="large" color="#5cccee"></ActivityIndicator>
          </View>) : (

    <View style={styles.container}>
      <MapView
        showsMyLocationButton={userLocationButton}
        style={styles.map}
        showsUserLocation={true}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
        initialRegion={region}
        onRegionChangeComplete={onRegionChangeComplete}
        
        ref={mapc => (map = mapc)}
        onLayout={() => {
          if (Platform.OS === 'android') {
            scooters.map(marker => {
              if (markerA) {
                markerA._component.animateMarkerToCoordinate(
                  {
                    latitude: parseFloat(marker.latitude),
                    longitude:parseFloat(marker.longitude),
                  },
                  50,
                );
              } else {
                coordinate
                  .timing({
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                  })
                  .start();
              }
            });
          }
        }}>
        {scooters.map(marker => (
          <Marker.Animated
            coordinate={{
              latitude: parseFloat(marker.latitude),
              longitude: parseFloat(marker.longitude),
            }}
            icon={Scooter}
            key={marker.scooterId}
            ref={marker => (markerA = marker)}>
            {CalloutBoolean && (
              <Callout tooltip={true}>
                <CustomCalloutView
                  Distance={Distance}
                  Duration={Duration}
                  selectedAddress={selectedAddress}></CustomCalloutView>
              </Callout>
            )}
          </Marker.Animated>
        ))}

        {/*
          <Marker.Animated
            ref={markerF => (markerA = markerF)}
            coordinate={scooterRegion}
            icon={Scooter}>
            {CalloutBoolean && (
              <Callout tooltip={true}>
                <CustomCalloutView
                  Distance={Distance}
                  Duration={Duration}
                  selectedAddress={selectedAddress}></CustomCalloutView>
              </Callout>
            )}
          </Marker.Animated>
          */}

        {/*
          <Marker.Animated coordinate={scooterRegion2} icon={Scooter}>
            {CalloutBoolean && (
              <Callout tooltip={true}>
                <CustomCalloutView
                  Distance={Distance}
                  Duration={Duration}
                  selectedAddress={selectedAddress}></CustomCalloutView>
              </Callout>
            )}
          </Marker.Animated>
          */}

        {ConfirmedBookingBoolean && (
          <View>
            {showRouteToDestination && (
              <View>
                <MapViewDirections
                  origin={(userBoolean == true) ? user : region}
                  destination={ConfirmedLocation}
                  apikey={'AIzaSyAjL_doMA-BBX1S-Lx_BJXrPAjQCFh3UrM'}
                  strokeColor="#5cccee"
                  strokeWidth={5}
                  precision="high"
                  resetOnChange={false}
                  mode="DRIVING"
                  onReady={result => {
                    map.fitToCoordinates([region, ConfirmedLocation], {
                      edgePadding: {
                        top: 200,
                        right: 30,
                        bottom: 200,
                        left: 50,
                      },
                      animated: true,
                    });
                    //console.log(result.duration);
                    //console.log(result.distance);
                    Distance = result.distance;
                    Duration = Math.ceil(result.duration);
                    fare(result.distance * 2 / 0.5)
                    
                  }}></MapViewDirections>
                <MapView.Marker
                  coordinate={ConfirmedLocation}
                  icon={DestinationIcon}
                  ref={marker1 => (marker = marker1)}>
                  <Callout tooltip={true}>
                    <CustomCalloutView
                      Distance={Distance}
                      Duration={Duration}
                      selectedAddress={selectedAddress}></CustomCalloutView>
                  </Callout>
                </MapView.Marker>
                <MapView.Marker
                  coordinate={user}
                  icon={DestinationIcon}
                  ref={marker1 => (marker = marker1)}>
                  <Callout tooltip={true}>
                    <CustomCalloutView
                      selectedAddress={CurrentLocationName}></CustomCalloutView>
                  </Callout>
                </MapView.Marker>
              </View>
            )}

            {showRouteToScooter && (
              <MapViewDirections
                origin={region}
                destination={ConfirmedScooterLocation}
                apikey={'AIzaSyAjL_doMA-BBX1S-Lx_BJXrPAjQCFh3UrM'}
                strokeColor="#5cccee"
                strokeWidth={5}
                ref={mapc => (map = mapc)}
                mode="WALKING"
                precision="high"
                resetOnChange={true}
                onReady={result => {
                  map.fitToCoordinates([region, ConfirmedScooterLocation], {
                    edgePadding: {
                      top: 200,
                      right: 30,
                      bottom: 200,
                      left: 50,
                    },
                    animated: true,
                  });
                  console.log(result.duration);
                  console.log(result.distance);
                  Distance = result.distance;
                  Duration = Math.ceil(result.duration);
                  checkUnlockingScooter();
                  console.log(result.fare)
                  
                }}></MapViewDirections>
            )}
          </View>
        )}
        {trackerMarker && <AnimatedMarkers></AnimatedMarkers>}
      </MapView>

      {outOfFavour && ModalBoolean && (
        <Modal
          transparent={true}
          visible={true}
          animationType="slide"
          onRequestClose={handleTurnModalOFF}>
          <Grid >
            <Row
              style={{
                height: height * 0.35,
                width: width,
                backgroundColor: '#fff',
                
              }}>
              <Content>
                <Button
                  style={{backgroundColor: '#fff', left: 5}}
                  onPress={handleTurnModalOFF}>
                  <Icon
                    name="arrow-left"
                    size={25}
                    color="#5cccee"
                    style={{left: 30}}></Icon>
                </Button>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '1%',
                  }}>
                  <Button style={{width: '80%', backgroundColor: '#DCDCDC'}}>
                    <Text
                      style={{
                        color: '#5cccee',
                        paddingHorizontal: 25,
                        textTransform: 'uppercase',
                      }}>
                      {CurrentLocationName}
                    </Text>
                  </Button>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '1%',
                  }}>
                  <TextInput
                    value={selectedAddress.name}
                    autoFocus={true}
                    style={{
                      backgroundColor: '#DCDCDC',
                      width: '80%',
                      height: 45,
                      color: '#5cccee',
                      paddingHorizontal: 25,
                    }}
                    onChangeText={handleInput.bind(this, 'DestinationLocation')}
                    placeholder="WHERE TO"
                    placeholderTextColor="#5cccee"></TextInput>
                </View>

                <View style={{height: 80}}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#5cccee',
                      borderRadius: 40,
                      width: '19%',
                      height: '40%',
                      marginTop: '5%',
                      left: 250,
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        textAlign: 'center',
                        flex: 1,
                      }}
                      onPress={handleBookingFunction}>
                      BOOK
                    </Text>
                  </TouchableOpacity>
                </View>
              </Content>
            </Row>
          </Grid>
          <SearchResults
            predictions={predictions}
            getSelectedAddress={getSelectedAddress}
          />
        </Modal>
      )}
    </View>
          )
        )
      }
    </ProductConsumer>
  );
};

export default MapContainer;
