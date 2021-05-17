import React, { Component } from 'react'
import {
  StyleSheet, ScrollView, Platform, Image,
} from 'react-native';
import { LinearGradient as Gradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';

import axios from 'axios'
import {
  Button, Block, Icon, Text, NavBar,
} from 'galio-framework';
import theme from './theme';


const BASE_SIZE = theme.SIZES.BASE;
const GRADIENT_BLUE = ['#6B84CA', '#8F44CE'];
const GRADIENT_PINK = ['#D442F8', '#B645F5', '#9B40F8'];
const COLOR_WHITE = theme.COLORS.WHITE;
const COLOR_GREY = theme.COLORS.MUTED; // '#D8DDE1';
const gradientColors =  GRADIENT_PINK;

export default class App extends Component {


  constructor(props) {
  super(props);
  
  this.state={
  data :{},
  
  latitude:0.0,
  longitude:0.0,
  
  }
  
  
  
  }


 componentDidMount(){
 
  axios.get('https://api.openweathermap.org/data/2.5/onecall', {
    params: {
      lat: this.state.latitude,
      lon: this.state.longitude,
      appid: '6c57819f3114a6213bf6a1a0290c4f2c'
    }
  })
  .then( (response) => {
    console.log(response.data.daily[0].weather[0].icon);
    this.setState({data:response.data, icon:"http://openweathermap.org/img/w/"+response.data.daily[0].weather[0].icon+".png"});
  
  })
  .catch((error) =>{
    console.log(error);
  })
 this.getLocation();
 
 
}

  getLocation = async () => {
    console.log("Test");
     let { status } = await Location.requestForegroundPermissionsAsync();
     if (status !== 'granted') {
       setErrorMsg('Permission to access location was denied');
       return;
     }
   
     let location = await Location.getCurrentPositionAsync({});
     console.log("Lokasinya adlaah :" + JSON.stringify(location));
      this.setState({latitude:location.coords.latitude,longitude:location.coords.longitude});
      
  //  console.log(location.coords.latitude);
    }
 
  getData(){
 
 
   
 
 
 }

  render() {
    return (
      <Block row center card shadow space="between" style={styles.card} >
        <Image
  style={styles.imageIcon}
  source={{ uri:this.state.icon }}
  resizeMode={"cover"} // <- needs to be "cover" for borderRadius to take effect on Android
/>

        <Block flex>
          <Text size={BASE_SIZE * 1.125}>{this.state.data.timezone}</Text>
          <Text size={BASE_SIZE * 0.875} muted></Text>
        </Block>
       
      </Block>
    )
  }
}


const styles = StyleSheet.create({
  card: {
    borderColor: 'transparent',
    marginHorizontal: BASE_SIZE,
    marginVertical: BASE_SIZE / 2,
    padding: BASE_SIZE,
    backgroundColor: COLOR_WHITE,
    shadowOpacity: 0.40,
  },
  menu: {
    width: BASE_SIZE * 2,
    borderColor: 'transparent',
  },
  settings: {
    width: BASE_SIZE * 2,
    borderColor: 'transparent',
  },
  left: {
    marginRight: BASE_SIZE,
  },
  right: {
    width: BASE_SIZE * 2,
    backgroundColor: 'transparent',
    elevation: 0,
  },
  gradient: {
    width: BASE_SIZE * 3.25,
    height: BASE_SIZE * 3.25,
    borderRadius: BASE_SIZE * 3.25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageIcon: {
    width: 50,
    height: 50,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 75
  },
});


