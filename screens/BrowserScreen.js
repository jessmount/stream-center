import React, { Component } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import { Constants, WebBrowser } from 'expo';

export default class App extends Component {
  state = {
    result: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          style={styles.paragraph}
          title="Open WebBrowser"
          onPress={this._handlePressButtonAsync}
        />
        <Text>{this.state.result && JSON.stringify(this.state.result)}</Text>
      </View>
    );
  }

  _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync('https://openload.co/embed/p2WH8WXWL6U/Game_of_Thrones_S02E02_The_Night_Lands_1080p_x265_10bit_Joy.mp4');
    this.setState({ result });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
});
