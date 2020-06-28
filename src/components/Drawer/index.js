import React, {Component} from 'react';
import {View, Text, Dimensions} from 'react-native';
import {Thumbnail, InputGroup, ListItem, Left} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';
import {TouchableOpacity, Directions} from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import {connect} from 'react-redux';
import axios from 'axios';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

class DrawerContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      imageUrl: 'madman',
    };
  }

  componentDidMount() {
    axios
      .post('https://us-central1-halo-84fb8.cloudfunctions.net/api/user', {
        userId: this.props.userID,
      })
      .then(results => {
        console.log(results.data);
        this.setState({
          username: results.data,
        });
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .post('https://us-central1-halo-84fb8.cloudfunctions.net/api/imageUrl', {
        userId: this.props.userID,
      })
      .then(res => {
        this.setState({imageUrl: res.data});
        console.log(this.state.imageUrl);
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <Animatable.View
        style={{
          height: height,
        }}>
        <View
          style={{
            height: 200,
            borderWidth: 1,
            borderBottomColor: '#5cccee',
            backgroundColor: '#5cccee',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 10,
          }}
          animation="slideIn"
          iterationCount={1}>
          <ListItem avatar>
            <Left>
              <Thumbnail
                style={{marginRight: 10}}
                large
                source={{
                  // yeah so if you pass the url via redux, it just comes here
                  uri: this.state.imageUrl.toString(),
                }}
              />
            </Left>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
                color: '#fff',
                paddingTop: 30,
              }}>
              {this.state.username}
            </Text>
          </ListItem>
        </View>

        <View style={{}}>
          <TouchableOpacity
            style={{paddingHorizontal: 30, marginTop: 30, height: 40}}
            onPress={() => {
              Actions.Trips();
            }}>
            <InputGroup>
              <Icon
                size={20}
                name="database"
                style={{color: '#5cccee'}}
                onPress={() => {
                  Actions.Trips();
                }}
              />
              <Text
                style={{
                  fontSize: 20,
                  color: '#5cccee',
                  marginLeft: 10,
                }}
                onPress={() => {
                  Actions.Trips();
                }}>
                Trips
              </Text>
            </InputGroup>
          </TouchableOpacity>

          <TouchableOpacity
            style={{paddingHorizontal: 30, marginTop: 30, height: 40}}
            onPress={() => {
              Actions.Payment();
            }}>
            <InputGroup>
              <Icon
                size={20}
                name="paypal"
                style={{color: '#5cccee'}}
                onPress={() => {
                  Actions.Payment();
                }}
              />
              <Text
                style={{
                  fontSize: 20,
                  color: '#5cccee',
                  marginLeft: 10,
                }}
                onPress={() => {
                  Actions.Payment();
                }}>
                Payment
              </Text>
            </InputGroup>
          </TouchableOpacity>

          <TouchableOpacity
            style={{paddingHorizontal: 30, marginTop: 30, height: 40}}
            onPress={() => {
              Actions.Help();
            }}>
            <InputGroup>
              <Icon
                size={20}
                name="grav"
                style={{color: '#5cccee'}}
                onPress={() => {
                  Actions.Help();
                }}
              />
              <Text
                style={{
                  fontSize: 20,
                  color: '#5cccee',
                  marginLeft: 10,
                }}
                onPress={() => {
                  Actions.Help();
                }}>
                Help
              </Text>
            </InputGroup>
          </TouchableOpacity>

          <TouchableOpacity
            style={{paddingHorizontal: 30, marginTop: 30, height: 40}}>
            <InputGroup>
              <Icon
                size={20}
                name="star"
                style={{color: '#5cccee'}}
                onPress={() => {
                  Actions.FreeRides();
                }}
              />
              <Text
                style={{
                  fontSize: 20,
                  color: '#5cccee',
                  marginLeft: 10,
                }}
                onPress={() => {
                  Actions.FreeRides();
                }}>
                Free Trips
              </Text>
            </InputGroup>
          </TouchableOpacity>

          <TouchableOpacity
            style={{paddingHorizontal: 30, marginTop: 30, height: 40}}
            onPress={() => {
              Actions.Settings();
            }}>
            <InputGroup>
              <Icon
                size={20}
                name="gear"
                style={{color: '#5cccee'}}
                onPress={() => {
                  Actions.Settings();
                }}
              />
              <Text
                style={{
                  fontSize: 20,
                  color: '#5cccee',
                  marginLeft: 10,
                }}
                onPress={() => {
                  Actions.Settings();
                }}>
                Settings
              </Text>
            </InputGroup>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    );
  }
}

const mapStateToProps = state => ({
  userID: state.login.userID || {} || state.registerPage.userID,
  imageUrl: state.registerPage.imageUrl || {},
});
const mapActionsCreators = {};

export default connect(
  mapStateToProps,
  mapActionsCreators,
)(DrawerContent);
