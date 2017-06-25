import React from 'react';
import {firebaseRef} from '../utilities/Firebase'
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Container, Content, Form, Item, Input,Label, Button, H1} from 'native-base';
import { MonoText } from '../components/StyledText';

export default class LoginScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
    },
  };

    constructor(props) {
        super(props)

            this.state = {

                email: '',
                password: '',

            }

             this.handleLogin = this.handleLogin.bind(this)

        }

      async handleLogin (){

      try{

       await firebaseRef.auth().signInWithEmailAndPassword(this.state.email, this.state.password)


           this.props.navigator.push('rootNavigation');

      }catch(error) {

          console.log(error.code);
          console.log (error.message);

      }

  }


      _handleRegister = () => {
    this.props.navigator.push('register');
  }

  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.title}>Stream Center</Text>
            <View style= {styles.formBox}>
            <Form>
                <Item floatingLabel>
                    <Label>Email</Label>
                    <Input
                        returnKeyType="next"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={this.state.email}
                        onChangeText={(text) => { this.setState({ email: text }) }}/>

                </Item>
                <Item floatingLabel last>
                    <Label>Password</Label>
                    <Input secureTextEntry={true}
                           value={this.state.password}
                           onChangeText={(text) => { this.setState({ password: text }) }}/>
                </Item>
            </Form>
            <View style={styles.btn}>
            <Button block info onPress={this.handleLogin}  >
                <Text style={styles.btnText}>Login</Text>
            </Button>
            </View>
              </View>
              <View>
            <Text onPress={this._handleRegister} style={styles.reg}>Register</Text>
           </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  formBox:{
    margin: 20,
    marginRight: 25,

  },

  title:{
    fontSize: 30,
    color: '#2f95dc',
    textAlign: 'center',
    marginTop: 80,
  },

  btn:{
    marginTop: 50,
  },

  btnText:{
    color: '#fff',
  },

  reg: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 30,

  },

  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 15,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 80,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 140,
    height: 38,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 23,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
