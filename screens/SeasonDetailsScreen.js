import React from 'react';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import getSeason from '../components/getSeason.js';
import { Container, List, ListItem, Content,  Item, Button, H1, Header, Icon, Card, CardItem, Left, Right, Thumbnail, Body, Toast} from 'native-base'


export default class SeasonDetails extends React.Component {
  static route = {
    navigationBar: {
      title: 'Episodes',
    },
  };

  constructor(props){
      super(props)

      this.state ={
          Episodes: [],
          ShowName: this.props.route.params.showName,


      }


  }


  componentDidMount(){
      getSeason.season(this.props.route.params.show,this.props.route.params.season ).then((response)=>{

        this.setState({
            Episodes: response.episodes,

        })
        //  console.log(this.state.ShowName);
      });


  }

  _handlePress(episode, season, show) {
    this.props.navigator.push('streams', {episode: episode, season: season, show: show});
  }




  render() {



     let episodes= this.state.Episodes.map(function(data, index){

       return(

         <List key={index} >
              <ListItem onPress={() => this._handlePress(data.episode_number, data.season_number,this.state.ShowName )}>

                  <Body>
                  <Text style={{fontWeight:'bold', marginBottom: 5,}}> Episode {data.episode_number}: {data.name}</Text>
                     <Text note>{data.overview}</Text>
                  </Body>
                  <Icon name='arrow-forward'/>
              </ListItem>
           </List>

       )


     }, this);

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>


        {episodes}

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
});
