import React, { Component } from 'react';
import { Container, Header, View, Button,  Fab } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome'
import { Actions } from 'react-native-router-flux';

export default class FAB extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false
    };
  }
  render() {
    return (  
      
        
        
          <Fab
          
            active={this.state.active}
            direction="down"
            containerStyle={{}}
            position="topLeft"
            onPress={() => this.setState({ active: !this.state.active })}
            style={{ backgroundColor: '#fff'}}>
            <Icon name="bars" style={{color:"#5cccee"}}   />
            <Button  onPress={() => Actions.home()} style={{ backgroundColor: '#fff'}}>
                    <Icon size={20} name="home" style={{color:"#5cccee"}} ></Icon>
                   
                </Button>
                <Button  onPress={() => Actions.Trips()} style={{ backgroundColor: '#fff'}}>
                    <Icon size={20} name="database" style={{color:"#5cccee"}}></Icon>
                   
                </Button>
                <Button  onPress={() => Actions.Payment()} style={{ backgroundColor: '#fff'}}>
                    <Icon size={20} name="paypal" style={{color:"#5cccee"}}></Icon>
                   
                </Button>
                <Button  onPress={() => Actions.FreeRides()} style={{ backgroundColor: '#fff'}}>
                    <Icon size={20} name="star" style={{color:"#5cccee"}}></Icon>
                   
                </Button>
                <Button  onPress={() => Actions.Help()} style={{ backgroundColor: '#fff'}}>
                    <Icon size={20} name="grav" style={{color:"#5cccee"}}></Icon>
                   
                </Button>
                <Button  onPress={() => Actions.Settings()} style={{ backgroundColor: '#fff'}}>
                    <Icon size={20} name="gear" style={{color:"#5cccee"}}></Icon>
                   
                </Button>
          </Fab>
       
      
    );
  }
}