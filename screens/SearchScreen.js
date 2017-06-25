import React from 'react';
import { ScrollView, StyleSheet, View, Text, Image, ListView, Modal } from 'react-native';
import { ExpoConfigView } from '@expo/samples';
import popular from '../components/Popular'
import searchShows from '../components/Search'
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Content, Form, Item, Input,Label, Button, H1, Header, Icon, Card, CardItem, Left, Right, Thumbnail, Body, Toast} from 'native-base';
import {firebaseRef} from '../utilities/Firebase'

const database = firebaseRef.database();

export default class SettingsScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Search for Shows',
    },
  };




    constructor(props){
        super(props)

        this.state ={
            Popresults: [],
            searchTerm:'',
            searchResults:[],



        }



        this.handleSearch = this.handleSearch.bind(this);
        this.addShow = this.addShow.bind(this);
    }



    componentDidMount(){
        popular.getPopular().then((response)=>{
          console.log(response);
            this.setState({
                Popresults: response.results
            })

        });

    }


      _handleRegister = () => {
    this.props.navigator.push('register');
  }

      handleSearch(){
       searchShows.search(this.state.searchTerm).then((response)=>{
            this.setState({
                searchResults: response.results

            })


        });
        }


addShow (showId) {

  var userId = firebaseRef.auth().currentUser.uid;
  var newShow = firebaseRef.database().ref().child('user-shows/'+ userId).push().key;
  firebaseRef.database().ref().child('user-shows/'+ userId).push({

    showId

   });

alert("Show added!");
}


  render() {



       let popular = this.state.Popresults.map(function(data, index){

            return(


             <View key={index} style={styles.tvList} >
                    <Image source={{uri: 'https://image.tmdb.org/t/p/w500' + data.poster_path }}
                           style={{width: 80, height: 120}} />
                    <Text style={styles.showName}>
                        {data.name}
                    </Text>

                </View>

            )
        });



      let results = this.state.searchResults.map(function(data, index){
            return(

                <Card key={index} >
                        <CardItem header>
                            <Text style={{ fontSize: 18}}>{data.name}</Text>
                        </CardItem>
                          <CardItem cardBody>
                              <Left>
                                <Image source={{uri: 'https://image.tmdb.org/t/p/w500' + data.poster_path }}
                                        style={{width: 140, height: 200, margin: 10}}/>
                              </Left>
                              <Right>
                              <Text style ={{marginRight: 40, paddingTop: 15}}>{data.overview}</Text>
                              </Right>
                          </CardItem>
                          <CardItem>
                              <Button transparent >
                                  <Icon name="star" />
                                  <Text>Rating: {data.vote_average}</Text>
                              </Button>
                               <Button transparent onPress={ () => this.addShow(data.id)}>
                                  <Icon  name="add" />
                                  <Text>Add Show to Your List</Text>
                              </Button>

                        </CardItem>
                   </Card>

            )
        }, this);


    return (

        <Container>
        <Header searchBar rounded>
                    <Item>
                        <Icon name="ios-search" />
                        <Input placeholder="Search for Shows"
                               value={this.state.searchTerm}
                               onChangeText={(text) => { this.setState({ searchTerm: text }) }} />

                    </Item>
                    <Button transparent onPress={this.handleSearch} >
                        <Text>Search</Text>
                    </Button>
          </Header>
          <ScrollView style={styles.wrapper}>
         <View style={styles.results}>
             {results}
        </View>
                <View>
                  <Text>Browse Popular Shows</Text>
                 <ScrollView
                      style={styles.horizontalScrollView}
                      automaticallyAdjustContentInsets={false}
                      horizontal={true}>

                     {popular}
                  </ScrollView>
                </View>
     </ScrollView>


        </Container>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    margin: 5,
  },
     title: { color: "#fff",
                fontSize: 36,
                fontWeight: 'bold',
                fontStyle: 'italic',
                marginTop: 175
                },


        copy: { color: '#fff',
              padding: 10
        },

        tvList :{
            margin: 10,
            width: 80,
            alignItems: 'center'

        },

        showName: {
            textAlign: 'center'
        },

        results:{
            margin: 10,
        },
    resultCard:{
        padding: 12,
    }

});
