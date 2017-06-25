import React from 'react';
import { ScrollView, StyleSheet, View, Image, Animated,Dimensions,WebView, Text, TouchableHighlight } from 'react-native';
import getStreams from '../components/getStreams.js';
import Expo from 'expo';
import { Constants, Components } from 'expo'
//import VideoPlayer from 'react-native-video-player';
//import Video from 'react-native-video';

const videoSource = require('../assets/Northernlights2_HD.mp4');

export default class PlayerScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Player',
    },
  };

  constructor(props) {
    super(props);
    this.onPressButton = this.onPressButton.bind(this);
  }
  onPressButton(){
    this.vid.presentIOSFullscreenPlayer();

  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.onPressButton}>
        <Text style={{color: 'yellow'}}>Full Screen</Text>
        </TouchableHighlight>
        <Components.Video
          ref={r=>this.vid = r}
          source={{ uri: 'https://openload.co/embed/p2WH8WXWL6U/Game_of_Thrones_S02E02_The_Night_Lands_1080p_x265_10bit_Joy.mp4' }}
          rate={1.0}
          volume={1.0}
          muted={false}
          resizeMode="cover"
          repeat
          style={{ width: 300, height: 300 }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#rgba(0,0,0,0.9)',
  },
});
