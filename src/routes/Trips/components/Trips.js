import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {Container, Body, H3, Content, List, ListItem} from 'native-base';

import axios from 'axios';
import Geocoder from 'react-native-geocoding';

const {width, height} = Dimensions.get('screen');

//READ THE COMMENT

/*
TO IMPLEMENT THE TRIPS OR USE THE TRIPS API YOU WOULD TO SIGN UP OR LOGIN
AFTER SIGNING UP YOU GAIN ACCES TO THE USER ID THROUGH REDUX

TO ACCESS USER ID USE this.props.userID THIS WOULD RETURN THE USERID OF THE USER

TO RETRIEVE THE TRIPS OF A PARTICULAR USER
YOU WOULD NEDD TO PASS this.props.userID into the AXIOS FUNCTION WHICH IS A PUT METHOD

axios.put(https, {
  userId: this.props.userID
})
this would return results

results.data is what youd need.


VIOLA YOUVE RETRIVED THE TRIPS OF THE USER


NOW WRITE THE CODE TO SHOW THE DATA
AND WHEN THERES NO DATA TOO





*/
myArray = [
  {
    kenkey: 'was',
  },
  {
    kenkey: 'was',
  },
  {
    kenkey: 'was',
  },
  {
    kenkey: 'was',
  },
  {
    kenkey: 'was',
  },
  {
    kenkey: 'was',
  },
  {
    kenkey: 'was',
  },
  {
    kenkey: 'was',
  },
  {
    kenkey: 'was',
  },
];

class Trips extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Trips: [],
      loading: false,
      showTrips: false,
    };
  }
  TripCompleted(element) {
    if (element == true) {
      return 'Yes';
    } else {
      return 'No';
    }
  }

  componentDidMount() {
    var whereFrom;
    var destination;

    this.setState({
      loading: true,
    });

    axios
      .put('https://us-central1-halo-84fb8.cloudfunctions.net/api/user/trips', {
        userId: this.props.userID,
      })
      .then((response) => {
        //console.log(response.data)

        response.data.map((element) => {
          Geocoder.init('AIzaSyAjL_doMA-BBX1S-Lx_BJXrPAjQCFh3UrM');
          //this.getFromFirebase();
          Geocoder.from(element.userLat, element.userLong)
            .then((json) => {
              var addressComponent1 = json.results[0].address_components[0];
              whereFrom = addressComponent1.long_name;
              // console.log(whereFrom);
            })
            .then(() => {
              Geocoder.from(element.desLat, element.desLong)
                .then((json) => {
                  var addressComponent = json.results[0].address_components[0];
                  destination = addressComponent.long_name;
                  //console.log(destination);
                  this.setState({
                    Trips: [
                      ...this.state.Trips,
                      {
                        userLocation: whereFrom,
                        userDestination: destination,
                        CompletedTrip: element.CompletedTrip,
                        bookedTime: element.confirmedTripTime,
                        TripEnded: element.CompletedTripTime,
                      },
                    ],
                  });

                  // console.log(this.state.Trips)
                })
                .catch((error) => console.warn(error));
            })
            .catch((error) => console.warn(error));
        });
      })
      .then(() => {
        this.setState({
          loading: false,
          showTrips: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <View>
        <H3
          style={{
            marginTop: '2%',
            color: '#5cccee',
            marginLeft: '5%',
          }}>
          Trips History
        </H3>
        {this.state.loading && (
          <ActivityIndicator size="large" color="#5cccee" />
        )}

        {this.state.showTrips &&
          (this.state.Trips.length !== 0 ? (
            <List
              dataArray={this.state.Trips}
              keyboardShouldPersistTaps="always"
              renderRow={(item) => (
                <ListItem keyboardShouldPersistTaps="always" button avatar>
                  <Grid
                    style={{
                      height: 0.18 * height,
                      width: 0.9 * width,
                      marginRight: '5%',
                    }}>
                    <Col style={{backgroundColor: '#dcdcdc', marginTop: '4%'}}>
                      <Text
                        style={{
                          marginTop: '1%',
                          color: '#5cccee',
                          paddingHorizontal: 15,
                          fontSize: 12,
                        }}>
                        {item.bookedTime}
                      </Text>
                      <Text
                        style={{
                          marginTop: '1%',
                          color: '#5cccee',
                          paddingHorizontal: 15,
                        }}>
                        Trip Fare
                      </Text>
                      <Text
                        style={{
                          marginTop: '1%',
                          color: '#5cccee',
                          paddingHorizontal: 15,
                        }}>
                        From
                      </Text>
                      <Text
                        style={{
                          marginTop: '1%',
                          color: '#5cccee',
                          paddingHorizontal: 15,
                        }}>
                        To
                      </Text>
                      <Text
                        style={{
                          marginTop: '1%',
                          color: '#5cccee',
                          paddingHorizontal: 15,
                        }}>
                        Trip Completed
                      </Text>
                    </Col>
                    <Col style={{backgroundColor: '#dcdcdc', marginTop: '4%'}}>
                      <Text></Text>
                      <Text
                        style={{
                          marginTop: '1%',
                          color: '#5cccee',
                          paddingHorizontal: 15,
                        }}>
                        GHc 1
                      </Text>
                      <Text
                        style={{
                          marginTop: '1%',
                          color: '#5cccee',
                          paddingHorizontal: 15,
                        }}>
                        {item.userLocation}
                      </Text>
                      <Text
                        style={{
                          marginTop: '1%',
                          color: '#5cccee',
                          paddingHorizontal: 15,
                        }}>
                        {item.userDestination}
                      </Text>
                      <Text
                        style={{
                          marginTop: '1%',
                          color: '#5cccee',
                          paddingHorizontal: 15,
                        }}>
                        {item.CompletedTrip ? 'Yes' : 'No' && item.TripEnded}
                      </Text>
                    </Col>
                  </Grid>
                </ListItem>
              )}
              keyExtractor={(item) => item.TripEnded}
            />
          ) : (
            <View>
              <Text
                style={{
                  marginTop: '5%',
                  color: '#5cccee',
                }}>
                Welcome to the party you dont have any trip history yet or
                there's a problem
              </Text>
            </View>
          ))}
      </View>
    );
  }
}

export default Trips;
