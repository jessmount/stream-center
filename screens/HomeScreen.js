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
import { Container, Content, List, ListItem, Thumbnail, Text, Body, Icon, Right } from 'native-base';

const database = firebaseRef.database();

export default class HomeScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Your Shows',
    },
  };

  constructor(props){
      super(props)

      this.state ={
          showList: [],

      }
      this.shows = [];

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

           this.setState({
               showList: this.state.showList.concat(response)
           })


       })

     })


   })

 }

 _handlePress(data) {
   this.props.navigator.push('showDetails', {name: data});
 }



  render() {

    let showList = this.state.showList.map(function(data, index){

         return(

            <List key={index} >
                 <ListItem onPress={() => this._handlePress(data.id)} >
                 <Image source={{uri: 'https://image.tmdb.org/t/p/w500' + data.poster_path }}
                        style={{width: 100, height: 150}} />
                     <Body>
                         <Text>{data.original_name}</Text>
                         <Text note>Seasons: {data.number_of_seasons}</Text>
                     </Body>
                     <Right>
                            <Icon name='arrow-forward' style={{fontSize: 50, color: 'grey'}}/>
                        </Right>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
