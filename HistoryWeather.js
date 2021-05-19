import React, { Component } from 'react'

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    TextInput,
    FlatList
  } from 'react-native';
  
import axios from 'axios'



export default class HistoryWeather extends Component {


   constructor(props){
   super(props)
   
   this.state ={
   infoData:{}
   
   }
   
   
   }

   componentDidMount(props) {
   
     this.getWeather()
   
   }
   
  
  


    getWeather= ()=>{
  
        axios.get('https://api.openweathermap.org/data/2.5/onecall', {
            params: {
              lat: this.props.route.params.lat,
              lon: this.props.route.params.lon,
              appid: '6c57819f3114a6213bf6a1a0290c4f2c',
              units:"metric",
              exclude:"current,hourly,minutely,alerts"
            }
          })
          .then( (response) => {
            
            let data = response.data;
            console.log("Datanya :" +JSON.stringify(data));
            this.setState({
              infoData:data
            
            })
            
           
              
          })
          .catch((error) =>{
            console.log(error);
           
            
          })
        
      
      }
      render() {
        return (
          <View style={styles.container}>
            
    
            <FlatList 
              style={styles.notificationList}
              data={this.state.infoData.daily}
              keyExtractor= {(item) => {
                return item.dt+"";
              }}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity style={[styles.card]} >
                    <View style={styles.cardContent}>
                      <Image style={[styles.image, styles.imageContent]} source={{uri: "http://openweathermap.org/img/w/"+item.weather[0].icon+".png"}}/>
                      
                      <Text style={styles.name}>{item.weather[0].description}</Text>
                      <Text style={styles.name}>{new Date(item.dt*1000).toLocaleDateString("en-US")}</Text>
                    </View>
                    
                  </TouchableOpacity>
                )
              }}/>
          </View>
        );
      }
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#EBEBEB',
      },
      formContent:{
        flexDirection: 'row',
        marginTop:30,
      },
      inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        borderBottomWidth: 1,
        height:45,
        flexDirection: 'row',
        alignItems:'center',
        flex:1,
        margin:10,
      },
      icon:{
        width:30,
        height:30,
      },
      iconBtnSearch:{
        alignSelf:'center'
      },
      inputs:{
        height:45,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
      },
      inputIcon:{
        marginLeft:15,
        justifyContent: 'center'
      },
      notificationList:{
        marginTop:20,
        padding:10,
      },
      card: {
        height:null,
        paddingTop:10,
        paddingBottom:10,
        marginTop:5,
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        borderTopWidth:40,
        marginBottom:20,
      },
      cardContent:{
        flexDirection:'row',
        marginLeft:10, 
      },
      imageContent:{
        marginTop:-40,
      },
      tagsContent:{
        marginTop:10,
        flexWrap:'wrap'
      },
      image:{
        width:60,
        height:60,
        borderRadius:30,
      },
      name:{
        fontSize:20,
        fontWeight: 'bold',
        marginLeft:10,
        alignSelf: 'center'
      },
      btnColor: {
        padding:10,
        borderRadius:40,
        marginHorizontal:3,
        backgroundColor: "#eee",
        marginTop:5,
      },
    });  