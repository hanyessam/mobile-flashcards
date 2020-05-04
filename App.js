import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import DeckListView from './components/DeckListView';
import NewDeckView from './components/NewDeckView';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import configureStore from './configureStore';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import IndividualDeckView from './components/IndividualDeckView';
import NewQuestionView from './components/NewQuestionView';
import QuizView from './components/QuizView';
import { setLocalNotification } from './utils/notifications';

const store = configureStore();
const platformPrefix = Platform.OS === 'ios' ? 'ios' : 'md';

const Tabs = TabNavigator({
  DeckListView: {
    screen: DeckListView,
    navigationOptions: {
      tabBarLabel: 'DeckListView',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name={platformPrefix + '-list'} size={30} color={tintColor} />
      ),
    },
  },
  NewDeckView: {
    screen: NewDeckView,
    navigationOptions: {
      tabBarLabel: 'Add New Deck',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name={platformPrefix + '-add'} size={30} color={tintColor} />
      ),
    },
  },
}, {
  tabBarOptions: {
    showIcon: true,
  },
});

const navigationOptions = {
  headerTintColor: 'white',
  headerStyle: {
    backgroundColor: 'purple',
  },
};

const IndividualDeckNavigator = StackNavigator({
  IndividualDeckView: {
    screen: IndividualDeckView,
    navigationOptions,
  },
  NewQuestionView: {
    screen: NewQuestionView,
    navigationOptions,
  },
  QuizView: {
    screen: QuizView,
    navigationOptions,
  },
}, {
  headerMode: 'none',
});

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions,
  },
  IndividualDeckNavigator: {
    screen: IndividualDeckNavigator,
    navigationOptions,
  },
}, {
  headerTintColor: 'white',
  headerTitleStyle: { color: 'white' },
});

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  };

  render() {
    return (
      <Provider store={store}>
        <View style={[{ flex: 1 }]}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  debug: {
    paddingTop: 50,
  },
});
