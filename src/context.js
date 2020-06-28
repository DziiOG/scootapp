import React, { Component } from 'react'
import axios from 'axios'
import Geolocation from '@react-native-community/geolocation';


const ProductContext = React.createContext();

 class ProductProvider extends Component {

    state = {
        autoFocus: false,
        active: false,
        time: "",
        dateM: "",
        titleCompose: "",
        taskCompose: "",
        loading:false,
        chatDetails: {},
        token: '',
        userId: '',
        username: '',
        latitude: 0,
        longitude: 0,
       
    }


    getLocation(){
        this.setState({
            loading: true
        })

        Geolocation.getCurrentPosition((position) => {
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                loading: false
            }, () => {
              
               
                
            });
        }, (error) => {
            //Handling Error
            console.log(error);
            this.setState({
                loading: false
            })
        }, 
        { enableHighAccuracy: false, timeout: 200000, maximumAge: 10},
        );
       }

       componentDidMount(){
           this.getLocation()
       }

       getMapRegion = () => ({
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        latitudeDelta: 0.09,
        longitudeDelta: 0.04
      });

    changeFocus= () => {
        //console.log(this.state.autoFocus)
        if(this.state.autoFocus == false) {
            this.setState({
                autoFocus: true
            })
            //console.log(this.state.autoFocus)
        }else if(this.state.autoFocus == true){
            this.setState({
                autoFocus: false
            })
            //console.log(this.state.autoFocus)
        }
    }

    fabToggle = () => {
        this.setState({ active: !this.state.active })
    }

   textHandler = (text, type) => {
       if(type == "title"){
           this.setState({
               titleCompose: text
           })

           //console.log(this.state.titleCompose)
       } else if(type == "task"){
           this.setState({
               taskCompose: text
           })
           //console.log(this.state.taskCompose)
       }
   }


   returnToDefault = () => {
       this.setState({
        time: "",
        dateM: "",
        titleCompose: "",
        taskCompose: ""
       })
   }

   loading = () => {
       if(this.state.loading == false){
           this.setState({
               loading: true
           })
       }else {
           this.setState({
               loading: false
           })
       }
   }
    
   getDetail = (item) => {
        this.setState({
            chatDetails: {...item}
        })
   }



   getUserName = (id)=> {
    axios
    .post('/user', {
        userId: id
    })
    .then(results => {
      this.setState({
          username: results.data
      })
        
    
    })
    .catch(err => {
    console.log(err);
    });
}
 

    render() {
        return (
           <ProductContext.Provider
           value={{...this.state,
            changeFocus: this.changeFocus,
            fabToggle: this.fabToggle,
            textHandler: this.textHandler,
            returnToDefault: this.returnToDefault,
            loading: this.loading,
            getDetail: this.getDetail,
            getUserName:this.getUserName,
            getMapRegion: this.getMapRegion
           
         
           
           }}
           >
               {this.props.children}
           </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;
export {ProductProvider, ProductConsumer}
