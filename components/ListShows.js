import React from 'react';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { MonoText } from '../components/StyledText';
import {firebaseRef} from '../utilities/Firebase';
import getShows from '../components/getShows.js'
import { Container, Content, List, ListItem, Thumbnail, Text, Body } from 'native-base';

const database = firebaseRef.database();

export default class ListShows extends React.Component {

  constructor(props){
      super(props)

      this.state ={
          showList: [],

      }
      this.shows = [];
      this.getShowList = this.getShowList.bind(this);

  }







  componentDidMount(){

    this.getShowList();



  }


  getShowList(){

    var userId = firebaseRef.auth().currentUser.uid;
    var rootRef = firebaseRef.database().ref('user-shows/'+ userId);

    rootRef.on('child_added', snap => {
       snap.forEach((childSnapshot) => {

         getShows.favs(childSnapshot.val()).then((response)=>{

           this.state.showList.push(response);
           this.shows.push(response);


       })

     })


   })

 }

 _handlePress = () => {
   this.props.navigator.push('showDetails', {name: this.props.shows});
 }



  render() {

    let showList = this.state.showList.map(function(data, index){
    
         return(

            <List key={data.id} >
                 <ListItem onPress={this._handlePress}>
                 <Image source={{uri: 'https://image.tmdb.org/t/p/w500' + data.poster_path }}
                        style={{width: 100, height: 120}} />
                     <Body>
                         <Text>{data.original_name}</Text>
                         <Text note>Seasons: {data.number_of_seasons}</Text>
                     </Body>
                 </ListItem>
              </List>

                       )
                   }, this);


    return (

      <View style={styles.container}>

      <ScrollView>

       {showList}

      </ScrollView>

      </View>
    );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
