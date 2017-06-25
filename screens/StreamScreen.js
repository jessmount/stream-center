import React from 'react';
import { ScrollView, StyleSheet, View, Image } from 'react-native';
import getStreams from '../components/getStreams.js';
import {
  Container,
  List, ListItem,
  Content,
  Item,
  Button,
  H1,
  Header,
  Icon,
  Card,
  CardItem,
  Left,
  Right,
  Thumbnail,
  Body,
  Toast,
Text} from 'native-base'
import { Constants, WebBrowser } from 'expo';



export default class StreamScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Streams',
    },
  };

  constructor(props){
      super(props)

      this.state ={
          Streams: [],
          hostUrls: [],
          result: null,


      }
      this.getUrls = this.getUrls.bind(this);
      this._handlePress = this._handlePress.bind(this);

  }


  componentDidMount(){
      getStreams.stream(this.props.route.params.episode, this.props.route.params.season, this.props.route.params.show).then((response)=>{


        this.setState({
            Streams: response.result,



        })

        this.getUrls();

      });

  }


  _handlePress(link) {
    this.props.navigator.push('player', {link: link});

  }

  _handlePressButtonAsync = async (link) => {

    let result = await WebBrowser.openBrowserAsync(link);
    this.setState({ result });

  };


  getUrls(){

   this.state.Streams.map(function(data, index){


      ()=> this.setState({ hostUrls: data.hosterurls[0].url})
      });


  }




  render() {

    let links= this.state.Streams.map(function(data, index){

      return(

        <List key={index} >
             <ListItem>

                 <Body style={{flex: 1, flexDirection: 'row'}}>
                    <Left>
                      <Text> Source: {data.hostername}</Text>
                    </Left>
                    <Right>
                      <Button onPress={this._handlePressButtonAsync.bind(this, data.hosterurls[0].url)}><Text>Watch</Text></Button>
                    </Right>

                 </Body>
             </ListItem>
          </List>

      )


}, this);

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>

          {links}


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
