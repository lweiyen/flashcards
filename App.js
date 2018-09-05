import React from 'react';
import { View } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import reducer from './reducers';
import middleware from './middleware';
import DeckList from './components/DeckList';
import Deck from './components/Deck';
import NewDeck from './components/NewDeck';
import NewCard from './components/NewCard';
import Quiz from './components/Quiz';
import { setLocalNotification } from './utils/api';

const MainNavigator = createStackNavigator({
  Home: {
    screen: DeckList,
    navigationOptions: () => ({
      title: 'Deck List'
    })
  },
  Deck: {
    screen: Deck,
    path: 'deck/:title',
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.title} Deck`
    })
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: () => ({
      title: 'Add Deck'
    })
  },
  NewCard: {
    screen: NewCard,
    path: 'newCard/:title',
    navigationOptions: ({ navigation }) => ({
      title: `Add to ${navigation.state.params.title}`
    })
  },
  Quiz: {
    screen: Quiz,
    path: 'quiz/:title',
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.title} quiz`
    })
  }
});

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={createStore(reducer, middleware)}>
        <View style={{flex: 1}}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}