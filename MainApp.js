import React, { Component } from 'react'
import {  Text, TouchableOpacity, View } from 'react-native'
import { Image,Card, Button ,Input} from 'react-native-elements'
import axios from 'axios'
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class MainApp extends Component {

constructor(props) {
super(props)
this.state = {
latitude:0.0,
longitude :0.0,
city : "Bogor",
icon :"",
temp:"32C",
humidity:85,
data:{},
inputCity:"",

}

}

componentDidMount(props){

 this.getLocation();

}

storeData = async (value) => {
    try {
    
    
        await AsyncStorage.setItem('dataWeather', JSON.stringify(value) )
        .then( ()=>{
        console.log("It was saved successfully")
        } )
        .catch( ()=>{
        console.log("There was an error saving the data")
        } )
    
      
    } catch (e) {
      console.log(e)
      // saving error
    }
  }
  
  storeData2 = async (value) => {
    try {
    
    
        await AsyncStorage.setItem('dataWeather2', JSON.stringify(value) )
        .then( ()=>{
        console.log("It was saved successfully")
        } )
        .catch( ()=>{
        console.log("There was an error saving the data")
        } )
    
      
    } catch (e) {
      console.log(e)
      // saving error
    }
  }
  
  readData = async () => {
   
   await  AsyncStorage.getItem('dataWeather').then( (value)=>{
    let data = JSON.parse(value)
  
  
   
   this.setState({
    city : data.timezone,
   
    temp:`${data.current.temp}F`,
    humidity:data.current.humidity,
    icon:"http://openweathermap.org/img/w/"+data.current.weather[0].icon+".png"
  
  })
    
    
    
    } )
    .catch( (error)=>{
    console.log("There was an error read the data"+error)
    } )
      
   
  }

  readData2 = async () => {
   
    await  AsyncStorage.getItem('dataWeather2').then( (value)=>{
     let data = JSON.parse(value)
   
   
    
   
     this.setState({
        latitude:data.coord.lat,
        longitude:data.coord.lon,
        city : data.name,
        icon :data.weather[0].icon,
        temp:`${data.main.temp}F`,
        humidity:data.main.humidity,
        icon:"http://openweathermap.org/img/w/"+data.weather[0].icon+".png"
      
      })
     
     
     } )
     .catch( (error)=>{
     console.log("There was an error read the data"+error)
     } )
       
    
   }
 


getDefault = ()=>{

  axios.get('https://api.openweathermap.org/data/2.5/onecall', {
    params: {
      lat: this.state.latitude,
      lon: this.state.longitude,
      appid: '6c57819f3114a6213bf6a1a0290c4f2c',
      exclude:"hourly,minutely,alerts"
    }
  })
  .then( (response) => {
    
    let data = response.data;
   
    this.storeData(data);
    this.setState({
      city : data.timezone,
      icon :data.current.weather[0].icon,
      temp:`${data.current.temp}F`,
      humidity:data.current.humidity,
      icon:"http://openweathermap.org/img/w/"+data.current.weather[0].icon+".png"
    
    })
    
   
      
  })
  .catch((error) =>{
    console.log("Woiii error cuy" +error);
     this.readData();
    
    
  })

}

getCity= ()=>{

   
  
  axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      q:this.state.inputCity,
      appid: '6c57819f3114a6213bf6a1a0290c4f2c',
      
    }
  })
  .then( (response) => {
    
    let data = response.data;
    this.storeData2(data);
  
    this.setState({
      latitude:data.coord.lat,
      longitude:data.coord.lon,
      city : data.name,
      icon :data.weather[0].icon,
      temp:`${data.main.temp}F`,
      humidity:data.main.humidity,
      icon:"http://openweathermap.org/img/w/"+data.weather[0].icon+".png"
    
    })
      
  })
  .catch((error) =>{
    console.log("Woiii error cuy" +error);
    this.readData2()
  })

}



 
 


  getLocation = async () => {
    console.log("Test");
     let { status } = await Location.requestForegroundPermissionsAsync();
     if (status !== 'granted') {
       setErrorMsg('Permission to access location was denied');
       return;
     }
   
     let location = await Location.getCurrentPositionAsync({});
     console.log("Lokasinya adalah :" + JSON.stringify(location));
      this.setState({latitude:location.coords.latitude,longitude:location.coords.longitude});
       await this.getDefault();
    }


    handlerInputCity = (text) => {
    this.setState({inputCity:text})
    
    }


    render() {
        return (
            <View>
                <Text> Lokasi : {this.state.latitude} ; {this.state.longitude} </Text>
                <View>
                <Text>Kota :</Text>
                <Input onChangeText = {this.handlerInputCity}  /><Button title="Cari" onPress={this.getCity}/>
                </View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('HistoryWeather',{lat:this.state.latitude,lon:this.state.longitude})}>
                <Card >
                  <Card.Title> {this.state.city} </Card.Title>
                  <Card.Divider/>
                  {
                    
                        <View >
                          <Image
                            resizeMode="cover"
                            source={{ uri: this.state.icon }}
                            style={{ width: 200, height: 200 }}
                          />
                          <Text >Temperatur : {this.state.temp}</Text>
                          <Text >Kelembapan : {this.state.humidity}</Text>
                        </View>
                     
                  }
                </Card>
                </TouchableOpacity>
            </View>
        )
    }
}
