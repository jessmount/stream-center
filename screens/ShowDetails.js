
import React from 'react';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import getShows from '../components/getShows.js';
import { Container, List, ListItem, Content,  Item, Button, H1, Header, Icon, Card, CardItem, Left, Right, Thumbnail, Body, Toast} from 'native-base'
import {firebaseRef} from '../utilities/Firebase';
export default class ShowDetails extends React.Component {
  static route = {
    navigationBar: {
      title: 'Show Details',
    },
  };

  constructor(props){
      super(props)

      this.state ={
          Details: [],
          Seasons: [],
          ShowId: "",
          ShowName: '',

      }
  this.deleteShow = this.deleteShow.bind(this);

  }


  componentDidMount(){
      getShows.favs(this.props.route.params.name).then((response)=>{
        console.log(response);
        this.setState({
            Details: this.state.Details.concat(response),
            Seasons: response.seasons,
            ShowId: response.id,
            ShowName: response.original_name
        })

      });


  }

  _handlePress(season_num, showId, showName) {
    this.props.navigator.push('seasonDetails', {show: showId, season: season_num, showName: this.state.ShowName});

  }



  deleteShow(){
    alert('pressed');
    showId = this.state.ShowId;
    user = firebaseRef.auth().currentUser.uid;
    parent = firebaseRef.database().ref().child();//.getParent();
    console.log(parent);
    //console.log(user);


  }




  render() {

    let info = this.state.Details.map(function(data, index){


         return(
           <View style={{flex: 1,}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View key={index}>
                  <Image source={{uri: 'https://image.tmdb.org/t/p/w500' + data.poster_path }}
                      style={{width: 140, height: 200, margin: 10,}}/>
                </View>
            <View>
            <Text style={{fontSize: 22, marginTop: 10, marginBottom: 10,}}>{data.original_name}</Text>
            <Text>Network: {data.networks[0].name}</Text>
            <Text>Created By: {data.created_by[0].name}</Text>
            <Text>First Air Date: {data.first_air_date}</Text>
            <Text>Last Air Date: {data.last_air_date}</Text>

            <Text>Rating: {data.vote_average}</Text>

            <View style={styles.btn}>
            <Button onPress={ () => this.deleteShow()}><Text style={styles.btnText}>Delete Show</Text></Button>
            </View>


          </View>
        </View>

          <View>
            <Text style={{margin: 10}}>{data.overview}</Text>
           </View>
         </View>

         )
     }, this);

     let seasons= this.state.Seasons.map(function(data, index){

       return(



                  <CardItem key={index} onPress={() => this._handlePress(this.state.ShowId, data.season_number)} >

                     <Text>Season: {data.season_number}</Text>
                     <Right>
                        <Icon name="arrow-forward" onPress={() => this._handlePress(this.state.ShowId, data.season_number)} />
                     </Right>
                   </CardItem>


       )


     }, this);

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>

        {info}
        <Card>
          <CardItem header style={{borderBottomWidth: 0.5,borderBottomColor:'rgba(0,0,0,0.2)'}}><Text style={{color:'#2f95dc', fontSize: 16}}>Seasons</Text></CardItem>
        {seasons}
        </Card>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
  btnText:{
    color: '#fff',
  },
  btn:{
    marginTop: 20,
  },
});
