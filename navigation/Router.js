import { createRouter } from '@expo/ex-navigation';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import SearchScreen from '../screens/SearchScreen';
import RootNavigation from './RootNavigation';
import RegisterScreen from '../screens/RegisterScreen'
import ShowDetails from '../screens/ShowDetails'
import SeasonDetailsScreen from '../screens/SeasonDetailsScreen'
import StreamScreen from '../screens/StreamScreen'
import PlayerScreen from '../screens/PlayerScreen'
import BrowserScreen from '../screens/BrowserScreen'

export default createRouter(() => ({

  browser: () => BrowserScreen,
  player: () => PlayerScreen,
  streams: ()=> StreamScreen,
  seasonDetails: ()=> SeasonDetailsScreen,
  showDetails: ()=> ShowDetails,
  login: ()=> LoginScreen,
  register: ()=> RegisterScreen,
  home: () => HomeScreen,
  schedule: () => ScheduleScreen,
  search: () => SearchScreen,
  rootNavigation: () => RootNavigation,
}));
